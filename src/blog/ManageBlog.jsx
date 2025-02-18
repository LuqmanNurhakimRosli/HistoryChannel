import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPosts"; // Import the custom hook
import "../App.css";

const ManageBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { posts, loading, error } = useBlogPosts(); // Use the custom hook

  // Filter posts to show only the user's blogs
  const userBlogs = user ? posts.filter(blog => blog.authorId === user.uid) : [];

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!userBlogs.length) return <p className="text-center text-gray-500">You have not written any blogs yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Blog Posts</h1>
      <ul className="flex flex-wrap justify-center">
        {userBlogs.map(blog => (
          <li key={blog.id} className="w-1/2 p-4 mb-4">
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer h-full"
              onClick={() => navigate(`${blog.id}`)} // Navigate on box click
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlog;
