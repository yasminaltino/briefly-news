import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useUrlAuth = () => {
  const location = useLocation();
  const { saveAuthData } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const userStr = urlParams.get("user");

    if (token) {
      const userData = userStr ? JSON.parse(decodeURIComponent(userStr)) : null;
      saveAuthData(token, userData);
      window.history.replaceState({}, "", "/feed");
    }
  }, [location, saveAuthData]);
};
