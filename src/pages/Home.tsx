import { Link } from "react-router-dom";
import { ArrowRight, Layers, Star, Newspaper, Rocket, Clock } from "lucide-react";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import {
  categories,
  tools,
  getFeaturedTools,
  getLatestTools,
  news,
  projects,
} from "@/data";

export default function Home() {
  const featured = getFeaturedTools(8);
  const latest = getLatestTools(8);
  const latestNews = news.slice(0, 4);
  const latestProjects = projects.slice(0, 4);

  return (
    <main>
        <Hero />

        {/* 分类导航 */}
        <section className="container py-12">
          <SectionTitle
            eyebrow="Categories"
            title="AI 工具分类导航"
            subtitle="15 大场景分类，快速定位你需要的 AI 能力"
            icon={<Layers className="h-5 w-5" />}
            action={
              <Link to="/category/ai-writing" className="btn-ghost text-sm">
                全部分类 <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                count={tools.filter((t) => t.categoryId === cat.id).length}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* 精选工具 */}
        <section className="container py-12">
          <SectionTitle
            eyebrow="Featured"
            title="精选 AI 工具"
            subtitle="编辑团队甄选的高口碑 AI 产品"
            icon={<Star className="h-5 w-5" />}
            action={
              <Link to="/category/ai-writing" className="btn-ghost text-sm">
                查看更多 <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </section>

        {/* 最新收录 */}
        <section className="container py-12">
          <SectionTitle
            eyebrow="Newest"
            title="最新收录"
            subtitle="近期上线的优质 AI 工具"
            icon={<Clock className="h-5 w-5" />}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} showCategory />
            ))}
          </div>
        </section>

        {/* 资讯 + 项目 */}
        <section className="container py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* 资讯 */}
            <div>
              <SectionTitle
                eyebrow="News"
                title="每日 AI 资讯"
                icon={<Newspaper className="h-5 w-5" />}
                action={
                  <Link to="/news" className="btn-ghost text-sm">
                    更多 <ArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="space-y-3">
                {latestNews.map((item) => (
                  <Link
                    key={item.id}
                    to="/news"
                    className="card card-hover group flex items-start gap-4 p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-500/15">
                      <span className="font-mono text-xs leading-none">
                        {item.date.slice(5, 7)}
                      </span>
                      <span className="section-title text-lg font-bold leading-none">
                        {item.date.slice(8, 10)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="chip !py-0.5">{item.category}</span>
                        <span className="text-xs text-white/35">{item.source}</span>
                      </div>
                      <h4 className="mt-1.5 line-clamp-1 text-sm font-semibold text-white transition group-hover:text-brand-300">
                        {item.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-white/45">{item.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 项目 */}
            <div>
              <SectionTitle
                eyebrow="Projects"
                title="最新 AI 项目"
                icon={<Rocket className="h-5 w-5" />}
                action={
                  <Link to="/projects" className="btn-ghost text-sm">
                    更多 <ArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="space-y-3">
                {latestProjects.map((p) => (
                  <a key={p.id} href={p.url} className="card card-hover group block p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="section-title line-clamp-1 text-sm font-semibold text-white transition group-hover:text-brand-300">
                        {p.name}
                      </h4>
                      <span className="shrink-0 font-mono text-xs text-lime">★ {p.star}</span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-white/45">{p.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
