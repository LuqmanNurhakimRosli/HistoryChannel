import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import PropTypes from 'prop-types';

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">OwlScribe</h1>
        </Link>

        {/* Hamburger Menu */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <NavItem to="/" label="Home" />
          <NavItem to="/blog" label="Blog" />
          {user && (
            <>
              <NavItem to="/dashboard" label="Dashboard" />
              <NavItem to="/profile" label="Profile" />
            </>
          )}
          {!user ? (
            <>
              <NavItem to="/login" label="Login" />
              <NavItem to="/register" label="Register" />
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Slide-in Menu */}
            <div className={`fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white p-6 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
              <button
                className="absolute top-5 right-5 text-white text-2xl"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                ✖
              </button>

              <ul className="flex flex-col space-y-4 mt-8">
                <NavItem to="/" label="Home" closeMenu={() => setIsMenuOpen(false)} />
                <NavItem to="/blog" label="Blog" closeMenu={() => setIsMenuOpen(false)} />
                {user && (
                  <>
                    <NavItem to="/dashboard" label="Dashboard" closeMenu={() => setIsMenuOpen(false)} />
                    <NavItem to="/profile" label="Profile" closeMenu={() => setIsMenuOpen(false)} />
                  </>
                )}
                {!user ? (
                  <>
                    <NavItem to="/login" label="Login" closeMenu={() => setIsMenuOpen(false)} />
                    <NavItem to="/register" label="Register" closeMenu={() => setIsMenuOpen(false)} />
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors duration-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  to: PropTypes.string.isRequired,
};

function NavItem({ to, label, closeMenu }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"} transition-colors duration-200`
        }
        onClick={closeMenu ? () => closeMenu() : undefined}
      >
        {label}
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closeMenu: PropTypes.func,
};

export default Header;
