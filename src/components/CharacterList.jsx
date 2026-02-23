import { useEffect, useState } from "react";
import { searchPeople } from "../services/api";

function CharacterList() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      try {
        const data = await searchPeople(""); 
        setAllCharacters(data);
        setCharacters(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setCharacters(allCharacters);
    } else {
      const filtered = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
      setCharacters(filtered);
    }
  }, [search, allCharacters]);

  return (
  <div>
    <h2 style={{ textAlign: "center" }}>Characters</h2>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search character..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {loading && <p style={{ textAlign: "center" }}>Loading characters...</p>}

    {!loading && characters.length === 0 && (
      <p style={{ textAlign: "center" }}>No characters found.</p>
    )}

    <div className="results-container">
      {characters.map((character) => (
        <div key={character.name} className="result-card">
          <h3>{character.name}</h3>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Gender: {character.gender}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default CharacterList;