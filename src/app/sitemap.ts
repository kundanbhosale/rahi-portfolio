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

  // Blogs

  const postList = await (await keystaticReader()).collections.posts.all();
  const projectList = await (
    await keystaticReader()
  ).collections.projects.all();

  const posts = postList.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.entry.publishedDate || "").toISOString(),
    changeFrequency: "",
    priority: 0.5,
  }));
  const projects = projectList.map((post) => ({
    url: `${siteUrl}/projects/${post.slug}`,
    lastModified: new Date(post.entry.publishedDate || "").toISOString(),
  }));

  const staticRoutes = routes.map((r) => ({
    url: (siteUrl! + r[0]) as string,
    lastModified: new Date().toISOString(),
    priority: r[1] as number,
  }));

  return [...staticRoutes, ...posts, ...projects];
}
