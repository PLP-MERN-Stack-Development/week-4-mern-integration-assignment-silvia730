import { useState } from 'react';

export default function CommentForm({ onSubmit, loading }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      await onSubmit(content);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Comment'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
} 