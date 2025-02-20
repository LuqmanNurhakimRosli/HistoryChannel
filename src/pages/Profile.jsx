import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Firestore
import profileDefault from "../assets/default-profile.jpeg"; // Default profile image

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
    <div className="min-h-full mx-auto max-w-4xl p-4 bg-gray-100 py-10">
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:space-x-6">
        {/* Profile Image */}
        <div className="justify-center items-center flex gap-10">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0">
          <img
            src={profileDefault}
            alt="Default Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
        <h2 className="text-xl sm:text-lg md:text-2xl font-semibold text-gray-900 break-all">{user?.displayName}</h2>
        <p className="text-sm sm:text-xs md:text-lg text-gray-700 break-all">{user?.email}</p></div>
        </div>
        
      </div>

      <hr className="border-t border-gray-200 my-6" />

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
      {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
      {success && <p className="text-green-500 mb-2 text-sm">{success}</p>}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`w-full mt-4 px-4 py-2 rounded-md text-white transition duration-300 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;
