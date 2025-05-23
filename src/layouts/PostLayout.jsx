import { Outlet, NavLink } from "react-router-dom";

const PostLayout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-900  flex flex-col ">
      <div className="flex-grow w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mx-auto my-8">
        <nav className="flex space-x-4 border-b-2 pb-2 mb-4 justify-center">
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="profile"
            end
          >
            Profile
          </NavLink>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="analytics"
            end
          >
            Analytics
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
        <div className="bg-gray-100">
        <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default PostLayout;