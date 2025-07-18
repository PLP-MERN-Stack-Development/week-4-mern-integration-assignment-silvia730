# MERN Blog Application

## Project Overview
A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js (MERN). Features user authentication, post creation with image upload, categories, comments, and pagination.

## Features
- User registration and login (JWT authentication)
- Create, edit, delete blog posts (with featured images)
- View all posts, single post, and post details
- Categories for posts
- Add and view comments on posts
- Pagination for post list
- Responsive UI

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Atlas or local)

### 1. Clone the repository
```
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Server Setup
```
cd server
cp .env.example .env # Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

### 3. Client Setup
```
cd client
cp .env.example .env # Edit if needed
npm install
npm run dev
```

### 4. Access the App
- Client: http://localhost:5173
- API: http://localhost:5000/api

## API Documentation

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Posts
- `GET /api/posts` — Get all posts (supports `page` and `limit` query params)
- `GET /api/posts/:id` — Get a single post
- `POST /api/posts` — Create a post (auth required, supports image upload)
- `PUT /api/posts/:id` — Update a post (auth required)
- `DELETE /api/posts/:id` — Delete a post (auth required)

### Categories
- `GET /api/categories` — Get all categories
- `POST /api/categories` — Create a category (auth required)

### Comments
- `GET /api/posts/:id/comments` — Get comments for a post
- `POST /api/posts/:id/comments` — Add a comment (auth required)

## Environment Variables

### Server `.env.example`
```
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### Client `.env.example`
```
VITE_API_URL=http://localhost:5000/api
```

## Screenshots
_Add screenshots of your app here_

## License
MIT

---

**Good luck and happy coding!** 