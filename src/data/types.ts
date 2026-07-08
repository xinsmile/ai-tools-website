// 数据模型类型定义

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide 图标名
  gradient: string; // 渐变色（from/to）
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string; // 一句话简介
  longDescription: string; // 详细介绍
  website: string;
  tags: string[];
  features: string[];
  featured: boolean;
  pricing: "免费" | "免费试用" | "付费" | "增值付费";
  rating: number; // 0-5
  users: string; // 用户量描述
  addedDate: string; // YYYY-MM-DD
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  date: string;
  tags: string[];
  star: string; // star 数描述
}
