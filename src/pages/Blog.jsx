import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../blog/blogApi"; // Mock API

function Blog() {
const [blog, setBlog] = useState([])

useEffect(() => {
  const fetchBlogs = async () => {
    const data = await blogApi.getPosts();
    setBlog(data);
  }
  fetchBlogs();
},[])

return (
  <section className="py-16 bg-gray-50">
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
                  <span>{post.date}</span>
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
