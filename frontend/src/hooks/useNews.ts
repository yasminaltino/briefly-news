import { useState, useEffect } from "react";
import { newsService } from "../services/newsService";
import type { News } from "../types/News";

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      setLoading(true);
      const newsData = await newsService.getAllNews();
      setNews(newsData);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return { news, loading, refetchNews: loadNews };
};
