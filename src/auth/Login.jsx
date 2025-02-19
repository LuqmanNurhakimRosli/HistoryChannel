import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // Handle redirect result for Google login
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success("Logged in with Google!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed!");
      });
  }, [navigate]);

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      toast.error("Login Failed");
    }
  };

  // Handle Google login with redirect
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold p-3 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-gray-100 text-gray-700 p-3 rounded hover:bg-gray-200 transition"
          >
            <FcGoogle className="mr-2 text-2xl" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
