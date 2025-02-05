"use client";

import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowUpRight, Mail } from "lucide-react";
import { Instagram, Facebook, Linkedin, Youtube } from "../icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useViewport } from "@/context/viewport";
import Link from "next/link";

export const Hero = ({
  home,
  settings,
}: {
  home: Entry<(typeof keystaticConfig)["singletons"]["home"]>;
  settings: Entry<(typeof keystaticConfig)["singletons"]["settings"]>;
}) => {
  const { isMobile } = useViewport();
  return (
    <div className="w-full grid md:grid-cols-2 overflow-hidden xl:mt-20 pb-16 md:pb-0 md:my-0 md:h-[700px] items-center border-b-2 border-foreground">
      <div className="space-y-6">
        {isMobile && (
          <div className="border-2 size-24 rounded-full relative flex items-center justify-center overflow-hidden  border-foreground mt-10 drop-shadow-xl">
            <Image
              src={settings.site.icon || home.heroImg || ""}
              alt={settings?.site.title || ""}
              fill
              className="object-contain grayscale"
              quality={80}
            />
          </div>
        )}
        <div className="relative h-fit">
          <h1 className="text-7xl md:text-9xl font-black inline-flex">
            {home?.title}
          </h1>
        </div>
        <h2 className="text-2xl font-medium max-w-lg">{home?.designation}</h2>
        <p className="max-w-lg">{home?.bio}</p>

        <div className="flex pt-4 items-center flex-wrap gap-x-3 md:gap-x-4 gap-y-6">
          <div>
            <Link
              href={
                settings.contact.meeting_link ||
                (settings.contact.email
                  ? `mailto:${settings.contact.email}`
                  : "")
              }
              target={settings.contact.meeting_link ? "_blank" : undefined}
              rel={
                settings.contact.meeting_link
                  ? "noopener noreferrer"
                  : undefined
              }
              className={cn(
                buttonVariants({ size: isMobile ? "sm" : "lg" }),
                "rounded-full"
              )}
            >
              {settings.contact.meeting_link ? "Schedule Meeting" : "Email Me"}{" "}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="flex space-x-3 md:space-x-4 [&_svg]:size-6 md:[&_svg]:size-8">
            {settings.contact.meeting_link && settings?.contact.email && (
              <a href={settings.contact.email}>{<Mail strokeWidth={1.5} />}</a>
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

      {!isMobile && (
        <div className="flex items-center justify-center -z-10 relative h-full flex-1 drop-shadow-xl">
          {home?.heroImg && (
            <div
              className={cn(
                "hidden md:block h-full w-full grayscale",
                home.heroImgClass || ""
              )}
            >
              <Image
                src={home?.heroImg || ""}
                alt={settings?.site.title || ""}
                fill
                className="object-cover"
                quality={80}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
