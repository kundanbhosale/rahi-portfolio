import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { notFound } from "next/navigation";
const Page = async () => {
  const about = await keystaticReader.singletons.about.read();
  if (!about) return notFound();
  const { node } = await about.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);

  return (
    <div className="space-y-16 max-w-screen-lg m-auto py-16 ">
      <Heading>About Me</Heading>
      {/* <Image src={post.coverImage} full /> */}
      <div className="mt-8 prose dark:prose-invert max-w-none">
        {Markdoc.renderers.react(renderable, React)}
      </div>
    </div>
  );
};

export default Page;
