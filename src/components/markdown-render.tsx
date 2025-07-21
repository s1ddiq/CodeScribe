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
    <p className="my-2 leading-relaxed text-gray-200" {...props} />
  ),
  //   @ts-ignore
  code: ({ node, inline, className, children, ...props }) =>
    inline ? (
      <code className="bg-gray-700 text-red-300 px-1 rounded" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-800 text-green-400 p-2 rounded-lg overflow-x-auto">
        <code {...props}>{children}</code>
      </pre>
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
      className="border-l-4 border-blue-400 pl-4 italic text-gray-300 my-4"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside ml-4 my-2 text-gray-200" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal list-inside ml-4 my-2 text-gray-200"
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
    </div>
  );
}
