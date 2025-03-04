
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="card bg-base-100 shadow-xl">
                <figure>
                    <img src={post.cover} alt={post.title} className="w-full h-64 object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="card-actions justify-end mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/posts/${postId}/edit`)}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => navigate(`/posts/${postId}/delete`)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;