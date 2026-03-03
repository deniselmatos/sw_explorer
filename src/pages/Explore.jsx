import { useState } from "react";

import CharacterList from "../components/CharacterList";
import PlanetList from "../components/PlanetList";
import StarshipList from "../components/StarshipList";
import SpeciesList from "../components/SpeciesList";
import FilmList from "../components/FilmList";

function Explore() {
  const [activeTab, setActiveTab] = useState("characters");

  function renderContent() {
    switch (activeTab) {
      case "characters":
        return <CharacterList />;
      case "planets":
        return <PlanetList />;
      case "starships":
        return <StarshipList />;
      case "species":
        return <SpeciesList />;
      case "films":
        return <FilmList />;
      default:
        return null;
    }
  }

  return (
    <div className="explore-page">
      <h1>Explore the Star Wars Universe</h1>

      <div className="tabs">
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

      <div className="explore-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Explore;