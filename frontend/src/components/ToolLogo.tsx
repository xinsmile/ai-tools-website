import { cn } from "@/lib/utils";

interface ToolLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-9 w-9 text-sm rounded-lg",
  md: "h-12 w-12 text-base rounded-xl",
  lg: "h-16 w-16 text-2xl rounded-2xl",
};

// 多组渐变，按名称哈希选取，保证同工具颜色稳定
const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500",
  "from-sky-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-indigo-500 to-violet-500",
  "from-lime-500 to-green-500",
  "from-fuchsia-500 to-purple-500",
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-teal-500 to-emerald-500",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-violet-500",
  "from-rose-500 to-red-500",
  "from-yellow-500 to-amber-500",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  // 提取首字母/首字
  const trimmed = name.trim();
  // 英文：取单词首字母最多2个
  if (/^[A-Za-z]/.test(trimmed)) {
    const words = trimmed.split(/[\s-.]+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  // 中文：取前 1-2 个字
  return trimmed.slice(0, 2);
}

export default function ToolLogo({ name, size = "md", className }: ToolLogoProps) {
  const gradient = gradients[hashString(name) % gradients.length];
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-gradient-to-br font-display font-bold text-white shadow-lg",
        gradient,
        sizeMap[size],
        className,
      )}
    >
      <span className="drop-shadow-sm">{initials}</span>
    </div>
  );
}
