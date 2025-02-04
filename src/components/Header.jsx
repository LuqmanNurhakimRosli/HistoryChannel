import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <Link to="/" className="logo" aria-label="Go to Home">
            <img src="/logo.svg" alt="History Channel Logo" />
            <h1>History Channel</h1>
          </Link>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            

            {/* Show Dashboard if User is Logged In */}
            {user && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Show Login/Register if Not Logged In */}
            {!user ? (
              <>
              <li>
                  <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logout} className="logout-btn">
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
