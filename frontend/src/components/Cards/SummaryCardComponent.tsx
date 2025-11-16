import type { SummaryItem } from "../../types/SummaryItem";

interface SummaryCardProps {
  summary: SummaryItem;
  onSummary: (newsUrl: string) => void;
}

const SummaryCardComponent = ({ summary, onSummary }: SummaryCardProps) => {
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

  return (
    <div key={summary.id} className="col-12">
      <div className="card h-100 shadow-sm" style={{ cursor: "pointer" }}>
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
                {new Date(summary.createdAt).toLocaleDateString("pt-BR")} às{" "}
                {new Date(summary.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
  );
};

export default SummaryCardComponent;
