import { useEffect, useState } from "react";
import { getFilms } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Modal from "./Modal";

function FilmList() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [order, setOrder] = useState("release"); 

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadFilms() {
      const swapiFilms = await getFilms();

      const sequelFilms = [
        {
          title: "Star Wars: The Force Awakens",
          episode_id: 7,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2015-12-18",
          opening_crawl: "Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed. With the support of the REPUBLIC, General Leia Organa leads a brave RESISTANCE. She is desperate to find her brother Luke and gain his help in restoring peace and justice to the galaxy. Leia has sent her most daring pilot on a secret mission to Jakku, where an old ally has discovered a clue to Luke's whereabouts...."
        },
        {
          title: "Star Wars: The Last Jedi",
          episode_id: 8,
          director: "Rian Johnson",
          producer: "Kathleen Kennedy",
          release_date: "2017-12-15",
          opening_crawl: "The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy. Only General Leia Organa's band of RESISTANCE fighters stand against the rising tyranny, certain that Jedi Master Luke Skywalker will return and restore a spark of hope to the fight. But the Resistance has been exposed. As the First Order speeds toward the rebel base, the brave heroes mount a desperate escape…"
        },
        {
          title: "Star Wars: The Rise of Skywalker",
          episode_id: 9,
          director: "J.J. Abrams",
          producer: "Kathleen Kennedy",
          release_date: "2019-12-20",
          opening_crawl: "The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE. GENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER. Meanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power...."
        }
      ];

      setFilms([...swapiFilms, ...sequelFilms]);
    }

    loadFilms();
  }, []);

  const filtered = films
    .filter(f =>
      f.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "release") {
        return new Date(a.release_date) - new Date(b.release_date);
      }
      if (order === "chronological") {
        return a.episode_id - b.episode_id;
      }
      return 0;
    });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Films</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="Search film..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={order}
          onChange={e => setOrder(e.target.value)}
        >
          <option value="release">Release Order</option>
          <option value="chronological">Chronological Order</option>
        </select>
      </div>

      <div className="results-container">
        {filtered.map(f => (
          <div key={f.title} className="result-card">
            <h3>{f.title}</h3>

            <button onClick={() => setSelected(f)}>
              View Details
            </button>

            <button onClick={() =>
              toggleFavorite({ id: f.title, type: "film", data: f })
            }>
              {isFavorite(f.title, "film") ? "★ Remove" : "☆ Favorite"}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <h2>{selected.title}</h2>
            <p>
              Episode {selected.episode_id} was directed by {selected.director}
              and produced by {selected.producer}. It was released on
              {` ${selected.release_date}. `}
              {selected.opening_crawl}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default FilmList;