import { readMarkdownFile } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects | MEZIANTOU'S BLOG",
  description: "Explore my portfolio of projects and applications",
};

export default async function ProjectsPage() {
  // Read the projects markdown file
  const content = await readMarkdownFile("projects", "projects");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <MarkdownRenderer content={content} className="projects-content" />
      </div>
    </div>
  );
}
