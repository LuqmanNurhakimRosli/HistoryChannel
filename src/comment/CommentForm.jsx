import { useState, useEffect, useCallback } from "react";
import { addComment } from "./commentApi"; 
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CommentForm = ({ postId, refreshComments, className = "" }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState(""); // Store fetched username

  // Fetch username from Firestore
  const fetchUsername = useCallback(async () => {
    if (!user) return; // Ensure user is defined
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        console.error("User not found in Firestore");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUsername();
  }, [fetchUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return; // Prevent submission of empty comments
    if (!user) return; // Ensure user is authenticated

    try {
      const currentDate = new Date(); // Get the current date and time
      console.log("Submitting comment:", { 
        postId, 
        userId: user.uid, 
        commentText, 
        createdAt: currentDate.toISOString() // Log the date in ISO format
      });
      await addComment(postId, user.uid, commentText); // Call the addComment function
      setCommentText(""); // Clear the comment input
      setTimeout(refreshComments, 500); // Refresh comments with slight delay
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-gray-100 p-4 rounded-lg space-y-4 ${className}`}
    >
      {username && (
        <p className="text-gray-700 text-sm">
          Commenting as: <strong className="text-gray-900">{username}</strong>
        </p>
      )}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y min-h-[100px]"
      />
      <button 
        type="submit" 
        disabled={!user || !commentText.trim()}
        className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Submit Comment
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  refreshComments: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CommentForm;
