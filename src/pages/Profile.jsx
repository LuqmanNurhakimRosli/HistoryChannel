import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProfilePage = () => {
  const { user } = useAuth();  // Access authenticated user from context
  const [username, setUsername] = useState(user?.displayName || "");  // Set the current displayName as default
  const [error, setError] = useState(null);  // To handle errors during the update

  // Function to handle profile update
  const handleSave = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      // Update the username in Firebase Authentication
      await updateProfile(user, {
        displayName: username,
      });

      // Save the updated username in Firestore (under users collection)
      await setDoc(doc(db, "users", user.uid), {
        username,
      });

      setError(null);  // Clear any previous error
      alert("Username updated successfully.");
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update username state on input change
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error message if there's any */}
      <button onClick={handleSave}>Save</button>  {/* Button to save the username */}
    </div>
  );
};

export default ProfilePage;
