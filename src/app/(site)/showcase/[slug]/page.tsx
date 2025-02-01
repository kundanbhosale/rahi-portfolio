import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDomain } from "@/lib/domain";
import { Metadata } from "next";
import ContactSide from "@/components/contact/side";

export const generateStaticParams = async () => {
  const reader = await keystaticReader();

  const home = await reader.singletons.home.read();

  return (home || { showcase: [] }).showcase.map((post) => ({
    slug: post.title.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const domain = await getDomain();
  const slug = (await params).slug;
  const reader = await keystaticReader();

  const home = await reader.singletons.home.read();
  const showcase = home?.showcase.find((f) => f.title.slug === slug);
  if (!showcase) {
    return notFound();
  }

  const { title, summary = "", image } = showcase;

  const ogImage = image ? `${domain}${image}` : `${domain}/og?title=${title}`;

  return {
    title: title.name,
    description: summary || undefined,
    openGraph: {
      title: title.name,
      description: summary || undefined,
      type: "article",
      url: `${domain}/showcase/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title.name,
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

  const home = await reader.singletons.home.read();
  const showcase = home?.showcase.find((f) => f.title.slug === slug);
  if (!showcase) {
    return notFound();
  }

  const { node } = await showcase.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);
  return (
    <div className="max-w-screen-xl m-auto py-16 gap-8 grid md:grid-cols-[auto,350px]">
      <div className="space-y-8">
        {showcase.image && (
          <div>
            <Image
              className="aspect-video object-cover object-center border-2"
              alt=""
              src={showcase.image}
              width={1400}
              height={1400}
            />
          </div>
        )}
        <Heading>{showcase.title.name}</Heading>

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
