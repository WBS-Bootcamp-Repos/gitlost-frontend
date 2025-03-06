import React from "react";
import ReactMarkdown from "react-markdown";
import "../styles/markdown-styles.css";

/**
 * Consistent markdown renderer component
 * 
 * @param {Object} props
 * @param {string} props.content - Markdown content to render
 * @param {string} [props.className] - Additional classes to apply to the wrapper
 */
const MarkdownRenderer = ({ content, className = "" }) => {
  if (!content) return null;
  
  return (
    <div className={`markdown-wrapper prose ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
