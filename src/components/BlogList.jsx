import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
    const [posts, setPosts] = useState([]); // Gespeicherte Posts
    const [loading, setLoading] = useState(true); // Ladeanzeige
    const [error, setError] = useState(null); // Fehler-Handling

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/posts");
                if (!response.ok)
                    throw new Error("Fehler beim Laden der Posts");

                const data = await response.json();
                setPosts(data); // Alle Posts auf einmal setzen
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Leeres Array → wird nur einmal bei Komponentenmounth ausgeführt

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
