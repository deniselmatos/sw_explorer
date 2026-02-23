import { useEffect, useState } from "react";
import { getSpecies } from "../services/api";

function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);

  function formatValue(value, unit = "") {
    if (!value || value === "unknown") return "Unknown";

    if (!isNaN(value)) {
      return Number(value).toLocaleString("en-US") + (unit ? ` ${unit}` : "");
    }

    return value;
  }

  function generateDescription(specie) {
    return `${specie.name} is classified as ${specie.classification} 
with a designation of ${specie.designation}. 
The average height is ${formatValue(specie.average_height, "cm")} 
and the average lifespan is ${formatValue(specie.average_lifespan, "years")}. 
They commonly speak ${specie.language}.`;
  }

  useEffect(() => {
    async function fetchSpecies() {
      setLoading(true);
      try {
        const data = await getSpecies(); // 👈 AQUI está a correção
        setSpecies(data);
      } catch (error) {
        console.error("Error fetching species:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecies();
  }, []);

  const filteredSpecies =
    search.trim() === ""
      ? species
      : species.filter((specie) =>
          specie.name.toLowerCase().includes(search.toLowerCase())
        );

  function toggleExpand(name) {
    setExpanded(expanded === name ? null : name);
  }

return (
  <div>
    <h2 style={{ textAlign: "center" }}>Species</h2>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search species..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {loading && (
      <p style={{ textAlign: "center" }}>Loading species...</p>
    )}

    {!loading && filteredSpecies.length === 0 && (
      <p style={{ textAlign: "center" }}>No species found.</p>
    )}

    <div className="results-container">
      {filteredSpecies.map((specie) => (
        <div key={specie.name} className="result-card">
          <h3>{specie.name}</h3>

          <button onClick={() => toggleExpand(specie.name)}>
            {expanded === specie.name ? "Hide" : "View more"}
          </button>

          {expanded === specie.name && (
            <p>{generateDescription(specie)}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);
}

export default SpeciesList;


