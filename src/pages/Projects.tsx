import { Rocket, Star, ExternalLink, GitFork } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { projects } from "@/data";

export default function Projects() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "最新项目" }]}
        title="最新 AI 项目"
        subtitle="发现社区中值得关注的开源 AI 项目与新兴产品"
        icon={{ name: "Rocket", gradient: "from-emerald-500 to-teal-500" }}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
          <span>共 <span className="font-mono text-white/80">{projects.length}</span> 个项目</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>按收录时间排序</span>
        </div>
      </PageHeader>

      <section className="container py-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              className="card card-hover group relative flex flex-col p-6 animate-fade-up"
              style={{ animationDelay: `${(i % 8) * 0.05}s` }}
            >
              {/* 头部 */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 ring-1 ring-emerald-500/20">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="section-title text-lg font-semibold text-white transition group-hover:text-emerald-300">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-white/35">{p.date}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-white/20 transition group-hover:text-emerald-300" />
              </div>

              {/* 描述 */}
              <p className="mt-4 text-sm leading-relaxed text-white/60">{p.description}</p>

              {/* 标签 */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="chip !border-emerald-500/15 !bg-emerald-500/5 !text-emerald-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 底部统计 */}
              <div className="mt-5 flex items-center gap-5 border-t border-white/5 pt-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="font-mono text-white/80">{p.star}</span>
                  Star
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="h-3.5 w-3.5" />
                  <span className="font-mono text-white/70">
                    {(parseFloat(p.star) * 0.18).toFixed(1)}k
                  </span>
                  Fork
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
