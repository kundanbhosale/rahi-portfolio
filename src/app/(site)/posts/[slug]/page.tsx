import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Image from "next/image";
import AuthorList from "@/components/blog/authors";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomain } from "@/lib/domain";
import ContactSide from "@/components/contact/side";

export const generateStaticParams = async () => {
  const reader = await keystaticReader();

  const posts = await reader.collections.posts.all();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const domain = await getDomain();
  const reader = await keystaticReader();
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    return notFound();
  }

  const { title, publishedDate, summary = "", coverImage } = post;
  // Convert Date to ISO string or undefined if null
  const publishedTime = publishedDate
    ? new Date(publishedDate).toISOString()
    : undefined;

  const ogImage = coverImage ? `${domain}${coverImage}` : ``;

  return {
    title,
    description: summary || undefined,
    openGraph: {
      title: title,
      description: summary || undefined,
      type: "article",
      publishedTime, // Now properly typed as string | undefined
      url: `${domain}/posts/${slug}`,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary || undefined,
      images: [ogImage],
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const reader = await keystaticReader();

  const post = await reader.collections.posts.read(slug);

  if (!post) {
    return <div>No Post Found</div>;
  }
  const { node } = await post.content();

  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const authorsData = await Promise.all(
    post.authors.map(async (authorSlug) => {
      const author = await reader.collections.authors.read(authorSlug || "");
      return { ...author, slug: authorSlug };
    })
  );

  const renderable = Markdoc.transform(node);
  return (
    <div className="max-w-screen-xl m-auto py-16 gap-8 grid md:grid-cols-[auto,350px]">
      <div className="space-y-8">
        <div className="space-y-6">
          <Heading>{post.title}</Heading>
          <div>
            <AuthorList authors={authorsData as never} post={post} />
          </div>
        </div>
        {post.coverImage && (
          <div>
            <Image
              className="aspect-video object-cover object-center border-2"
              alt=""
              src={post.coverImage}
              width={800}
              height={800}
            />
          </div>
        )}
        {/* <Image src={post.coverImage} full /> */}
        <div className="mt-8 prose dark:prose-invert max-w-none">
          {Markdoc.renderers.react(renderable, React)}
        </div>
      </div>
      <div className="bg-white border p-4">
        <ContactSide />
      </div>
    </div>
  );
}
