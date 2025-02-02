import AudioWave from "@/components/audio";
import { Heading } from "@/components/ui/typographt";
import { keystaticReader } from "@/lib/reader";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await (await keystaticReader()).singletons.settings.read();
  return {
    title: settings?.audio?.title,
    description: settings?.audio?.summary,
  };
}

const Page = async () => {
  const reader = await keystaticReader();
  const settings = await reader.singletons.settings.read();
  const audios = (await reader.collections.audios.all()).sort(
    (a, b) =>
      new Date(b.entry.publishedDate || "").getTime() -
      new Date(a.entry.publishedDate || "").getTime()
  );

  return (
    <div className="relative py-16 space-y-16">
      <Heading className="max-w-xl">
        {settings?.audio.title || "My Audio Samples"}
      </Heading>
      <div className="space-y-8">
        {audios.map((a, i) => (
          <div key={i}>
            <div className="bg-primary/5 p-2 border border-primary/10 drop-shadow-xl">
              <AudioWave
                data={JSON.parse(JSON.stringify(a.entry)) || ""}
                size="lg"
              />
            </div>
            <p className="text-center font-light text-sm mt-2">
              {a.entry.title || ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
