import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api.js';
import CommentList from '../components/CommentList.jsx';
import CommentForm from '../components/CommentForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    postService.getPost(id)
      .then(setPost)
      .catch(() => setError('Failed to load post'));
    api.get(`/posts/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async (content) => {
    setCommentLoading(true);
    try {
      const res = await api.post(`/posts/${id}/comments`, { content });
      setComments(prev => [res.data, ...prev]);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="post-details auth-container">
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} style={{ maxWidth: 400, marginBottom: 16 }} />
      )}
      <h2>{post.title}</h2>
      <div><strong>Category:</strong> {post.category?.name}</div>
      <div style={{ margin: '1rem 0' }}>{post.content}</div>
      <hr />
      <h3>Comments</h3>
      {isAuthenticated && <CommentForm onSubmit={handleAddComment} loading={commentLoading} />}
      <CommentList comments={comments} />
    </div>
  );
}
