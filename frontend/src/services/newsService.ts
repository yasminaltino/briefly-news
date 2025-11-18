import axios from "axios";
import type { News } from "../types/News";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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

  getTopNews: async (): Promise<News[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news/top-headlines`);
      return response.data.articles;
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      return [];
    }
  },

  addToFavorites: async (newsData: News, token: string): Promise<boolean> => {
    try {
      let sourceValue: string | null = null;
      if (typeof newsData.source === "string") {
        sourceValue = newsData.source;
      } else if (newsData.source && typeof newsData.source === "object") {
        sourceValue = newsData.source.name;
      }

      const newsToSend = {
        ...newsData,
        source: sourceValue,
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

  generateSummary: async (newsData: News, token: string): Promise<string> => {
    let newsToSend = newsData;
    if (typeof newsData.source === "object" && newsData.source !== null) {
      newsToSend = {
        ...newsData,
        source: newsData.source?.name || "Desconhecido",
      };
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/summaries`,
        newsToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.content || "Resumo não disponível";
    } catch (error) {
      console.error("Erro ao gerar resumo:", error);
      return "Erro ao gerar resumo";
    }
  },

  getUserSummaries: async (token: string): Promise<any[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summaries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar resumos:", error);
      return [];
    }
  },
};
