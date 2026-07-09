import { Router } from "express";
import { categories, getCategoryBySlug } from "../data/categories";
import { getToolsByCategory } from "../data/tools";
import type { ApiResponse, Category, Tool } from "../../../shared/types";

const router = Router();

// GET /api/categories - return all categories
router.get("/", (_req, res) => {
  const body: ApiResponse<Category[]> = {
    data: categories,
    total: categories.length,
  };
  res.json(body);
});

// GET /api/categories/:slug - return single category by slug
router.get("/:slug", (req, res) => {
  const category = getCategoryBySlug(req.params.slug);
  if (!category) {
    res.status(404).json({ data: null, message: "Category not found" });
    return;
  }
  const body: ApiResponse<Category> = { data: category };
  res.json(body);
});

// GET /api/categories/:slug/tools - return tools in a category
router.get("/:slug/tools", (req, res) => {
  const category = getCategoryBySlug(req.params.slug);
  if (!category) {
    res.status(404).json({ data: null, message: "Category not found" });
    return;
  }
  const list = getToolsByCategory(category.id);
  const body: ApiResponse<Tool[]> = { data: list, total: list.length };
  res.json(body);
});

export default router;
