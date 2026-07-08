import { Link } from "react-router-dom";
import { Star, ExternalLink, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolLogo from "@/components/ToolLogo";
import { useFavorites } from "@/store/useFavorites";
import { getCategoryById } from "@/data";
import type { Tool } from "@/data/types";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  showCategory?: boolean;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="font-mono text-xs font-medium text-white/70">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ToolCard({ tool, index = 0, showCategory = false }: ToolCardProps) {
  const category = getCategoryById(tool.categoryId);
  const toggle = useFavorites((s) => s.toggle);
  const isFav = useFavorites((s) => s.favorites.includes(tool.id));

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(tool.id);
  };

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="card card-hover group relative flex flex-col p-5 animate-fade-up"
      style={{ animationDelay: `${(index % 12) * 0.04}s` }}
    >
      {/* 顶部 */}
      <div className="flex items-start gap-3">
        <ToolLogo name={tool.name} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="section-title truncate text-base font-semibold text-white">
              {tool.name}
            </h3>
            {tool.featured && (
              <span className="shrink-0 rounded bg-brand-500/15 px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand-300">
                精选
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3">
            <RatingStars rating={tool.rating} />
            <span className="text-xs text-white/40">{tool.users}</span>
          </div>
        </div>
        <button
          onClick={handleFav}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/5 hover:text-white"
          aria-label="收藏"
        >
          <Bookmark className={cn("h-4 w-4", isFav && "fill-brand-400 text-brand-400")} />
        </button>
      </div>

      {/* 简介 */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">
        {tool.description}
      </p>

      {/* 标签 */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {showCategory && category && (
          <span
            className={cn(
              "chip !bg-white/5 !text-white/70",
            )}
          >
            {category.name}
          </span>
        )}
        {tool.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>

      {/* 底部 */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span
          className={cn(
            "font-mono text-xs font-medium",
            tool.pricing === "免费" && "text-lime",
            tool.pricing === "免费试用" && "text-sky-400",
            tool.pricing === "付费" && "text-rose-400",
            tool.pricing === "增值付费" && "text-amber-400",
          )}
        >
          {tool.pricing}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-brand-300 opacity-0 transition group-hover:opacity-100">
          查看详情
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
