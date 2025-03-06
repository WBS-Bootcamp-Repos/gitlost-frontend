import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "../context/context";
import { formatImagesForStorage } from "../utils/imageUtils";

// Import components
import PageHeader from "./CreatePost/PageHeader";
import MainForm from "./CreatePost/MainForm";
import PostPreview from "./CreatePost/PostPreview";

// Import styles
import "../styles/markdown-styles.css";

const CreatePost = () => {
    const navigate = useNavigate();
    const { createPost, loading, error } = usePosts();
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef(null);
    
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
        cover: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2940&auto=format&fit=crop"
    });
    
    const [additionalImages, setAdditionalImages] = useState(['', '', '']);
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    
    useEffect(() => {
        // Set focus to the title field when component mounts
        const titleInput = document.getElementById("title");
        if (titleInput) {
            titleInput.focus();
        }
    }, []);

    // Toggle between preview and edit modes
    const togglePreview = () => {
        setIsPreview(!isPreview);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            // Combine main cover and additional images for storage
            const combinedImageString = formatImagesForStorage(formData.cover, additionalImages);
            
            // Create post with the combined image string
            const postDataToSubmit = {
                ...formData,
                cover: combinedImageString
            };
            
            const newPost = await createPost(postDataToSubmit);
            if (newPost && newPost.id) {
                navigate(`/posts/${newPost.id}`);
            }
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    // Form validation
    const validateForm = () => {
        // This is now imported from MainForm, but we keep a copy here for the submit handler
        const errors = {};
        
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.author.trim()) errors.author = "Author is required";
        if (!formData.content.trim()) errors.content = "Content is required";
        if (!formData.cover.trim()) errors.cover = "Cover image URL is required";
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Page Header */}
            <PageHeader isPreview={isPreview} togglePreview={togglePreview} />
            
            {/* Error Messages */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}
            
            {/* Form or Preview */}
            {isPreview ? (
                <PostPreview 
                    formData={formData} 
                    additionalImages={additionalImages} 
                    navigate={navigate} 
                    togglePreview={togglePreview} 
                />
            ) : (
                <MainForm
                    formData={formData}
                    setFormData={setFormData}
                    additionalImages={additionalImages}
                    setAdditionalImages={setAdditionalImages}
                    activeImageIndex={activeImageIndex}
                    setActiveImageIndex={setActiveImageIndex}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    textareaRef={textareaRef}
                    loading={loading}
                    navigate={navigate}
                    togglePreview={togglePreview}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default CreatePost;