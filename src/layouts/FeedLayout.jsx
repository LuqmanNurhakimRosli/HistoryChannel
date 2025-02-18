import { Outlet, NavLink } from 'react-router-dom';

function FeedLayout() {
  return (
    <div className="min-h-screen mx-auto container px-4 py-8 bg-gradient-to-br from-blue-300 to-blue-800">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">
        Latest Blog Posts
      </h1>

      <div className="flex justify-center gap-6 mb-6">
        <NavLink 
          className={({ isActive }) =>
            isActive 
              ? "px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition" 
              : "px-6 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-blue-500 hover:text-white transition"
          } 
          to="blog"
          end
        >
          Public
        </NavLink>

        <NavLink 
          className={({ isActive }) =>
            isActive 
              ? "px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition" 
              : "px-6 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-blue-500 hover:text-white transition"
          } 
          to="personal"
        >
          Private
        </NavLink>
      </div>

      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  );
}

export default FeedLayout;
