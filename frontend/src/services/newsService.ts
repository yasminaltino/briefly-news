import axios from "axios";
import type { News } from "../types/News";

const API_BASE_URL = "http://localhost:3000";

export const newsService = {
  getAllNews: async (): Promise<News[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`);
      return response.data.articles;
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      return [];
    }
  },
  addToFavorites: async (newsData: News, token: string): Promise<boolean> => {
    try {
      const newsToSend = {
        ...newsData,
        source: newsData.source?.name || null,
      };
      const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        newsToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.status === 201;
    } catch (error) {
      console.error("Erro ao favoritar notícia", error);
      return false;
    }
  },
  getUserFavorites: async (token: string): Promise<any[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar favoritos");
      return [];
    }
  },
  removeFromFavorites: async (
    newsUrl: string,
    token: string
  ): Promise<boolean> => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/favorites?url=${encodeURIComponent(newsUrl)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      return false;
    }
  },
};
