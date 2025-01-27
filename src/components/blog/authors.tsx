import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatRelative } from "date-fns";
const AuthorList = ({
  post,
  authors,
}: {
  post: Entry<(typeof keystaticConfig)["collections"]["posts"]>;
  authors: Entry<(typeof keystaticConfig)["collections"]["authors"]>[];
}) => {
  if (authors.length < 0) return null;
  return (
    <div className="flex gap-2 items-center">
      <div className="flex -space-x-2 shrink-0">
        {authors.map((author, i) => (
          <div key={i}>
            <Avatar className="size-12 border-background border-2">
              <AvatarImage
                src={author.avatar || ""}
                alt={author.name}
                className="object-cover object-center"
              />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
      <p className="font-semibold">
        By {authors.map((a) => a.name).join(" & ")}
        <br />
        {post.publishedDate && (
          <span className="font-normal text-muted-foreground">
            on {formatRelative(new Date(post.publishedDate), new Date())}
          </span>
        )}
      </p>
    </div>
  );
};

export default AuthorList;
