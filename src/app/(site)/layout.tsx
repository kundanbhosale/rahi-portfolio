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
        <DefaultNav />
        {children}
      </main>
      <footer className="max-w-screen-xl m-auto p-6 mb-8 border-primary border-1 bg-muted">
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
          <div className="flex space-x-8 justify-start">
            {links.map((l, i) => (
              <Link key={i} href={l.url} className="hover:underline">
                {l.title}
              </Link>
            ))}
          </div>
          <div className="flex space-x-2 w-full justify-center md:justify-end">
            <a href={""}>© Copyright 2023 {settings?.site.name}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
