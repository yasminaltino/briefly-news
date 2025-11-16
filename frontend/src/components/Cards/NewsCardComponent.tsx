import type { News } from "../../types/News";

interface NewsCardProps {
  news: News;
  onFavorite: (news: News) => void;
  onSummary: (newsId: string) => void;
  isFavorited?: boolean;
}

const NewsCardComponent = ({
  news,
  onFavorite,
  onSummary,
  isFavorited = false,
}: NewsCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== "BUTTON") {
      window.open(news.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      {news.urlToImage && (
        <div className="image-zoom-container">
          <img
            src={news.urlToImage}
            className="card-img-top image-zoom"
            alt={news.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h6
          className="card-title"
          style={{
            fontSize: "1rem",
            lineHeight: "1.3",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {news.title}
        </h6>

        <p
          className="card-text flex-grow-1"
          style={{
            fontSize: "0.85rem",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {news.description}
        </p>

        {news.source && (
          <small className="text-muted mb-2 d-block">{news.source.name}</small>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onSummary(news.url)}
              style={{ fontSize: "0.75rem" }}
            >
              ◊ Resumo
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                isFavorited ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => onFavorite(news)}
              style={{ fontSize: "0.75rem" }}
            >
              ♥
            </button>
          </div>

          <small className="text-muted">
            {new Date(news.publishedAt).toLocaleDateString("pt-BR")}
          </small>
        </div>
      </div>
    </div>
  );
};

export default NewsCardComponent;
