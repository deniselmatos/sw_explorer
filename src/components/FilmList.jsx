FilmList.jsx
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";
import { getWikiData } from "../services/wikiService";
import placeholder from "/assets/placeholder.png";

function FilmList() {
  const { films, orderType, setOrderType, toggleFavorite, isFavorite } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);

  const filtered = [...films]
    .filter(f => f.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (orderType === "release") return new Date(a.release_date) - new Date(b.release_date);
      return a.episode_id - b.episode_id;
    });

  useEffect(() => {
    if (!selected) return;

    async function fetchImage() {
      const wiki = await getWikiData(selected.title);
      setImage(wiki.image);
    }

    fetchImage();
  }, [selected]);

  return (
    <div>
      <h2>Films</h2>
      <input
        type="text"
        placeholder="Search film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
        <option value="release">Release Order</option>
        <option value="chronological">Chronological Order</option>
      </select>

      <div className="grid">
        {filtered.map((film) => (
          <div key={film.id} className="card">
            <h3>{film.title}</h3>

            <button onClick={() => setSelected(film)}>View Details</button>
            <button onClick={() => toggleFavorite(film, "film")}>
              Favorite {isFavorite(film, "film") ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => { setSelected(null); setImage(null); }}>
          <h2>{selected.title}</h2>
          <img
            src={image || placeholder}
            alt={selected.title}
            onError={(e) => (e.target.src = placeholder)}
            style={{ width: "200px", marginBottom: "10px" }}
          />
          <p>Episode {selected.episode_id}, released on {selected.release_date}.</p>
          <p>{selected.opening_crawl}</p>
        </Modal>
      )}
    </div>
  );
}

export default FilmList;
