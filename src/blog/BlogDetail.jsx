import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi"; 
import { formatDistanceToNow } from "date-fns"; // Import only formatDistanceToNow

const BlogDetail = () => {
  const { id: blogId } = useParams(); // Retrieve blogId from URL params
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogApi.getPostById(blogId);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog post: ", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getCommentsByPostId(blogId);
      console.log("Fetched comments:", commentsData); // Debugging
      setComments(commentsData);
    };
    fetchComments();
  }, [blogId]);

  const refreshComments = async () => {
    const commentsData = await getCommentsByPostId(blogId);
    setComments(commentsData);
  };

  if (!blog) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  // Parse the date string to get a valid Date object
  const parseDate = (dateString) => {
    const date = new Date(dateString); 
    return isNaN(date) ? null : date;
  };

  // Format the date to show how long ago the blog was created
  const formattedDate = blog.createdAt
    ? formatDistanceToNow(parseDate(blog.createdAt), { addSuffix: true }) 
    : "Unknown";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg flex-grow">
      {/* Updated Back button to link to /blog */}
      <Link to="/blog" className="inline-block text-blue-600 hover:text-blue-800 mb-6 font-semibold text-left">
        &larr; Back to Blog
      </Link>
      <article className="prose lg:prose-xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
        <div className=" text-gray-600 space-x-4">
          <strong className="text-lg">{blog.author}</strong>
          <span className="text-sm">|</span>
          <strong className="text-sm text-gray-500">{formattedDate}</strong> {/* Display the formatted date */}
          <span className="text-sm">|</span>
          <strong className="text-sm text-gray-500">{blog.genre}</strong>
        </div>
        <p className="text-gray-800 leading-relaxed text-lg">{blog.content}</p>
      </article>

      <section className="mt-12 border-t pt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                refreshComments={refreshComments} 
                className="bg-gray-50 p-4 rounded-md shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-6">
          {user ? (
            <CommentForm 
              postId={blogId} 
              refreshComments={refreshComments} 
              className="bg-gray-100 p-4 rounded-lg shadow-sm"
            />
          ) : (
            <p className="text-gray-600 bg-yellow-50 p-3 rounded-md">
              You must be logged in to add a comment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
