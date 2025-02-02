"use client";
import React, { useCallback, useMemo, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { ChevronDown, Pause, Play } from "lucide-react";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { Entry } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function AudioWave({
  data,
  size = "default",
}: {
  data: Entry<(typeof keystaticConfig)["collections"]["audios"]>;
  size?: "sm" | "lg" | "default";
}) {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: size === "lg" ? 100 : size === "sm" ? 20 : 50,
    barWidth: 2,
    barGap: 1,
    cursorColor: "transparent",
    barRadius: 2,
    // autoplay: true,

    waveColor: "#999",
    progressColor: "black",
    url: data.audioFile || "",
    plugins: useMemo(
      () => [
        Hover.create({
          lineColor: "black",
          lineWidth: 1,

          labelBackground: "#000",
          labelColor: "#fff",
          labelSize: "10px",
        }),
      ],
      []
    ),
  });

  const onPlayPause = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (document.activeElement !== e.target) return;
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.key === " " && onPlayPause();
    return true;
  };

  const handleClick = () => {
    onPlayPause();
  };

  const comp = data.audioFile ? (
    <div
      ref={containerRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className="focus:outline-none"
    />
  ) : (
    ""
  );

  const tags = "Rage, Book Review";

  if (size === "lg") {
    return (
      <div className="group relative">
        {comp}

        <div className="absolute -top-10 right-0 inline-flex w-fit h-fit items-center justify-center z-10 rounded-full">
          <button
            onClick={onPlayPause}
            className="size-10 flex border items-center rounded-full justify-center hover:bg-background bg-foreground [&_svg]:fill-background hover:[&_svg]:fill-foreground transition-all ease-in hover:scale-150"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
    );
  }
  if (size === "sm") {
    return (
      <div className="border rounded-md overflow-hidden p-1 space-y-2">
        <div className="flex gap-4">
          <Image
            src={"/images/profile.jpg"}
            alt={data.title}
            width={40}
            height={40}
            className="rounded-sm"
          />
          <div className="flex-1 flex flex-col gap-2">
            <div className="">
              <p className="font-semibold text-sm ml-1">{data.title}</p>
              <div className="flex gap-1 flex-wrap">
                {tags
                  .trim()
                  .split(",")
                  .map((t, i) => (
                    <Badge
                      key={i}
                      className="text-xs py-px px-1 leading-none rounded-md"
                      variant={"secondary"}
                    >
                      {t}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">{comp}</div>
      </div>
    );
  }

  return (
    <Collapsible className="border rounded-md">
      <div className="grid grid-cols-4 items-center p-2">
        <div className="flex gap-4 items-center justify-start">
          <div style={{ width: "40px", height: "40px" }}>
            <Image
              src={"/images/profile.jpg"}
              alt={data.title}
              width={40}
              height={40}
              className="rounded-sm"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{data.title}</p>
            <div className="flex gap-1 flex-wrap">
              {tags
                .trim()
                .split(",")
                .map((t, i) => (
                  <Badge key={i} className="" variant={"outline"}>
                    {t}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">{comp}</div>
        <div className="flex justify-end gap-1">
          {/* <button
              onClick={onPlayPause}
              className="size-10 flex border items-center rounded-full justify-center hover:bg-background bg-foreground [&_svg]:fill-background hover:[&_svg]:fill-foreground transition-all ease-in"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button> */}
          <Button
            size={"icon"}
            variant={"secondary"}
            className="rounded-full"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <CollapsibleTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <ChevronDown />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="p-2 border-t">
        {" "}
        Can I use this in my project?
      </CollapsibleContent>
    </Collapsible>
  );
}
