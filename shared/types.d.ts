export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    gradient: string;
    description: string;
}
export type Pricing = "免费" | "免费试用" | "付费" | "增值付费";
export interface Tool {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    description: string;
    longDescription: string;
    website: string;
    tags: string[];
    features: string[];
    featured: boolean;
    pricing: Pricing;
    rating: number;
    users: string;
    addedDate: string;
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
    star: string;
}
export interface ApiResponse<T> {
    data: T;
    total?: number;
}
