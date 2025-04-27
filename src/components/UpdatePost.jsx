
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const UpdatePost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        cover: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to update post');
            navigate(`/posts/${postId}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center mt-8 text-teal-600">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-teal-700 mb-6">Update Post</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 border border-teal-100 space-y-6">
                <div>
                    <label className="block text-teal-600 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
                <div>
                    <label className="block text-teal-600 font-medium mb-2">
                        Cover URL
                    </label>
                    <input
                        type="text"
                        value={formData.cover}
                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                        className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
                <div>
                    <label className="block text-teal-600 font-medium mb-2">
                        Content
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-2 border border-teal-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition duration-300"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;