export interface News {
  content: string;
  title: string;
  description: string;
  author: string;
  urlToImage?: string;
  publishedAt: string;
  url: string;
  source: {
    id: string | null;
    name: string;
  } | null;
}
