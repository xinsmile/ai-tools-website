// 基于 lucide 图标名的动态渲染组件
import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon {...props} />;
}
