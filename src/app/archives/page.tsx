import Link from "next/link";
import {
  getPosts,
  getCategories,
  getPostsByCategory,
  YearGroup,
  CategoryDto,
  PostBriefDto,
} from "@/lib/api/blogApi";
import AuthorCard from "@/components/AuthorCard";
import RecentPosts from "@/components/RecentPosts";

export default async function ArchivesPage({
  searchParams = {},
}: {
  searchParams?: { category?: string };
}) {
  // Get the category from the search params
  const selectedCategory = searchParams?.category;

  // Fetch categories
  const categoriesResponse = await getCategories();
  const categories: CategoryDto[] =
    categoriesResponse.success && categoriesResponse.result
      ? categoriesResponse.result
      : [];

  // Fetch posts based on whether a category is selected
  let yearGroups: YearGroup[] = [];

  if (selectedCategory) {
    // Fetch posts for the selected category
    const categoryPostsResponse = await getPostsByCategory(selectedCategory);

    // If we have posts for this category, organize them by year
    if (
      categoryPostsResponse.success &&
      categoryPostsResponse.result &&
      categoryPostsResponse.result.length > 0
    ) {
      // Group posts by year
      const postsByYear = categoryPostsResponse.result.reduce((acc, post) => {
        const year = new Date(post.createdAt).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      }, {} as Record<number, PostBriefDto[]>);

      // Convert to YearGroup array
      yearGroups = Object.keys(postsByYear)
        .map((year) => ({
          year: parseInt(year),
          posts: postsByYear[parseInt(year)],
        }))
        .sort((a, b) => b.year - a.year); // Sort by year descending
    }
  } else {
    // Fetch all posts if no category is selected
    const response = await getPosts(1, 100);
    yearGroups =
      response.success && response.result?.item ? response.result.item : [];
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content area (2/3 width on large screens) */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-8">Archives</h1>

        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/archives"
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedCategory
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.alias}
                href={`/archives?category=${category.alias}`}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.alias
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {yearGroups.length > 0 ? (
          yearGroups.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{yearGroup.year}</h2>
              <ul className="space-y-3">
                {yearGroup.posts &&
                  yearGroup.posts.map((post) => (
                    <li key={post.url} className="flex items-baseline">
                      <span className="text-gray-500 text-sm mr-4 w-32 flex-shrink-0">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.url}`}
                        className="text-gray-800 hover:text-black hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p>
              {selectedCategory
                ? `No posts found in this category.`
                : "No posts found. Please check your API connection."}
            </p>
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
