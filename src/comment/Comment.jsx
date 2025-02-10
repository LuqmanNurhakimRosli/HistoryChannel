// Comment.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

function Comment({ comments }) {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the logic to save the comment
        console.log('New Comment:', newComment);
        setNewComment(''); // Clear the input after submission
    };

    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.author}</strong>: {comment.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Comment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default Comment;