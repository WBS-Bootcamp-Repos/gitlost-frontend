import React from 'react';
import EditorToolbar from './EditorToolbar';

/**
 * Markdown editor component with toolbar
 */
const MarkdownEditor = ({ content, handleChange, formErrors, textareaRef, setFormData }) => {
    // Text formatting helpers
    const insertFormat = (formatType) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        let prefix = '';
        let suffix = '';
        let newCursorPos = 0;

        switch (formatType) {
            case 'bold':
                prefix = '**';
                suffix = '**';
                break;
            case 'italic':
                prefix = '*';
                suffix = '*';
                break;
            case 'h1':
                prefix = '# ';
                suffix = '';
                break;
            case 'h2':
                prefix = '## ';
                suffix = '';
                break;
            case 'h3':
                prefix = '### ';
                suffix = '';
                break;
            case 'link':
                if (selectedText) {
                    prefix = '[';
                    suffix = '](url)';
                } else {
                    prefix = '[Link text](url)';
                    suffix = '';
                }
                break;
            case 'image':
                prefix = '![Alt text](';
                suffix = ')';
                if (!selectedText) {
                    prefix = '![Alt text](image-url)';
                    suffix = '';
                }
                break;
            case 'list':
                if (selectedText) {
                    // Split by new line and add bullet points
                    const lines = selectedText.split('\n');
                    const formattedText = lines.map(line => `- ${line}`).join('\n');
                    const newText = 
                        content.substring(0, start) + 
                        formattedText + 
                        content.substring(end);
                    
                    setFormData(prevData => ({
                        ...prevData,
                        content: newText
                    }));
                    
                    // Set the selection to after the formatted text
                    setTimeout(() => {
                        textarea.focus();
                        const newPosition = start + formattedText.length;
                        textarea.selectionStart = newPosition;
                        textarea.selectionEnd = newPosition;
                    }, 0);
                    return;
                } else {
                    prefix = '- ';
                    suffix = '';
                }
                break;
            case 'orderedList':
                if (selectedText) {
                    // Split by new line and add numbers
                    const lines = selectedText.split('\n');
                    const formattedText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
                    const newText = 
                        content.substring(0, start) + 
                        formattedText + 
                        content.substring(end);
                    
                    setFormData(prevData => ({
                        ...prevData,
                        content: newText
                    }));
                    
                    // Set the selection to after the formatted text
                    setTimeout(() => {
                        textarea.focus();
                        const newPosition = start + formattedText.length;
                        textarea.selectionStart = newPosition;
                        textarea.selectionEnd = newPosition;
                    }, 0);
                    return;
                } else {
                    prefix = '1. ';
                    suffix = '';
                }
                break;
            case 'quote':
                if (selectedText) {
                    // Split by new line and add quote prefix
                    const lines = selectedText.split('\n');
                    const formattedText = lines.map(line => `> ${line}`).join('\n');
                    const newText = 
                        content.substring(0, start) + 
                        formattedText + 
                        content.substring(end);
                    
                    setFormData(prevData => ({
                        ...prevData,
                        content: newText
                    }));
                    
                    // Set the selection to after the formatted text
                    setTimeout(() => {
                        textarea.focus();
                        const newPosition = start + formattedText.length;
                        textarea.selectionStart = newPosition;
                        textarea.selectionEnd = newPosition;
                    }, 0);
                    return;
                } else {
                    prefix = '> ';
                    suffix = '';
                }
                break;
            case 'code':
                if (selectedText.includes('\n')) {
                    prefix = '```\n';
                    suffix = '\n```';
                } else {
                    prefix = '`';
                    suffix = '`';
                }
                break;
            default:
                return;
        }

        // Insert the formatted text
        const newText = 
            content.substring(0, start) + 
            prefix + 
            selectedText + 
            suffix + 
            content.substring(end);
        
        setFormData(prevData => ({
            ...prevData,
            content: newText
        }));
        
        // Set the cursor position
        setTimeout(() => {
            textarea.focus();
            if (selectedText) {
                // If text was selected, place cursor after the formatted text
                newCursorPos = start + prefix.length + selectedText.length + suffix.length;
            } else {
                // If no text was selected, place cursor in the appropriate position
                // For links and images, place cursor at a suitable editing position
                if (formatType === 'link') {
                    newCursorPos = start + prefix.length - 5; // Position cursor at "url"
                } else if (formatType === 'image') {
                    newCursorPos = start + "[Alt text](".length; // Position cursor at image URL
                } else {
                    newCursorPos = start + prefix.length;
                }
            }
            textarea.selectionStart = newCursorPos;
            textarea.selectionEnd = newCursorPos;
        }, 0);
    };

    return (
        <div>
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                Content *
            </label>
            
            {/* Formatting Toolbar */}
            <EditorToolbar insertFormat={insertFormat} />
            
            {/* Markdown Textarea */}
            <textarea
                id="content"
                name="content"
                ref={textareaRef}
                value={content}
                onChange={handleChange}
                rows="20"
                className={`w-full px-4 py-3 border border-t-0 rounded-b-lg font-mono text-base focus:outline-none focus:ring-2 ${
                    formErrors.content ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Write your blog post content here..."
            ></textarea>
            {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
        </div>
    );
};

export default MarkdownEditor;