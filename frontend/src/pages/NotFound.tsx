import { Link } from "react-router-dom";
import { Home, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[80px]" />
        <div className="relative section-title font-mono text-[120px] font-extrabold leading-none text-white/10 sm:text-[180px]">
          404
        </div>
      </div>
      <h1 className="section-title mt-2 text-2xl font-bold text-white sm:text-3xl">
        页面走丢了
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/50">
        抱歉，你访问的页面不存在或已被移除。不妨回到首页探索海量 AI 工具。
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" />
          返回首页
        </Link>
        <Link to="/category/ai-writing" className="btn-ghost">
          <Compass className="h-4 w-4" />
          浏览工具
        </Link>
      </div>
    </section>
  );
}
