
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CreatePost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        cover: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.cover) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to create post');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-teal-700 mb-6">Create New Post</h1>
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
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;