import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// export async function generateStaticParams() {
//   const projects = await keystaticReader.collections.projects.all();

//   return projects.map((post) => ({
//     id: post.slug.toString(),
//   }));
// }

export default async function Page() {
  // 2. Read the "projects" collection
  const reader = await keystaticReader();

  const projects = await reader.collections.projects.all();
  return (
    <div className="relative py-16 space-y-16">
      <Heading className="max-w-xl">
        Writing on programming, productivity, and life.
      </Heading>
      <div className="grid md:grid-cols-4 gap-6">
        {projects.slice(0, 5).map((item, i) => (
          <Link
            href={"/projects/" + item.slug}
            key={i}
            className={cn(
              "grayscale hover:grayscale-0",
              i === 0 && "col-span-2 row-span-2"
            )}
          >
            <div className="aspect-square relative">
              <Image
                src={item.entry.coverImage || ""}
                fill
                alt=""
                className="aspect-square object-cover object-center"
              />
            </div>

            <div className="flex space-x-2 z-10 absolute bottom-0 left-0 w-full bg-background">
              <p className="font-medium text-sm md:text-base truncate">
                {item.entry.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
