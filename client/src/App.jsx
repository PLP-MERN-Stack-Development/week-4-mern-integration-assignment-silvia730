import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostDetails from './pages/PostDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <span style={{ marginLeft: 8 }}>Welcome, {user.username}</span>
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
          <Link to="/create" style={{ marginLeft: 8 }}>Create Post</Link>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: 8 }}>Login</Link>
          <Link to="/register" style={{ marginLeft: 8 }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
