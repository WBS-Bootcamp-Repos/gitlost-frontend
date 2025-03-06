import React from 'react';
import { 
    Bold, 
    Italic, 
    Link as LinkIcon, 
    List, 
    ListOrdered, 
    Heading1, 
    Heading2, 
    Heading3, 
    Quote, 
    Code, 
    Image as ImageIcon 
} from "lucide-react";

/**
 * Toolbar component for the markdown editor with formatting buttons
 */
const EditorToolbar = ({ insertFormat }) => (
    <div className="bg-gray-100 p-2 rounded-t-lg border border-gray-300 flex flex-wrap gap-1">
        <button 
            type="button" 
            onClick={() => insertFormat('h1')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Heading 1"
        >
            <Heading1 size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('h2')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Heading 2"
        >
            <Heading2 size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('h3')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Heading 3"
        >
            <Heading3 size={20} strokeWidth={2} />
        </button>
        <span className="w-px h-6 bg-gray-400 my-auto mx-1"></span>
        <button 
            type="button" 
            onClick={() => insertFormat('bold')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Bold"
        >
            <Bold size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('italic')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Italic"
        >
            <Italic size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('link')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Insert Link"
        >
            <LinkIcon size={20} strokeWidth={2} />
        </button>
        <span className="w-px h-6 bg-gray-400 my-auto mx-1"></span>
        <button 
            type="button" 
            onClick={() => insertFormat('list')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Bullet List"
        >
            <List size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('orderedList')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Numbered List"
        >
            <ListOrdered size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('quote')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Blockquote"
        >
            <Quote size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('code')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Code Block"
        >
            <Code size={20} strokeWidth={2} />
        </button>
        <button 
            type="button" 
            onClick={() => insertFormat('image')}
            className="p-2 hover:bg-gray-200 rounded text-gray-800"
            title="Insert Image"
        >
            <ImageIcon size={20} strokeWidth={2} />
        </button>
    </div>
);

export default EditorToolbar;