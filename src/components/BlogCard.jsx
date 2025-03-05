import { ArrowRightFromLine } from "lucide-react";
import { Link } from "react-router";

const BlogCard = ({ title, cover, content, categories, author, date, id }) => {
    return (
        <div className="w-full border-b border-dark py-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 md:w-10/12 mx-auto gap-6 items-center">
                <div className="md:col-span-4">
                    <img
                        src={
                            cover?.data
                                ? String.fromCharCode(...cover.data)
                                : "fallback-image.jpg"
                        }
                        alt={title}
                        className="w-full h-80 object-cover rounded-lg"
                    />
                </div>

                {/* Content */}
                <div className="md:col-span-8">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {categories?.map((cat, id) => (
                            <span
                                key={id}
                                className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-heading font-black text-dark pb-4">
                        {title}
                    </h3>

                    {/* Author + Date */}
                    <p className="text-sm text-gray-500">
                        By {author}, {new Date(date).toLocaleDateString()}
                    </p>

                    {/* Content preview */}
                    <p className="text-dark text-base leading-relaxed py-6">
                        {content.length > 500
                            ? content.slice(0, content.lastIndexOf(" ", 500)) +
                              "..."
                            : content}
                    </p>

                    {/* Continue Reading Button */}
                    <Link
                        to={`/posts/${id}`}
                        className="mt-4 flex items-center text-primary transition-all duration-300 hover:translate-x-1 hover:text-secondary">
                        <span className="group-hover:underline">
                            Continue reading
                        </span>
                        <ArrowRightFromLine className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
