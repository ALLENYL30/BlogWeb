import { readMarkdownFile } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Sidebar from "@/components/Sidebar";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MarkdownRenderer content={content} />
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <Sidebar type="about" />
        </aside>
      </div>
    </div>
  );
}
