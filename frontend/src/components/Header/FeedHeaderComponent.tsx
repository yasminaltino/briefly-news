const FeedHeaderComponent = () => {
  return (
    <div
      className="bg-intellux-feed pt-1"
      style={{ paddingLeft: "200px", paddingRight: "200px" }}
    >
      <nav className="navbar card-intellux-bg px-4 py-2 rounded-pill">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <a className="navbar-brand intellux-primary fw-bold fs-3 me-4">
              intellux
            </a>
          </div>
          <form className="d-flex" role="search">
            <button className="btn btn-intellux" type="submit">
              Sair / Trocar conta
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default FeedHeaderComponent;
