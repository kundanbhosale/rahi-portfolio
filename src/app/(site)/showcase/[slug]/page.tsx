import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getDomain } from "@/lib/domain";
import { Metadata } from "next";
import ContactSide from "@/components/contact/side";
import ContactBtns from "@/components/contact/buttonts";

export const generateStaticParams = async () => {
  const reader = await keystaticReader();

  const showcase = await reader.collections.showcase.all();

  return showcase.map((p) => ({
    slug: p.slug,
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

  const showcase = await reader.collections.showcase.read(slug);
  if (!showcase) {
    return notFound();
  }

  const { title, summary = "", image } = showcase;

  const ogImage = image ? `${domain}${image}` : "";

  return {
    title: title,
    description: summary || undefined,
    openGraph: {
      title: title,
      description: summary || undefined,
      type: "article",
      url: `${domain}/showcase/${slug}`,
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary || undefined,
      ...(ogImage && { images: [ogImage] }),
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

  const showcase = await reader.collections.showcase.read(slug);
  const settings = await reader.singletons.settings.read();
  if (!showcase) {
    return notFound();
  }

  const type = showcase.data.discriminant;

  if (type === "link") {
    return redirect(showcase.data.value || "");
  }

  if (type === "post") {
    return redirect(showcase.data.value || "");
  }

  if (type === "audio") {
    return null;
  }

  const { node } = await showcase.data.value();

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
        <Heading>{showcase.title}</Heading>

        {/* <Image src={post.coverImage} full /> */}
        <div className="mt-8 prose dark:prose-invert max-w-none">
          {Markdoc.renderers.react(renderable, React)}
        </div>
        <ContactBtns settings={settings as never} />
      </div>
      <div className="bg-white border p-4">
        <ContactSide />
      </div>
    </div>
  );
}
