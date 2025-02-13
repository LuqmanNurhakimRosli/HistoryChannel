import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/blogApi";
import { formatDistanceToNow, parseISO } from "date-fns"; // Import date functions

function Blog() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getPosts();
      setBlog(data);
    };
    fetchBlogs();
  }, []);

  // Function to format the date like YouTube
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"; // Handle missing dates
    try {
      // Check if the input is a Date object
      if (dateString instanceof Date) {
        return formatDistanceToNow(dateString, { addSuffix: true }); // Format as "x time ago"
      }
      
      // If it's an ISO string, parse it
      const date = parseISO(dateString); // Parse ISO date
      return formatDistanceToNow(date, { addSuffix: true }); // Format as "x time ago"
    } catch (error) {
      console.error("Error parsing date:", error); // Log the error
      return "Unknown"; // Return "Unknown" if parsing fails
    }
  };

  return (
    <section className="w-full py-8 bg-gray-50 flex-grow">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blog.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/blog/${post.id}`} className="block p-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{post.author}</span> |{" "}
                    <span>{formatDate(post.createdAt)}</span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;