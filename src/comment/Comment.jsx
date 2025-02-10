import { useAuth } from "../context/AuthContext";
import { deleteComment } from "../comment/commentApi";
import PropTypes from "prop-types";

const Comment = ({ comment, refreshComments }) => {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteComment(comment.id); // Call deleteComment with the comment ID
                refreshComments(); // Refresh comments after deletion
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    return (
        <div className="comment-box">
            <p>
                <strong>{comment.userEmail}</strong>: {comment.text}
            </p>
            {user && user.uid === comment.userId && (
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            )}
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userEmail: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    refreshComments: PropTypes.func.isRequired,
};

export default Comment;