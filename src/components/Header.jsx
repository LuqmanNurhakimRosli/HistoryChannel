import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { Home, FileText, User, LogOut, LogIn, UserPlus, PenLine } from "lucide-react";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">OwlScribe</h1>
        </Link>

        {/* Desktop Navigation */}
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
        <Menu as="div" className="md:hidden relative">
          <Menu.Button className="text-white text-2xl focus:outline-none">☰</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-48 bg-gray-900 text-white shadow-lg rounded-md z-50">
              <div className="flex flex-col py-2">
                <MenuItem to="/" icon={<Home size={22} />} label="Home" />
                <MenuItem to="/blog" icon={<FileText size={22} />} label="Blog" />
                {user && (
                  <>
                    <MenuItem to="/dashboard" icon={<User size={22} />} label="Dashboard" />
                    <MenuItem to="/createblog" icon={<PenLine size={22} />} label="New Post" />
                  </>
                )}
                {!user ? (
                  <>
                    <MenuItem to="/login" icon={<LogIn size={22} />} label="Login" />
                    <MenuItem to="/register" icon={<UserPlus size={22} />} label="Register" />
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700"
                  >
                    <LogOut size={22} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </header>
  );
}

function NavItem({ to, icon, tooltip }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"} transition-colors duration-200 flex items-center space-x-2`
        }
        aria-label={tooltip}
      >
        {icon}
        <span className="hidden md:inline">{tooltip}</span>
      </NavLink>
    </li>
  );
}

function MenuItem({ to, icon, label }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={to}
          className={`flex items-center space-x-2 px-4 py-2 ${active ? "bg-gray-700" : ""}`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      )}
    </Menu.Item>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
};

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default Header;
