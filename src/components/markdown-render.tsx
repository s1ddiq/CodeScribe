import Link from "next/link";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownRenderProps {
  content: string;
}

const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-2xl font-bold text-primary my-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-xl font-semibold text-blue-300 my-3" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="my-2 leading-relaxed text-foreground" {...props} />
  ),
  //   @ts-ignore
  code: ({ node, inline, className, children, ...props }) =>
    inline ? (
      <code className="bg-gray-700 text-red-300 px-1 rounded" {...props}>
        {children}
      </code>
    ) : (
      <div className="my-4 space-y-2">
        <p className="text-xs text-mtued-foreground">Example</p>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          <code {...props}>{children}</code>
        </pre>
      </div>
    ),
  a: ({ node, ...props }) => (
    <a
      className="text-primary underline hover:text-blue-300"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic text-primary my-4"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="list-disc list-inside ml-4 my-2 text-foreground"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal list-inside ml-4 my-2 text-foreground"
      {...props}
    />
  ),
  hr: ({ node, ...props }) => <hr />,
};

export default function MarkdownRender({ content }: MarkdownRenderProps) {
  return (
    <div className="mt-2">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
      <Link
        href="mailto:snasheed.dev@outlook.com"
        className="text-gray-500 text-xs underline underline-offset-2"
      >
        &gt; Suggest an edit
      </Link>
    </div>
  );
}
