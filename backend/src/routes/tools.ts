import { Router } from "express";
import {
  tools,
  getToolById,
  getFeaturedTools,
  getLatestTools,
  getRelatedTools,
  searchTools,
} from "../data/tools";
import type { ApiResponse, Tool } from "../../../shared/types";

const router = Router();

function parseLimit(v: unknown): number | undefined {
  if (typeof v !== "string") return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

// GET /api/tools - return all tools
// query: ?featured=true, ?limit=N, ?sort=latest|rating|name, ?q=search
router.get("/", (req, res) => {
  let list: Tool[] = [...tools];

  const q = typeof req.query.q === "string" ? req.query.q : undefined;
  if (q) {
    list = searchTools(q);
  }

  const featured = req.query.featured;
  if (featured === "true" || featured === "1") {
    list = list.filter((t) => t.featured);
  }

  const sort = typeof req.query.sort === "string" ? req.query.sort : undefined;
  if (sort === "latest") {
    list.sort(
      (a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime(),
    );
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const total = list.length;
  const limit = parseLimit(req.query.limit);
  if (limit) {
    list = list.slice(0, limit);
  }

  const body: ApiResponse<Tool[]> = { data: list, total };
  res.json(body);
});

// GET /api/tools/latest - return latest tools (query: ?limit=N)
router.get("/latest", (req, res) => {
  const limit = parseLimit(req.query.limit);
  const list = getLatestTools(limit);
  const body: ApiResponse<Tool[]> = { data: list, total: list.length };
  res.json(body);
});

// GET /api/tools/featured - return featured tools (query: ?limit=N)
router.get("/featured", (req, res) => {
  const limit = parseLimit(req.query.limit);
  const list = getFeaturedTools(limit);
  const body: ApiResponse<Tool[]> = { data: list, total: list.length };
  res.json(body);
});

// GET /api/tools/search?q=query - search tools
router.get("/search", (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const list = searchTools(q);
  const body: ApiResponse<Tool[]> = { data: list, total: list.length };
  res.json(body);
});

// GET /api/tools/:id/related - return related tools (same category, limit 4)
router.get("/:id/related", (req, res) => {
  const tool = getToolById(req.params.id);
  if (!tool) {
    res.status(404).json({ data: null, message: "Tool not found" });
    return;
  }
  const list = getRelatedTools(tool, 4);
  const body: ApiResponse<Tool[]> = { data: list, total: list.length };
  res.json(body);
});

// GET /api/tools/:id - return single tool by id
router.get("/:id", (req, res) => {
  const tool = getToolById(req.params.id);
  if (!tool) {
    res.status(404).json({ data: null, message: "Tool not found" });
    return;
  }
  const body: ApiResponse<Tool> = { data: tool };
  res.json(body);
});

export default router;
