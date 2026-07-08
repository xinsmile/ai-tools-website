import type { Category } from "./types";

// 15 个 AI 工具分类
export const categories: Category[] = [
  {
    id: "c-writing",
    name: "AI写作工具",
    slug: "ai-writing",
    icon: "PenLine",
    gradient: "from-violet-500 to-fuchsia-500",
    description: "智能写作、文案生成、内容润色与续写",
  },
  {
    id: "c-image",
    name: "AI图像工具",
    slug: "ai-image",
    icon: "Image",
    gradient: "from-pink-500 to-rose-500",
    description: "文生图、图像编辑、放大修复与风格转换",
  },
  {
    id: "c-video",
    name: "AI视频工具",
    slug: "ai-video",
    icon: "Clapperboard",
    gradient: "from-orange-500 to-amber-500",
    description: "文生视频、数字人、视频翻译与剪辑",
  },
  {
    id: "c-office",
    name: "AI办公工具",
    slug: "ai-office",
    icon: "Briefcase",
    gradient: "from-sky-500 to-cyan-500",
    description: "文档、表格、PPT、会议纪要效率提升",
  },
  {
    id: "c-agent",
    name: "AI智能体",
    slug: "ai-agent",
    icon: "Bot",
    gradient: "from-emerald-500 to-teal-500",
    description: "自主任务执行、工作流编排与多智能体",
  },
  {
    id: "c-chat",
    name: "AI聊天助手",
    slug: "ai-chat",
    icon: "MessageCircle",
    gradient: "from-indigo-500 to-violet-500",
    description: "通用对话助手、问答与角色扮演",
  },
  {
    id: "c-programming",
    name: "AI编程工具",
    slug: "ai-programming",
    icon: "Code2",
    gradient: "from-lime-500 to-green-500",
    description: "代码补全、生成、审查与开发助手",
  },
  {
    id: "c-design",
    name: "AI设计工具",
    slug: "ai-design",
    icon: "Palette",
    gradient: "from-fuchsia-500 to-purple-500",
    description: "UI 设计、Logo、海报与素材生成",
  },
  {
    id: "c-audio",
    name: "AI音频工具",
    slug: "ai-audio",
    icon: "Music",
    gradient: "from-cyan-500 to-blue-500",
    description: "语音合成、音乐生成、降噪与转写",
  },
  {
    id: "c-search",
    name: "AI搜索引擎",
    slug: "ai-search",
    icon: "Search",
    gradient: "from-blue-500 to-indigo-500",
    description: "AI 驱动的搜索、问答与知识聚合",
  },
  {
    id: "c-framework",
    name: "AI开发平台",
    slug: "ai-framework",
    icon: "Boxes",
    gradient: "from-teal-500 to-emerald-500",
    description: "模型训练、部署、Agent 框架与 API",
  },
  {
    id: "c-learning",
    name: "AI学习网站",
    slug: "ai-learning",
    icon: "GraduationCap",
    gradient: "from-amber-500 to-orange-500",
    description: "AI 课程、教程、论文与社区资源",
  },
  {
    id: "c-models",
    name: "AI训练模型",
    slug: "ai-models",
    icon: "BrainCircuit",
    gradient: "from-purple-500 to-violet-500",
    description: "开源大模型、多模态与垂直领域模型",
  },
  {
    id: "c-detection",
    name: "AI内容检测",
    slug: "ai-detection",
    icon: "ShieldCheck",
    gradient: "from-rose-500 to-red-500",
    description: "AI 生成内容检测、防伪与优化",
  },
  {
    id: "c-prompt",
    name: "AI提示指令",
    slug: "ai-prompt",
    icon: "Wand2",
    gradient: "from-yellow-500 to-amber-500",
    description: "Prompt 模板、管理与优化工具",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
