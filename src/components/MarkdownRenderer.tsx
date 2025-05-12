import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentPropsWithoutRef } from "react";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer = ({
  content,
  className = "",
}: MarkdownRendererProps) => {
  return (
    <div
      className={`prose dark:prose-invert max-w-none overflow-hidden ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Override pre and code elements to add overflow handling
          pre: (props: ComponentPropsWithoutRef<"pre">) => (
            <pre className="overflow-auto" {...props} />
          ),
          code: ({
            inline,
            ...props
          }: { inline?: boolean } & ComponentPropsWithoutRef<"code">) =>
            inline ? (
              <code {...props} />
            ) : (
              <code className="break-words whitespace-pre-wrap" {...props} />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
