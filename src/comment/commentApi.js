//to retrieve all comments
//add new commnt
// delete comment

import {db} from "../firebase";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";

const COMMENTS_COLLECTION = "comments";

//fetch comments by id
export const getCommentsByPostId = async (postId) => {
    const q = query(collection(db, COMMENTS_COLLECTION), where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
}

// ✅ Add a new comment to Firestore
export const addComment = async (postId, author, text) => {
    try {
      const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
        postId,
        author,
        text,
        createdAt: new Date()
      });
      return { id: docRef.id, postId, author, text, createdAt: new Date() };
    } catch (error) {
      console.error("Error adding comment: ", error);
      throw new Error("Could not add comment");
    }
  };