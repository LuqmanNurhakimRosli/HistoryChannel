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
    views: doc.data().views || 0,
    likes: doc.data().likes || 0,
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
      createdAt: data.createdAt.toDate(), // Ensure createdAt is a Date object
      views: data.views || 0,
      likes: data.likes || 0,
    };
  } else {
    return null;
  }
};

// Add new blog post
export const addPost = async (title, content, author, authorId, genre, publishOption) => {
  const postData = {
    title,
    content,
    author,
    authorId,
    createdAt: new Date(),
    genre,
    publishOption,
    views: 0,
    likes: 0,
  };
  const docRef = await addDoc(collection(db, "blog"), postData);
  return { id: docRef.id, ...postData }; // Return the newly created post with ID
};

//increment like feature
export const likePost = async (id) => {
  const postRef = doc(db, "blog", id)

  try{
    const postSnap = await getDoc(postRef)

    if(postSnap.exists()){
      const currentLikes = postSnap.data().likes || 0;
      await updateDoc(postRef, {
        likes: currentLikes + 1,
      })
    }

  }catch(error){
    console.error("Error incrementing likes:", error);
  }
}

//increment view feature
export const viewPost = async (id) => {
  const postRef = doc(db, "blog", id)

  try{
    const postSnap = await getDoc(postRef)

    if(postSnap.exists()){
      const currentViews = postSnap.data().views || 0;
      await updateDoc(postRef, {
        views: currentViews + 1,
      })
    }

  }catch(error){
    console.error("Error incrementing views:", error);
  }
}

// Update blog post
export const updatePost = async (id, title, content, genre, publishOption) => {
  const postRef = doc(db, "blog", id);
  await updateDoc(postRef, {
    title,
    content,
    genre,
    publishOption,
  });
};

// Delete blog post
export const deletePost = async (id) => {
  await deleteDoc(doc(db, "blog", id));
};

export default { getPosts, getPostById, addPost, updatePost, deletePost, likePost, viewPost };
