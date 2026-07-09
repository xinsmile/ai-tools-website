import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Rss } from "lucide-react";
import { getCategoriesCached } from "@/api";
import type { Category } from "@shared/types";

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let alive = true;
    getCategoriesCached()
      .then((cats) => {
        if (alive) setCategories(cats);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950/60">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* 品牌 */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="section-title text-lg font-bold text-white">AI工具集</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              收录优质 AI 工具与产品，按场景分类检索，助你高效发现与使用最好用的人工智能工具。
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Github, Twitter, Rss].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition hover:border-brand-500/40 hover:text-white"
                >
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 分类 */}
          <div>
            <h4 className="section-title mb-4 text-sm font-semibold text-white">热门分类</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="text-sm text-white/50 transition hover:text-brand-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 更多分类 */}
          <div>
            <h4 className="section-title mb-4 text-sm font-semibold text-white">更多分类</h4>
            <ul className="space-y-2.5">
              {categories.slice(6, 12).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="text-sm text-white/50 transition hover:text-brand-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="section-title mb-4 text-sm font-semibold text-white">导航</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-white/50 transition hover:text-brand-300">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-white/50 transition hover:text-brand-300">
                  每日资讯
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-white/50 transition hover:text-brand-300">
                  最新项目
                </Link>
              </li>
              <li>
                <Link to="/category/ai-writing" className="text-sm text-white/50 transition hover:text-brand-300">
                  AI工具
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} AI工具集 · 致力于收录优质 AI 工具</p>
          <p className="font-mono">Powered by React + Vite + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
