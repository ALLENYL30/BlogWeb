import Link from "next/link";
import { getPosts, PostBriefDto, YearGroup } from "@/lib/api/blogApi";

const RecentPosts = async () => {
  // Fetch recent posts from the API
  const response = await getPosts(1, 10);

  console.log("API Response (RecentPosts):", JSON.stringify(response, null, 2));

  // Handle the specific response structure from this API
  let posts: PostBriefDto[] = [];
  if (response.success && response.result?.item) {
    // Flatten posts from all years
    posts = response.result.item.flatMap(
      (yearGroup: YearGroup) => yearGroup.posts || []
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">RECENT POSTS</h3>
      <ul className="space-y-2">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.url}>
              <Link
                href={`/blog/${post.url}`}
                className="text-gray-800 hover:text-black hover:underline"
              >
                {post.title || "Untitled Post"}
              </Link>
            </li>
          ))
        ) : (
          <li>No recent posts available</li>
        )}
      </ul>
    </div>
  );
};

export default RecentPosts;
