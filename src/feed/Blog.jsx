import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import useBlogPosts from "../hooks/useBlogPosts";
import '../App.css';

function Blog() {
  const { posts: blog, loading, error } = useBlogPosts();

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"; // Handle missing dates
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

  const publicPosts = blog.filter(
    (post) => post.publishOption === true || post.publishOption === "forEveryone"
  );

  return (
    <section className="w-full py-8 ">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error.message}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {publicPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <Link
                  to={`/blog/${post.title.replace(/ /g, "-")}/${post.id}`}
                  className="block p-6"
                >
                  <div className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{post.author}</span> |{" "}
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
