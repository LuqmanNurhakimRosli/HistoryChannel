// Dashboard.jsx

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>

      </div>  
    </div>
  );
};

export default Dashboard;
// import {useState} from 'react'
// import {auth} from "../firebase"
// import { useAuth } from '../context/AuthContext';
// import blogApi from "../blog/blogApi";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")

//   auth.currentUser?.getIdToken(true).then((token) => {
//     console.log("Token refreshed:", token);
//   });
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user || user.email !== "hanggmana07@gmail.com") {
//       alert("You are not authorized to post");
//       return;
//     }
    
//     try {
//       await blogApi.addPost(title, content, user.displayName || "CEO");
//       alert("Post created successfully!"); // Alert for success
//       setTitle("");
//       setContent("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert("Failed to create post: " + error.message); // Alert for failure
//     }
//   };


  
//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-16">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
//         <h1 className="text-4xl font-semibold text-gray-800 mb-4">Dashboard</h1>
//         <p className="text-lg text-gray-600 mb-6">Manage your blog posts here.</p>

//         {user && user.email === "hanggmana07@gmail.com" ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Post Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//             <textarea
//               placeholder="Post Content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Add Post
//             </button>
//           </form>
//         ) : (
//           <p className="text-red-500">Only the admin can post blogs.</p>
//         )}
//       </div>
//     </div>
//   );
// }
