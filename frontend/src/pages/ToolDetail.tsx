import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Calendar,
  Users,
  Tag,
  ArrowLeft,
  Share2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ToolLogo from "@/components/ToolLogo";
import ToolCard from "@/components/ToolCard";
import SectionTitle from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/store/useFavorites";
import { getToolById, getRelatedTools, getCategoriesCached } from "@/api";
import type { Tool, Category } from "@shared/types";

function isNotFound(err: unknown): boolean {
  return !!err && typeof err === "object" && "message" in err &&
    typeof (err as { message: unknown }).message === "string" &&
    (err as { message: string }).message.includes("404");
}

export default function ToolDetail() {
  const { id = "" } = useParams();
  const toggle = useFavorites((s) => s.toggle);
  const isFav = useFavorites((s) => s.favorites.includes(id));

  const [tool, setTool] = useState<Tool | null>(null);
  const [related, setRelated] = useState<Tool[]>([]);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setError(null);
    setTool(null);
    setRelated([]);
    setCategory(undefined);
    Promise.all([
      getToolById(id).catch((err) => {
        if (isNotFound(err)) return null;
        throw err;
      }),
      getRelatedTools(id).catch(() => [] as Tool[]),
      getCategoriesCached().catch(() => [] as Category[]),
    ])
      .then(([t, rel, cats]) => {
        if (!alive) return;
        if (!t) {
          setNotFound(true);
          return;
        }
        setTool(t);
        setRelated(rel);
        setCategory(cats.find((c) => c.id === t.categoryId));
      })
      .catch((err) => {
        if (!alive) return;
        setError(err?.message ?? "加载失败");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-32 text-center text-white/60">加载中…</div>
    );
  }

  if (error) {
    return (
      <div className="container py-32 text-center text-rose-400">{error}</div>
    );
  }

  if (notFound || !tool) {
    return (
      <div className="container py-32 text-center">
        <p className="text-white/60">未找到该工具</p>
        <Link to="/" className="btn-primary mt-6">
          返回首页
        </Link>
      </div>
    );
  }

  const infoItems = [
    { icon: Calendar, label: "收录日期", value: tool.addedDate },
    { icon: Users, label: "用户规模", value: tool.users },
    { icon: Tag, label: "定价模式", value: tool.pricing },
    { icon: Star, label: "综合评分", value: `${tool.rating.toFixed(1)} / 5.0` },
  ];

  return (
    <div>
      <PageHeader
        crumbs={[{ label: category?.name ?? "分类", to: `/category/${category?.slug}` }, { label: tool.name }]}
        title={tool.name}
        subtitle={tool.description}
      >
        {/* 工具头部卡片 */}
        <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-brand-500/20 blur-xl" />
            <ToolLogo name={tool.name} size="lg" className="relative" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="section-title text-2xl font-bold text-white">{tool.name}</h2>
              {tool.featured && (
                <span className="rounded bg-brand-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-brand-300">
                  精选推荐
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/55">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-mono text-white/80">{tool.rating.toFixed(1)}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {tool.users}
              </span>
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
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tool.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex shrink-0 gap-2 sm:flex-col">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              访问官网
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => toggle(tool.id)}
                className={cn(
                  "btn-ghost flex-1",
                  isFav && "border-brand-500/40 text-brand-300",
                )}
              >
                <Bookmark className={cn("h-4 w-4", isFav && "fill-brand-400")} />
                {isFav ? "已收藏" : "收藏"}
              </button>
              <button className="btn-ghost" aria-label="分享">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 主内容 */}
          <div className="lg:col-span-2">
            {/* 工具介绍 */}
            <div className="card p-6">
              <h3 className="section-title mb-3 text-lg font-semibold text-white">工具介绍</h3>
              <p className="text-sm leading-relaxed text-white/65">{tool.longDescription}</p>
            </div>

            {/* 核心特性 */}
            <div className="card mt-5 p-6">
              <h3 className="section-title mb-4 text-lg font-semibold text-white">核心特性</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {tool.features.map((f, i) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-white/30">0{i + 1}</div>
                      <div className="text-sm text-white/80">{f}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 截图占位 */}
            <div className="card mt-5 overflow-hidden p-6">
              <h3 className="section-title mb-4 text-lg font-semibold text-white">产品预览</h3>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-ink-800 to-ink-850">
                <div className="absolute inset-0 bg-grid-faint bg-[size:32px_32px] opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ToolLogo name={tool.name} size="lg" />
                  <p className="mt-2 font-display text-lg font-semibold text-white/70">
                    {tool.name}
                  </p>
                  <p className="font-mono text-xs text-white/30">{tool.website.replace("https://", "")}</p>
                </div>
                <div className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="section-title mb-4 text-sm font-semibold text-white">基础信息</h3>
              <dl className="space-y-3">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-xs text-white/45">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </dt>
                    <dd className="font-mono text-xs text-white/80">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 border-t border-white/5 pt-4">
                <div className="mb-2 text-xs text-white/45">所属分类</div>
                {category && (
                  <Link
                    to={`/category/${category.slug}`}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-sm text-white/80 transition hover:bg-brand-500/10 hover:text-brand-200"
                  >
                    {category.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>

            <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <ExternalLink className="h-4 w-4" />
              立即访问 {tool.name}
            </a>
          </aside>
        </div>

        {/* 相关工具 */}
        {related.length > 0 && (
          <div className="mt-14">
            <SectionTitle title="相关工具推荐" subtitle={`更多「${category?.name}」分类工具`} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t, i) => (
                <ToolCard key={t.id} tool={t} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link to={`/category/${category?.slug}`} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" />
            返回 {category?.name}
          </Link>
        </div>
      </section>
    </div>
  );
}
