import Link from "next/link";
import { getPosts, YearGroup } from "@/lib/api/blogApi";
import Sidebar from "@/components/Sidebar";

export default async function ArchivesPage() {
  // Fetch all posts
  const response = await getPosts(1, 100);
  const yearGroups: YearGroup[] =
    response.success && response.result?.item ? response.result.item : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      {/* Main content area (2/3 width on large screens) */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Archives
        </h1>

        {yearGroups.length > 0 ? (
          yearGroups.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {yearGroup.year}
              </h2>
              <ul className="space-y-3">
                {yearGroup.posts &&
                  yearGroup.posts.map((post) => (
                    <li key={post.url} className="flex items-baseline">
                      <span className="text-gray-500 dark:text-gray-400 text-sm mr-4 w-32 flex-shrink-0">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.url}`}
                        className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:underline"
                      >
                        {post.title || "Untitled Post"}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="dark:text-gray-300">
              No posts found. Please check your API connection.
            </p>
          </div>
        )}
      </div>

      {/* Sidebar (1/3 width on large screens) */}
      <aside>
        <Sidebar type="archives" />
      </aside>
    </div>
  );
}
