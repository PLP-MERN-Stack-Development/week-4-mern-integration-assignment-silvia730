import { useEffect, useState } from 'react';
import { postService } from '../services/api.js';
import PostList from '../components/PostList.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    postService.getAllPosts(page, 5)
      .then(data => {
        setPosts(data.posts);
        setPages(data.pages);
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (error) return <div className="error" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{error}</div>;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', margin: 0, padding: 0 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: '100%', maxWidth: 700, boxSizing: 'border-box' }}>
        <PostList posts={posts} />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              style={{
                padding: '0.5rem 1rem',
                background: page === i + 1 ? '#457b9d' : '#eee',
                color: page === i + 1 ? '#fff' : '#222',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: page === i + 1 ? 'bold' : 'normal',
              }}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
