import { useState, useEffect, useCallback } from "react";
import { addComment } from "./commentApi"; 
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the import path as needed
import PropTypes from "prop-types";

const CommentForm = ({ postId, refreshComments }) => {
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
      console.log("Submitting comment:", { postId, userId: user.uid, commentText });
      await addComment(postId, user.uid, commentText); // Call the addComment function
      setCommentText(""); // Clear the comment input
      setTimeout(refreshComments, 1000); // Refresh comments with slight delay
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {username && <p>Commenting as: <strong>{username}</strong></p>} {/* Display username */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" disabled={!user}>Submit</button>
    </form>
  );
};


CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  refreshComments: PropTypes.func.isRequired,
};

export default CommentForm;