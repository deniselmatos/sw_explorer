import { useEffect, useState } from "react";
import { searchPlanets } from "../services/api";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  function formatValue(value, unit = "") {
    if (!value || value === "unknown") return "Unknown";

    if (!isNaN(value)) {
      const formatted = Number(value).toLocaleString("en-US");
      return unit ? `${formatted} ${unit}` : formatted;
    }

    return unit ? `${value} ${unit}` : value;
  }

  function generatePlanetDescription(planet) {
    return `${planet.name} has a ${planet.climate} climate and ${planet.terrain} terrain. 
It has a diameter of approximately ${formatValue(planet.diameter, "km")} 
and takes ${formatValue(planet.orbital_period, "days")} to orbit its star. 
Its gravity is ${planet.gravity}. 
The estimated population is ${formatValue(planet.population)} inhabitants, 
with about ${formatValue(planet.surface_water, "%")} surface water.`;
  }

  useEffect(() => {
    async function fetchPlanets() {
      if (search.trim() === "") {
        setPlanets([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchPlanets(search);
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, [search]);

  function toggleExpand(name) {
    setExpanded(expanded === name ? null : name);
  }

  return (
    <div>
      <h2>Planets</h2>

      <input
        type="text"
        placeholder="Search planet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Searching planets...</p>}

      {!loading && search.trim() !== "" && planets.length === 0 && (
        <p>No planets found.</p>
      )}

      {planets.map((planet) => (
        <div key={planet.name}>
          <h3>{planet.name}</h3>

          <button onClick={() => toggleExpand(planet.name)}>
            {expanded === planet.name ? "Hide" : "View more"}
          </button>

          {expanded === planet.name && (
            <p>{generatePlanetDescription(planet)}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlanetList;