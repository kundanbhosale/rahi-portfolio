import { DefaultNav } from "@/components/nav/default";
import { GlobalContextProvider } from "@/context/global";
import { keystaticReader } from "@/lib/reader";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const settings = await keystaticReader.singletons.settings.read();

  return (
    <div className="max-w-screen-xl m-auto py-10 px-4 md:px-8">
      <GlobalContextProvider settings={settings}>
        <DefaultNav />
        {children}
      </GlobalContextProvider>
    </div>
  );
}
