import { getPostsByCategory } from "@/lib/api/blogApi";
import AuthorCard from "@/components/AuthorCard";
import RecentPosts from "@/components/RecentPosts";
import BlogPost from "@/components/BlogPost";
import Link from "next/link";
import { notFound } from "next/navigation";

type CategoryPageParams = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category } = params;

  // Fetch posts for the category
  const postsResponse = await getPostsByCategory(category);

  if (!postsResponse.success) {
    notFound();
  }

  const posts = postsResponse.result;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Category: {category}</h1>
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
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>

        <aside>
          <AuthorCard />
          <RecentPosts />
        </aside>
      </div>
    </div>
  );
}
