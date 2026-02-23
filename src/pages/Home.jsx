import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">STAR WARS</h1>

      <h2 className="home-subtitle">
        "A long time ago in a galaxy far, far away...."
      </h2>

      <p className="home-text">
        Star Wars is one of the greatest science fiction sagas of all time.
        Explore characters, planets, starships, species and films from the universe
        created by George Lucas.
      </p>

      <button onClick={() => navigate("/explore")}>
        Explore Universe
      </button>
    </div>
  );
}

export default Home;