// import keystaticConfig from "@/keystatic.config";
// import { createReader } from "@keystatic/core/reader";
// import { createGitHubReader } from "@keystatic/core/reader/github";

// export const keystaticReader =
//   keystaticConfig.storage.kind === "github"
//     ? createGitHubReader(keystaticConfig, {
//         repo: `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!}/${process.env
//           .NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!}`,
//         token: process.env.GITHUB_PAT,
//       })
//     : createReader(process.cwd(), keystaticConfig);
// z

import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../keystatic.config";

import { cache } from "react";
import { cookies, draftMode } from "next/headers";

export const keystaticReader = cache(async () => {
  let isDraftModeEnabled = false;
  // draftMode throws in e.g. generateStaticParams
  try {
    const draft = await draftMode();
    isDraftModeEnabled = draft.isEnabled;
  } catch {}

  if (isDraftModeEnabled) {
    const c = await cookies();
    const branch = c.get("ks-branch")?.value;

    if (branch) {
      return createGitHubReader(keystaticConfig, {
        // Replace the below with your repo org an name
        repo: `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!}/${process.env
          .NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!}`,
        ref: branch,
        // Assuming an existing GitHub app
        // token: c.get("keystatic-gh-access-token")?.value,
        token: process.env.GITHUB_PAT,
      });
    }
  }
  // If draft mode is off, use the regular reader
  return keystaticConfig.storage.kind === "github"
    ? createGitHubReader(keystaticConfig, {
        repo: `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!}/${process.env
          .NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!}`,
        token: process.env.GITHUB_PAT,
      })
    : createReader(process.cwd(), keystaticConfig);
});
