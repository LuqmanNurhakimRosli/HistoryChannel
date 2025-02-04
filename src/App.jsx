import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";


import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

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
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Route Inside MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
