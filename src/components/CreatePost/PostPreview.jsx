import React from 'react';
import ReactMarkdown from 'react-markdown';
import { House, PenLine, X, ArrowRight } from "lucide-react";

/**
 * Renders a preview of what the post will look like when published
 * @param {Object} props - Component props
 * @param {Object} props.formData - The form data for the post
 * @param {Array<string>} props.additionalImages - Array of additional image URLs
 * @param {Function} props.navigate - React Router navigate function
 * @param {Function} props.togglePreview - Function to toggle preview mode
 */
const PostPreview = ({ formData, additionalImages, navigate, togglePreview }) => (
    <div className="preview-mode">
        {/* Hero Section Preview */}
        <section
            className="relative w-full bg-cover h-96 bg-center bg-no-repeat flex items-end px-4 mb-8 rounded-lg overflow-hidden"
            style={{
                backgroundImage: `url(${formData.cover || "https://via.placeholder.com/1200x600?text=Add+a+cover+image"})`,
            }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content Wrapper */}
            <div className="container mx-auto z-10 text-white py-8">
                {/* Title */}
                <h1 className="text-6xl font-heading font-black leading-normal">
                    {formData.title || "Your Post Title"}
                </h1>
                
                {/* Author & Date */}
                <p className="text-lg text-white mt-2">
                    By {formData.author || "Author Name"} • {new Date().toLocaleDateString()}
                </p>
            </div>
        </section>

        {/* Blogposts Section - Matching PostDetail layout */}
        <section className="blog-section py-14 bg-white">
            <div className="container mx-auto">
                {/* Categories, Edit, Delete */}
                <div className="flex flex-row justify-between text-primary pb-8">
                    <div>Categories placeholder</div>
                    <div className="flex flex-row gap-5">
                        <PenLine />
                        <X />
                    </div>
                </div>

                {/* Content Preview */}
                <div className="blog-content grid md:w-8/12 mx-auto">
                    {/* Fix for hydration issues: Wrap ReactMarkdown in a div instead of p */}
                    <div className="markdown-content">
                        {formData.content ? (
                            <ReactMarkdown>{formData.content}</ReactMarkdown>
                        ) : (
                            <p className="text-gray-400 italic">Your content will appear here...</p>
                        )}
                    </div>
                </div>

                {/* Additional Images Preview - Matching PostDetail layout */}
                <div className="flex gap-8 py-4">
                    {Array(3).fill(null).map((_, index) => (
                        <div key={index} className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                            {additionalImages[index] ? (
                                <img 
                                    src={additionalImages[index]} 
                                    alt={`Image ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
                                    }}
                                />
                            ) : (
                                <span className="text-gray-500">Image {index + 1}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex flex-row justify-between pt-8">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-primary flex items-center gap-2"
                    >
                        <House />
                    </button>
                    
                    <div className="flex flex-row gap-5 text-primary">
                        <p>Preview Mode</p>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </section>
        
        {/* Preview Action Buttons */}
        <div className="container mx-auto mt-8 flex justify-center">
            <button
                type="button"
                onClick={togglePreview}
                className="px-6 py-3 flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                <PenLine size={20} /> Back to Editor
            </button>
        </div>
    </div>
);

export default PostPreview;