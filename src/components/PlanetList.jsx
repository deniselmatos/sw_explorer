import { useEffect, useState } from "react";
import { searchPlanets } from "../services/api";

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const data = await searchPlanets("");
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  const filteredPlanets =
    search.trim() === ""
      ? planets
      : planets.filter((planet) =>
          planet.name.toLowerCase().includes(search.toLowerCase())
        );

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

      {loading && <p>Loading planets...</p>}

      {!loading && filteredPlanets.length === 0 && (
        <p>No planets found.</p>
      )}

      {filteredPlanets.map((planet) => (
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