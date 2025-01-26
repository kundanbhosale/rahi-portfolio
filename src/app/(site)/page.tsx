import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, SendHorizonal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import AudioWave from "@/components/audio";
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

  return (
    <div className="space-y-24">
      <div className="w-full grid grid-cols-2 overflow-hidden h-[700px] 2xl:mt-20 items-center border-b-2 border-foreground">
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
            <h1 className="text-9xl font-black inline-flex">Rahi Gurav.</h1>
          </div>
          <h2 className="text-2xl font-medium max-w-lg">
            Travel Journalist | Tour Manager | Production & Content Writer
          </h2>
          <p className="max-w-lg">
            Storytelling on camera is home to me. I see myself travelling the
            world and giving an experience to the people through my lenses and
            writeups. Confident, ambitious, great communicator, brave, mindful
            and a fast learner
          </p>

          <div className="flex space-x-4 pt-4 items-center">
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
          <div
            className="absolute bottom-[-55%] grayscale"
            style={{ width: "1700px", height: "1700px" }}
          >
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
      <div className="grid grid-cols-2 w-full gap-8 justify-end items-center">
        <h1 className="text-4xl font-medium">
          Drop your email, I&apos;ll get back to you at light speed{" "}
          <span className="">
            <ArrowRight className="size-8" strokeWidth={2} />
          </span>
        </h1>
        <div className="">
          <div className="flex items-center border rounded-xl focus-within:bg-muted overflow-hidden">
            <Input
              className="text-lg h-16 px-6 border-0"
              placeholder="Type your email..."
            />
            <Button className="size-16 [&_svg]:size-6 rounded-xl">
              <SendHorizonal className="" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-8 items-center">
          <h1 className="text-4xl font-semibold py-6">My Work</h1>
          <Link
            href={""}
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

        <div className="grid grid-cols-4 gap-8">
          {[...Array(5)].map((item, i) => (
            <div
              key={i}
              className={cn(
                "relative aspect-square",
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <Image
                src={
                  "https://plus.unsplash.com/premium_photo-1668418188928-eb7d85411c01?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                fill
                alt=""
                className="aspect-square object-cover"
              />
              <div className="flex space-x-2 z-10 absolute bottom-0 left-0 w-full bg-background">
                <p className="font-medium">Title of the project</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold py-6">My Services</h1>
        <div className="grid grid-cols-3 gap-10">
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
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-8 col-span-2">
            {[...Array(4)].map((item, i) => (
              <div key={i}>
                <Link
                  href={"/blog/id"}
                  className="hover:scale-[1.005] transition-all ease-linear hover:bg-muted p-2 block"
                >
                  <p className="">
                    <span className="font-medium">
                      Title of the blog written by me.
                    </span>
                  </p>
                  <p className="font-light">
                    A Table of Contents improves document navigation and
                    provides a quick overview of your content structure. A Table
                    of Contents improves document navigation and provides a
                    quick overview of your content structure
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
              href={""}
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

      <div className="border-t-2 pt-24 pb-8 border-foreground grid grid-cols-3 w-full gap-8">
        <h1 className="text-5xl font-medium col-span-2">
          I am thrilled to answer questions about your next project{" "}
          <span className="">
            <ArrowRight className="size-8" strokeWidth={2} />
          </span>
        </h1>
        <h1 className="text-3xl mt-2 text-end">rahiruns@gmail.com</h1>
      </div>
      <div className="flex justify-between space-x-2">
        <div className="flex space-x-2">
          <a href={""}>© Copyright 2023 {settings?.site.name}</a>
        </div>
        <div className="flex space-x-4 [&_svg]:size-6">
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
