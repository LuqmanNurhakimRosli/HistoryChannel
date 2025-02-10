import { useState } from "react";
import { addComment } from "../comment/commentApi"; // Import the addComment function
import PropTypes from "prop-types";

const CommentForm = ({ postId, user, refreshComments }) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            try {
                await addComment(postId, user, commentText); // Pass postId to ensure the comment is added under the correct blog
                setCommentText(""); // Clear the comment input field
                refreshComments(); // Refresh comments after adding
            } catch (error) {
                console.error("Error adding comment: ", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    refreshComments: PropTypes.func.isRequired,
};

export default CommentForm;