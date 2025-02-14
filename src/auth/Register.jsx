import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Registration Successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to create an account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
        <p className="text-gray-500 mb-6">Join the owl today!</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-bold p-3 rounded hover:bg-blue-500 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
