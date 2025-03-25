import { getPostsByCategory } from "@/lib/api/blogApi";
import Sidebar from "@/components/Sidebar";
import BlogPost from "@/components/BlogPost";
import Link from "next/link";
import { notFound } from "next/navigation";

type TagPageParams = {
  params: {
    tag: string;
  };
};

export default async function TagPage({ params }: TagPageParams) {
  const { tag } = params;

  // Fetch posts for the tag - we'll reuse the category API function for now
  // A real implementation would use a tag-specific API endpoint
  const postsResponse = await getPostsByCategory(tag);

  if (!postsResponse.success) {
    notFound();
  }

  const posts = postsResponse.result;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tag: {tag}</h1>
        <Link
          href="/"
          className="text-gray-600 hover:text-black hover:underline"
        >
          ← Back to homepage
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogPost
                key={post.url}
                title={post.title}
                date={post.createdAt}
                author="Gerald Barré"
                slug={post.url}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p>No posts found with this tag.</p>
            </div>
          )}
        </div>

        <aside>
          <Sidebar type="home" />
        </aside>
      </div>
    </div>
  );
}
