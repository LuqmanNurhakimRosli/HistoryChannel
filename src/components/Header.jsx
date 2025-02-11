import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div>
              <h1 className="text-2xl font-bold">Diary Cat</h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-4 items-center">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                  transition-colors duration-200`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                  transition-colors duration-200`
                }
              >
                Blog
              </NavLink>
            </li>

            {/* Show Dashboard and Profile if User is Logged In */}
            {user && (
              <>
                <li>
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                      transition-colors duration-200`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/profile" 
                    className={({ isActive }) => 
                      `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                      transition-colors duration-200`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Login/Register if Not Logged In */}
            {!user ? (
              <>
                <li>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                      transition-colors duration-200`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => 
                      `${isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'} 
                      transition-colors duration-200`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={logout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200" 
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;