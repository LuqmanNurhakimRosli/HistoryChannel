import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import { useAuth } from "../context/AuthContext";
import { getCommentsByPostId } from "../comment/commentApi";
import blogApi from "./blogApi"; // Import the blog API

const BlogDetail = () => {
  const { id } = useParams(); // Get blog post ID from URL
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  // Fetch blog post by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogApi.getPostById(Number(id)); // Fetch from API
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog post: ", error);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch comments for the blog post
  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getCommentsByPostId(id);
      setComments(commentsData);
    };
    fetchComments();
  }, [id]);

  // Function to refresh comments after adding or deleting a comment
  const refreshComments = async () => {
    const commentsData = await getCommentsByPostId(id);
    setComments(commentsData);
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <strong>{blog.author}</strong> | <strong>{blog.date}</strong>
      <p>{blog.content}</p>

      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {user ? (
        <CommentForm postId={id} user={user} refreshComments={refreshComments} />
      ) : (
        <p>You must be logged in to add a comment.</p>
      )}
    </div>
  );
};

export default BlogDetail;
