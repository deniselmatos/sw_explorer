function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-container">
      <button onClick={() => setActiveTab("characters")}>
        Characters
      </button>

      <button onClick={() => setActiveTab("planets")}>
        Planets
      </button>

      <button onClick={() => setActiveTab("starships")}>
        Starships
      </button>

      <button onClick={() => setActiveTab("species")}>
        Species
      </button>

      <button onClick={() => setActiveTab("films")}>
        Films
      </button>

      <button onClick={() => setActiveTab("favorites")}>
         Favorites
      </button>
    </div>
  );
}

export default Tabs;
