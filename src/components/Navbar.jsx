import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img
        src="/assets/starwars-logo.png"
        alt="Star Wars"
        className="navbar-logo"
        onClick={() => navigate("/")}
      />

      <div className="navbar-buttons">
        <button className="navbar-button" onClick={() => navigate("/")}>
          Home
        </button>

        <button
          className="navbar-button"
          onClick={() => navigate("/explore")}
        >
          Explorer
        </button>

        <button
          className="navbar-button"
          onClick={() => navigate("/favorites")}
        >
          Favorites and Lists
        </button>
      </div>
    </nav>
  );
}

export default Navbar;