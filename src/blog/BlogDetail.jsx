import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../api/commentApi";
import blogApi from "../api/blogApi"; 
import { formatDistanceToNow } from "date-fns";

const BlogDetail = () => {
  const { id: blogId } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);
  
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
      setComments(commentsData);
    };
    fetchComments();
  }, [blogId]);

  const refreshComments = async () => {
    const commentsData = await getCommentsByPostId(blogId);
    setComments(commentsData);
  };

  if (!blog) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  const parseDate = (dateString) => {
    const date = new Date(dateString); 
    return isNaN(date) ? null : date;
  };

  const formattedDate = blog.createdAt
    ? formatDistanceToNow(parseDate(blog.createdAt), { addSuffix: true }) 
    : "Unknown";

  // Translate Function using LibreTranslate
  const translateText = async () => {
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }
  
    try {
      const apiUrl = "https://libretranslate.com/translate"; // Ensure this API is working
  
      // Translate the title
      const titleResponse = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          q: blog.title,
          source: "auto",
          target: "ms",
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Translate the content
      const contentResponse = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          q: blog.content,
          source: "auto",
          target: "ms",
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Convert responses to JSON
      const titleData = await titleResponse.json();
      const contentData = await contentResponse.json();
  
      console.log("Title Response:", titleData);
      console.log("Content Response:", contentData);
  
      // Handle missing translatedText
      if (titleData.translatedText && contentData.translatedText) {
        setTranslatedTitle(titleData.translatedText);
        setTranslatedContent(contentData.translatedText);
        setIsTranslated(true);
      } else {
        console.error("Translation failed: Missing translatedText", titleData, contentData);
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg flex-grow">
      <Link to="/blog" className="inline-block text-blue-600 hover:text-blue-800 mb-6 font-semibold text-left">
        &larr; Back to Blog
      </Link>
      <article className="prose lg:prose-xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isTranslated ? translatedTitle || blog.title : blog.title}
        </h1>
        <div className="text-gray-600 space-x-4">
          <strong className="text-lg">{blog.author}</strong>
          <span className="text-sm">|</span>
          <strong className="text-sm text-gray-500">{formattedDate}</strong>
          <span className="text-sm">|</span>
          <strong className="text-sm text-gray-500">{blog.genre}</strong>
        </div>
        <p className="text-gray-800 leading-relaxed text-lg">
          {isTranslated ? translatedContent || blog.content : blog.content}
        </p>

        {/* Translate Button */}
        <button
          onClick={translateText}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          {isTranslated ? "Show Original" : "Translate"}
        </button>
      </article>

      <section className="mt-12 border-t pt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-6">
          {user ? (
            <CommentForm postId={blogId} refreshComments={refreshComments} />
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
