import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { keystaticReader } from "@/lib/reader";
import { Hero } from "@/components/home/hero";
import AudioWave from "@/components/audio";
import { Entry } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import ContactSide from "@/components/contact/side";

// const services = [
//   {
//     title: "Voice Over",
//     image: "/images/voiceover.png",
//   },
//   {
//     title: "Content Writer",
//     image: "/images/contentwriter.png",
//   },
//   {
//     title: "Show Host",
//     image: "/images/host.png",
//   },
// ];

export default async function Home() {
  const reader = await keystaticReader();
  const settings = await reader.singletons.settings.read();
  const home = JSON.parse(
    JSON.stringify(await reader.singletons.home.read())
  ) as Entry<(typeof keystaticConfig)["singletons"]["home"]>;

  const posts = (await reader.collections.posts.all()).sort(
    (a, b) =>
      new Date(b.entry.publishedDate || "").getTime() -
      new Date(a.entry.publishedDate || "").getTime()
  );
  const showcase = home.showcase;
  const services = home.services;

  return (
    <div className="space-y-16 md:space-y-24">
      <Hero home={home as never} settings={settings as never} />
      <div>
        <AudioWave url={home?.audioFile || ""} />
      </div>
      <div>
        {showcase.length > 0 && (
          <div className="flex justify-between gap-8 items-center">
            <h1 className="text-4xl font-semibold py-6">Showcase</h1>
            {/* <Link
              href={"/showcase"}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "rounded-full"
              )}
            >
              <span>View All</span>
              <span>
                <ArrowRight className="size-4" />
              </span>
            </Link> */}
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-4">
          {showcase.slice(0, 5).map((item, i) => (
            <Link
              href={"/showcase/" + item.title.slug}
              key={i}
              className={cn(
                "grayscale-0 group relative cursor-pointer text-white",
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <div className="aspect-square relative">
                <Image
                  src={item.image || ""}
                  fill
                  alt=""
                  className="aspect-square object-cover object-center"
                />
              </div>
              <div
                className={cn(
                  "bg-primary cursor-pointer transition-opacity ease-in-out duration-300 group-hover:opacity-100 group-hover:visible flex absolute left-0 top-0 z-50 w-full h-full p-4 flex-col justify-end",
                  item.image && "invisible opacity-0 bg-primary/70"
                )}
              >
                <span
                  className={cn(
                    "p-1 md:py-2 md:px-6 border-2 rounded-full items-center inline-flex w-fit absolute top-10 right-10",
                    i !== 0 && "top-5 right-5 md:px-4 md:py-1"
                  )}
                >
                  <span className={cn("hidden", i === 0 && "text-xl md:block")}>
                    Learn More
                  </span>
                  <ArrowUpRight
                    strokeWidth={1.3}
                    className={cn(
                      "size-4 md:size-6 stroke-white",
                      i === 0 && "md:size-8"
                    )}
                  />
                </span>
                <h1
                  className={cn(
                    "truncate text-lg font-semibold line-clamp-1 md:line-clamp-2 block",
                    i === 0 && "md:text-xl"
                  )}
                >
                  {item.title.name}
                </h1>
                <p
                  className={cn(
                    "line-clamp-2 md:line-clamp-3 text-sm",
                    i === 0 && "md:text-base"
                  )}
                >
                  {item.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 w-full gap-4 md:gap-8">
        <h1 className="text-3xl md:text-5xl font-medium col-span-2">
          I am thrilled to answer questions about your next project{" "}
          <span className="inline-flex">
            <ArrowRight className="size-6 md:size-8" strokeWidth={2} />
          </span>
        </h1>
        <h1 className="text-3xl mt-2 text-end text-primary font-semibold underline">
          {settings?.contact.email || ""}
        </h1>
      </div>
      <div>
        <h1 className="text-4xl font-semibold py-6">My Services</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((item, i) => (
            <Link href={"/service/" + item.title.slug} key={i}>
              <div className="aspect-square relative bg-muted group">
                <div
                  className={cn(
                    "invisible opacity-0 bg-blue-500/70 cursor-pointer transition-opacity ease-in-out duration-300 group-hover:opacity-100 group-hover:visible absolute left-0 top-0 z-50 w-full h-full p-4 flex items-center justify-center"
                  )}
                >
                  <span
                    className={cn(
                      "py-2 px-6 border-2 rounded-full items-center inline-flex w-fit absolute"
                    )}
                  >
                    <span className={cn("text-white", i === 0 && "text-xl")}>
                      Learn More
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.3}
                      className={cn(
                        "size-6 stroke-white",
                        i === 0 && "md:size-8"
                      )}
                    />
                  </span>
                </div>
                <Image
                  src={item.image || ""}
                  fill
                  alt=""
                  className="aspect-square object-cover object-center grayscale"
                />
              </div>
              <div className="flex space-x-2">
                <p className="font-medium text-lg line-clamp-2 mt-2">
                  {item.title.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold py-6">Few Articles I Wrote:</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-8 md:col-span-2">
            {posts.slice(0, 6).map((item, i) => (
              <div key={i}>
                <Link
                  href={"/posts/" + item.slug}
                  className="hover:scale-[1.005] transition-all ease-linear hover:bg-muted p-2 block"
                >
                  <p className="">
                    <span className="font-medium">{item.entry.title}</span>
                  </p>
                  <p className="font-light line-clamp-3">
                    {item.entry.summary}
                  </p>
                  {/* <div className="justify-between flex">
                  <span className="text-sm text-muted-foreground">
                    By Kundan Bhosale, a month ago
                  </span>
                  <span className="text-sm text-muted-foreground">
                    7min read
                  </span>
                </div> */}
                </Link>
              </div>
            ))}
            <Link
              href={"/posts"}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "rounded-full"
              )}
            >
              <span>View All Articles</span>
              <span>
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
          <div className="p-6 bg-muted flex-1 border">
            <ContactSide />
          </div>
        </div>
      </div>
    </div>
  );
}
