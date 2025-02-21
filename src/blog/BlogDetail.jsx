import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi";
import { formatDistanceToNow } from "date-fns";


const BlogDetail = () => {
  const { title,id: blogId } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);
  const [liked, setLiked] = useState(false);
  const decodedTitle = title.replaceAll(/-/g, " ");

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
      const commentsData = await getCommentsByPostId(blogId);
      setComments(commentsData);
    };
    fetchComments();
  }, [blogId]);

  const refreshComments = async () => {
    const commentsData = await getCommentsByPostId(blogId);
    setComments(commentsData);
  };

  const handleLike = async () => {
    if (!liked) {
      await blogApi.likePost(blogId);
      setBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setLiked(true);
    }
  };

  if (!blog) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  const formattedDate = blog.createdAt
    ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })
    : "Unknown";

  const translateText = async () => {
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }

    try {
      const apiUrl = "https://libretranslate.com/translate";

      const translate = async (text) => {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify({
            q: text,
            source: "auto",
            target: "ms",
            format: "text",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return data.translatedText || text;
      };

      setTranslatedTitle(await translate(blog.title));
      setTranslatedContent(await translate(blog.content));
      setIsTranslated(true);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white shadow-md rounded-lg flex-grow">
      <Link to="/blog" className="block text-blue-600 hover:text-blue-800 mb-4 font-semibold">&larr; Back to Blog</Link>

      <article className="prose max-w-none lg:prose-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isTranslated ? translatedTitle || decodedTitle : decodedTitle}
        </h1>
        <div className="text-gray-600 flex flex-wrap gap-2 text-sm">
          <strong>{blog.author}</strong>
          <span>|</span>
          <span>{formattedDate}</span>
          <span>|</span>
          <span>{blog.genre}</span>
        </div>
        <p className="text-gray-800 leading-relaxed text-base sm:text-lg">
          {isTranslated ? translatedContent || blog.content : blog.content}
        </p>
        <div className="flex items-center gap-4 mt-4 ">
          <span className="text-black">👁 Views: {blog.views}</span>
          <button
            onClick={handleLike}
            disabled={liked}
            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            ❤️ Like {blog.likes}
          </button>
          <button
            onClick={translateText}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            {isTranslated ? "Show Original" : "Translate"}
          </button>
        </div>
      </article>

      <section className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic text-center">No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-6">
          {user ? (
            <CommentForm postId={blogId} refreshComments={refreshComments} />
          ) : (
            <p className="text-gray-600 bg-yellow-50 p-3 rounded-md text-center">
              You must be logged in to add a comment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
