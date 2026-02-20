function Tabs({ activeTab, setActiveTab }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setActiveTab("characters")}>
        👤 Personagens
      </button>

      <button onClick={() => setActiveTab("planets")}>
        🌍 Planetas
      </button>

      <button onClick={() => setActiveTab("starships")}>
        🚀 Naves
      </button>

      <button onClick={() => setActiveTab("films")}>
        🎬 Filmes
      </button>
    </div>
  );
}

export default Tabs;
