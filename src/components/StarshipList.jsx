import { useEffect, useState } from "react";
import { getStarships } from "../services/api";

function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);

  function formatValue(value, unit = "") {
    if (!value || value === "unknown") return "Unknown";

    const cleanValue = value.replace(/,/g, "");

    if (!isNaN(cleanValue)) {
      return (
        Number(cleanValue).toLocaleString("en-US") +
        (unit ? ` ${unit}` : "")
      );
    }

    return value;
  }

  function generateDescription(ship) {
    return `${ship.name} is a ${ship.starship_class}. 
It has an approximate length of ${formatValue(ship.length, "m")} 
and a maximum atmospheric speed of ${formatValue(ship.max_atmosphering_speed)}. 
It can carry up to ${formatValue(ship.crew)} crew members and 
${formatValue(ship.passengers)} passengers. 
The manufacturer is ${ship.manufacturer}.`;
  }

  useEffect(() => {
    async function fetchStarships() {
      setLoading(true);
      try {
        const data = await getStarships();
        setStarships(data);
      } catch (error) {
        console.error("Error fetching starships:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStarships();
  }, []);

  const filteredStarships = starships.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleExpand(name) {
    setExpanded(expanded === name ? null : name);
  }

  return (
    <div>
      <h2>Starships</h2>

      <input
        type="text"
        placeholder="Search starship..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px" }}
      />

      {loading && <p>Loading starships...</p>}

      {!loading &&
        search.trim() !== "" &&
        filteredStarships.length === 0 && (
          <p>No starships found.</p>
        )}

      {search.trim() !== "" &&
        filteredStarships.map((ship) => (
          <div
            key={ship.name}
            style={{
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{ship.name}</h3>

            <button onClick={() => toggleExpand(ship.name)}>
              {expanded === ship.name ? "Hide" : "View more"}
            </button>

            {expanded === ship.name && (
              <div style={{ marginTop: "15px", lineHeight: "1.6" }}>
                <p>{generateDescription(ship)}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default StarshipList;