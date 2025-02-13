import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import blogApi from "../api/blogApi"; 

const ManageBlog = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const allBlogs = await blogApi.getPosts();
          console.log("Fetched blogs:", allBlogs);  // Debugging
          
          if (!Array.isArray(allBlogs)) {
            throw new Error("Invalid blog data format.");
          }

          const userBlogs = allBlogs.filter(blog => {
            console.log("Checking blog authorId:", blog.authorId, "against user UID:", user.uid);
            return blog.authorId === user.uid;  // Ensure blog has an ID
          });

          console.log("User blogs after filtering:", userBlogs);  // Log filtered blogs

          setBlogs(userBlogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!blogs.length) return <p>You have not written any blogs yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Blog Posts</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id} className="p-4 bg-white shadow-md rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            <button
              className="text-blue-500 mt-4"
              onClick={() => navigate(`${blog.id}`)}  // Ensure this matches your route
            >
              Edit / Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlog;