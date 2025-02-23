import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts from "../hooks/useBlogPosts";
import { formatDistanceToNow, parseISO } from "date-fns";
import OldPaper from "../assets/old-paper.jpg";

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
      <section className="w-full py-8 bg-gray-800">
        <div className="container mx-auto px-4 flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
    <section className="w-full py-12 bg-gray-900 min-h-screen justify-center items-center rounded-2xl">
      <div className="container mx-auto px-6">
        {user ? (
          <>

            {privatePosts.length === 0 ? (
              <p className="text-gray-600 text-lg text-center">
                You have no private posts.
              </p>
            ) : (
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {privatePosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                  >
                    <Link
                      to={`/blog/${post.author}/${post.title.replace(/ /g, "-")}/${post.id}`}
                      className="block"
                    >
                      {/* Blog Image */}
                      <div
                        className="h-48 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${post.imageUrl ? post.imageUrl : OldPaper})`
                        }}
                      ></div>

                      {/* Blog Content */}
                      <div className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{post.author}</span> | {formatDate(post.createdAt)}
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center bg-blue-500 p-8 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold">Log in to see your private blog</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default PrivateBlog;
