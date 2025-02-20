// Login.js
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  // signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebaseConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    // Set authentication persistence
    setPersistence(auth, browserLocalPersistence)
      .then(() => console.log("Auth persistence set to localStorage"))
      .catch((error) => console.error("Persistence error:", error));

    // Check for Google login redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect Login Success:", result.user);
          toast.success(`Welcome, ${result.user.displayName}!`);
          navigate("/dashboard");
        } else {
          console.log("No user found from redirect login.");
        }
      })
      .catch((err) => {
        console.error("Google Redirect Login Error:", err);
        toast.error("Google login failed!");
      });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
      toast.error("Login Failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // if (isMobile) {
      //   await signInWithRedirect(auth, googleProvider);
        
      // } else {
      //   const result = await signInWithRedirect(auth, googleProvider);
      //   toast.success(`Welcome, ${result.user.displayName}!`);
      //   navigate("/dashboard");
      // }
      const result = await signInWithRedirect(auth, googleProvider);
        toast.success(`Welcome, ${result.user.displayName}!`);
        navigate("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 ">
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
