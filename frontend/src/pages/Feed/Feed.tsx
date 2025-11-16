import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FeedHeaderComponent from "../../components/Header/FeedHeaderComponent";
import FeedSideBarComponent from "../../components/Sidebar/FeedSideBarComponent";
import FeedContent from "../../components/Feed/FeedContent";
import SummaryModalComponent from "../../components/Modal/SummaryModalComponent";
import { useAuth } from "../../hooks/useAuth";
import { useNews } from "../../hooks/useNews";
import { useFavorites } from "../../hooks/useFavorites";
import { useSummary } from "../../hooks/useSummary";

type ViewType = "all" | "favorites" | "summaries";

const Feed = () => {
  const [currentView, setCurrentView] = useState<ViewType>("all");
  const location = useLocation();

  const { userToken, saveAuthData } = useAuth();
  const { news, loading: newsLoading } = useNews();
  const {
    favoriteNews,
    loading: favoritesLoading,
    loadFavorites,
    toggleFavorite,
    isFavorited,
  } = useFavorites(userToken);

  const {
    isModalOpen,
    currentNews,
    summary,
    loading: summaryLoading,
    userSummaries,
    openModal,
    closeModal,
    loadUserSummaries,
  } = useSummary();

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

  const handleShowFavorites = async () => {
    if (!userToken) {
      alert("Você precisa estar logado para ver os favoritos");
      return;
    }
    await loadFavorites();
    setCurrentView("favorites");
  };

  const handleShowAllNews = () => {
    setCurrentView("all");
  };

  const handleShowSummaries = async () => {
    if (!userToken) {
      alert("Você precisa estar logado para ver os resumos");
      return;
    }
    await loadUserSummaries();
    setCurrentView("summaries");
  };

  const handleFavorite = async (newsItem: any) => {
    if (!userToken) {
      alert("Você precisa estar logado para favoritar notícias");
      return;
    }
    await toggleFavorite(newsItem);
  };

  const handleSummary = async (newsUrl: string) => {
    if (!userToken) {
      alert("Você precisa estar logado para gerar resumos");
      return;
    }

    const allNews = [...news, ...favoriteNews];
    const newsItem = allNews.find((item) => item.url === newsUrl);
    const newsTitle = newsItem?.title || "Notícia";

    await openModal(newsTitle, newsUrl);
  };

  const isLoading = newsLoading || favoritesLoading;
  const newsToShow = currentView === "favorites" ? favoriteNews : news;

  if (isLoading && newsToShow.length === 0) {
    return (
      <>
        <FeedHeaderComponent />
        <div
          className="bg-intellux-feed"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <div className="container-fluid d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FeedHeaderComponent />
      <div
        className="bg-intellux-feed"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <div className="row h-100">
          <div className="col-md-2 p-0">
            <FeedSideBarComponent
              onShowFavorites={handleShowFavorites}
              onShowAllNews={handleShowAllNews}
              onShowSummaries={handleShowSummaries}
              currentView={currentView}
            />
          </div>
          <FeedContent
            newsToShow={newsToShow}
            summaries={userSummaries}
            currentView={currentView}
            onFavorite={handleFavorite}
            onSummary={handleSummary}
            isFavorited={isFavorited}
          />
        </div>
      </div>

      <SummaryModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        newsTitle={currentNews?.title || ""}
        summary={summary}
        loading={summaryLoading}
      />
    </>
  );
};

export default Feed;
