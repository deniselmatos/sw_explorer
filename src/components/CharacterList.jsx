import { useEffect, useState } from "react";
import { searchPeople } from "../services/api";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSearch() {
      if (search.trim() === "") {
        setCharacters([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchPeople(search);
        setCharacters(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearch();
  }, [search]);

  return (
    <div>
      <h2>Characters</h2>

      <input
        type="text"
        placeholder="Search character..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Searching...</p>}

      {!loading && search.trim() !== "" && characters.length === 0 && (
        <p>No characters found.</p>
      )}

      {characters.map((character) => (
        <div key={character.name}>
          <h3>{character.name}</h3>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Gender: {character.gender}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;