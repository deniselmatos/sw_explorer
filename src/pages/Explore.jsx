import { useState } from "react";
import CharacterList from "../components/CharacterList";
import PlanetList from "../components/PlanetList";
import StarshipList from "../components/StarshipList";
import SpeciesList from "../components/SpeciesList";
import FilmList from "../components/FilmList";
import "./styles/favorites.css";

function Explore() {
  const [activeTab, setActiveTab] = useState("characters");

  return (
    <div className="favorites-page">
      <h1>Explore the Star Wars Universe</h1>

      <div className="favorites-tabs">
        <button
          className={activeTab === "characters" ? "active" : ""}
          onClick={() => setActiveTab("characters")}
        >
          Characters
        </button>

        <button
          className={activeTab === "planets" ? "active" : ""}
          onClick={() => setActiveTab("planets")}
        >
          Planets
        </button>

        <button
          className={activeTab === "starships" ? "active" : ""}
          onClick={() => setActiveTab("starships")}
        >
          Starships
        </button>

        <button
          className={activeTab === "species" ? "active" : ""}
          onClick={() => setActiveTab("species")}
        >
          Species
        </button>

        <button
          className={activeTab === "films" ? "active" : ""}
          onClick={() => setActiveTab("films")}
        >
          Films
        </button>
      </div>

      <div className="favorites-grid">
        {activeTab === "characters" && <CharacterList />}
        {activeTab === "planets" && <PlanetList />}
        {activeTab === "starships" && <StarshipList />}
        {activeTab === "species" && <SpeciesList />}
        {activeTab === "films" && <FilmList />}
      </div>
    </div>
  );
}

export default Explore;