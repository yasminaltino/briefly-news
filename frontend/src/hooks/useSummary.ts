import { useState } from "react";
import { newsService } from "../services/newsService";
import { useAuth } from "./useAuth";

export const useSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [userSummaries, setUserSummaries] = useState<any[]>([]);
  const [summariesLoading, setSummariesLoading] = useState(false);

  const { userToken } = useAuth();

  const openModal = async (newsTitle: string, newsUrl: string) => {
    setCurrentNews({ title: newsTitle, url: newsUrl });
    setIsModalOpen(true);
    setLoading(true);
    setSummary("");

    try {
      if (userToken) {
        const generatedSummary = await newsService.generateSummary(
          newsUrl,
          userToken
        );
        setSummary(generatedSummary);
      } else {
        setSummary("Token de autorização não encontrado");
      }
    } catch (error) {
      console.error("Erro ao gerar resumo:", error);
      setSummary("Erro ao gerar o resumo da notícia");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNews(null);
    setSummary("");
    setLoading(false);
  };

  const loadUserSummaries = async () => {
    if (!userToken) return;

    setSummariesLoading(true);
    try {
      const summaries = await newsService.getUserSummaries(userToken);
      setUserSummaries(summaries);
    } catch (error) {
      console.error("Erro ao carregar resumos:", error);
      setUserSummaries([]);
    } finally {
      setSummariesLoading(false);
    }
  };

  return {
    isModalOpen,
    currentNews,
    summary,
    loading,
    userSummaries,
    summariesLoading,
    openModal,
    closeModal,
    loadUserSummaries,
  };
};
