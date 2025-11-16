import NewsCardComponent from "../NewsCard/NewsCardComponent";
import type { News } from "../../types/News";
import type { SummaryItem } from "../../types/SummaryItem";

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
  const formatSummary = (text: string) => {
    const truncated = text.length > 300 ? text.substring(0, 300) + "..." : text;

    return truncated
      .replace(
        /^## (.*$)/gm,
        '<strong class="intellux-primary-summaries fs-6">$1</strong><br/>'
      )
      .replace(/\*\*(.*?):\*\*/g, '<strong class="text-dark">$1:</strong>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");
  };

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
              <div key={summary.id} className="col-12">
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <h6
                          className="card-title intellux-primary mb-1"
                          style={{ fontSize: 20 }}
                        >
                          📰 {summary.news.title}
                        </h6>
                        <small className="text-muted">
                          Resumo gerado em{" "}
                          {new Date(summary.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}{" "}
                          às{" "}
                          {new Date(summary.createdAt).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </small>
                      </div>
                    </div>

                    <div className="summary-content mb-3">
                      <div
                        style={{
                          lineHeight: "1.6",
                          fontSize: "0.95rem",
                          textAlign: "justify",
                          maxHeight: "200px",
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: formatSummary(summary.content),
                        }}
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-intellux-summaries btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(summary.news.url, "_blank");
                        }}
                      >
                        Ler notícia completa
                      </button>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSummary(summary.news.url);
                          }}
                        >
                          Ver completo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
