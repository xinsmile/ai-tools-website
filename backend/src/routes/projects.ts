import { Router } from "express";
import { projects } from "../data/projects";
import type { ApiResponse, Project } from "../../../shared/types";

const router = Router();

function parseLimit(v: unknown): number | undefined {
  if (typeof v !== "string") return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

// GET /api/projects - return all projects
router.get("/", (_req, res) => {
  const body: ApiResponse<Project[]> = {
    data: projects,
    total: projects.length,
  };
  res.json(body);
});

// GET /api/projects/latest - return latest projects (query: ?limit=N)
router.get("/latest", (req, res) => {
  const limit = parseLimit(req.query.limit);
  const sorted = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const list = limit ? sorted.slice(0, limit) : sorted;
  const body: ApiResponse<Project[]> = { data: list, total: list.length };
  res.json(body);
});

export default router;
