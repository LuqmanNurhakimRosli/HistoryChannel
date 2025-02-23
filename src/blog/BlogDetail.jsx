import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi";
import { formatDistanceToNow } from "date-fns";
import defaultHeader from "../assets/header-blog/casual.jpg";

const BlogDetail = () => {
  const { title, id: blogId } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [translation, setTranslation] = useState({ title: "", content: "" });
  const [isTranslated, setIsTranslated] = useState(false);
  const [liked, setLiked] = useState(false);
  const decodedTitle = title.replace(/-/g, " ");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogApi.getPostById(blogId);
        setBlog(fetchedBlog);

        const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts")) || [];
        if (!viewedPosts.includes(blogId)) {
          await blogApi.viewPost(blogId);
          fetchedBlog.views += 1;
          localStorage.setItem("viewedPosts", JSON.stringify([...viewedPosts, blogId]));
        }
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
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const refreshComments = async () => {
    try {
      const commentsData = await getCommentsByPostId(blogId);
      setComments(commentsData);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  const handleLike = async () => {
    if (!liked) {
      try {
        await blogApi.likePost(blogId);
        setBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
        setLiked(true);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const translateText = async () => {
    if (!blog) return;
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }

    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: `${blog.title}\n${blog.content}`,
          source: "auto",
          target: "ms",
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const [translatedTitle, translatedContent] = data.translatedText.split("\n");
      setTranslation({ title: translatedTitle, content: translatedContent });
      setIsTranslated(true);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  if (!blog) return <div className="flex justify-center items-center h-screen text-2xl text-gray-900 dark:text-gray-100">Loading...</div>;

  return (
    <div className="py-4 bg-gray-900 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full mx-4 md:mx-auto bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div
          className="w-full h-60 sm:h-80 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${blog.header ? blog.header : defaultHeader})` }}
        ></div>
  
        <div className="p-6">
          <article className="prose max-w-none lg:prose-lg dark:prose-invert">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">{isTranslated ? translation.title || decodedTitle : decodedTitle}</h1>
            <div className="text-lg text-gray-300 flex flex-wrap gap-2 mt-2">
              <strong className="text-gray-100">{blog.author}</strong>
              <span>| {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
              <span>| {blog.genre}</span>
            </div>
  
            <div className="flex flex-wrap gap-4 mt-6 items-center">
              <span className="text-lg text-gray-300">👀 Views: {blog.views}</span>
              <button
                onClick={handleLike}
                disabled={liked}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-400 disabled:opacity-50 transition-all"
              >
                ❤️ Like {blog.likes}
              </button>
              <button
                onClick={translateText}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all"
              >
                {isTranslated ? "Show Original" : "Translate"}
              </button>
            </div>
  
            <p className="text-lg leading-relaxed mt-6 text-gray-300">{isTranslated ? translation.content || blog.content : blog.content}</p>
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
                <p className="text-lg bg-yellow-900 p-4 rounded-lg text-center text-gray-100">
                  You must be logged in to add a comment.
                  <div>
                    <Link to="/login" className="text-blue-400 ml-2">Login</Link>
                  </div>
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
