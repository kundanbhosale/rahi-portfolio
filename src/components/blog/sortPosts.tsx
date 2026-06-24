"use client";
import keystaticConfig from "@/keystatic.config";
import { cn } from "@/lib/utils";
import { Entry } from "@keystatic/core/reader";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useViewport } from "@/context/viewport";
import { useRouter } from "next/navigation";

type Category = {
  slug: string;
  entry: Entry<(typeof keystaticConfig)["collections"]["categories"]>;
};
export default function SortPosts({
  cats,
  category,
}: {
  category: string;
  cats: Category[];
}) {
  const { isMobile } = useViewport();
  const router = useRouter();

  if (isMobile)
    return (
      <Select
        defaultValue={"all"}
        onValueChange={(v) =>
          router.replace(`/posts?category=${v === "all" ? "" : v}`)
        }
      >
        <SelectTrigger title="Sort By Category" className="w-full h-16 text-lg">
          <span>
            <span className="inline-flex"> Sort By:&nbsp;</span>
            <SelectValue placeholder="Sort By Category" />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-lg">Category</SelectLabel>
            <SelectItem value={"all"} className="h-12 text-lg">
              All Posts
            </SelectItem>
            {cats.map((m) => (
              <SelectItem key={m.slug} value={m.slug} className="h-12 text-lg">
                {m.entry.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

  return (
    <div className="flex gap-1 w-full overflow-y-auto font-medium">
      <button
        type="button"
        onClick={() => router.replace(`/posts`)}
        className={cn(
          "px-4 py-2 rounded-full hover:bg-muted inline-block w-fit shrink-0",
          category === "all" &&
            "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        All Posts
      </button>
      {cats.map((m) => (
        <button
          type="button"
          key={m.slug}
          onClick={() => router.replace(`/posts?category=${m.slug}`)}
          className={cn(
            "px-4 py-2 rounded-full hover:bg-muted inline-block w-fit shrink-0",
            category === m.slug &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {m.entry.name}
        </button>
      ))}
    </div>
  );
}
