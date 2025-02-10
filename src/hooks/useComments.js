//custom hook
import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../comment/commentApi";

const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const commentsData = await getCommentsByPostId(postId);
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching comments: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    return { comments, loading };
};

export default useComments;
