// import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { usePosts } from "../context/context";

const BlogList = () => {
    const { posts, loading, error } = usePosts();

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto pb-10">
            {posts.length > 0 ? (
                posts.map((post) => <BlogCard key={post.id} {...post} />)
            ) : (
                <p className="text-center text-gray-500">No posts available.</p>
            )}
        </div>
    );
};

export default BlogList;
