function Tabs({ activeTab, setActiveTab }) {
  return (
    <div style={{ marginBottom: "20px" }}>
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
    </div>
  );
}

export default Tabs;
