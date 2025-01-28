import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDomain } from "@/lib/domain";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const reader = await keystaticReader();

  const projects = await reader.collections.projects.all();

  return projects.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const domain = await getDomain();
  const slug = (await params).slug;
  const project = await (
    await keystaticReader()
  ).collections.projects.read(slug);

  if (!project) {
    return notFound();
  }

  const { title, publishedDate, summary = "", coverImage } = project;
  // Convert Date to ISO string or undefined if null
  const publishedTime = publishedDate
    ? new Date(publishedDate).toISOString()
    : undefined;

  const ogImage = coverImage
    ? `${domain}${coverImage}`
    : `${domain}/og?title=${title}`;

  return {
    title,
    description: summary || undefined,
    openGraph: {
      title: title,
      description: summary || undefined,
      type: "article",
      publishedTime, // Now properly typed as string | undefined
      url: `${domain}/posts/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
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
  const reader = await keystaticReader();

  const slug = (await params).slug;
  const post = await reader.collections.projects.read(slug);

  if (!post) {
    return <div>No Post Found</div>;
  }
  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);
  return (
    <div className="space-y-16 max-w-screen-md m-auto py-16 ">
      <Heading>{post.title}</Heading>
      {post.coverImage && (
        <div>
          <Image
            className="aspect-video object-cover object-center border-2"
            alt=""
            src={post.coverImage}
            width={1400}
            height={1400}
          />
        </div>
      )}
      {/* <Image src={post.coverImage} full /> */}
      <div className="mt-8 prose dark:prose-invert max-w-none">
        {Markdoc.renderers.react(renderable, React)}
      </div>
    </div>
  );
}
