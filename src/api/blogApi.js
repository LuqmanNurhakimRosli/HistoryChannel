import { db } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

// Get all blog posts
export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "blog"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    authorId: doc.data().authorId, // Ensure authorId is included
  }));
};

// Get a single blog post by id
export const getPostById = async (id) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate() // Ensure createdAt is a Date object
    };
  } else {
    return null;
  }
};

// Add new blog post
export const addPost = async (title, content, author, authorId) => {
  const postData = {
    title,
    content,
    author,
    authorId,
    createdAt: new Date()
  };
  const docRef = await addDoc(collection(db, "blog"), postData);
  return { id: docRef.id, ...postData }; // Return the newly created post with ID
};

// Update blog post
export const updatePost = async (id, title, content) => {
  const postRef = doc(db, "blog", id);
  await updateDoc(postRef, {
    title,
    content,
  });
};

// Delete blog post
export const deletePost = async (id) => {
  await deleteDoc(doc(db, "blog", id));
};

export default { getPosts, getPostById, addPost, updatePost, deletePost };
