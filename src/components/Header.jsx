import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Home, FileText, User, LogOut, LogIn, UserPlus, PenLine } from "lucide-react"; // Icons

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">OwlScribe</h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-6">
          <NavItem to="/" icon={<Home size={22} />} tooltip="Home" />
          <NavItem to="/blog" icon={<FileText size={22} />} tooltip="Blog" />
          {user && (
            <>
              <NavItem to="/dashboard" icon={<User size={22} />} tooltip="Dashboard" />
              <NavItem to="/createblog" icon={<PenLine size={22} />} tooltip="New Post" />
            </>
          )}
          {!user ? (
            <>
              <NavItem to="/login" icon={<LogIn size={22} />} tooltip="Login" />
              <NavItem to="/register" icon={<UserPlus size={22} />} tooltip="Register" />
            </>
          ) : (
            <li>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200 flex items-center space-x-2"
                aria-label="Logout"
              >
                <LogOut size={22} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          onClick={closeMenu}
        ></div>

        <div
          className={`fixed top-0 right-0 w-2/3 max-w-xs h-full bg-gray-900 text-white p-6 shadow-lg transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
          aria-hidden={!isMenuOpen}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            ✖
          </button>

          <ul className="flex flex-col space-y-4 mt-8 text-white">
            <NavItem to="/" icon={<Home size={22} />} tooltip="Home" closeMenu={closeMenu} />
            <NavItem to="/blog" icon={<FileText size={22} />} tooltip="Blog" closeMenu={closeMenu} />
            {user && (
              <>
                <NavItem to="/dashboard" icon={<User size={22} />} tooltip="Dashboard" closeMenu={closeMenu} />
                <NavItem to="/dashboard/createblog" icon={<PenLine size={22} />} tooltip="New Post" closeMenu={closeMenu} />
              </>
            )}
            {!user ? (
              <>
                <NavItem to="/login" icon={<LogIn size={22} />} tooltip="Login" closeMenu={closeMenu} />
                <NavItem to="/register" icon={<UserPlus size={22} />} tooltip="Register" closeMenu={closeMenu} />
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogOut size={22} />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function NavItem({ to, icon, tooltip, closeMenu }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"} transition-colors duration-200 flex items-center space-x-2`
        }
        onClick={closeMenu ? () => closeMenu() : undefined}
        aria-label={tooltip}
      >
        {icon}
        <span className="hidden md:inline">{tooltip}</span>
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  closeMenu: PropTypes.func,
};

export default Header;
