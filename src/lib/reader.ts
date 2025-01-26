import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";

export const keystaticReader =
  keystaticConfig.storage.kind === "github"
    ? createGitHubReader(keystaticConfig, {
        repo: `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!}/${process.env
          .NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!}`,
      })
    : createReader(process.cwd(), keystaticConfig);
