import { useEffect, useState } from "react";
import type { Category, Tool, NewsItem, Project } from "@shared/types";
import { request, qs } from "./client";

// ===== Categories =====

export function getCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return request<Category>(`/categories/${encodeURIComponent(slug)}`);
}

export function getToolsByCategory(slug: string): Promise<Tool[]> {
  return request<Tool[]>(`/categories/${encodeURIComponent(slug)}/tools`);
}

// ===== Tools =====

export interface GetToolsParams {
  featured?: boolean;
  limit?: number;
  sort?: "latest" | "rating" | "name";
  q?: string;
}

export function getTools(params?: GetToolsParams): Promise<Tool[]> {
  const query = qs(
    params
      ? {
          featured: params.featured,
          limit: params.limit,
          sort: params.sort,
          q: params.q,
        }
      : {},
  );
  return request<Tool[]>(`/tools${query}`);
}

export function getFeaturedTools(limit?: number): Promise<Tool[]> {
  return request<Tool[]>(`/tools/featured${qs({ limit })}`);
}

export function getLatestTools(limit?: number): Promise<Tool[]> {
  return request<Tool[]>(`/tools/latest${qs({ limit })}`);
}

export function searchTools(q: string): Promise<Tool[]> {
  return request<Tool[]>(`/tools/search${qs({ q })}`);
}

export function getToolById(id: string): Promise<Tool> {
  return request<Tool>(`/tools/${encodeURIComponent(id)}`);
}

export function getRelatedTools(id: string): Promise<Tool[]> {
  return request<Tool[]>(`/tools/${encodeURIComponent(id)}/related`);
}

// ===== News =====

export function getNews(category?: string): Promise<NewsItem[]> {
  return request<NewsItem[]>(`/news${qs({ category })}`);
}

export function getLatestNews(limit?: number): Promise<NewsItem[]> {
  return request<NewsItem[]>(`/news/latest${qs({ limit })}`);
}

// ===== Projects =====

export function getProjects(): Promise<Project[]> {
  return request<Project[]>("/projects");
}

export function getLatestProjects(limit?: number): Promise<Project[]> {
  return request<Project[]>(`/projects/latest${qs({ limit })}`);
}

// ===== Shared categories cache =====
// 多个组件（Navbar / Footer / ToolCard 等）都需要分类列表，缓存首次请求结果，
// 避免每个组件都发起独立请求。失败时清空缓存以便下次重试。

let categoriesPromise: Promise<Category[]> | null = null;

export function getCategoriesCached(): Promise<Category[]> {
  if (!categoriesPromise) {
    categoriesPromise = getCategories()
      .then((cats) => cats)
      .catch((err) => {
        categoriesPromise = null;
        throw err;
      });
  }
  return categoriesPromise;
}

// 根据 categoryId 解析所属分类（供 ToolCard 等同步展示分类名使用）
export function useCategory(categoryId: string | undefined): Category | undefined {
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    if (!categoryId) {
      setCategory(undefined);
      return;
    }
    getCategoriesCached()
      .then((cats) => {
        if (alive) setCategory(cats.find((c) => c.id === categoryId));
      })
      .catch(() => {
        if (alive) setCategory(undefined);
      });
    return () => {
      alive = false;
    };
  }, [categoryId]);

  return category;
}
