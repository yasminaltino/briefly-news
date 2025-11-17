import { useAuth } from "../../hooks/useAuth";
import intelluxLogo from "../../assets/intellux-logo.webp";

const FeedHeaderComponent = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");

    if (confirmLogout) {
      logout();
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-intellux-feed pt-2 pt-md-3">
      <div className="container">
        <nav className="navbar card-intellux-bg px-3 px-md-4 py-2 rounded-pill">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <img
                  src={intelluxLogo}
                  alt="Intellux Logo"
                  style={{ height: "28px" }}
                  className="d-none d-sm-block me-2"
                />
              </div>
              <a className="navbar-brand intellux-primary fw-bold fs-5 mb-0 d-md-none">
                intellux
              </a>

              {user && (
                <span className="text-muted small d-none d-md-inline">
                  Olá, {user.firstName || "Usuário"}!
                </span>
              )}
            </div>

            <button
              className="btn btn-intellux btn-sm"
              type="button"
              onClick={handleLogout}
            >
              <span className="d-none d-md-inline">Sair / Trocar conta</span>
              <span className="d-inline d-md-none">Sair</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default FeedHeaderComponent;
