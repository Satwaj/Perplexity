import React from "react";

// Simple markdown renderer for basic markdown syntax
export const ReactMarkdown = ({ content }) => {
  if (!content) return null;

  // Split by newlines and process each line
  const lines = content.split("\n");
  const elements = [];
  let codeBlock = null;
  let codeLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block handling
    if (line.startsWith("```")) {
      if (codeBlock === null) {
        codeBlock = [];
        codeLanguage = line.replace("```", "").trim();
      } else {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto my-2"
          >
            <code>{codeBlock.join("\n")}</code>
          </pre>,
        );
        codeBlock = null;
        codeLanguage = "";
      }
      continue;
    }

    // Inside code block
    if (codeBlock !== null) {
      codeBlock.push(line);
      continue;
    }

    // Skip empty lines
    if (!line.trim()) {
      if (elements.length > 0 && elements[elements.length - 1] !== null) {
        elements.push(null);
      }
      continue;
    }

    // Headers
    if (line.startsWith("###")) {
      elements.push(
        <h4 key={`h4-${elements.length}`} className="font-bold text-sm mt-2">
          {line.replace(/^#+\s/, "")}
        </h4>,
      );
    } else if (line.startsWith("##")) {
      elements.push(
        <h3 key={`h3-${elements.length}`} className="font-bold text-base mt-2">
          {line.replace(/^#+\s/, "")}
        </h3>,
      );
    } else if (line.startsWith("#")) {
      elements.push(
        <h2 key={`h2-${elements.length}`} className="font-bold text-lg mt-2">
          {line.replace(/^#+\s/, "")}
        </h2>,
      );
    }
    // Lists
    else if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
      elements.push(
        <li key={`li-${elements.length}`} className="ml-4 list-disc">
          {parseInlineMarkdown(line.replace(/^[-*]\s/, ""))}
        </li>,
      );
    }
    // Numbered lists
    else if (/^\d+\./.test(line.trim())) {
      elements.push(
        <li key={`ol-${elements.length}`} className="ml-4 list-decimal">
          {parseInlineMarkdown(line.replace(/^\d+\.\s/, ""))}
        </li>,
      );
    }
    // Regular paragraph
    else {
      elements.push(
        <p key={`p-${elements.length}`} className="my-1">
          {parseInlineMarkdown(line)}
        </p>,
      );
    }
  }

  return <div className="space-y-1">{elements}</div>;
};

// Parse inline markdown (bold, italic, code)
const parseInlineMarkdown = (text) => {
  const elements = [];
  let lastIndex = 0;

  // Match patterns: **bold**, *italic*, `code`
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    // Add matched element
    if (match[1]) {
      // Bold
      elements.push(
        <strong
          key={`bold-${elements.length}`}
          className="font-bold text-blue-400"
        >
          {match[1]}
        </strong>,
      );
    } else if (match[2]) {
      // Italic
      elements.push(
        <em
          key={`italic-${elements.length}`}
          className="italic text-orange-400"
        >
          {match[2]}
        </em>,
      );
    } else if (match[3]) {
      // Code
      elements.push(
        <code
          key={`code-${elements.length}`}
          className="bg-gray-700 px-1.5 py-0.5 rounded text-xs text-blue-300 font-mono"
        >
          {match[3]}
        </code>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
};
