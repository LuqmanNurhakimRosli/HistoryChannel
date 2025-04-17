import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi";
import useBlogPosts from "../hooks/useBlogPosts";
import { formatDistanceToNow } from "date-fns";
import defaultHeader from "../assets/header-blog/casual.jpg";

const BlogDetail = () => {
  const { title, id: blogId } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const decodedTitle = title.replace(/-/g, " ");
  const { loading, error } = useBlogPosts();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogApi.getPostById(blogId);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByPostId(blogId);
        // Sort comments by date - newest first
        const sortedComments = commentsData.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const refreshComments = async () => {
    try {
      const commentsData = await getCommentsByPostId(blogId);
      // Sort comments by date - newest first
      const sortedComments = commentsData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="loading-spinner"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="w-full">
      <div className="py-4 bg-gray-900 min-h-screen flex justify-center">
        <div className="max-w-3xl w-full mx-4 md:mx-auto bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div
            className="w-full h-60 sm:h-80 bg-cover bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${blog?.header ? blog.header : defaultHeader})` }}
          ></div>

          <div className="p-6">
            <article className="prose max-w-none lg:prose-lg dark:prose-invert">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">{decodedTitle}</h1>
              <div className="text-lg text-gray-300 flex flex-wrap gap-2 mt-2">
                <strong className="text-gray-100">{blog?.author}</strong>
                <span>| {blog ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : ""}</span>
                <span>| {blog?.genre}</span>
              </div>

              {/* Word-like formatted content section */}
              <div className="mt-6 bg-gray-700 rounded-lg p-6 shadow-inner" style={{ minHeight: "300px" }}>
                <div className="text-lg text-gray-200" style={{ lineHeight: "1.8" }}>
                  {blog?.content?.split(/\n/).map((paragraph, index) => (
                    paragraph.trim() ? (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ) : (
                      <br key={index} />
                    )
                  ))}
                </div>
              </div>
            </article>

            <section className="mt-10 border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
              {comments.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
                  ))}
                </div>
              ) : (
                <p className="text-lg italic text-center mt-4 text-gray-400">No comments yet. Be the first to comment!</p>
              )}
              <div className="mt-6">
                {user ? (
                  <CommentForm postId={blogId} refreshComments={refreshComments} />
                ) : (
                  <div className="bg-gray-800 p-6 rounded-xl text-center text-gray-200 shadow-lg border border-gray-700">
                    <p className="text-lg font-semibold">You must be logged in to add a comment.</p>
                    <div className="mt-4">
                      <Link 
                        to="/login" 
                        className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-all shadow-md"
                      >
                        🔑 Login to Comment
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;