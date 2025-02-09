import { keystaticReader } from "@/lib/reader";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await (await keystaticReader()).singletons.settings.read();
  return {
    name: settings?.site.title,
    short_name: settings?.site.title,
    description: settings?.site.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
