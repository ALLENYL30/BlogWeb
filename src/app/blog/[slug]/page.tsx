import AuthorCard from "@/components/AuthorCard";
import RecentPosts from "@/components/RecentPosts";
import Link from "next/link";
import { getPostByUrl } from "@/lib/api/blogApi";
import { notFound } from "next/navigation";

type BlogPostParams = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = params;

  // Fetch post from API
  const postResponse = await getPostByUrl(slug);

  // If post not found, show 404
  if (!postResponse.success || !postResponse.result) {
    notFound();
  }

  const post = postResponse.result;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <article>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex text-gray-600 text-sm mb-6">
            <time>{new Date(post.createdAt).toLocaleDateString("en-US")}</time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html || post.markdown }}
          />

          {post.category && (
            <div className="mt-6 pt-4 border-t">
              <span className="text-sm text-gray-600">Category: </span>
              <Link
                href={`/blog/category/${post.category.alias}`}
                className="text-gray-800 hover:text-black hover:underline"
              >
                {post.category.name}
              </Link>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4">
              <span className="text-sm text-gray-600">Tags: </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.alias}
                    href={`/blog/tag/${tag.alias}`}
                    className="bg-gray-100 px-2 py-1 rounded text-sm hover:bg-gray-200"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-black hover:underline"
            >
              ← Back to homepage
            </Link>
          </div>
        </article>
      </div>

      <aside>
        <AuthorCard />
        <RecentPosts />
      </aside>
    </div>
  );
}
