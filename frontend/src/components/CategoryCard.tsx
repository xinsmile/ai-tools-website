import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Icon from "@/components/Icon";
import type { Category } from "@shared/types";

interface CategoryCardProps {
  category: Category;
  count: number;
  index?: number;
}

export default function CategoryCard({ category, count, index = 0 }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="card card-hover group relative flex flex-col gap-3 p-5 animate-fade-up"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
            category.gradient,
          )}
        >
          <Icon name={category.icon} className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-white/20 transition group-hover:text-brand-300" />
      </div>
      <div>
        <h3 className="section-title text-base font-semibold text-white">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">
          {category.description}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-2 pt-1">
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          {count} 款工具
        </span>
      </div>
    </Link>
  );
}
