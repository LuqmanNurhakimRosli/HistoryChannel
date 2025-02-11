import { useAuth } from "../context/AuthContext";
import { deleteComment } from "./commentApi";
import PropTypes from "prop-types";

const Comment = ({ comment, refreshComments }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment.id);
        refreshComments(); // Refresh comments after deletion
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <div>
      <p>
        <strong>{comment.username}</strong>: {comment.text}
      </p>
      {user && user.uid === comment.userId && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  refreshComments: PropTypes.func.isRequired,
};

export default Comment;
