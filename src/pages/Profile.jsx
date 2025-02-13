import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Firestore
import profileDefault from "../assets/default-profile.png"; // Default profile image

const Profile = () => {
  const { user } = useAuth(); // Get user from context
  const [username, setUsername] = useState(user?.displayName || user?.email?.split('@')[0] || "anonymous");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || user.email.split('@')[0] || "anonymous");
    }
  }, [user]);

  // Saves profile details (username only)
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

      // Update Firebase Authentication profile (only username)
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: profileDefault, // Always use default profile image
      });

      // Save to Firestore (without profile image upload)
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
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6 mb-6">
        {/* Default Profile Image */}
        <div className="w-32 h-32">
          <img
            src={profileDefault}
            alt="Default Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          {/* Username & Email */}
          <h2 className="text-3xl font-semibold text-gray-900">{user?.displayName}</h2>
          <p className="text-lg text-gray-700">{user?.email}</p>
        </div>
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Change Username Section */}
      <div className="mb-6">
        <label htmlFor="username" className="block text-lg font-medium text-gray-700">
          Change Username
        </label>
        <input
          id="username"
          type="text"
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Error or Success Message */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`w-full mt-4 px-4 py-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;
