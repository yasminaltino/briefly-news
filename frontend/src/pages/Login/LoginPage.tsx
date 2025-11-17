import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import intelluxLogo from "../../assets/intellux-logo.webp";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const error = urlParams.get("error");

    if (error) {
      alert(`Erro no login: ${error}`);
    }
  }, [location]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dots">
      <div
        className="card shadow card-intellux-bg"
        style={{ maxWidth: "550px", width: "100%", minHeight: "350px" }}
      >
        <div className="card-body p-4 d-flex flex-column justify-content-center">
          <div className="text-center mb-4">
            <img
              src={intelluxLogo}
              alt="Intellux Logo"
              style={{ height: "45px", marginRight: "10px" }}
            />
            <p className="text-muted">Entre com sua conta Google</p>
          </div>

          <button
            className="btn btn-google w-100 py-3 d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              width="20"
              height="20"
              className="me-3"
            />
            Entrar com o Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
