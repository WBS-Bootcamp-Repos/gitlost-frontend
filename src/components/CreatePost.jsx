import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "../context/context";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { parseImages, formatImagesForStorage, isValidImageUrl } from "../utils/imageUtils";
import { 
    House, 
    Eye, 
    PenLine, 
    ArrowRight, 
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
    Image as ImageIcon, 
    Plus, 
    X
} from "lucide-react";

// Import markdown styles
import "../styles/markdown-styles.css";

// Component for the page header
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

// Component for the cover image input and preview
const CoverImageInput = ({ cover, handleChange, formErrors }) => (
    <div>
        <label htmlFor="cover" className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image URL * <span className="text-gray-500 font-normal">(Hero image at top of post)</span>
        </label>
        <input
            type="text"
            id="cover"
            name="cover"
            value={cover}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formErrors.cover ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="https://example.com/image.jpg"
        />
        {formErrors.cover && <p className="text-red-500 text-sm mt-1">{formErrors.cover}</p>}
        
        <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Cover Image Preview:</p>
            <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                    src={cover || "https://via.placeholder.com/640x360?text=Add+a+cover+image"} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                    }}
                />
            </div>
        </div>
    </div>
);

// Component for the text editor toolbar
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

// Component for a single additional image input
const AdditionalImageButton = ({ index, imageUrl, activeIndex, formErrors, onButtonClick, onInputChange, onConfirm, onCancel }) => (
    <div className="relative w-1/3 h-72 bg-gray-200 rounded-lg overflow-hidden">
        {activeIndex === index ? (
            <div className="absolute inset-0 bg-white p-4 flex flex-col">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL:
                </label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => onInputChange(index, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors[`image${index}`] ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                    placeholder="https://example.com/image.jpg"
                    autoFocus
                />
                {formErrors[`image${index}`] && (
                    <p className="text-red-500 text-sm mt-1">{formErrors[`image${index}`]}</p>
                )}
                
                <div className="flex gap-2 mt-auto">
                    <button
                        type="button"
                        onClick={() => onCancel(index)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        ) : (
            imageUrl ? (
                <div 
                    className="w-full h-full cursor-pointer" 
                    onClick={() => onButtonClick(index)}
                >
                    <img 
                        src={imageUrl} 
                        alt={`Additional image ${index + 1}`}
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
                        }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <PenLine size={32} className="text-white" />
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => onButtonClick(index)}
                    className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-300 transition-colors"
                >
                    <Plus size={32} />
                    <span className="mt-2">Add Image {index + 1}</span>
                </button>
            )
        )}
    </div>
);

// Component for the preview mode
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
                    {formData.content ? (
                        <MarkdownRenderer content={formData.content} className="max-w-none" />
                    ) : (
                        <p className="text-gray-400 italic">Your content will appear here...</p>
                    )}
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

// Main CreatePost component
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

    const handleImageButtonClick = (index) => {
        setActiveImageIndex(index);
    };

    const handleImageInputConfirm = () => {
        setActiveImageIndex(null);
    };

    const handleImageInputCancel = (index) => {
        const newImages = [...additionalImages];
        newImages[index] = '';
        setAdditionalImages(newImages);
        setActiveImageIndex(null);
    };
    
    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.author.trim()) errors.author = "Author is required";
        if (!formData.content.trim()) errors.content = "Content is required";
        if (!formData.cover.trim()) errors.cover = "Cover image URL is required";
        
        // Validate image URLs format
        if (!isValidImageUrl(formData.cover)) {
            errors.cover = "Please enter a valid URL for cover image";
        }
        
        additionalImages.forEach((url, index) => {
            if (url && !isValidImageUrl(url)) {
                errors[`image${index}`] = "Please enter a valid URL for this image";
            }
        });
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
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

    // Function to toggle between preview and edit modes
    const togglePreview = () => {
        setIsPreview(!isPreview);
    };

    // Text formatting helpers
    const insertFormat = (formatType) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
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
                        formData.content.substring(0, start) + 
                        formattedText + 
                        formData.content.substring(end);
                    
                    setFormData({
                        ...formData,
                        content: newText
                    });
                    
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
                        formData.content.substring(0, start) + 
                        formattedText + 
                        formData.content.substring(end);
                    
                    setFormData({
                        ...formData,
                        content: newText
                    });
                    
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
                        formData.content.substring(0, start) + 
                        formattedText + 
                        formData.content.substring(end);
                    
                    setFormData({
                        ...formData,
                        content: newText
                    });
                    
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
            formData.content.substring(0, start) + 
            prefix + 
            selectedText + 
            suffix + 
            formData.content.substring(end);
        
        setFormData({
            ...formData,
            content: newText
        });
        
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

    // Render edit form
    const renderEditForm = () => (
        <form onSubmit={handleSubmit} className="edit-form space-y-6">
            {/* Main Form Inputs */}
            <div className="grid grid-cols-1 gap-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 ${
                            formErrors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                        placeholder="Enter an engaging title"
                    />
                    {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>
                
                {/* Author */}
                <div>
                    <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
                        Author *
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            formErrors.author ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                        }`}
                        placeholder="Your name"
                    />
                    {formErrors.author && <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>}
                </div>
                
                {/* Cover Image */}
                <CoverImageInput 
                    cover={formData.cover}
                    handleChange={handleChange}
                    formErrors={formErrors}
                />
            </div>
            
            {/* Custom Markdown Editor with Toolbar */}
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
                    value={formData.content}
                    onChange={handleChange}
                    rows="20"
                    className={`w-full px-4 py-3 border border-t-0 rounded-b-lg font-mono text-base focus:outline-none focus:ring-2 ${
                        formErrors.content ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                    placeholder="Write your blog post content here..."
                ></textarea>
                {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
            </div>
            
            {/* Additional Images - Big Buttons */}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Additional Images <span className="text-gray-500 font-normal">(Click to add)</span>
                </label>
                
                <div className="flex gap-8 py-4">
                    {Array(3).fill(null).map((_, index) => (
                        <AdditionalImageButton
                            key={index}
                            index={index}
                            imageUrl={additionalImages[index]}
                            activeIndex={activeImageIndex}
                            formErrors={formErrors}
                            onButtonClick={handleImageButtonClick}
                            onInputChange={handleAdditionalImageChange}
                            onConfirm={handleImageInputConfirm}
                            onCancel={handleImageInputCancel}
                        />
                    ))}
                </div>
            </div>
            
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
                renderEditForm()
            )}
        </div>
    );
};

export default CreatePost;