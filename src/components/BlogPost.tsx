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
      <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="flex text-gray-600 dark:text-gray-300 text-sm mb-4">
        <time>{formattedDate}</time>
        <span className="mx-2">•</span>
        <span>{author}</span>
      </div>
      {htmlContent ? (
        <div
          className="mb-6 leading-relaxed post-summary prose max-w-none overflow-hidden bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : content ? (
        <div className="mb-6 leading-relaxed prose dark:prose-invert max-w-none overflow-hidden bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
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
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        Read full article
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </article>
  );
};

export default BlogPost;
