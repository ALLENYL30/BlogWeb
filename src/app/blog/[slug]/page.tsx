import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { getPostByUrl } from "@/lib/api/blogApi";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentPropsWithoutRef } from "react";

// Allow handling slugs not in generateStaticParams
export const dynamicParams = true;

// Set metadata for this page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const response = await getPostByUrl(slug);

  if (!response.success || !response.result) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: response.result.title,
    description: `Read about ${response.result.title} on Mono BLOG`,
  };
}

// Use the standard Next.js page component type
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch post details
  const response = await getPostByUrl(slug);

  if (!response.success || !response.result) {
    return notFound();
  }

  const post = response.result;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      {/* Main content area (2/3 width on large screens) */}
      <div className="lg:col-span-2">
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.category && (
                <>
                  {" in "}
                  <Link
                    href={`/blog/category/${post.category.alias}`}
                    className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {post.category.name}
                  </Link>
                </>
              )}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none overflow-hidden">
            {post.html ? (
              <div
                dangerouslySetInnerHTML={{ __html: post.html }}
                className="prose dark:prose-invert overflow-hidden"
              />
            ) : post.markdown ? (
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
                {post.markdown}
              </ReactMarkdown>
            ) : (
              <p>No content available for this post.</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.alias}
                    href={`/blog/tag/${tag.alias}`}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Sidebar (1/3 width on large screens) */}
      <aside>
        <Sidebar type="home" />
      </aside>
    </div>
  );
}
