import React from 'react';
import { Plus, PenLine } from "lucide-react";

/**
 * Component for handling additional images with add/edit functionality
 */
const AdditionalImagesSection = ({
    additionalImages,
    activeImageIndex,
    formErrors,
    handleImageButtonClick,
    handleAdditionalImageChange,
    handleImageInputConfirm,
    handleImageInputCancel
}) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Additional Images <span className="text-gray-500 font-normal">(Click to add)</span>
            </label>
            
            <div className="flex gap-8 py-4">
                {Array(3).fill(null).map((_, index) => (
                    <div key={index} className="relative w-1/3 h-72 bg-gray-200 rounded-lg overflow-hidden">
                        {activeImageIndex === index ? (
                            <div className="absolute inset-0 bg-white p-4 flex flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image URL:
                                </label>
                                <input
                                    type="text"
                                    value={additionalImages[index]}
                                    onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
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
                                        onClick={() => handleImageInputCancel(index)}
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
                            additionalImages[index] ? (
                                <div 
                                    className="w-full h-full cursor-pointer" 
                                    onClick={() => handleImageButtonClick(index)}
                                >
                                    <img 
                                        src={additionalImages[index]} 
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
                                    onClick={() => handleImageButtonClick(index)}
                                    className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-300 transition-colors"
                                >
                                    <Plus size={32} />
                                    <span className="mt-2">Add Image {index + 1}</span>
                                </button>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdditionalImagesSection;