import SortPosts from "@/components/blog/sortPosts";
import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await (await keystaticReader()).singletons.settings.read();
  return {
    title: settings?.posts?.title,
    description: settings?.posts?.summary,
    alternates: {
      canonical: "/posts",
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 2. Read the "Posts" collection
  const reader = await keystaticReader();
  const params = await searchParams;
  const category = params.category;

  let posts = (await reader.collections.posts.all()).sort(
    (a, b) =>
      new Date(b.entry.publishedDate || "").getTime() -
      new Date(a.entry.publishedDate || "").getTime(),
  );

  if (category) {
    posts = posts.filter((p) => p.entry.category === category);
  }

  const cats = await reader.collections.categories.all();
  const settings = await reader.singletons.settings.read();

  return (
    <div className="relative py-16 space-y-16">
      <div className="space-y-4 md:space-y-8">
        <Heading className="max-w-xl">
          {settings?.posts.title || "Posts Page"}
        </Heading>

        <SortPosts cats={cats} category={category?.toString() || "all"} />
      </div>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-[150px,auto] border-l px-8 gap-4">
          {posts.map((p, i) => (
            <Fragment key={i}>
              <p className="text-muted-foreground pt-10 md:py-4">
                {p.entry.publishedDate}
              </p>
              <Link
                href={`/posts/${p.slug}`}
                className="group hover:bg-muted md:p-4 transition-all ease-linear"
              >
                <h3 className="font-semibold group-hover:text-primary">
                  {p.entry.title}
                </h3>
                <p className="text-muted-foreground">{p.entry.summary}</p>
                {/* <p className="text-sm flex gap-1 items-center">
                <span>Read More</span> <ArrowRight className="size-4" />
              </p> */}
              </Link>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex h-72 justify-center bg-muted flex-col items-center p-4 border rounded font-semibold">
          <p>No Posts Found!</p>
        </div>
      )}
    </div>
  );
}
