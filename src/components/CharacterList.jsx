import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getCharacters } from "../services/api";
import Modal from "./Modal";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [planetNames, setPlanetNames] = useState({});
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [planetFilter, setPlanetFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [films, setFilms] = useState([]);

  const { toggleFavorite, isFavorite } = useFavorites();

 useEffect(() => {
  async function fetchData() {
    const all = await getCharacters();
    setCharacters(all);

    const uniquePlanets = [...new Set(all.map(c => c.homeworld))];
    const planetMap = {};

    await Promise.all(
      uniquePlanets.map(async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        planetMap[url] = data.name;
      })
    );

    setPlanetNames(planetMap);
  }

  fetchData();
}, []);

  async function openModal(character) {
    setSelected(character);

    const filmsData = await Promise.all(
      character.films.map(url => fetch(url).then(r => r.json()))
    );

    setFilms(filmsData);
  }

  const filtered = characters.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase());

    const matchGender =
      gender === "all" || c.gender === gender;

    const matchPlanet =
      planetFilter === "all" ||
      planetNames[c.homeworld] === planetFilter;

    return matchSearch && matchGender && matchPlanet;
  });

  const uniquePlanets = Object.values(planetNames);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Characters</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="Search character..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="all">All Genders</option>
          {[...new Set(characters.map(c => c.gender))].map(g =>
            <option key={g}>{g}</option>
          )}
        </select>

        <select value={planetFilter} onChange={e => setPlanetFilter(e.target.value)}>
          <option value="all">All Planets</option>
          {uniquePlanets.map((p,i) =>
            <option key={i}>{p}</option>
          )}
        </select>
      </div>

      <div className="results-container">
        {filtered.map(c => (
          <div key={c.name} className="result-card">
            <h3>{c.name}</h3>

            <button onClick={() => openModal(c)}>
              View Details
            </button>

            <button onClick={() =>
              toggleFavorite({ id: c.name, type: "character", data: c })
            }>
              {isFavorite(c.name, "character") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>
              {selected.name} is a {selected.gender} character from the planet
              {" "} {planetNames[selected.homeworld]}.
              This character appears in {films.map(f => f.title).join(", ")}.
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default CharacterList;