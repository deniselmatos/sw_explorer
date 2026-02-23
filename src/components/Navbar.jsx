import { useNavigate } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="navbar-logo" onClick={() => navigate("/")}>
        STAR WARS
      </h2>

      <div className="navbar-buttons">
        <button className="navbar-button" onClick={() => navigate("/")}>
          Home
        </button>

        <button className="navbar-button" onClick={() => navigate("/explore")}>
          Explorer
        </button>
      </div>
    </nav>
  );
}

export default Navbar;