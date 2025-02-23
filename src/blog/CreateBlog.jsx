import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import wallpaper from '../assets/post-wallpaper.jpg';
import defaultHeader from '../assets/header-blog/defaultHeader.jpg';
import casual from '../assets/header-blog/casual.jpg';
import oldPaper from '../assets/header-blog/old-paper.jpg';
import { motion } from 'framer-motion';

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [publishOption, setPublishOption] = useState('forEveryone');
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(defaultHeader);
  const navigate = useNavigate();

  const headers = {
    'Casual': casual,
    'Old Paper': oldPaper,
    'Default': defaultHeader
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !genre.trim()) {
      toast.error('Please fill all fields.');
      return;
    }
    if (!user) {
      toast.error('Unauthorized to post.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'blog'), {
        title,
        content,
        genre,
        author: user.displayName || 'Admin',
        email: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        publishOption,
        header
      });
      toast.success('Post created successfully!');
      setTitle('');
      setContent('');
      setGenre('');
      setPublishOption('forEveryone');
      setHeader(defaultHeader);
      navigate(publishOption === 'forEveryone' ? '/blog' : '/personal');
    } catch (error) {
      toast.error('Failed to create post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white px-4"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create a New Blog Post</h1>
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Preview */}
            <div className="w-full h-64 rounded-lg border border-gray-600 shadow-md bg-cover bg-center" 
              style={{ backgroundImage: `url(${header})` }}>
            </div>
            {/* Header Selection */}
            <select
              value={Object.keys(headers).find(key => headers[key] === header) || 'Default'}
              onChange={(e) => setHeader(headers[e.target.value])}
              className="w-full p-3 border border-gray-600 rounded-xl text-lg font-semibold bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {Object.keys(headers).map((img, index) => (
                <option key={index} value={img}>{img}</option>
              ))}
            </select>
            {/* Blog Title */}
            <input
              type="text"
              placeholder="Enter Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-xl bg-gray-700 text-white text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            {/* Blog Content */}
            <textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-xl bg-gray-700 text-white text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              rows="6"
            />
            {/* Genre Selection */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-xl bg-gray-700 text-white text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled>Select Genre</option>
              <option value="Casual">Casual</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
            </select>
            {/* Publish Options */}
            <div className="flex space-x-4">
              {['forEveryone', 'forMe'].map(option => (
                <button
                  key={option}
                  type="button"
                  className={`w-1/2 py-3 rounded-xl text-lg font-semibold transition-all ${
                    publishOption === option ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                  onClick={() => setPublishOption(option)}
                >
                  {option === 'forEveryone' ? 'Public' : 'Private'}
                </button>
              ))}
            </div>
            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition-all ${
                loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Blog'}
            </motion.button>
          </form>
        ) : (
          <p className="text-red-500 text-center">Only the admin can post blogs.</p>
        )}
      </motion.div>
    </div>
  );
};
export default CreateBlog;
