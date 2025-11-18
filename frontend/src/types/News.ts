export interface NewsSource {
  id: string | null;
  name: string;
}

export interface News {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  author?: string;
  source: NewsSource | string | null;
}
