import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi";
import { formatDistanceToNow } from "date-fns";

const BlogDetail = () => {
  const { title, id: blogId } = useParams();
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

  if (!blog) return <div className="flex justify-center items-center h-screen text-2xl text-gray-900 dark:text-gray-100">Loading...</div>;

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
    <div className="py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <article className="prose max-w-none lg:prose-lg dark:prose-invert">
          <h1 className="text-4xl font-bold">{isTranslated ? translatedTitle || decodedTitle : decodedTitle}</h1>
          <div className="text-lg text-gray-700 dark:text-gray-300 flex flex-wrap gap-2 mt-2">
            <strong>{blog.author}</strong>
            <span>|</span>
            <span>{formattedDate}</span>
            <span>|</span>
            <span>{blog.genre}</span>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-lg">👁 Views: {blog.views}</span>
            <button
              onClick={handleLike}
              disabled={liked}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 disabled:opacity-50"
            >
              ❤️ Like {blog.likes}
            </button>
            <button
              onClick={translateText}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              {isTranslated ? "Show Original" : "Translate"}
            </button>
          </div>
          <p className="text-xl leading-relaxed mt-6">{isTranslated ? translatedContent || blog.content : blog.content}</p>
        </article>

        <section className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold">Comments</h2>
          {comments.length > 0 ? (
            <div className="space-y-4 mt-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
              ))}
            </div>
          ) : (
            <p className="text-lg italic text-center mt-4">No comments yet. Be the first to comment!</p>
          )}

          <div className="mt-6">
            {user ? (
              <CommentForm postId={blogId} refreshComments={refreshComments} />
            ) : (
              <p className="text-lg bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg text-center">
                You must be logged in to add a comment.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
