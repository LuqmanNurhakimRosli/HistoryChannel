import {Outlet, NavLink} from 'react-router-dom'

function FeedLayout() {
  return (
    <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Latest Blog Posts
        </h1>

        <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="blog"
            end
          >Public</NavLink>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "active-link px-4 py-2 rounded-lg bg-blue-500 text-white" : 
                         "default-link px-4 py-2 rounded-lg hover:bg-gray-200"} 
            to="private"
          >Private</NavLink>
          
          <div>
            <Outlet />
          </div>
    </div>
  )
}

export default FeedLayout