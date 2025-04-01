import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/api/blogApi";

type SidebarProps = {
  type: "about" | "projects" | "home" | "archives";
};

const Sidebar = async ({ type }: SidebarProps) => {
  // Directly call the getPosts function with a limit of 10 (minimum required by API)
  const response = await getPosts(1, 10);
  console.log("API Response:", JSON.stringify(response, null, 2));

  // Very simple posts array with just titles
  let posts: { title: string; url: string }[] = [];

  // Handle the API response directly
  if (response && response.success && response.result && response.result.item) {
    posts = response.result.item
      .flatMap((yearGroup) =>
        yearGroup.posts.map((post) => ({
          title: post.title || "Untitled Post",
          url: post.url,
        }))
      )
      // Take only the 5 most recent posts
      .slice(0, 5);
  }

  console.log("Posts for display:", JSON.stringify(posts, null, 2));

  return (
    <div className="space-y-8">
      {/* Author Card Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="mb-4">
            <Image
              src="/author.jpg"
              alt="Allen Liu"
              width={120}
              height={120}
              className="rounded-full mx-auto"
              priority
            />
          </div>
          <h2 className="text-xl font-bold mb-1">Allen Liu</h2>
          {/*<p className="text-gray-600 text-sm text-center mb-4">*/}
          {/*  aka. meziantou*/}
          {/*</p>*/}
          <div className="flex space-x-3">
            <a
              href="https://github.com/ALLENYL30"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/*<a*/}
            {/*  href="https://twitter.com"*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*  className="text-gray-700 hover:text-black"*/}
            {/*>*/}
            {/*  <svg*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*    width="20"*/}
            {/*    height="20"*/}
            {/*    viewBox="0 0 24 24"*/}
            {/*    fill="currentColor"*/}
            {/*  >*/}
            {/*    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />*/}
            {/*  </svg>*/}
            {/*</a>*/}
            <a
              href="https://www.linkedin.com/in/zzyliu74/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`${
                type === "home" ? "font-semibold text-black" : "text-gray-700"
              } hover:text-black hover:underline`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/archives"
              className={`${
                type === "archives"
                  ? "font-semibold text-black"
                  : "text-gray-700"
              } hover:text-black hover:underline`}
            >
              Archives
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`${
                type === "projects"
                  ? "font-semibold text-black"
                  : "text-gray-700"
              } hover:text-black hover:underline`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${
                type === "about" ? "font-semibold text-black" : "text-gray-700"
              } hover:text-black hover:underline`}
            >
              About Me
            </Link>
          </li>
        </ul>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Recent Posts
        </h3>
        <ul className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.url} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <Link
                  href={`/blog/${post.url}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline line-clamp-2"
                >
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No posts available</li>
          )}
        </ul>
      </div>

      {/* Technologies Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "C#",
            ".NET",
            "ASP.NET Core",
            "SQL",
            "Entity Framework",
            "Azure",
            "Git",
            "Blazor",
          ].map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Contact</h3>
        <p className="text-sm text-gray-600 mb-2">
          Feel free to reach out if you&apos;d like to collaborate or have any
          questions.
        </p>
        <a
          href="mailto:zzyliu71@gmail.com"
          className="text-blue-600 hover:underline inline-block mt-2"
        >
          zzyliu71@gmail.com
        </a>
        <p className="text-sm text-gray-600 mt-2">
          &copy; {new Date().getFullYear()} Allen Liu
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
