import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import BlogDetail from "./blog/BlogDetail";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

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
          <Route path="blog" element={<Blog />} />    
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Route Inside MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
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
