// api.jsx
import {db} from "../firebaseConfig";
import { collection, getDocs,doc, getDoc,addDoc, deleteDoc } from "firebase/firestore";


// const data = {
//   "posts": [
//       {
//           "id": 1,
//           "title": "First Blog Post",
//           "content": "To you who see this blog post, I would like to introduce myself. My name is Luqman Nurhakim and CEO of this blog huhu. I would like to say thank you so much for visit this and i feel so happy to you be here. Any message that left I absolutely will happly read! HAHA and thats for now. Thank you again!",
//           "author": "CEO",
//           "date": "2025-02-10"
//       },
//       {
//           "id": 2,
//           "title": "Second Blog Post",
//           "content": "This is the content of the second blog post.",
//           "author": "CEO",
//           "date": "2025-02-10"
//       }
//   ]
// };

//Get all blog posts

const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "blog"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

//Get a single blog post by id
const getPostById = async (id) => {
  const docRef = doc(db, "blog", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

//Add new blog post (Only admin can add new blog post)
const addPost = async (title, content, author) => {
  const postData = {
    title,
    content,
    author,
    createdAt: new Date()
  };
  const docRef = await addDoc(collection(db, "blog"), postData);
  return { id: docRef.id, ...postData }; // Return the newly created post with ID
};
//Delete blog post
const deletePost = async (id) => {
  return deleteDoc(doc(db, "blog", id));
};

export default { getPosts, getPostById, addPost, deletePost };