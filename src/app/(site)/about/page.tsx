import React from "react";
import Markdoc from "@markdoc/markdoc";

import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/icons";
import { getIsSsrMobile } from "@/context/isMobile";

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
  const isMobile = await getIsSsrMobile();

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
          <div className="flex pt-4 items-center flex-wrap gap-x-3 md:gap-x-4 gap-y-6">
            <div>
              <Link
                href={
                  settings?.contact.meeting_link ||
                  (settings?.contact.email
                    ? `mailto:${settings.contact.email}`
                    : "")
                }
                target={settings?.contact.meeting_link ? "_blank" : undefined}
                rel={
                  settings?.contact.meeting_link
                    ? "noopener noreferrer"
                    : undefined
                }
                className={cn(
                  buttonVariants({ size: isMobile ? "sm" : "lg" }),
                  "rounded-full"
                )}
              >
                {settings?.contact.meeting_link
                  ? "Schedule Meeting"
                  : "Email Me"}{" "}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="flex space-x-3 md:space-x-4 [&_svg]:size-6 md:[&_svg]:size-8 not-italic">
              {settings?.contact.meeting_link && settings?.contact.email && (
                <a href={`mailto:${settings.contact.email}`}>
                  {<Mail strokeWidth={1.5} />}
                </a>
              )}
              {settings?.social.instagram && (
                <a href={settings.social.instagram}>{<Instagram />}</a>
              )}
              {settings?.social.facebook && (
                <a href={settings.social.facebook}>{<Facebook />}</a>
              )}
              {settings?.social.linkedin && (
                <a href={settings.social.linkedin}>{<Linkedin />}</a>
              )}
              {settings?.social.youtube && (
                <a href={settings.social.youtube}>{<Youtube />}</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
