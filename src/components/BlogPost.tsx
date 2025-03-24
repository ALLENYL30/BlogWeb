import Link from "next/link";

type BlogPostProps = {
  title: string;
  date: string;
  author: string;
  content?: string;
  slug: string;
};

const BlogPost = ({
  title,
  date,
  author,
  content = "",
  slug,
}: BlogPostProps) => {
  // Format date if needed
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="mb-10 pb-8 border-b">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex text-gray-600 text-sm mb-4">
        <time>{formattedDate}</time>
        <span className="mx-2">•</span>
        <span>{author}</span>
      </div>
      {content && <div className="mb-4 leading-relaxed">{content}</div>}
      <Link
        href={`/blog/${slug}`}
        className="text-gray-700 hover:text-black hover:underline"
      >
        [read more]
      </Link>
    </article>
  );
};

export default BlogPost;
