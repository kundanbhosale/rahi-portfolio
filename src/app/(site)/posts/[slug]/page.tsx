import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Image from "next/image";
import AuthorList from "@/components/blog/authors";

export const generateStaticParams = async () => {
  const reader = await keystaticReader();

  const posts = await reader.collections.posts.all();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

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
    <div className="space-y-16 max-w-screen-md m-auto py-16 ">
      <Heading>{post.title}</Heading>
      <div>
        <AuthorList authors={authorsData as never} post={post} />
      </div>
      {post.coverImage && (
        <div>
          <Image
            className="aspect-video"
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
  );
}
