import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to Your Dashboard, {user ? user.displayName : "Guest"}!</h1>
        <p className="text-lg text-gray-600 mb-6">This is the Dashboard page, where you can manage your settings and view important information.</p>

        <div className="space-x-4">
          <Link to="/blog" className="inline-block px-6 py-3 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-300">
            Go to Blog
          </Link>
          <Link to="/profile" className="inline-block px-6 py-3 text-lg text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-300">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
