import { Outlet, NavLink } from 'react-router-dom';

function FeedLayout() {
  return (
    <div className="min-h-screen mx-auto container px-6 py-12 bg-gradient-to-b from-gray-700 to-gray-900 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-center text-gray-100 mb-8">
          Latest Blog Posts
        </h1>
      
      <div className="flex justify-center gap-6 mb-6">
        <NavLink 
          className={({ isActive }) =>
            isActive 
              ? "px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md transition" 
              : "px-6 py-3 rounded-lg text-gray-300 bg-gray-700 hover:bg-blue-500 hover:text-white transition"
          } 
          to="blog"
          end
        >
          Public
        </NavLink>

        <NavLink 
          className={({ isActive }) =>
            isActive 
              ? "px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md transition" 
              : "px-6 py-3 rounded-lg text-gray-300 bg-gray-700 hover:bg-blue-500 hover:text-white transition"
          } 
          to="personal"
        >
          Private
        </NavLink>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}



export default FeedLayout;
