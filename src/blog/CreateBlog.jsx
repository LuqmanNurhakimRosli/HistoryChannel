import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [publishOption, setPublishOption] = useState('forEveryone'); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.email !== adminEmail) {
      toast.error("You are not authorized to post.");
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "blog"), {
        title,
        content,
        genre,
        author: user.displayName || "Admin",
        email: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });

      await updateAuthorId(docRef.id, user.uid);
      toast.success("Post created successfully!");
      setTitle('');
      setContent('');
      setGenre('');

      // Navigate based on publish option
      if (publishOption === 'forEveryone') {
        navigate('/blog');
      } else {
        navigate('/private');
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAuthorId = async (blogId, newAuthorId) => {
    const blogRef = doc(db, "blog", blogId);
    await updateDoc(blogRef, { authorId: newAuthorId });
  };

  return (
    <div >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Create Blog Post</h1>

        {user && user.email === adminEmail ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="What's happening?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
              rows="4"
            />

            <div className="flex flex-wrap items-center justify-between">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              >
                <option value="Casual">Casual</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
                
              </select>

              <div className="flex space-x-4 mt-2 md:mt-0">
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
