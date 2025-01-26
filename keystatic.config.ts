import {
  collection,
  config,
  fields,
  GitHubConfig,
  LocalConfig,
  singleton,
} from "@keystatic/core";
import siteConfig from "./site.config";
//   import { ComponentBlocks } from "./components/ComponentBlocks";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV !== "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  ui: {
    brand: {
      name: siteConfig.site.name,
    },
  },
  singletons: {
    home: singleton({
      label: "Home",
      path: "content/pages/home/",
      schema: {
        heading: fields.markdoc({
          // formatting: {
          //   inlineMarks: {
          //     bold: true,
          //   },
          // },
          label: "Heading (note: text that is bolded will show up in red)",
        }),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/pages/about/",
      schema: {
        content: fields.markdoc({
          // formatting: true,
          // dividers: true,
          // links: true,
          // layouts: [
          //   [1, 1],
          //   [1, 1, 1],
          //   [2, 1],
          //   [1, 2, 1],
          // ],
          label: "Content",
          //   componentBlocks: ComponentBlocks,
        }),
      },
    }),
    settings: singleton({
      label: "Settings",
      path: "content/pages/settings/",
      schema: {
        site: fields.object(
          {
            name: fields.text({ label: "Site Name" }),
          },
          { label: "Site Configuration" }
        ),
        social: fields.object(
          {
            linkedin: fields.url({
              label: "Linkedin",
              // description: "www.linkedin.com/in/kundan-bhosale/",
            }),
            instagram: fields.url({
              label: "Instagram",
              // description: "www.linkedin.com/in/kundan-bhosale/",
            }),
            facebook: fields.url({
              label: "Facebook",
              // description: "www.linkedin.com/in/kundan-bhosale/",
            }),
            x: fields.url({
              label: "X.com",
              // description: "www.linkedin.com/in/kundan-bhosale/",
            }),
            youtube: fields.url({
              label: "Youtube",
              // description: "www.linkedin.com/in/kundan-bhosale/",
            }),
          },
          {
            label: "Social Links",
            description: "Add your social media links here...",
            layout: [6, 6, 6, 6, 12],
          }
        ),
      },
    }),
  },
  collections: {
    authors: collection({
      label: "Authors",
      path: "content/authors/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        role: fields.text({ label: "Role" }),
        avatar: fields.image({
          label: "Author avatar",
          directory: "public/uploads/authors",
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      path: "content/posts/*/",
      slugField: "title",
      entryLayout: "content",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: new Date().toISOString().split("T")[0],
        }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/uploads/posts",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Post author",
            collection: "authors",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Please select an author",
          }
        ),
        content: fields.markdoc({
          label: "Content",
          //   componentBlocks: ComponentBlocks,
        }),
      },
    }),
    externalArticles: collection({
      label: "External Article",
      path: "content/externalArticles/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 4 } },
          },
        }),
        directLink: fields.url({
          label: "Article Link",
        }),
        source: fields.text({
          label: "Link Source",
          defaultValue: "Read more.",
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/uploads/external-articles",
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: new Date().toISOString().split("T")[0],
        }),
      },
    }),
  },
});
