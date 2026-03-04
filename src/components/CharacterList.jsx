import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";
import { getCharacters } from "../services/api";
import { getWikiData } from "../services/wikiService";
import placeholder from "/assets/placeholder.png";

function CharacterList() {
  const { toggleFavorite, isFavorite } = useApp();

  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  const [planet, setPlanet] = useState("");
  const [films, setFilms] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getCharacters().then(setCharacters);
  }, []);

  const filtered = characters.filter((char) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "all" || char.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  useEffect(() => {
    if (!selected) return;

    async function fetchDetails() {
      try {
        setDescription("");
        setImage("");

        // Planeta
        const planetRes = await fetch(selected.homeworld);
        const planetData = await planetRes.json();
        setPlanet(planetData.name);

        // Filmes
        const filmsData = await Promise.all(
          selected.films.map((url) =>
            fetch(url).then((res) => res.json())
          )
        );
        setFilms(filmsData);

        const wiki = await getWikiData(selected.name);
        setDescription(wiki.description);
        setImage(wiki.image);
      } catch (err) {
        console.error(err);
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
        <Modal
          onClose={() => {
            setSelected(null);
            setPlanet("");
            setFilms([]);
            setDescription("");
            setImage("");
          }}
        >
          <h3>{selected.name}</h3>

          <img
            src={image || placeholder}
            alt={selected.name}
            onError={(e) => (e.target.src = placeholder)}
            style={{ width: "200px", marginBottom: "10px" }}
          />

          <p>
              {selected.name} is a {selected.gender} character born on {planet}.
              Appears in: {films.map(f => f.title).join(", ")}.
          </p>

          {description && <p>{description}</p>}
        </Modal>
      )}
    </div>
  );
}

export default CharacterList;