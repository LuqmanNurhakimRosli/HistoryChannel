//to retrieve all comments
//add new commnt
// delete comment
//CRUD condept (create, read, update, delete)

import { db } from "../firebase";
import { collection, addDoc, query, getDocs, where, deleteDoc, doc } from "firebase/firestore";

const COMMENTS_COLLECTION = "comments";

// Fetch comments by postId (blog ID)
export const getCommentsByPostId = async (postId) => {
    const q = query(collection(db, COMMENTS_COLLECTION), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a comment to Firestore, associating it with the blog's postId
export const addComment = async (postId, user, text) => {
    try {
        await addDoc(collection(db, COMMENTS_COLLECTION), {
            postId,  // Make sure to associate with the blog post ID
            userId: user.uid,
            userEmail: user.email,
            text,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
};

// Delete a comment from Firestore
export const deleteComment = async (commentId) => {
    try {
        await deleteDoc(doc(db, COMMENTS_COLLECTION, commentId));
    } catch (error) {
        console.error("Error deleting comment: ", error);
    }
};