interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsTitle: string;
  summary: string;
  loading: boolean;
}

const SummaryModalComponent = ({
  isOpen,
  onClose,
  newsTitle,
  summary,
  loading,
}: ModalProps) => {
  if (!isOpen) return null;

  const formatSummary = (text: string) => {
    return text
      .replace(
        /^## (.*$)/gm,
        '<h5 class="text-primary mt-4 mb-3 border-bottom pb-2">$1</h5>'
      )
      .replace(
        /\*\*(.*?):\*\*/g,
        '<h6 class="text-dark mt-3 mb-2"><strong>$1:</strong></h6>'
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, "<br/>")
      .replace(/^/, '<p class="mb-3">')
      .replace(/$/, "</p>");
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <div>
              <h5
                className="modal-title intellux-primary mb-1"
                style={{ fontSize: 20 }}
              >
                Resumo Inteligente
              </h5>
              <small className="text-muted">Análise detalhada da notícia</small>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <div className="mb-3 p-3 bg-light rounded">
              <h6 className="text-dark mb-0 fw-bold">📰 {newsTitle}</h6>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Gerando resumo...</span>
                </div>
                <p className="text-muted">
                  Analisando conteúdo e gerando resumo inteligente...
                </p>
              </div>
            ) : (
              <div
                className="summary-content"
                style={{
                  lineHeight: "1.7",
                  fontSize: "0.95rem",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{
                  __html: formatSummary(summary),
                }}
              />
            )}
          </div>

          <div className="modal-footer bg-light">
            <small className="text-muted me-auto">
              Resumo gerado por IA • {new Date().toLocaleString("pt-BR")}
            </small>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModalComponent;
