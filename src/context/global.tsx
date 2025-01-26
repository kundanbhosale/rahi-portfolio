"use client";
import { keystaticReader } from "@/lib/reader";
import { createContext, ReactNode, useContext } from "react";

export type GlobalContextType = {
  settings: Awaited<
    ReturnType<typeof keystaticReader.singletons.settings.read>
  > | null;
};
const GlobalContext = createContext<GlobalContextType>({
  settings: null,
});

export const GlobalContextProvider = ({
  children,
  settings,
}: {
  children: ReactNode;
  settings: GlobalContextType["settings"];
}) => {
  return (
    <GlobalContext.Provider value={{ settings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
