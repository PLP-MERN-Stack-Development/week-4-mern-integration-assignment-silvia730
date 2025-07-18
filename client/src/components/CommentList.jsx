export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <div>No comments yet.</div>;
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f1f1f1', borderRadius: 4 }}>
          <div style={{ fontWeight: 'bold' }}>{comment.author?.username || 'Anonymous'}</div>
          <div>{comment.content}</div>
          <div style={{ fontSize: '0.8em', color: '#888' }}>{new Date(comment.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
} 