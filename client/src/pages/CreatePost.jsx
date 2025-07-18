import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService, categoryService } from '../services/api.js';
import PostForm from '../components/PostForm.jsx';

export default function CreatePost() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (formData) => {
    setError('');
    try {
      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', margin: 0, padding: 0 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: '100%', maxWidth: 500, boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#222' }}>Create Post</h2>
        <PostForm onSubmit={handleSubmit} categories={categories} />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}