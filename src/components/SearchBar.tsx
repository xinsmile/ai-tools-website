import { useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: "md" | "lg";
  className?: string;
}

export default function SearchBar({
  initialValue = "",
  onSearch,
  placeholder = "搜索 AI 工具，如：写作、绘画、编程…",
  size = "lg",
  className,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <Search
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40",
          size === "lg" ? "h-5 w-5" : "h-4 w-4",
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-ink-800/70 text-white placeholder:text-white/35 outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20",
          size === "lg" ? "py-4 pl-14 pr-32 text-base" : "py-3 pl-11 pr-24 text-sm",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-28 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/70"
          aria-label="清空"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 font-semibold text-white transition hover:brightness-110",
          size === "lg" ? "px-5 py-2.5 text-sm" : "px-4 py-1.5 text-xs",
        )}
      >
        搜索
      </button>
    </form>
  );
}
