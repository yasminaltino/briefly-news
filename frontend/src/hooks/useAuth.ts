import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    setUserToken(token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const saveAuthData = useCallback((token: string, userData: any) => {
    localStorage.setItem("token", token);
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    setUserToken(token);
    setUser(userData);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserToken(null);
    setUser(null);
  };

  return { userToken, user, saveAuthData, logout };
};
