"use client";
import keystaticConfig from "@/keystatic.config";
import { cn } from "@/lib/utils";
import { Entry } from "@keystatic/core/reader";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { useViewport } from "@/context/viewport";
import { ArrowUpRight, Mail } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "../icons";

function ContactBtns({
  settings,
}: {
  settings: Entry<(typeof keystaticConfig)["singletons"]["settings"]>;
}) {
  const { isMobile } = useViewport();
  return (
    <div className="flex pt-4 items-center flex-wrap gap-x-3 md:gap-x-4 gap-y-6">
      <div>
        <Link
          href={
            settings?.contact.meeting_link ||
            (settings?.contact.email ? `mailto:${settings.contact.email}` : "")
          }
          target={settings?.contact.meeting_link ? "_blank" : undefined}
          rel={
            settings?.contact.meeting_link ? "noopener noreferrer" : undefined
          }
          className={cn(
            buttonVariants({ size: isMobile ? "sm" : "lg" }),
            "rounded-full"
          )}
        >
          {settings?.contact.meeting_link ? "Schedule Meeting" : "Email Me"}{" "}
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
  );
}

export default ContactBtns;
