import {
  getPostsByCategory,
  getPostByUrl,
  PostBriefDto,
} from "@/lib/api/blogApi";
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

/**
 * Extended post type with optional content fields
 * Allows for both HTML and Markdown content to be passed to BlogPost component
 */
type PostWithContent = PostBriefDto & {
  htmlContent?: string;
  markdownContent?: string;
};

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category } = params;

  // Fetch posts for the category
  const postsResponse = await getPostsByCategory(category);

  if (!postsResponse.success) {
    notFound();
  }

  const posts = postsResponse.result;

  // Fetch detailed content for each post
  const postsWithContent: PostWithContent[] = await Promise.all(
    posts.map(async (post) => {
      try {
        const detailResponse = await getPostByUrl(post.url);

        if (detailResponse.success && detailResponse.result) {
          const detail = detailResponse.result;

          // Process HTML content - same approach as homepage and detail page
          if (detail.html) {
            const summary =
              detail.html.substring(0, 600) +
              (detail.html.length > 600 ? "..." : "");
            return {
              ...post,
              htmlContent: summary,
            };
          }
          // Process Markdown content - same approach as homepage and detail page
          else if (detail.markdown) {
            const summary =
              detail.markdown.substring(0, 600) +
              (detail.markdown.length > 600 ? "..." : "");
            return {
              ...post,
              markdownContent: summary,
            };
          }
        }

        return post;
      } catch (error) {
        console.error(`Error fetching detail for post ${post.url}:`, error);
        return post;
      }
    })
  );

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
          {postsWithContent.length > 0 ? (
            postsWithContent.map((post) => (
              <BlogPost
                key={post.url}
                title={post.title}
                date={post.createdAt}
                author="Gerald Barré"
                htmlContent={post.htmlContent}
                content={post.markdownContent}
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
