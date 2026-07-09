import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, Search, Frown, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";
import { getCategoryBySlug, getCategories, getToolsByCategory } from "@/api";
import type { Category, Tool } from "@shared/types";

type SortKey = "latest" | "rating" | "name";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "latest", label: "最新收录" },
  { key: "rating", label: "评分最高" },
  { key: "name", label: "名称排序" },
];

function isNotFound(err: unknown): boolean {
  return !!err && typeof err === "object" && "message" in err &&
    typeof (err as { message: unknown }).message === "string" &&
    (err as { message: string }).message.includes("404");
}

export default function Category() {
  const { slug = "ai-writing" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>("latest");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setError(null);
    setCategory(null);
    Promise.all([
      getCategoryBySlug(slug).catch((err) => {
        if (isNotFound(err)) return null;
        throw err;
      }),
      getCategories().catch(() => [] as Category[]),
      getToolsByCategory(slug).catch(() => [] as Tool[]),
    ])
      .then(([cat, cats, toolList]) => {
        if (!alive) return;
        setCategory(cat);
        setCategories(cats);
        setTools(toolList);
        if (!cat) setNotFound(true);
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
  }, [slug]);

  const list = useMemo(() => {
    let result = [...tools];

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result = [...result].sort(
          (a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime(),
        );
    }
    return result;
  }, [tools, query, sort]);

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

  if (notFound || !category) {
    return (
      <div className="container py-32 text-center">
        <Frown className="mx-auto mb-4 h-12 w-12 text-white/30" />
        <p className="text-white/60">未找到该分类</p>
        <Link to="/" className="btn-primary mt-6">
          返回首页
        </Link>
      </div>
    );
  }

  const handleSearch = (value: string) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <div>
      <PageHeader
        crumbs={[{ label: category.name }]}
        title={category.name}
        subtitle={category.description}
        icon={{ name: category.icon, gradient: category.gradient }}
      >
        {/* 筛选栏 */}
        <div className="glass sticky top-16 z-30 -mx-5 flex flex-col gap-3 rounded-2xl px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-white/40" />
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  sort === opt.key
                    ? "bg-brand-500/20 text-brand-200 ring-1 ring-brand-500/30"
                    : "text-white/50 hover:bg-white/5 hover:text-white",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="在当前分类中搜索…"
              className="w-full rounded-xl border border-white/10 bg-ink-800/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-500/50"
            />
          </div>
        </div>
      </PageHeader>

      <section className="container py-10">
        {/* 分类切换 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.slug}`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                c.slug === slug
                  ? "border-brand-500/40 bg-brand-500/15 text-brand-200"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white",
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-white/45">
            共 <span className="font-mono text-white/80">{list.length}</span> 款工具
          </p>
        </div>

        {list.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-20 text-center">
            <Frown className="mb-3 h-10 w-10 text-white/25" />
            <p className="text-white/50">没有找到匹配的工具</p>
            <button onClick={() => handleSearch("")} className="btn-ghost mt-4 text-sm">
              清空搜索
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        )}

        {/* 其他分类 */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="section-title mb-4 text-base font-semibold text-white">
            浏览其他分类
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories
              .filter((c) => c.slug !== slug)
              .slice(0, 4)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-ink-800/40 px-4 py-3 transition hover:border-brand-500/30"
                >
                  <span className="text-sm text-white/70 group-hover:text-white">{c.name}</span>
                  <ArrowRight className="h-4 w-4 text-white/20 transition group-hover:text-brand-300" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
