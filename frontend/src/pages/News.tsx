import { useEffect, useMemo, useState } from "react";
import { Newspaper, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import { getNews } from "@/api";
import type { NewsItem } from "@shared/types";

const categories = ["全部", "产品发布", "模型更新", "开源动态", "融资动态", "学习资源", "生态动态"];

export default function News() {
  const [active, setActive] = useState("全部");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    getNews()
      .then((data) => {
        if (alive) setNews(data);
      })
      .catch((err) => {
        if (alive) setError(err?.message ?? "加载失败");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // 按日期分组
  const grouped = useMemo(() => {
    const filtered =
      active === "全部" ? news : news.filter((n) => n.category === active);
    const map = new Map<string, NewsItem[]>();
    filtered.forEach((n) => {
      const arr = map.get(n.date) ?? [];
      arr.push(n);
      map.set(n.date, arr);
    });
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [news, active]);

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

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "每日资讯" }]}
        title="每日 AI 资讯"
        subtitle="汇集 AI 行业前沿动态，掌握产品发布、模型更新与生态进展"
        icon={{ name: "Newspaper", gradient: "from-sky-500 to-cyan-500" }}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                active === c
                  ? "border-brand-500/40 bg-brand-500/15 text-brand-200"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="container py-10">
        <div className="mx-auto max-w-3xl space-y-10">
          {grouped.map(([date, items]) => (
            <div key={date}>
              {/* 日期分组标题 */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                  <span className="font-mono text-[10px] leading-none">
                    {date.slice(5, 7)}月
                  </span>
                  <span className="section-title text-lg font-bold leading-none">
                    {date.slice(8, 10)}
                  </span>
                </div>
                <div>
                  <div className="section-title text-sm font-semibold text-white">
                    {date}
                  </div>
                  <div className="text-xs text-white/40">{items.length} 条资讯</div>
                </div>
                <div className="ml-2 h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* 资讯列表 */}
              <div className="space-y-3">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    className="card card-hover group flex flex-col gap-3 p-5 sm:flex-row sm:items-start"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="chip !py-0.5">{item.category}</span>
                        <span className="text-xs text-white/35">{item.source}</span>
                      </div>
                      <h3 className="section-title mt-2 text-base font-semibold text-white transition group-hover:text-brand-300">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                        {item.summary}
                      </p>
                    </div>
                    <ExternalLink className="hidden h-4 w-4 shrink-0 text-white/20 transition group-hover:text-brand-300 sm:block sm:mt-1" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 订阅提示 */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="card relative overflow-hidden p-8 text-center">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="relative">
              <Newspaper className="mx-auto mb-3 h-8 w-8 text-brand-300" />
              <h3 className="section-title text-lg font-semibold text-white">
                想要每日获取 AI 资讯？
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                关注本站，每天为你精选最重要的 AI 行业动态，不再错过关键信息。
              </p>
              <button className="btn-primary mt-5">订阅资讯更新</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
