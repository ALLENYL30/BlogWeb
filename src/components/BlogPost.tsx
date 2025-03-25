import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentPropsWithoutRef } from "react";

/**
 * Props for the BlogPost component
 * @property {string} title - The title of the blog post
 * @property {string} date - The date the post was created
 * @property {string} author - The author of the post
 * @property {string} [content] - Optional Markdown content for the post
 * @property {string} [htmlContent] - Optional HTML content for the post
 * @property {string} slug - The URL slug for the post
 */
type BlogPostProps = {
  title: string;
  date: string;
  author: string;
  content?: string; // Markdown content
  htmlContent?: string; // HTML content
  slug: string;
};

/**
 * BlogPost component that renders a blog post with either HTML or Markdown content
 * Supports both full post views and preview/summary views
 */
const BlogPost = ({
  title,
  date,
  author,
  content = "",
  htmlContent,
  slug,
}: BlogPostProps) => {
  // Format date if needed
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="mb-10 pb-8 border-b">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex text-gray-600 text-sm mb-4">
        <time>{formattedDate}</time>
        <span className="mx-2">•</span>
        <span>{author}</span>
      </div>
      {htmlContent ? (
        <div
          className="mb-4 leading-relaxed post-summary prose max-w-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : content ? (
        <div className="mb-4 leading-relaxed prose max-w-none overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: (props: ComponentPropsWithoutRef<"pre">) => (
                <pre className="overflow-auto" {...props} />
              ),
              code: ({
                inline,
                ...props
              }: { inline?: boolean } & ComponentPropsWithoutRef<"code">) =>
                inline ? (
                  <code {...props} />
                ) : (
                  <code
                    className="break-words whitespace-pre-wrap"
                    {...props}
                  />
                ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : null}
      <Link
        href={`/blog/${slug}`}
        className="text-gray-700 hover:text-black hover:underline"
      >
        [read more]
      </Link>
    </article>
  );
};

export default BlogPost;
