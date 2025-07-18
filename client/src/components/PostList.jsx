import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) return <div>No posts found.</div>;
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className="post-item">
          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} style={{ maxWidth: 200, maxHeight: 120 }} />
          )}
          <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
          <div>{post.category?.name}</div>
        </div>
      ))}
    </div>
  );
}
