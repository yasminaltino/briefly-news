import type { News } from "./News";

export interface Summary {
  id: number;
  content: string;
  createdAt: string;
  news: News;
}
