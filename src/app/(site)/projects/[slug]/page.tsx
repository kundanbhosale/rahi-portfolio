import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";

export const generateStaticParams = async () => {
  const projects = await keystaticReader.collections.projects.all();

  return projects.map((post) => ({
    slug: post.slug,
  }));
};

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await keystaticReader.collections.projects.read(slug);

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
    <div className="space-y-16 max-w-screen-lg m-auto py-16 ">
      <Heading>{post.title}</Heading>
      {/* <Image src={post.coverImage} full /> */}
      <div className="mt-8 prose dark:prose-invert max-w-none">
        {Markdoc.renderers.react(renderable, React)}
      </div>
    </div>
  );
}
