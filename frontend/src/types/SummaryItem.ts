export interface SummaryItem {
  id: number;
  content: string;
  createdAt: string;
  news: {
    id: number;
    title: string;
    url: string;
  };
}
