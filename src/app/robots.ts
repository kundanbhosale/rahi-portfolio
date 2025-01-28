import { getDomain } from "@/lib/domain";

export default async function robots() {
  const domain = await getDomain();

  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: domain + "/sitemap.xml",
    host: domain,
  };
}
