import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import Link from "next/link";
import { Fragment } from "react";

// export async function generateStaticParams() {
//   const projects = await keystaticReader.collections.projects.all();

//   return projects.map((post) => ({
//     id: post.slug.toString(),
//   }));
// }

export default async function Page() {
  // 2. Read the "projects" collection
  const projects = await keystaticReader.collections.projects.all();
  return (
    <div className="relative py-16 space-y-16">
      <Heading>Writing on programming, productivity, and life.</Heading>
      <div className="grid md:grid-cols-[150px,auto] border-l px-8 gap-4">
        {projects.map((p, i) => (
          <Fragment key={i}>
            <p className="text-muted-foreground pt-10 md:py-4">
              {p.entry.publishedDate}
            </p>
            <Link
              href={`/projects/${p.slug}`}
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
    </div>
  );
}
