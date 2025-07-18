import { useState } from 'react';

export default function PostForm({ onSubmit, initialValues = {}, categories = [] }) {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    content: initialValues.content || '',
    category: initialValues.category || '',
    featuredImage: null,
  });
  const [preview, setPreview] = useState(initialValues.featuredImage || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage') {
      setForm({ ...form, featuredImage: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('category', form.category);
      if (form.featuredImage) {
        formData.append('featuredImage', form.featuredImage);
      }
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: '#fff',
    color: '#111',
    border: '1px solid #111',
    borderRadius: 6,
    padding: '0.75rem',
    marginBottom: 12,
    width: '100%'
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="file"
        name="featuredImage"
        accept="image/*"
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
        rows={6}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: 200, margin: '1rem 0' }} />
      )}
      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', background: '#1976d2', color: '#111', border: 'none', padding: '0.75rem', borderRadius: 6, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: 8 }}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
