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
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      };

const makePreview = (url: string) => {
  return storage.kind === "github"
    ? `/preview/start?branch={branch}&to=${url}`
    : url;
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

      previewUrl: makePreview("/"),
      schema: {
        heroImg: fields.image({
          label: "Hero Image",
          directory: "public/uploads/home",
        }),
        title: fields.text({
          label: "Title",
          multiline: true,
          defaultValue: "Rahi Gurav.",
        }),
        designation: fields.text({
          label: "Designation",
          multiline: true,
          defaultValue:
            "Travel Journalist | Tour Manager | Production & Content Writer",
        }),
        bio: fields.text({
          label: "A bit about you",
          multiline: true,
          defaultValue:
            "Storytelling on camera is home to me. I see myself travelling the world and giving an experience to the people through my lenses and writeups. Confident, ambitious, great communicator, brave, mindful and a fast learner",
        }),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/pages/about/",
      previewUrl: makePreview("/about"),

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
            summary: fields.text({
              label: "Site Meta Description",
              multiline: true,
            }),
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
      previewUrl: makePreview("/posts/{slug}"),

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
    projects: collection({
      label: "Projects",
      path: "content/projects/*/",
      previewUrl: makePreview("/projects/{slug}"),

      slugField: "title",
      entryLayout: "content",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 4 } },
          },
        }),
        content: fields.markdoc({
          label: "Content",
          //   componentBlocks: ComponentBlocks,
        }),

        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/uploads/projects",
          publicPath: "/uploads/projects/",
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
    // externalArticles: collection({
    //   label: "External Article",
    //   path: "content/externalArticles/*/",
    //   slugField: "title",
    //   schema: {
    //     title: fields.slug({
    //       name: {
    //         label: "Title",
    //         validation: { length: { min: 4 } },
    //       },
    //     }),
    //     directLink: fields.url({
    //       label: "Article Link",
    //     }),
    //     source: fields.text({
    //       label: "Link Source",
    //       defaultValue: "Read more.",
    //     }),
    //     coverImage: fields.image({
    //       label: "Cover Image",
    //       directory: "public/uploads/external-articles",
    //     }),
    //     summary: fields.text({
    //       label: "Summary",
    //       validation: { length: { min: 4, max: 200 } },
    //     }),
    //     publishedDate: fields.date({
    //       label: "Published Date",
    //       defaultValue: new Date().toISOString().split("T")[0],
    //     }),
    //   },
    // }),
  },
});
