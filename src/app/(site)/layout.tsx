import { DefaultNav } from "@/components/nav/default";
import { keystaticReader } from "@/lib/reader";
import Link from "next/link";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const reader = await keystaticReader();
  const settings = await reader.singletons.settings.read();

  const links = [
    { title: "About", url: "/about" },
    { title: "Blog", url: "/posts" },
    { title: "Projects", url: "/projects" },
  ];
  return (
    <>
      <main className="max-w-screen-xl m-auto py-10 px-4 md:px-8">
        <DefaultNav settings={settings as never} />
        {children}
      </main>
      <footer className="max-w-screen-xl m-auto p-4">
        <div className="flex flex-col text-center items-center md:flex-row md:justify-between gap-2 px-6 py-3 md:mb-8 border-t-2 border-foreground">
          <div className="flex space-x-8 justify-start">
            {links.map((l, i) => (
              <Link key={i} href={l.url} className="hover:underline">
                {l.title}
              </Link>
            ))}
          </div>
          <div className="flex space-x-2 w-full justify-center md:justify-end text-muted-foreground text-sm md:text-base">
            <a href={""}>© Copyright 2023 {settings?.site.title}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
