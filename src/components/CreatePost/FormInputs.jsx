import React from 'react';

/**
 * Component for the main form inputs (title, author, cover image)
 */
const FormInputs = ({ formData, handleChange, formErrors }) => {
    return (
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
            <div>
                <label htmlFor="cover" className="block text-gray-700 text-sm font-bold mb-2">
                    Cover Image URL * <span className="text-gray-500 font-normal">(Hero image at top of post)</span>
                </label>
                <input
                    type="text"
                    id="cover"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.cover ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                    placeholder="https://example.com/image.jpg"
                />
                {formErrors.cover && <p className="text-red-500 text-sm mt-1">{formErrors.cover}</p>}
                
                {/* Cover Image Preview */}
                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Cover Image Preview:</p>
                    <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                            src={formData.cover || "https://via.placeholder.com/640x360?text=Add+a+cover+image"} 
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
        </div>
    );
};

export default FormInputs;