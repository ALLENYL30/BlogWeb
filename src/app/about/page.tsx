import { readMarkdownFile } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | MEZIANTOU'S BLOG",
  description: "Learn more about me and my experience",
};

export default async function AboutPage() {
  // Read the about markdown file
  const content = await readMarkdownFile("about-me", "about");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
