import { readMarkdownFile } from "@/lib/markdown";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Sidebar from "@/components/Sidebar";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MarkdownRenderer content={content} className="projects-content" />
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <Sidebar type="projects" />
        </aside>
      </div>
    </div>
  );
}
