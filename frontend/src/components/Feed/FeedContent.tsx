import NewsCardComponent from "../Cards/NewsCardComponent";
import type { News } from "../../types/News";
import type { SummaryItem } from "../../types/SummaryItem";
import SummaryCardComponent from "../Cards/SummaryCardComponent";

interface FeedContentProps {
  newsToShow: News[];
  summaries?: SummaryItem[];
  currentView: "all" | "favorites" | "summaries";
  onFavorite: (newsItem: News) => void;
  onSummary: (newsUrl: string) => void;
  isFavorited: (url: string) => boolean;
}

const FeedContent = ({
  newsToShow,
  summaries = [],
  currentView,
  onFavorite,
  onSummary,
  isFavorited,
}: FeedContentProps) => {
  const getTitle = () => {
    switch (currentView) {
      case "favorites":
        return "Notícias Favoritas";
      case "summaries":
        return "Meus Resumos";
      default:
        return "Todas as Notícias";
    }
  };

  const getCount = () => {
    return currentView === "summaries" ? summaries.length : newsToShow.length;
  };

  const getEmptyMessage = () => {
    switch (currentView) {
      case "favorites":
        return "Você ainda não tem notícias favoritas.";
      case "summaries":
        return "Você ainda não tem resumos salvos. Comece gerando resumos das notícias!";
      default:
        return "Nenhuma notícia encontrada.";
    }
  };

  return (
    <div className="col-md-10 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{getTitle()}</h4>
        <small className="text-muted">
          {getCount()}{" "}
          {currentView === "summaries" ? "resumo(s)" : "notícia(s)"}{" "}
          encontrada(s)
        </small>
      </div>

      {currentView === "summaries" ? (
        summaries.length > 0 ? (
          <div className="row g-3">
            {summaries.map((summary) => (
              <SummaryCardComponent summary={summary} onSummary={onSummary} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4"></div>
            <h5 className="text-muted">Nenhum resumo encontrado</h5>
            <p className="text-muted">{getEmptyMessage()}</p>
          </div>
        )
      ) : newsToShow.length > 0 ? (
        <div className="row g-3">
          {newsToShow.map((newsItem, index) => (
            <div
              key={newsItem.url || index}
              className="col-lg-4 col-md-6 col-sm-12"
            >
              <NewsCardComponent
                news={newsItem}
                onFavorite={onFavorite}
                onSummary={onSummary}
                isFavorited={isFavorited(newsItem.url)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">{getEmptyMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default FeedContent;
