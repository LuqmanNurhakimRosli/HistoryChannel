import { useAuth } from "../context/AuthContext";
import { deleteComment } from "../api/commentApi";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import profileDefault from "../assets/default-profile.jfif";

const Comment = ({ comment, refreshComments, className = "" }) => {
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

  const formattedDate = comment.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true })
    : "Just now";

  return (
    <div className={`flex items-start space-x-4 p-4 border-b border-to-blue-700 ${className}`}>
      <div className="flex-shrink-0">
        {/* Placeholder for profile picture */}
        <img
          src={profileDefault} // Replace with actual user profile image
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold text-gray-300">{comment.username}</p>
            <p className="text-gray-300">{comment.text}</p>
          </div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        {user && user.uid === comment.userId && (
          <div className="flex justify-end">
            <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Delete comment"
          >
            Delete
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.shape({
      seconds: PropTypes.number,
      nanoseconds: PropTypes.number,
    }),
  }).isRequired,
  refreshComments: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Comment;
