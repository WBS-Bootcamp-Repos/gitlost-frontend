import React from 'react';
import { Eye, PenLine } from "lucide-react";

/**
 * Page header component with toggle between edit and preview modes
 * @param {Object} props - Component props
 * @param {boolean} props.isPreview - Whether the page is in preview mode
 * @param {Function} props.togglePreview - Function to toggle preview mode
 */
const PageHeader = ({ isPreview, togglePreview }) => (
    <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold font-heading">
            {isPreview ? "Post Preview" : "Create New Post"}
        </h1>
        <button
            type="button"
            onClick={togglePreview}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
            {isPreview ? (
                <>
                    <PenLine size={20} /> Back to Editor
                </>
            ) : (
                <>
                    <Eye size={20} /> Preview Post
                </>
            )}
        </button>
    </div>
);

export default PageHeader;