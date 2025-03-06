import React from 'react';
import { House, Eye, ArrowRight } from "lucide-react";
import FormInputs from './FormInputs';
import MarkdownEditor from './MarkdownEditor';
import AdditionalImagesSection from './AdditionalImagesSection';
import { isValidImageUrl } from '../../utils/imageUtils';

/**
 * Main form component for creating a post
 */
const MainForm = ({
    formData,
    setFormData,
    additionalImages,
    setAdditionalImages,
    activeImageIndex,
    setActiveImageIndex,
    formErrors,
    setFormErrors,
    textareaRef,
    loading,
    navigate,
    togglePreview,
    handleSubmit
}) => {
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };
    
    // Handle additional image changes
    const handleAdditionalImageChange = (index, value) => {
        const newImages = [...additionalImages];
        newImages[index] = value;
        setAdditionalImages(newImages);
        
        // Clear any image-related errors
        if (formErrors[`image${index}`]) {
            setFormErrors({
                ...formErrors,
                [`image${index}`]: ""
            });
        }
    };

    // Handle image button click
    const handleImageButtonClick = (index) => {
        setActiveImageIndex(index);
    };

    // Handle image input confirm
    const handleImageInputConfirm = () => {
        setActiveImageIndex(null);
    };

    // Handle image input cancel
    const handleImageInputCancel = (index) => {
        const newImages = [...additionalImages];
        newImages[index] = '';
        setAdditionalImages(newImages);
        setActiveImageIndex(null);
    };
    
    // Form validation - made accessible to the form elements
    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'title':
                if (!value.trim()) error = "Title is required";
                break;
            case 'author':
                if (!value.trim()) error = "Author is required";
                break;
            case 'content':
                if (!value.trim()) error = "Content is required";
                break;
            case 'cover':
                if (!value.trim()) {
                    error = "Cover image URL is required";
                } else if (!isValidImageUrl(value)) {
                    error = "Please enter a valid URL";
                }
                break;
            default:
                if (name.startsWith('image') && value && !isValidImageUrl(value)) {
                    error = "Please enter a valid URL";
                }
        }
        
        return error;
    };
    
    return (
        <form onSubmit={handleSubmit} className="edit-form space-y-6">
            {/* Main Form Inputs */}
            <FormInputs 
                formData={formData}
                handleChange={handleChange}
                formErrors={formErrors}
                validateField={validateField}
            />
            
            {/* Custom Markdown Editor with Toolbar */}
            <MarkdownEditor 
                content={formData.content}
                handleChange={handleChange}
                formErrors={formErrors}
                textareaRef={textareaRef}
                setFormData={setFormData}
            />
            
            {/* Additional Images Section */}
            <AdditionalImagesSection 
                additionalImages={additionalImages}
                activeImageIndex={activeImageIndex}
                formErrors={formErrors}
                handleImageButtonClick={handleImageButtonClick}
                handleAdditionalImageChange={handleAdditionalImageChange}
                handleImageInputConfirm={handleImageInputConfirm}
                handleImageInputCancel={handleImageInputCancel}
            />
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t mt-4">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                    <House size={20} /> Back to Home
                </button>
                
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={togglePreview}
                        className="px-4 py-2 flex items-center gap-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        <Eye size={18} /> Preview
                    </button>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Creating..." : "Publish Post"} {!loading && <ArrowRight size={18} />}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default MainForm;