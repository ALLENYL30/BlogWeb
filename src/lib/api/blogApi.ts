// Base API URL - should be set in environment variables in production
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:44380";

// Configure fetch options for Next.js 15
const fetchOptions = {
  // Using next/cache strategy for fetch caching
  next: {
    // Revalidate content every hour
    revalidate: 3600,
  },
};

// For handling self-signed certificates in development
// In production, this would not be needed as you'd use proper certificates
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Types based on the API swagger.json
export interface BlogResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

export interface PostBriefDto {
  title: string;
  url: string;
  year: number;
  createdAt: string;
}

export interface GetPostDto {
  year: number;
  posts: PostBriefDto[];
}

// This structure may vary based on the actual API response
export interface PagedList<T> {
  total: number;
  items: T[];
}

export interface PostDetailDto {
  title: string;
  author: string;
  url: string;
  markdown: string;
  html: string;
  createdAt: string;
  category: CategoryDto;
  tags: TagDto[];
}

export interface CategoryDto {
  name: string;
  alias: string;
}

export interface TagDto {
  name: string;
  alias: string;
}

// Types based on the actual API response structure
export interface YearGroup {
  year: number;
  posts: PostBriefDto[];
}

export interface BlogApiResponse<T> {
  result: T;
  code: number;
  message: string;
  success: boolean;
}

export interface PostsResponse {
  total: number;
  item: YearGroup[]; // Note: The API uses 'item', not 'items'
}

// Get blog posts with pagination
export async function getPosts(page: number = 1, limit: number = 10) {
  try {
    // Ensure minimum limit required by API is respected
    const actualLimit = Math.max(limit, 10);

    console.log(
      `Fetching posts from: ${API_BASE_URL}/api/meowv/blog/posts/${page}/${actualLimit}`
    );

    const res = await fetch(
      `${API_BASE_URL}/api/meowv/blog/posts/${page}/${actualLimit}`,
      fetchOptions
    );

    console.log(`Response status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Raw API response:", JSON.stringify(data, null, 2));

    // For this specific API, return the response directly
    // The API already returns a structure with success, message, etc.
    return data as BlogApiResponse<PostsResponse>;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      code: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      result: { total: 0, item: [] },
    } as BlogApiResponse<PostsResponse>;
  }
}

// Get a single post by its URL
export async function getPostByUrl(url: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/meowv/blog/post?url=${encodeURIComponent(url)}`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return (await res.json()) as BlogResponse<PostDetailDto>;
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      result: null,
    };
  }
}

// Get blog categories
export async function getCategories() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/meowv/blog/categories`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return (await res.json()) as BlogResponse<CategoryDto[]>;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      result: [],
    };
  }
}

// Get blog tags
export async function getTags() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/meowv/blog/tags`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }
    return (await res.json()) as BlogResponse<TagDto[]>;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      result: [],
    };
  }
}

// Get posts by category
export async function getPostsByCategory(category: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/meowv/blog/posts/category/${category}`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch posts for category: ${category}`);
    }
    return (await res.json()) as BlogResponse<PostBriefDto[]>;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      result: [],
    };
  }
}
