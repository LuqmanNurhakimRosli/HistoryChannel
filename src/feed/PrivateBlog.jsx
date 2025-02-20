import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from "../hooks/useBlogPosts";
import { formatDistanceToNow, parseISO } from "date-fns";

function PrivateBlog() {
  const { user } = useAuth();
  const { posts, loading, error } = useBlogPosts();
  const [privatePosts, setPrivatePosts] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredPosts = posts.filter(
        (post) =>
          post.authorId === user.uid &&
          (post.publishOption === false || post.publishOption === "onlyMe")
      );
      setPrivatePosts(filteredPosts);
    }
  }, [user, posts]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      if (dateString instanceof Date) {
        return formatDistanceToNow(dateString, { addSuffix: true });
      }
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Unknown";
    }
  };

  if (loading)
    return (
      <section className="w-full py-8 ">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="w-full py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center">{error.message}</div>
        </div>
      </section>
    );

  return (
    <section className="w-full py-8 text-center">
      <div className="container mx-auto px-4">
        {user ? (
          <>
            {privatePosts.length === 0 ? (
              <p className="text-gray-600 text-lg col-span-full">
                You have no private posts.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {privatePosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <Link to={`/blog/${post.id}`} className="block p-6">
                      <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{post.author}</span> | {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-lg sm:text-xl text-gray-700">
              Log in to see your private blog
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default PrivateBlog;
