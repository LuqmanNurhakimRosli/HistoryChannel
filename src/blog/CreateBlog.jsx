import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig'; // Import Firestore config
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("Logged-in User:", user);

  // Get admin email from Vite environment variable
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin check
    if (!user || user.email !== adminEmail) {
      toast.error("You are not authorized to post.");
      return;
    }

    setLoading(true);
    try {
      // Save blog post to Firebase Firestore
      const docRef = await addDoc(collection(db, "blog"), {
        title,
        content,
        author: user.displayName || "Admin",
        email: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });

      // Update the authorId if necessary
      await updateAuthorId(docRef.id, user.uid);

      toast.success("Post created successfully!");
      setTitle('');
      setContent('');

      // Redirect to the blog page
      navigate('/blog');
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAuthorId = async (blogId, newAuthorId) => {
    const blogRef = doc(db, "blog", blogId); // Reference to the blog document
    await updateDoc(blogRef, {
      authorId: newAuthorId // Update the authorId
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Create Blog Post</h1>
        <p className="text-lg text-gray-600 mb-6">Write and share your thoughts.</p>

        {user && user.email === adminEmail ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows="5"
            />
            <button
              type="submit"
              className={`px-6 py-3 text-white rounded-lg transition ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Posting..." : "Add Post"}
            </button>
          </form>
        ) : (
          <p className="text-red-500">Only the admin can post blogs.</p>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;