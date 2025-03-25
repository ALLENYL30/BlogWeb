import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the content directory
 * @param fileName The name of the markdown file without extension
 * @param directory The subdirectory within the content folder
 * @returns The content of the markdown file
 */
export async function readMarkdownFile(
  fileName: string,
  directory: string = ""
): Promise<string> {
  try {
    // Define the content directory
    const contentDir = path.join(process.cwd(), "content");

    // Create the full path to the file
    const fullPath = path.join(contentDir, directory, `${fileName}.md`);

    // Read the file
    const fileContent = fs.readFileSync(fullPath, "utf8");
    return fileContent;
  } catch (error) {
    console.error(`Error reading markdown file ${fileName}:`, error);
    return `# Error loading content\n\nSorry, the content could not be loaded.`;
  }
}
