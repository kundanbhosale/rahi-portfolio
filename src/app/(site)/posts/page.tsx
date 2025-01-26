import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Link from "next/link";
import { Fragment } from "react";

// export async function generateStaticParams() {
//   const posts = await keystaticReader.collections.posts.all();

//   return posts.map((post) => ({
//     id: post.slug.toString(),
//   }));
// }

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await keystaticReader.collections.posts.all();
  return (
    <div className="relative py-16 space-y-16">
      <Heading>Writing on programming, productivity, and life.</Heading>
      <div className="grid grid-cols-[150px,auto] border-l px-8 gap-4">
        {posts.map((p, i) => (
          <Fragment key={i}>
            <p className="text-muted-foreground py-4">
              {p.entry.publishedDate}
            </p>
            <Link
              href={`/posts/${p.slug}`}
              className="group hover:bg-muted p-4 transition-all ease-linear"
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
    </div>
  );
}
