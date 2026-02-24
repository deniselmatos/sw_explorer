import { useEffect, useState } from "react";
import { getCharacters } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [details, setDetails] = useState({});

  const [gender, setGender] = useState("all");
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [planetFilter, setPlanetFilter] = useState("all");

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      const data = await getCharacters();
      setCharacters(data);
      setLoading(false);
    }
    fetchCharacters();
  }, []);

  async function fetchDetails(character) {
    if (details[character.name]) return;

    const homeworld = await fetch(character.homeworld).then(res => res.json());

    const films = await Promise.all(
      character.films.map(url => fetch(url).then(res => res.json()))
    );

    const starships = await Promise.all(
      character.starships.map(url => fetch(url).then(res => res.json()))
    );

    setDetails(prev => ({
      ...prev,
      [character.name]: { homeworld, films, starships }
    }));
  }

  function toggleExpand(character) {
    if (expanded === character.name) {
      setExpanded(null);
    } else {
      setExpanded(character.name);
      fetchDetails(character);
    }
  }

  const uniquePlanets = [
    ...new Set(characters.map(c => c.homeworld))
  ];

  const filtered = characters.filter(c => {
    const matchGender =
      gender === "all" || c.gender === gender;

    const matchMin =
      minHeight === "" ||
      (c.height !== "unknown" && Number(c.height) >= Number(minHeight));

    const matchMax =
      maxHeight === "" ||
      (c.height !== "unknown" && Number(c.height) <= Number(maxHeight));

    const matchPlanet =
      planetFilter === "all" || c.homeworld === planetFilter;

    return matchGender && matchMin && matchMax && matchPlanet;
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Characters</h2>

      {/* FILTROS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "30px"
      }}>
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="all">All Genders</option>
          {[...new Set(characters.map(c => c.gender))].map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Height"
          value={minHeight}
          onChange={e => setMinHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Height"
          value={maxHeight}
          onChange={e => setMaxHeight(e.target.value)}
        />

        <select value={planetFilter} onChange={e => setPlanetFilter(e.target.value)}>
          <option value="all">All Planets</option>
          {uniquePlanets.map((p, index) => (
            <option key={index} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <div className="results-container">
        {filtered.map(character => (
          <div key={character.name} className="result-card">

            <h3>{character.name}</h3>

            <button onClick={() =>
              toggleFavorite({
                id: character.name,
                type: "character",
                data: character
              })
            }>
              {isFavorite(character.name) ? "★ Remove" : "☆ Favorite"}
            </button>

            <br /><br />

            <button onClick={() => toggleExpand(character)}>
              {expanded === character.name ? "Hide" : "View Details"}
            </button>

            {expanded === character.name && details[character.name] && (
              <div style={{ marginTop: "15px" }}>
                <p><strong>Homeworld:</strong> {details[character.name].homeworld.name}</p>

                <p><strong>Films:</strong></p>
                <ul>
                  {details[character.name].films.map(f =>
                    <li key={f.title}>{f.title}</li>
                  )}
                </ul>

                <p><strong>Starships:</strong></p>
                <ul>
                  {details[character.name].starships.length === 0
                    ? <li>None</li>
                    : details[character.name].starships.map(s =>
                        <li key={s.name}>{s.name}</li>
                      )
                  }
                </ul>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;