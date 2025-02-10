import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Import Firestore

const Profile = () => {
  const { user } = useAuth(); // Get user from context
  const [username, setUsername] = useState(user?.displayName || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    if (username === user?.displayName) {
      setError("No changes detected.");
      return;
    }

    try {
      setIsLoading(true);
      // Update Firebase Authentication
      await updateProfile(auth.currentUser, { displayName: username });

      // Save username to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
        userId: user.uid,
      });

      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <label className="text-gray-700 font-medium">Email:</label>
        <p className="text-gray-500">{user?.email}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-medium">
          Username:
        </label>
        <input
          id="username"
          type="text"
          className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`mt-4 px-4 py-2 rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default Profile;
