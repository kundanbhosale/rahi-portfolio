import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ContactBtns from "@/components/contact/buttonts";

export async function generateMetadata(): Promise<Metadata> {
  const about = await (await keystaticReader()).singletons.about.read();

  return {
    title: about?.title,
    description: about?.summary,
  };
}

const Page = async () => {
  const reader = await keystaticReader();
  const about = await reader.singletons.about.read();
  const settings = await reader.singletons.settings.read();
  if (!about) return notFound();
  const { node } = await about.content();

  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);

  return (
    <div className="max-w-screen-lg m-auto py-16">
      {/* <Image src={post.coverImage} full /> */}
      <div className="mt-8 prose dark:prose-invert max-w-none grid md:grid-cols-[auto,500px] gap-8 md:gap-16">
        <div className="order-2">
          <video
            width={"100%"}
            height={"100%"}
            controls
            autoPlay={true}
            controlsList="nodownload"
            loop={true}
            className="border-2 drop-shadow-lg rounded-lg aspect-square bg-black"
          >
            <source src="/videos/young-rahi.mp4" />
          </video>
        </div>
        <div className="italic">
          <Heading className="max-w-xl mt-0">
            {about.title || "About Page"}
          </Heading>
          {Markdoc.renderers.react(renderable, React)}
          <ContactBtns settings={settings as never} />
        </div>
      </div>
    </div>
  );
};

export default Page;
