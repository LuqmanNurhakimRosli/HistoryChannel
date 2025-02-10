// Comment.jsx
import { useState, useEffect } from 'react';
import {useAuth} from '../context/AuthContext';
import { addComment, getCommentsByPostId } from './commentApi';

function Comment({ postId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');

    //load comments from firestore
    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await getCommentsByPostId(postId);
            setComments(commentsData);
        };
        fetchComments();
    }, [postId]);

    //handle submitting a new comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user) {
            alert("You must be logged in to comment.");
            return;
        }
        const newComment = await addComment(postId, user.email, text);
        setComments([...comments, newComment]);
        setText('');
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <strong>{comment.author}</strong>: {comment.text}
                </div>
            ))}
            {user && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit">Comment</button>
                </form>
            )}
        </div>
    )


}
export default Comment;