import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from "../hooks/useBlogPosts";

function PrivateBlog() {
  const { user } = useAuth();
  const { posts, loading, error } = useBlogPosts();
  const [privatePosts, setPrivatePosts] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredPosts = posts.filter(post => post.authorId === user.uid && post.publishOption === false);
      setPrivatePosts(filteredPosts);
    }
  }, [user, posts]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Private Posts</h1>
        {user ? (
          privatePosts.length === 0 ? (
            <p className="text-gray-600 text-lg">You have no private posts.</p>
          ) : (
            <ul className="space-y-3">
              {privatePosts.map(post => (
                <li key={post.id}>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-lg text-blue-600 hover:underline hover:text-blue-800 transition"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="text-red-500 text-lg text-center mt-4">Only the admin can post blogs.</p>
        )}
      </div>
    </div>
  );
}

export default PrivateBlog;
