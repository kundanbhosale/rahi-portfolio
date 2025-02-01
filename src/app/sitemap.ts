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
  ];
  const reader = await keystaticReader();

  const home = await reader.singletons.home.read();

  const showcase = home?.showcase.map((p) => ({
    url: `${siteUrl}/showcase/${p.title.slug}`,
    changeFrequency: "",
    lastModified: new Date().toISOString(),
    priority: 0.5,
  }));

  const services = home?.services.map((p) => ({
    url: `${siteUrl}/service/${p.title.slug}`,
    changeFrequency: "",
    lastModified: new Date().toISOString(),
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

  const r = [...staticRoutes, ...posts];
  if (showcase) r.push(...showcase);

  if (services) r.push(...services);

  return r;
}
