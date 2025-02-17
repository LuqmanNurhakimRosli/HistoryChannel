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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    user ? ( // Check if user is logged in
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Your Private Posts</h1>
        {privatePosts.length === 0 ? (
          <p>You have no private posts.</p>
        ) : (
          <ul>
            {privatePosts.map(post => (
              <li key={post.id} className="mb-2">
                <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ) : (
      <p className="text-red-500 text-center mt-4">Only the admin can post blogs.</p>
    )
  );
}

export default PrivateBlog;