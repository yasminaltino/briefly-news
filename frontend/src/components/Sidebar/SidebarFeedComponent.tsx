interface SidebarProps {
  onShowFavorites: () => void;
  onShowAllNews: () => void;
  currentView: "all" | "favorites" | "summaries";
}

const SidebarFeedComponent = ({
  onShowFavorites,
  onShowAllNews,
  currentView,
}: SidebarProps) => {
  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <div className="d-flex flex-column gap-3">
        <button
          className={`btn text-center p-2 ${
            currentView === "all"
              ? "btn-sidebar-active"
              : "btn-sidebar-inactive"
          }`}
          onClick={onShowAllNews}
        >
          Todas as Notícias
        </button>

        <button
          className={`btn text-center p-2 ${
            currentView === "favorites"
              ? "btn-sidebar-active"
              : "btn-sidebar-inactive"
          }`}
          onClick={onShowFavorites}
        >
          Favoritos
        </button>

        <button
          className={`btn text-center p-2 ${
            currentView === "summaries"
              ? "btn-sidebar-active"
              : "btn-sidebar-inactive"
          }`}
          onClick={() => console.log("Resumos clicado")}
        >
          Resumos
        </button>
      </div>
    </div>
  );
};

export default SidebarFeedComponent;
