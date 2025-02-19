import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp,} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import wallpaper from '../assets/post-wallpaper.jpg'

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [publishOption, setPublishOption] = useState('forEveryone');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !genre.trim()) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!user) {
      toast.error("You are not authorized to post.");
      return;
    }

    setLoading(true);
    try {
       await addDoc(collection(db, "blog"), {
        title,
        content,
        genre,
        author: user.displayName || "Admin",
        email: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        publishOption,
      });

      toast.success("Post created successfully!");
      setTitle('');
      setContent('');
      setGenre('');
      setPublishOption('forEveryone');

      if (publishOption === 'forEveryone') {
        navigate('/blog');
      } else {
        navigate('/personal');
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post: " + error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Create Blog Post</h1>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              rows="8"
            />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled selected>Select Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Casual">Casual</option>
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

            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        ) : (
          <p className="text-red-500 text-center mt-4">Only the admin can post blogs.</p>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;