// app/sitemap.js

import { getDomain } from "@/lib/domain";
import { keystaticReader } from "@/lib/reader";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getDomain();
  // Static
  const routes = [
    ["", 1],
    ["/about", 0.8],
    ["/audio", 0.8],
  ];
  const reader = await keystaticReader();

  const showCaseList = await reader.collections.showcase.all();

  const showcase = showCaseList.map((p) => ({
    url: `${siteUrl}/showcase/${p.slug}`,
    changeFrequency: "",
    lastModified: new Date(p.entry.publishedDate || "").toISOString(),
    priority: 0.5,
  }));

  const servicesList = await reader.collections.services.all();

  const services = servicesList.map((p) => ({
    url: `${siteUrl}/service/${p.slug}`,
    changeFrequency: "",
    lastModified: new Date(p.entry.publishedDate || "").toISOString(),
    priority: 0.5,
  }));

  // Blogs

  const postList = await reader.collections.posts.all();

  const posts = postList.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.entry.publishedDate || "").toISOString(),
    changeFrequency: "",
    priority: 0.5,
  }));

  const staticRoutes = routes.map((r) => ({
    url: (siteUrl! + r[0]) as string,
    lastModified: new Date().toISOString(),
    priority: r[1] as number,
  }));

  const r = [...staticRoutes, ...posts, ...showcase, ...services];

  return r;
}
