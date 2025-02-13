import { db } from "../firebaseConfig"; // Adjust the import path as needed
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

// Add a new comment to Firestore
export const addComment = async (postId, userId, text) => {
  try {
    const userRef = collection(db, "users"); // Get users collection
    const userSnapshot = await getDocs(query(userRef, where("userId", "==", userId)));

    if (userSnapshot.empty) {
      throw new Error("User not found in Firestore");
    }

    const userData = userSnapshot.docs[0].data(); // Get username from Firestore
    const username = userData.username;

    await addDoc(collection(db, "comments"), {
      blogId: postId, // This is the correct field for linking the post
      userId,
      username,
      text,
      createdAt: new Date(),
    });

    console.log("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Fetch comments for a specific post
export const getCommentsByPostId = async (blogId) => {
  try {
    const q = query(collection(db, "comments"), where("blogId", "==", blogId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// Delete a comment by its ID
export const deleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    console.log("Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
