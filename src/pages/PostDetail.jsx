import {
    Pen,
    Trash2,
    House,
    ArrowRightFromLine,
    ArrowLeftFromLine,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { usePosts } from "../context/context";
import ReactMarkdown from "react-markdown";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPost, deletePost, posts, loading, error } = usePosts();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            console.log("Fetching post with ID:", id);
            const fetchedPost = await getPost(id);
            console.log("Fetched Post:", fetchedPost);
            if (fetchedPost) setPost(fetchedPost);
        };

        fetchPost();
    }, [id]);

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
                    backgroundImage: `url(${post.cover})`,
                }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content Wrapper */}
                <div className="container mx-auto z-10 text-white py-8">
                    {/* Titel */}
                    <h1 className="text-6xl font-heading font-black leading-normal">
                        {post.title}
                    </h1>
                    {/* Autor & Datum */}
                    <p className="text-lg text-white mt-2">
                        By {post.author} •{" "}
                        {new Date(post.date).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Blogposts Section */}
            <section className="blog-section py-14 ">
                <div className="container mx-auto bg-white p-10 rounded">
                    {/* Categories, Edit, Delete */}
                    <div className="flex flex-row justify-between  text-primary  pb-8">
                        <div>Catergories placeholder</div>
                        <div className="flex flex-row gap-5">
                            <Pen />
                            <Trash2
                                onClick={handleDelete}
                                className="cursor-pointer hover:text-red-600"
                            />
                        </div>
                    </div>
                    {/* Content */}
                    <div className="blog-content grid md:w-8/12 mx-auto ">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                    {/* Placeholder for more images if needed */}
                    <div className="flex gap-8 py-4">
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 1
                        </div>
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 2
                        </div>
                        <div className="w-1/3 h-72 bg-gray-300 flex items-center justify-center rounded-lg">
                            Image 3
                        </div>
                    </div>
                    {/* Navigation */}
                    <div className="flex flex-row justify-between  pt-8">
                        <Link
                            to="/"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }>
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
