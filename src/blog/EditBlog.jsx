import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogApi from "../api/blogApi";

const EditBlog = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await blogApi.getPostById(id);
        
        if (!blogData) {
          toast.error("Blog not found.");
          navigate("/dashboard/manage-blog");
          return;
        }

        if (blogData.authorId !== user.uid && user.email !== "nadi@yes.com") {
          toast.error("You are not authorized to edit this blog.");
          navigate("/dashboard/manage-blog");
          return;
        }

        setBlog(blogData);
        setEditTitle(blogData.title);
        setEditContent(blogData.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      await blogApi.updatePost(id, editTitle, editContent);
      toast.success("Blog updated successfully!");
      navigate("/dashboard/manage-blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogApi.deletePost(id);
        toast.success("Blog deleted successfully!");
        navigate("/dashboard/manage-blog");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Edit Blog Post</h1>
        
        {blog && (
          <div className="space-y-4">
            {/* Title Input */}
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Blog Title"
            />

            {/* Content Textarea */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="6"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Write your blog content here..."
            />

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="w-1/2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                className="w-1/2 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200"
                onClick={handleDelete}
              >
                Delete Blog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
