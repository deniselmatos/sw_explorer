import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";
import { getCharacters } from "../services/api";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);

  const { toggleFavorite, isFavorite } = useApp();

  useEffect(() => {
    async function loadCharacters() {
      const data = await getCharacters();
      setCharacters(data);
      setFiltered(data);
    }
    loadCharacters();
  }, []);

  useEffect(() => {
    let result = characters;

    if (search) {
      result = result.filter(char =>
        char.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genderFilter !== "all") {
      result = result.filter(char => char.gender === genderFilter);
    }

    setFiltered(result);
  }, [search, genderFilter, characters]);

  useEffect(() => {
    if (!selected) return;

    async function fetchDetails() {
      try {
        const planetRes = await fetch(selected.homeworld);
        const planetData = await planetRes.json();
        setPlanet(planetData.name);

        const filmPromises = selected.films.map(url =>
          fetch(url).then(res => res.json())
        );

        const filmsData = await Promise.all(filmPromises);
        setFilms(filmsData);
      } catch (error) {
        console.error("Error loading details:", error);
      }
    }

    fetchDetails();
  }, [selected]);

  return (
    <div>
      <h2>Characters</h2>

      <input
        type="text"
        placeholder="Search character..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="all">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="n/a">N/A</option>
      </select>

      <div className="grid">
        {filtered.map((char) => (
          <div key={char.url} className="card">
            <h3>{char.name}</h3>

            <button onClick={() => setSelected(char)}>
              Details
            </button>

            <button onClick={() => toggleFavorite(char, "character")}>
              Favorite {isFavorite(char, "character") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => {
          setSelected(null);
          setPlanet(null);
          setFilms([]);
        }}>
          <h3>{selected.name}</h3>

          {planet && (
            <p>
              {selected.name} is a {selected.gender} character born on {planet}.
              Appears in: {films.map(f => f.title).join(", ")}.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default CharacterList;