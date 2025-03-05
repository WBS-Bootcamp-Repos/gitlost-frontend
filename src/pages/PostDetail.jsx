import { Pen, Trash2, House, ArrowRightFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePosts } from "../context/context";
import ReactMarkdown from "react-markdown";

const PostDetail = () => {
    const { id } = useParams();
    console.log("Fetched ID from URL:", id);
    const { getPost, loading, error } = usePosts();
    const [post, setPost] = useState(null);

    useEffect(() => {
        console.log("Running useEffect. ID:", id);
        if (!id) return;

        const fetchPost = async () => {
            console.log("Fetching post with ID:", id);
            const fetchedPost = await getPost(id);
            console.log("Fetched Post:", fetchedPost);
            if (fetchedPost) setPost(fetchedPost);
        };

        fetchPost();
    }, [id]);

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
            <section className="blog-section py-14 bg-white">
                <div className="container mx-auto">
                    {/* Categories, Edit, Delete */}
                    <div className="flex flex-row justify-between  text-primary  pb-8">
                        <div>Catergories placeholder</div>
                        <div className="flex flex-row gap-5">
                            <Pen />
                            <Trash2 />
                        </div>
                    </div>
                    {/* Content */}
                    <div className="blog-content grid md:w-8/12 mx-auto">
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
                        <House className="text-primary" />
                        <div className="flex flex-row gap-5 text-primary">
                            <p>
                                Next: Puerto Rico – A Love Letter to La Isla del
                                Encanto
                            </p>
                            <ArrowRightFromLine />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostDetail;
