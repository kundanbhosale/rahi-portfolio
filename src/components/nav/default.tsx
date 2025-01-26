"use client";

import React from "react";
import Link from "next/link";

export const DefaultNav = () => {
  return (
    <nav className="flex items-center justify-between border border-foreground px-4 py-2 w-fit sticky top-10 bg-background z-50 rounded-full">
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

        <Link href={"/about"}>About</Link>
        <Link href={"/posts"}>Blog</Link>
        <Link href={"/project"}>Projects</Link>
        {/* {session.data?.user && (
          <Link href={"/profile"} className="flex gap-2 items-center">
            <span>{session.data?.user.name.split(" ")[0]}</span>
          </Link>
        )} */}
      </div>
    </nav>
  );
};
