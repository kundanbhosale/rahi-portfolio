"use client";
import React, { useCallback, useMemo, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { Pause, Play } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

export default function AudioWave({ url }: { url: string }) {
  const containerRef = useRef(null);

  const { ref, inView } = useInView({
    /* Optional options */
    onChange: (inView) => {
      if (inView) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }
    },
    threshold: 0,
  });

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 100,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    // autoplay: true,
    waveColor: "#999",
    progressColor: "black",
    url,
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!inView && !isPlaying) return;
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.key === " " && onPlayPause();
  };

  if (!url) return null;

  return (
    <div className="group relative" ref={ref}>
      <div ref={containerRef} />
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
