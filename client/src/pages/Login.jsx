import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', margin: 0, padding: 0 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: '100%', maxWidth: 400, boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#222' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 16, padding: '0.75rem', border: '1px solid #ccc', borderRadius: 6, background: '#fff', color: '#222' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 16, padding: '0.75rem', border: '1px solid #ccc', borderRadius: 6, background: '#fff', color: '#222' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: 6, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
} 