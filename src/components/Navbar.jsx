import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <h2 
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        STAR WARS
      </h2>

      <div>
        <button 
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button 
          style={styles.button}
          onClick={() => navigate("/explore")}
        >
          Explorer
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    color: "#000000"
  },
  logo: {
    margin: 0,
    cursor: "pointer"
  },
  button: {
    marginLeft: "20px",
    padding: "8px 15px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Navbar;
