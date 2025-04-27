
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

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete post');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center mt-8 text-teal-600">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-2xl shadow-xl border border-teal-100">
                <figure>
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-t-2xl"
                    />
                </figure>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-teal-700 mb-4">{post.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition duration-300"
                            onClick={() => navigate(`/posts/${postId}/edit`)}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300"
                            onClick={handleDelete}
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