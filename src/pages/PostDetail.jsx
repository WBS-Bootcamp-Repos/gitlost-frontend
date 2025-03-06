import {
    Pen,
    Trash2,
    House,
    ArrowRightFromLine,
    ArrowLeftFromLine,
    Save,
    X
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { usePosts } from "../context/context";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { parseImages, formatImagesForStorage, isValidImageUrl } from "../utils/imageUtils";

// Import the editor components
import MarkdownEditor from "../components/CreatePost/MarkdownEditor";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPost, deletePost, updatePost, posts, loading, error } = usePosts();
    const [post, setPost] = useState(null);
    const [coverImage, setCoverImage] = useState("");
    const [additionalImages, setAdditionalImages] = useState([]);
    
    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: "",
        author: "",
        content: "",
        cover: ""
    });
    const [editAdditionalImages, setEditAdditionalImages] = useState(['', '', '']);
    const [formErrors, setFormErrors] = useState({});
    const textareaRef = useRef(null);
    
    // New state for editing images
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            console.log("Fetching post with ID:", id);
            const fetchedPost = await getPost(id);
            console.log("Fetched Post:", fetchedPost);
            
            if (fetchedPost) {
                setPost(fetchedPost);
                
                // Parse images from the cover field
                const { cover, additionalImages } = parseImages(fetchedPost.cover);
                setCoverImage(cover);
                setAdditionalImages(additionalImages);
                
                // Set up initial edit data
                setEditFormData({
                    title: fetchedPost.title,
                    author: fetchedPost.author,
                    content: fetchedPost.content,
                    cover: cover
                });
                
                setEditAdditionalImages(
                    additionalImages.length > 0 
                    ? [...additionalImages, ...Array(3 - additionalImages.length).fill('')] 
                    : ['', '', '']
                );
            }
        };

        fetchPost();
    }, [id, getPost]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return;

        const success = await deletePost(id);
        if (success) {
            navigate("/");
        } else {
            alert("Failed to delete post.");
        }
    };
    
    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        // Reset form errors when toggling
        setFormErrors({});
    };
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
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
        const newImages = [...editAdditionalImages];
        newImages[index] = value;
        setEditAdditionalImages(newImages);
        
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
        const newImages = [...editAdditionalImages];
        newImages[index] = additionalImages[index] || '';
        setEditAdditionalImages(newImages);
        setActiveImageIndex(null);
    };
    
    // Validate form before submission
    const validateForm = () => {
        const errors = {};
        if (!editFormData.title.trim()) errors.title = "Title is required";
        if (!editFormData.author.trim()) errors.author = "Author is required";
        if (!editFormData.content.trim()) errors.content = "Content is required";
        if (!editFormData.cover.trim()) errors.cover = "Cover image URL is required";
        
        // Validate image URLs format
        if (!isValidImageUrl(editFormData.cover)) {
            errors.cover = "Please enter a valid URL for cover image";
        }
        
        editAdditionalImages.forEach((url, index) => {
            if (url && !isValidImageUrl(url)) {
                errors[`image${index}`] = "Please enter a valid URL for this image";
            }
        });
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            // Combine main cover and additional images for storage
            const combinedImageString = formatImagesForStorage(editFormData.cover, editAdditionalImages);
            
            // Create post with the combined image string
            const postDataToSubmit = {
                ...post,
                title: editFormData.title,
                author: editFormData.author,
                content: editFormData.content,
                cover: combinedImageString
            };
            
            const updatedPost = await updatePost(id, postDataToSubmit);
            if (updatedPost) {
                // Update the local post state
                setPost(updatedPost);
                
                // Update parsed images
                const { cover, additionalImages: newAdditionalImages } = parseImages(updatedPost.cover);
                setCoverImage(cover);
                setAdditionalImages(newAdditionalImages);
                
                // Exit edit mode
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };
    
    // Handle cancel edit
    const handleCancelEdit = () => {
        // Restore original values
        setEditFormData({
            title: post.title,
            author: post.author,
            content: post.content,
            cover: coverImage
        });
        setEditAdditionalImages(
            additionalImages.length > 0 
            ? [...additionalImages, ...Array(3 - additionalImages.length).fill('')] 
            : ['', '', '']
        );
        setFormErrors({});
        setIsEditing(false);
    };

    const index = posts.findIndex((p) => p.id.toString() === id);
    const prevPost = index > 0 ? posts[index - 1] : null;
    const nextPost =
        index !== -1 && index < posts.length - 1 ? posts[index + 1] : null;

    const handlePrev = () => {
        if (prevPost) navigate(`/posts/${prevPost.id}`);
    };

    const handleNext = () => {
        if (nextPost) navigate(`/posts/${nextPost.id}`);
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="detail-container">
            {/* Hero Section */}
            <section
                className="relative w-full bg-cover h-96 bg-center bg-no-repeat flex items-end px-4"
                style={{
                    backgroundImage: `url(${isEditing ? editFormData.cover : (coverImage || post.cover)})`,
                }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content Wrapper */}
                <div className="container mx-auto z-10 text-white py-8">
                    {/* Title - Editable when in edit mode */}
                    {isEditing ? (
                        <div className="mb-4">
                            <input
                                type="text"
                                name="title"
                                value={editFormData.title}
                                onChange={handleChange}
                                className={`w-full px-3 py-3 text-4xl bg-black/50 text-white border rounded-lg focus:outline-none ${
                                    formErrors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.title && <p className="text-red-300 text-sm mt-1">{formErrors.title}</p>}
                        </div>
                    ) : (
                        <h1 className="text-6xl font-heading font-black leading-normal">
                            {post.title}
                        </h1>
                    )}
                    
                    {/* Author & Date - Editable when in edit mode */}
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span>By</span>
                            <input
                                type="text"
                                name="author"
                                value={editFormData.author}
                                onChange={handleChange}
                                className={`px-2 py-1 bg-black/50 text-white border rounded focus:outline-none ${
                                    formErrors.author ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            <span>• {new Date(post.date).toLocaleDateString()}</span>
                            {formErrors.author && <p className="text-red-300 text-sm ml-2">{formErrors.author}</p>}
                        </div>
                    ) : (
                        <p className="text-lg text-white mt-2">
                            By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </section>

            {/* Blogposts Section */}
            <section className="blog-section py-14">
                <div className="container mx-auto bg-white p-10 rounded">
                    {/* Categories, Edit, Delete */}
                    <div className="flex flex-row justify-between text-primary pb-8">
                        <div>Categories placeholder</div>
                        <div className="flex flex-row gap-5">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex items-center gap-1 text-green-600 hover:text-green-700"
                                        title="Save changes"
                                    >
                                        <Save size={20} />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
                                        title="Cancel editing"
                                    >
                                        <X size={20} />
                                        <span>Cancel</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Pen 
                                        className="cursor-pointer hover:text-blue-600" 
                                        onClick={toggleEditMode}
                                        title="Edit post"
                                    />
                                    <Trash2
                                        onClick={handleDelete}
                                        className="cursor-pointer hover:text-red-600"
                                        title="Delete post"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Cover image URL edit when in edit mode */}
                    {isEditing && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <label htmlFor="cover" className="block text-gray-700 text-sm font-bold mb-2">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                id="cover"
                                name="cover"
                                value={editFormData.cover}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                    formErrors.cover ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                                }`}
                            />
                            {formErrors.cover && <p className="text-red-500 text-sm mt-1">{formErrors.cover}</p>}
                        </div>
                    )}
                    
                    {/* Content - Editable when in edit mode */}
                    <div className="blog-content grid md:w-8/12 mx-auto">
                        {isEditing ? (
                            <MarkdownEditor 
                                content={editFormData.content}
                                handleChange={handleChange}
                                formErrors={formErrors}
                                textareaRef={textareaRef}
                                setFormData={setEditFormData}
                            />
                        ) : (
                            <MarkdownRenderer content={post.content} className="max-w-none" />
                        )}
                    </div>

                    {/* Additional Images - Editable when in edit mode */}
                    <div className="pt-8 pb-4">
                        <h3 className="font-bold text-lg mb-4">Additional Images</h3>
                        <div className="flex gap-8 py-4">
                            {isEditing ? (
                                // Editable image inputs
                                editAdditionalImages.map((imageUrl, idx) => (
                                    <div 
                                        key={idx} 
                                        className="relative w-1/3 h-72 bg-gray-200 rounded-lg overflow-hidden"
                                    >
                                        {activeImageIndex === idx ? (
                                            <div className="absolute inset-0 bg-white p-4 flex flex-col">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Image URL:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={imageUrl}
                                                    onChange={(e) => handleAdditionalImageChange(idx, e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                                        formErrors[`image${idx}`] ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                                                    }`}
                                                    placeholder="https://example.com/image.jpg"
                                                    autoFocus
                                                />
                                                {formErrors[`image${idx}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors[`image${idx}`]}</p>
                                                )}
                                                
                                                <div className="flex gap-2 mt-auto">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageInputCancel(idx)}
                                                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleImageInputConfirm}
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
                                                    onClick={() => handleImageButtonClick(idx)}
                                                >
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={`Additional image ${idx + 1}`}
                                                        className="w-full h-full object-cover" 
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Pen size={32} className="text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageButtonClick(idx)}
                                                    className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-300 transition-colors"
                                                >
                                                    <Pen size={32} />
                                                    <span className="mt-2">Edit Image {idx + 1}</span>
                                                </button>
                                            )
                                        )}
                                    </div>
                                ))
                            ) : (
                                // Display mode for additional images
                                additionalImages.length > 0 ? (
                                    <>
                                        {additionalImages.map((imageUrl, index) => (
                                            <div 
                                                key={index} 
                                                className="w-1/3 h-72 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden"
                                            >
                                                <img 
                                                    src={imageUrl} 
                                                    alt={`Additional image ${index + 1}`}
                                                    className="w-full h-full object-cover" 
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://via.placeholder.com/400x400?text=Image+not+available";
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        
                                        {/* Add placeholder divs if we have fewer than 3 images */}
                                        {Array(3 - additionalImages.length).fill().map((_, index) => (
                                            <div 
                                                key={`placeholder-${index}`} 
                                                className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg"
                                            >
                                                <span className="text-gray-500">No image</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    // If no additional images, show placeholders
                                    <>
                                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                                            <span className="text-gray-500">No additional images</span>
                                        </div>
                                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                                            <span className="text-gray-500">No additional images</span>
                                        </div>
                                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                                            <span className="text-gray-500">No additional images</span>
                                        </div>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                    
                    {/* Navigation */}
                    <div className="flex flex-row justify-between pt-8">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            <House className="text-primary transition-all duration-300 hover:translate-x-1 hover:text-secondary" />
                        </Link>
                        <div className="flex flex-row gap-10">
                            {prevPost && (
                                <button
                                    onClick={handlePrev}
                                    className="flex items-center gap-2 text-primary transition-all duration-300 hover:-translate-x-1 hover:text-secondary">
                                    <ArrowLeftFromLine />
                                    <p>Previous: {prevPost.title}</p>
                                </button>
                            )}
                            {nextPost && (
                                <button
                                    onClick={handleNext}
                                    className="flex flex-row gap-5 text-primary transition-all duration-300 hover:translate-x-1 hover:text-secondary">
                                    <p>Next: {nextPost.title}</p>
                                    <ArrowRightFromLine />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostDetail;