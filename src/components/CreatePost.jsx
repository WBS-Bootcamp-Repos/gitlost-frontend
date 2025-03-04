
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
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cover URL</span>
                    </label>
                    <input
                        type="text"
                        value={formData.cover}
                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="textarea textarea-bordered h-24"
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;