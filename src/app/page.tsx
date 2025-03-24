import BlogPost from "@/components/BlogPost";
import AuthorCard from "@/components/AuthorCard";
import RecentPosts from "@/components/RecentPosts";
import { getPosts, PostBriefDto } from "@/lib/api/blogApi";

export default async function Home() {
  // Fetch posts from the API with limit=10 (minimum required by API)
  const response = await getPosts(1, 10);

  // Debug logging to see the response structure
  console.log("API Response (Home):", JSON.stringify(response, null, 2));

  // Handle different possible structures
  let posts: PostBriefDto[] = [];
  if (response.success && response.result?.item) {
    // Flatten the posts from all years
    posts = response.result.item.flatMap((yearGroup) => yearGroup.posts || []);
  }

  console.log("Posts for display:", JSON.stringify(posts, null, 2));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content area (2/3 width on large screens) */}
      <div className="lg:col-span-2">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <BlogPost
              key={post.url}
              title={post.title || "Untitled Post"}
              date={post.createdAt || new Date().toISOString()}
              author="Gerald Barré"
              content={`This is a summary of the post "${post.title}". Click [read more] to view the full content.`}
              slug={post.url}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p>No posts found. Please check your API connection.</p>
            <p className="text-sm text-gray-500 mt-2">
              Response status: {response.success ? "Success" : "Failed"}
            </p>
            {!response.success && (
              <p className="text-sm text-gray-500">
                Error message: {response.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sidebar (1/3 width on large screens) */}
      <aside>
        <AuthorCard />
        <RecentPosts />
      </aside>
    </div>
  );
}
