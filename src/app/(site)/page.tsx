import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, SendHorizonal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/icons";
import { keystaticReader } from "@/lib/reader";

const services = [
  {
    title: "Voice Over",
    image: "/images/voiceover.png",
  },
  {
    title: "Content Writer",
    image: "/images/contentwriter.png",
  },
  {
    title: "Show Host",
    image: "/images/host.png",
  },
];

export default async function Home() {
  const settings = await keystaticReader.singletons.settings.read();
  const posts = await keystaticReader.collections.posts.all();
  const projects = await keystaticReader.collections.projects.all();

  const home = await keystaticReader.singletons.home.read();

  return (
    <div className="space-y-16 md:space-y-24">
      <div className="w-full grid md:grid-cols-2 overflow-hidden h-[700px] 2xl:mt-20 items-center border-b-2 border-foreground">
        <div className="space-y-6">
          {/* <div className="rounded-full overflow-hidden ring-background border border-background shadow w-fit">
            <Image
              src="/images/profile.jpg"
              alt="Rahi Gurav"
              width={75}
              height={75}
            />
          </div> */}
          <div className="relative h-fit">
            <h1 className="text-7xl md:text-9xl font-black inline-flex">
              {home?.title}
            </h1>
          </div>
          <h2 className="text-2xl font-medium max-w-lg">{home?.designation}</h2>
          <p className="max-w-lg">{home?.bio}</p>

          <div className="flex pt-4 items-center flex-wrap gap-4">
            <div>
              <Button className="rounded-full" size={"lg"}>
                Hire Me <ArrowUpRight className="size-4" />
              </Button>
            </div>
            <div className="flex space-x-4 [&_svg]:size-8">
              {settings?.social.instagram && (
                <a href={settings.social.instagram}>{<Instagram />}</a>
              )}
              {settings?.social.facebook && (
                <a href={settings.social.facebook}>{<Facebook />}</a>
              )}
              {settings?.social.linkedin && (
                <a href={settings.social.linkedin}>{<Linkedin />}</a>
              )}
              {settings?.social.youtube && (
                <a href={settings.social.youtube}>{<Youtube />}</a>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center -z-10 relative h-full flex-1">
          <div className="hidden md:block w-[1700px] h-[1700px] absolute bottom-[-55%] grayscale">
            <Image
              src="/images/f1.png"
              alt="Rahi Gurav"
              fill
              className="object-cover"
              quality={80}
            />
          </div>
          {/* <div
            className="absolute bottom-[-60%] -left-96 grayscale"
            style={{ width: "1500px", height: "1500px" }}
          >
            <Image
              src="/images/f3.png"
              alt="Rahi Gurav"
              fill
              className="object-cover"
              quality={80}
            />
          </div> */}
        </div>
      </div>
      <div>{/* <AudioWave /> */}</div>
      <div className="grid md:grid-cols-2 w-full gap-8 justify-end items-center">
        <h1 className="text-2xl md:text-4xl font-medium w-fit">
          Drop your email, I&apos;ll get back to you at light speed{" "}
          <span className="inline-flex h-full">
            <ArrowRight className="size-8" strokeWidth={2} />
          </span>
        </h1>
        <div className="">
          <div className="flex items-center border rounded-xl focus-within:bg-muted overflow-hidden">
            <Input
              className="md:text-lg h-10 md:h-16 px-6 border-0"
              placeholder="Type your email..."
            />
            <Button className="size-10 md:size-16 [&_svg]:size-4 md:[&_svg]:size-6 rounded-xl">
              <SendHorizonal className="" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-8 items-center">
          <h1 className="text-4xl font-semibold py-6">My Work</h1>
          <Link
            href={"/projects"}
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "rounded-full"
            )}
          >
            <span>View All</span>
            <span>
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
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
                  src={
                    keystaticReader.config.collections.projects.previewUrl ||
                    "" + item.entry.coverImage ||
                    ""
                  }
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
      <div>
        <h1 className="text-4xl font-semibold py-6">My Services</h1>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((item, i) => (
            <div className="" key={i}>
              <div className="aspect-square relative bg-blue-500">
                <Image
                  src={item.image}
                  fill
                  alt=""
                  className="aspect-square object-cover object-center grayscale"
                />
              </div>
              <div className="flex space-x-2">
                <p className="font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold py-6">Few Articles I Wrote:</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-8 col-span-2">
            {posts.slice(0, 6).map((item, i) => (
              <div key={i}>
                <Link
                  href={"/blog/id"}
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
          <div className="border aspect-square sticky top-10"></div>
        </div>
      </div>

      <div className="border-t-2 pt-24 pb-8 border-foreground grid md:grid-cols-3 w-full gap-4 md:gap-8">
        <h1 className="text-3xl md:text-5xl font-medium col-span-2">
          I am thrilled to answer questions about your next project{" "}
          <span className="inline-flex">
            <ArrowRight className="size-6 md:size-8" strokeWidth={2} />
          </span>
        </h1>
        <h1 className="text-3xl mt-2 text-end text-primary">
          rahiruns@gmail.com
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
        <div className="flex space-x-2 w-full justify-center md:justify-start">
          <a href={""}>© Copyright 2023 {settings?.site.name}</a>
        </div>
        <div className="flex space-x-4 justify-center md:justify-end [&_svg]:size-6 w-full">
          {settings?.social.instagram && (
            <a href={settings.social.instagram}>{<Instagram />}</a>
          )}
          {settings?.social.facebook && (
            <a href={settings.social.facebook}>{<Facebook />}</a>
          )}
          {settings?.social.linkedin && (
            <a href={settings.social.linkedin}>{<Linkedin />}</a>
          )}
          {settings?.social.youtube && (
            <a href={settings.social.youtube}>{<Youtube />}</a>
          )}
        </div>
      </div>
    </div>
  );
}
