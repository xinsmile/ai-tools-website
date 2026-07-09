import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoriesCached } from "@/api";
import type { Category } from "@shared/types";

const mainLinks = [
  { to: "/", label: "首页" },
  { to: "/category/ai-writing", label: "AI工具" },
  { to: "/news", label: "每日资讯" },
  { to: "/projects", label: "最新项目" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="section-title text-lg font-bold text-white">AI工具集</span>
            <span className="font-mono text-[10px] tracking-wider text-brand-300/70">
              AI · NAVIGATOR
            </span>
          </div>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) =>
            link.label === "AI工具" ? (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition",
                      isActive ? "text-white" : "text-white/60 hover:text-white",
                    )
                  }
                >
                  AI工具
                </NavLink>
                {catOpen && (
                  <div className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-2">
                    <div className="glass grid grid-cols-2 gap-1 rounded-2xl p-3 shadow-card">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/category/${c.slug}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                        >
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full bg-gradient-to-br",
                              c.gradient,
                            )}
                          />
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive ? "text-white" : "text-white/60 hover:text-white",
                  )
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* 右侧 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/?focus=search")}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-brand-500/40 hover:text-white sm:flex"
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link to="/category/ai-writing" className="btn-primary hidden sm:inline-flex">
            探索工具
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
            aria-label="菜单"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {open && (
        <div className="border-t border-white/5 bg-ink-950/95 lg:hidden">
          <div className="container space-y-1 py-3">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    isActive ? "bg-brand-500/10 text-white" : "text-white/70 hover:bg-white/5",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="px-3 pb-1 pt-3 font-mono text-xs uppercase tracking-wider text-white/30">
              全部分类
            </div>
            <div className="grid grid-cols-2 gap-1 pb-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
