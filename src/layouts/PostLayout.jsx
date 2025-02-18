import { Outlet, NavLink } from "react-router-dom";

const PostLayout = () => {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-800 flex flex-col ">
      <div className="flex-grow w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mx-auto my-8">
        <nav className="flex space-x-4 border-b-2 pb-2 mb-4 justify-center">
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
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="manage-blog"
          >
            Manage Blog
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default PostLayout;