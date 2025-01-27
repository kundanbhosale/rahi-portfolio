"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useViewport } from "@/context/viewport";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "../icons";
import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = (
  <>
    <Link href={"/about"}>About</Link>
    <Link href={"/posts"}>Blog</Link>
    <Link href={"/projects"}>Projects</Link>
  </>
);

export const DefaultNav = ({
  settings,
}: {
  settings: Entry<(typeof keystaticConfig)["singletons"]["settings"]>;
}) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const { isMobile } = useViewport();
  const path = usePathname();

  if (isMobile) {
    return (
      <nav className="flex">
        {path !== "/" && (
          <Link href={"/"} className="text-2xl font-black relative -top-3">
            {" "}
            {settings.site.name}.
          </Link>
        )}
        <Sheet>
          <SheetTrigger
            className={cn(
              "fixed drop-shadow-xl top-5 right-5 z-10",
              !client && "hidden"
            )}
            asChild
          >
            <Button
              className="rounded-full [&_svg]:size-6 size-10"
              variant={"default"}
              size={"icon"}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"right"}
            className="max-w-full transition-all flex flex-col"
          >
            <Link href={"/"} className="text-2xl font-black mb-8">
              {settings.site.name}.
            </Link>
            <div className="flex flex-col text-lg gap-4 flex-1">
              <Link href={"/"}>Home</Link>
              {links}
            </div>
            <div>
              <div className="grid flex-1 gap-4 mt-auto">
                <div>
                  <Button className="rounded-full w-full" size={"lg"}>
                    Connect <ArrowUpRight className="size-4" />
                  </Button>
                </div>
                <div className="flex py-4 items-center flex-wrap gap-4 justify-center border-t">
                  <div className="flex space-x-3 [&_svg]:size-6">
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
          </SheetContent>
        </Sheet>
      </nav>
    );
  }
  return (
    <nav className="flex justify-between items-center">
      {path !== "/" && (
        <Link href={"/"} className="text-2xl font-black relative">
          {" "}
          {settings.site.name}.
        </Link>
      )}
      <div className="drop-shadow-xl flex items-center justify-between border border-foreground px-4 py-2 w-fit fixed right-8 xl:right-[7%] top-10 bg-background z-50 rounded-full">
        <div className="flex items-center space-x-6">
          <Link href={"/"}>
            <svg
              viewBox="0 0 48 48"
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z" />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
          </Link>
          {links}
          {/* {session.data?.user && (
          <Link href={"/profile"} className="flex gap-2 items-center">
            <span>{session.data?.user.name.split(" ")[0]}</span>
          </Link>
        )} */}
        </div>
      </div>
    </nav>
  );
};
