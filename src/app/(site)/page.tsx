import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/icons";
import { keystaticReader } from "@/lib/reader";
import { Heading } from "@/components/ui/typographt";
import AudioWave from "@/components/audio";

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
  const reader = await keystaticReader();
  const settings = await reader.singletons.settings.read();
  const posts = await reader.collections.posts.all();
  const projects = await reader.collections.projects.all();
  const home = await reader.singletons.home.read();

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
                Connect <ArrowUpRight className="size-4" />
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
          {home?.heroImg && (
            <div
              className={cn(
                "hidden md:block h-full w-full grayscale",
                home.heroImgClass || ""
              )}
            >
              <Image
                src={home?.heroImg || ""}
                alt={settings?.site.name || ""}
                fill
                className="object-cover"
                quality={80}
              />
            </div>
          )}
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
      <div>
        <AudioWave url={home?.audioFile || ""} />
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
                "grayscale-0 hover:grayscale",
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
      <div className="grid md:grid-cols-3 w-full gap-4 md:gap-8">
        <h1 className="text-3xl md:text-5xl font-medium col-span-2">
          I am thrilled to answer questions about your next project{" "}
          <span className="inline-flex">
            <ArrowRight className="size-6 md:size-8" strokeWidth={2} />
          </span>
        </h1>
        <h1 className="text-3xl mt-2 text-end text-primary font-semibold underline">
          rahiruns@gmail.com
        </h1>
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
          <div className="border aspect-square sticky top-10 bg-muted"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 w-full gap-8 justify-end items-start border-t-2 pt-24 pb-8 border-foreground">
        <div className="space-y-8">
          <Heading className="">
            Drop your email, I&apos;ll get back to you at light speed{" "}
            <span className="inline-flex h-full">
              <ArrowRight className="size-8" strokeWidth={2} />
            </span>
          </Heading>
          <div className="flex space-x-4 [&_svg]:size-10 w-full">
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
        <div className="space-y-4">
          <Input
            className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
            placeholder="Name"
          />
          <Input
            className="md:text-base h-8 md:h-10 px-6 bg-background relative z-50"
            placeholder="Email"
          />
          <Button className="md:text-base h-8 md:h-10  [&_svg]:size-4 md:[&_svg]:size-6">
            Submit <ArrowRight className="" />
          </Button>
        </div>
      </div>
    </div>
  );
}
