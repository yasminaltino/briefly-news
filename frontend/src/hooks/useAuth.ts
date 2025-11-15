import { useState, useEffect } from "react";

export const useAuth = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    setUserToken(token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const saveAuthData = (token: string, userData: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUserToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserToken(null);
    setUser(null);
  };

  return { userToken, user, saveAuthData, logout };
};
