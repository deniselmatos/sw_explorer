import { useState } from "react";
import Tabs from "../components/Tabs";
import CharacterList from "../components/CharacterList";
import PlanetList from "../components/PlanetList";
import StarshipList from "../components/StarshipList";
import SpeciesList from "../components/SpeciesList";
import FilmList from "../components/FilmList";

function Explore() {
  const [activeTab, setActiveTab] = useState("characters");

  return (
    <div style={{ padding: "20px", background: "#fff", minHeight: "100vh", color: "black" }}>
      <h1>Explore the Star Wars Universe</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {}
      {activeTab === "characters" && <CharacterList />}
      {activeTab === "planets" && <PlanetList />}
      {activeTab === "starships" && <StarshipList />}
      {activeTab === "species" && <SpeciesList />}
      {activeTab === "films" && <FilmList />}
    </div>
  );
}

export default Explore;

