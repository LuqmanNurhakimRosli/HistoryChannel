import { Routes, Route, useOutletContext, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import BlogDetail from "./blog/BlogDetail";

import Blog from "./feed/Blog";
import PrivateBlog from "./feed/PrivateBlog";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Analytics from "./dashboard/Analytics";
import PostLayout from "./layouts/PostLayout"; 
import FeedLayout from "./layouts/FeedLayout"
import CreateBlog from "./blog/CreateBlog"; 
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageBlog from "./blog/ManageBlog";
import EditBlog from "./blog/EditBlog";

import 'react-toastify/dist/ReactToastify.css'; 

import "./App.css";

function App() {
  return (
    <AuthProvider> 
      <ToastContainer />
      <Routes>
        {/* Wrap everything inside MainLayout to keep navbar and header */}
        <Route element={<MainLayout />}> 
          {/* Public Routes */}
          <Route index element={<Home />} />

        <Route element={<FeedLayout />}>
          <Route path="blog" element={<Blog filterType={useOutletContext} />} />    
          <Route path="/personal" element={<PrivateBlog />} />
        </Route>
        <Route path="/blog/:title/:id" element={<BlogDetail />} />
        <Route path="/personal/:title/:id" element={<BlogDetail />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Route Inside MainLayout */}
          <Route element={<ProtectedRoute />}> 
            <Route path="dashboard" element={<PostLayout />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<Profile />} /> 
                <Route path="manage-blog" element={<ManageBlog />} />
                <Route path="manage-blog/:id" element={<EditBlog />} />
                <Route path="analytics" element={<Analytics />} />
            </Route>
            
            <Route path="createblog" element={<CreateBlog />} />
            <Route path="profile" element={<Profile />} /> 
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
