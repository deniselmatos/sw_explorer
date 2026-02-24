import { useEffect, useState } from "react";
import { getPlanets } from "../services/api";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const [climate, setClimate] = useState("all");
  const [minPopulation, setMinPopulation] = useState("");
  const [maxPopulation, setMaxPopulation] = useState("");

  useEffect(() => {
    async function fetchPlanets() {
      setLoading(true);
      try {
        const data = await getPlanets();
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  function toggleExpand(name) {
    setExpanded(expanded === name ? null : name);
  }

  // Climas únicos
  const uniqueClimates = [
    ...new Set(planets.map(p => p.climate))
  ];

  // Aplicar filtros
  const filteredPlanets = planets.filter(planet => {

    const matchClimate =
      climate === "all" || planet.climate === climate;

    const population = planet.population === "unknown"
      ? null
      : Number(planet.population);

    const matchMin =
      minPopulation === "" ||
      (population !== null && population >= Number(minPopulation));

    const matchMax =
      maxPopulation === "" ||
      (population !== null && population <= Number(maxPopulation));

    return matchClimate && matchMin && matchMax;
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Star Wars Planets
      </h2>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}
      >
        <select
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
        >
          <option value="all">All Climates</option>
          {uniqueClimates.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Population"
          value={minPopulation}
          onChange={(e) => setMinPopulation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Population"
          value={maxPopulation}
          onChange={(e) => setMaxPopulation(e.target.value)}
        />
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading planets...
        </p>
      )}

      <div className="results-container">
        {filteredPlanets.map((planet) => (
          <div key={planet.name} className="result-card">

            <h3>{planet.name}</h3>

            <button onClick={() => toggleExpand(planet.name)}>
              {expanded === planet.name
                ? "Hide"
                : "View details"}
            </button>

            {expanded === planet.name && (
              <div style={{ marginTop: "15px" }}>
                <p><strong>Climate:</strong> {planet.climate}</p>
                <p><strong>Terrain:</strong> {planet.terrain}</p>
                <p><strong>Population:</strong> {planet.population}</p>
                <p><strong>Gravity:</strong> {planet.gravity}</p>
                <p><strong>Diameter:</strong> {planet.diameter}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanetList;