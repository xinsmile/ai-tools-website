import { useNavigate } from "react-router-dom";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { tools, categories } from "@/data";

const hotKeywords = ["ChatGPT", "Midjourney", "Cursor", "DeepSeek", "Sora", "Claude"];

export default function Hero() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query) return;
    navigate(`/category/ai-writing?q=${encodeURIComponent(query)}`);
  };

  const stats = [
    { label: "收录工具", value: `${tools.length}+` },
    { label: "分类领域", value: `${categories.length}` },
    { label: "每日更新", value: "实时" },
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24">
      {/* 装饰光晕 */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-32 h-64 w-64 rounded-full bg-lime/10 blur-[90px] animate-float" />

      <div className="container relative">
        {/* 标签 */}
        <div className="flex justify-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
            <span className="flex h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            每日精选优质 AI 工具，持续更新中
          </div>
        </div>

        {/* 标题 */}
        <h1 className="section-title mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white animate-fade-up delay-1 sm:text-6xl">
          发现与收录最好的
          <span className="relative ml-3 bg-gradient-to-r from-brand-400 via-fuchsia-400 to-lime bg-clip-text text-transparent">
            AI 工具
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-white/55 animate-fade-up delay-2 sm:text-lg">
          按场景分类检索 60+ 款优质 AI 产品，涵盖写作、图像、视频、编程、设计、办公等领域，
          让你高效找到趁手的人工智能工具。
        </p>

        {/* 搜索 */}
        <div className="mx-auto mt-8 max-w-2xl animate-fade-up delay-3" id="search">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 热门关键词 */}
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2 animate-fade-up delay-4">
          <span className="flex items-center gap-1 text-xs text-white/35">
            <TrendingUp className="h-3.5 w-3.5" />
            热门：
          </span>
          {hotKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => handleSearch(kw)}
              className="chip transition hover:border-brand-500/40 hover:text-brand-300"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* 统计 */}
        <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-8 animate-fade-up delay-5 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="section-title font-mono text-3xl font-bold text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/40">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 向下提示 */}
        <div className="mt-14 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Search className="h-3.5 w-3.5" />
            浏览下方分类，发现更多工具
          </div>
        </div>
      </div>
    </section>
  );
}
