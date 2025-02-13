import { Outlet, NavLink } from "react-router-dom";

const PostLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <nav className="flex space-x-4 border-b-2 pb-2 mb-4">
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="."
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="createblog"
          >
            Create Blog
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default PostLayout;
