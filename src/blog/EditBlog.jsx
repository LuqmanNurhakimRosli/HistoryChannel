import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import blogApi from '../api/blogApi';

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState(""); // Use 'title' for consistency
  const [content, setContent] = useState(""); // Use 'content' for consistency
  const [genre, setGenre] = useState("");
  const [publishOption, setPublishOption] = useState("forEveryone");
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
        setTitle(blogData.title); // Set 'title' state
        setContent(blogData.content); // Set 'content' state
        setGenre(blogData.genre);
        setPublishOption(blogData.isPublic ? "forEveryone" : "forMe");
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
      await blogApi.updatePost(id, title, content, genre, publishOption === 'forEveryone'); // Use 'title' and 'content'
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
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Edit Blog Post</h1>

        {blog && (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={title} // Use 'title'
              onChange={(e) => setTitle(e.target.value)} // Use 'setTitle'
              placeholder="Blog Title"
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="8"
              value={content} // Use 'content'
              onChange={(e) => setContent(e.target.value)} // Use 'setContent'
              placeholder="Write your blog content here..."
            />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled selected>Select Genre</option>
              <option value="Casual">Casual</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Scary">Scary</option>
            </select>

            <div className="flex space-x-4 mt-2 md:mt-0 items-center">
              <label>Publish:</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="forEveryone"
                  checked={publishOption === 'forEveryone'}
                  onChange={(e) => setPublishOption(e.target.value)}
                  className="hidden"
                />
                <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${publishOption === 'forEveryone' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  Public
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="forMe"
                  checked={publishOption === 'forMe'}
                  onChange={(e) => setPublishOption(e.target.value)}
                  className="hidden"
                />
                <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${publishOption === 'forMe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  Private
                </span>
              </label>
            </div>


            <div className="flex justify-between px-4 gap-10 mt-4">
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