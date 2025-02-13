import { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    // Handle Google login redirect result when returning from browser
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

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      toast.error("Login Failed");
    }
  };

  // Google Login (Handles Web & Mobile)
  const handleGoogleLogin = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      if (isMobile) {
        // Mobile: Use Redirect
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Desktop Web: Use Popup
        await signInWithPopup(auth, googleProvider);
        toast.success("Logged in with Google!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
      </form>

      <button onClick={handleGoogleLogin} className="mt-4 p-2 bg-red-500 text-white rounded">
        Sign in with Google
      </button>

      <p>
        Do not have an account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
}

export default Login;
