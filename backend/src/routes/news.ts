import { Router } from "express";
import { news } from "../data/news";
import type { ApiResponse, NewsItem } from "../../../shared/types";

const router = Router();

function parseLimit(v: unknown): number | undefined {
  if (typeof v !== "string") return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

// GET /api/news - return all news (support ?category= filter)
router.get("/", (req, res) => {
  let list: NewsItem[] = [...news];
  const category =
    typeof req.query.category === "string" ? req.query.category : undefined;
  if (category) {
    list = list.filter((n) => n.category === category);
  }
  const body: ApiResponse<NewsItem[]> = { data: list, total: list.length };
  res.json(body);
});

// GET /api/news/latest - return latest news (query: ?limit=N)
router.get("/latest", (req, res) => {
  const limit = parseLimit(req.query.limit);
  const sorted = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const list = limit ? sorted.slice(0, limit) : sorted;
  const body: ApiResponse<NewsItem[]> = { data: list, total: list.length };
  res.json(body);
});

export default router;
