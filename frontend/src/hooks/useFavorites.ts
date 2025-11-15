import { useState } from "react";
import { newsService } from "../services/newsService";
import type { News } from "../types/News";

export const useFavorites = (userToken: string | null) => {
  const [favoriteNews, setFavoriteNews] = useState<News[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    if (!userToken) return;

    try {
      setLoading(true);
      const favoritesData = await newsService.getUserFavorites(userToken);
      const favoriteNewsItems = favoritesData.map(
        (fav: any) => fav.news || fav
      );

      setFavoriteNews(favoriteNewsItems);
      setFavorites(favoriteNewsItems.map((news: News) => news.url));
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (newsItem: News) => {
    if (!userToken) return false;

    try {
      const isFavorited = favorites.includes(newsItem.url);

      if (isFavorited) {
        const success = await newsService.removeFromFavorites(
          newsItem.url,
          userToken
        );
        if (success) {
          setFavorites((prev) => prev.filter((url) => url !== newsItem.url));
          setFavoriteNews((prev) =>
            prev.filter((news) => news.url !== newsItem.url)
          );
        }
        return success;
      } else {
        const success = await newsService.addToFavorites(newsItem, userToken);
        if (success) {
          setFavorites((prev) => [...prev, newsItem.url]);
        }
        return success;
      }
    } catch (error) {
      console.error("Erro ao gerenciar favorito:", error);
      return false;
    }
  };

  return {
    favoriteNews,
    favorites,
    loading,
    loadFavorites,
    toggleFavorite,
    isFavorited: (url: string) => favorites.includes(url),
  };
};
