import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navBar.css";

function Navbar() {
    //gives access to the current URL path
  const { pathname } = useLocation();
  const navigate = useNavigate();
    //token used to check if user is logged in 
  const token = localStorage.getItem("token");

  // Used to determine what paths to show based on url
  const isPublicPage =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  //logs out by removing all metadata and navigates to landing page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/");
  };
  //links shown to authenticated users
  const links = [
    { path: "/portfolio", label: "Portfolio" },
    { path: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="navbar">
      
      {/* links for authenticated users: Portfolio / Watchlist */}
      {token && !isPublicPage &&
        links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`navbar-link ${pathname === path ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}

      {/* links for unauthenticated users: Login / Signup */}
      {!token && (
        <>
          <Link
            to="/login"
            className={`navbar-link ${pathname === "/login" ? "active" : ""}`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className={`navbar-link ${pathname === "/signup" ? "active" : ""}`}
          >
            Sign Up
          </Link>
        </>
      )}

      {/* logout button on displayed to logged in users */}
      {token && !isPublicPage && (
        <button className="navbar-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
      
    </nav>
  );
}

export default Navbar;