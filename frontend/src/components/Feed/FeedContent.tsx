import NewsCardComponent from "../NewsCard/NewsCardComponent";
import type { News } from "../../types/News";

interface FeedContentProps {
  newsToShow: News[];
  currentView: "all" | "favorites" | "summaries";
  onFavorite: (newsItem: News) => void;
  onSummary: (newsUrl: string) => void;
  isFavorited: (url: string) => boolean;
}

const FeedContent = ({
  newsToShow,
  currentView,
  onFavorite,
  onSummary,
  isFavorited,
}: FeedContentProps) => {
  return (
    <div className="col-md-10 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>
          {currentView === "favorites"
            ? "Notícias Favoritas"
            : "Todas as Notícias"}
        </h4>
        <small className="text-muted">
          {newsToShow.length} notícia(s) encontrada(s)
        </small>
      </div>

      {newsToShow.length > 0 ? (
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
        <div className="text-center">
          <p>
            {currentView === "favorites"
              ? "Você ainda não tem notícias favoritas."
              : "Nenhuma notícia encontrada."}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedContent;
