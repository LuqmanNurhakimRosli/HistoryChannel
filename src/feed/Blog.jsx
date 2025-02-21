import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import useBlogPosts from "../hooks/useBlogPosts";
import OldPaper from "../assets/old-paper.jpg";
import "../App.css";

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
    <section className="w-full py-12 bg-gray-900">
      <div className="container mx-auto px-6">

        {/* Loading & Error Handling */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error.message}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {publicPosts.map((post) => (
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
                    className="h-48 bg-gray-200 bg-cover bg-center"
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
      </div>
    </section>
  );
}

export default Blog;
