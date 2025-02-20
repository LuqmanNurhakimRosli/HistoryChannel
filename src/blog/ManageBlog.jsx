import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPosts";
import "../App.css";

const ManageBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { posts, loading, error } = useBlogPosts();

  // Filter user-specific blog posts
  const userBlogs = user ? posts.filter(blog => blog.authorId === user.uid) : [];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!userBlogs.length)
    return (
      <p className="text-center text-gray-500 text-lg mt-6">
        You have not written any blogs yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Manage Your Blog Posts</h1>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {userBlogs.map(blog => (
          <li key={blog.id} className="cursor-pointer" onClick={() => navigate(`${blog.id}`)}>
            <div className="bg-white shadow-md rounded-lg p-4 h-full transition transform hover:scale-105 hover:shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlog;
