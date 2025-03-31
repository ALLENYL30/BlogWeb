import BlogPost from "@/components/BlogPost";
import Sidebar from "@/components/Sidebar";
import { getPosts, getPostByUrl, PostBriefDto } from "@/lib/api/blogApi";
import Link from "next/link";

// Extended post type with optional content fields
type PostWithContent = PostBriefDto & {
  htmlContent?: string;
  markdownContent?: string;
  detailLoaded: boolean;
};

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

  // Fetch detailed content for each post
  const postsWithContent: PostWithContent[] = await Promise.all(
    posts.slice(0, 6).map(async (post) => {
      try {
        const detailResponse = await getPostByUrl(post.url);
        console.log(
          `Detail response for ${post.url}:`,
          JSON.stringify(detailResponse, null, 2)
        );

        if (detailResponse.success && detailResponse.result) {
          const detail = detailResponse.result;

          // Use the same rendering approach as the detail page
          if (detail.html) {
            // For HTML content, create a preview
            const summary =
              detail.html.substring(0, 600) +
              (detail.html.length > 600 ? "..." : "");
            return {
              ...post,
              htmlContent: summary,
              detailLoaded: true,
            };
          } else if (detail.markdown) {
            // For Markdown content, create a preview
            const summary =
              detail.markdown.substring(0, 600) +
              (detail.markdown.length > 600 ? "..." : "");
            return {
              ...post,
              markdownContent: summary,
              detailLoaded: true,
            };
          }
        }
      } catch (error) {
        console.error(`Error fetching detail for post ${post.url}:`, error);
      }
      return { ...post, detailLoaded: false };
    })
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      {/* Main content area (2/3 width on large screens) */}
      <div className="lg:col-span-2">
        {postsWithContent && postsWithContent.length > 0 ? (
          <>
            {postsWithContent.map((post) => (
              <BlogPost
                key={post.url}
                title={post.title || "Untitled Post"}
                date={post.createdAt || new Date().toISOString()}
                author="Allen Liu"
                htmlContent={post.htmlContent}
                content={post.markdownContent}
                slug={post.url}
              />
            ))}

            {/* Read more section - simplified to match reference design */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-800 text-lg">
                Still want more?{" "}
                <Link
                  href="/archives"
                  className="inline-block bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-medium px-1"
                >
                  Checkout out my complete list of blog entries!
                </Link>
              </p>
            </div>
          </>
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
        <Sidebar type="home" />
      </aside>
    </div>
  );
}
