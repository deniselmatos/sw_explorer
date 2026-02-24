import { useState } from "react";
import Tabs from "../components/Tabs";
import CharacterList from "../components/CharacterList";
import PlanetList from "../components/PlanetList";
import StarshipList from "../components/StarshipList";
import SpeciesList from "../components/SpeciesList";
import FilmList from "../components/FilmList";
import "./styles/Explore.css";
import FavoritesList from "../components/FavoritesList";

function Explore() {
  const [activeTab, setActiveTab] = useState("characters");

  return (
    <div className="explore-container">
      <p className="home-title">Explore the Star Wars Universe</p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {}
      {activeTab === "characters" && <CharacterList />}
      {activeTab === "planets" && <PlanetList />}
      {activeTab === "starships" && <StarshipList />}
      {activeTab === "species" && <SpeciesList />}
      {activeTab === "films" && <FilmList />}
      {activeTab === "favorites" && <FavoritesList />}
    </div>
  );
}

export default Explore;

