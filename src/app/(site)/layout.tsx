import { DefaultNav } from "@/components/nav/default";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-xl m-auto py-10 px-4 md:px-8">
      <DefaultNav />
      {children}
    </div>
  );
}
