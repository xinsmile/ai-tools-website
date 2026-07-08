import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  crumbs?: Crumb[];
  title: string;
  subtitle?: string;
  icon?: { name: string; gradient: string };
  children?: React.ReactNode;
}

export default function PageHeader({
  crumbs = [],
  title,
  subtitle,
  icon,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[110px]" />
      <div className="container relative py-12">
        {/* 面包屑 */}
        {crumbs.length > 0 && (
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/40">
            <Link to="/" className="transition hover:text-white/70">
              首页
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {c.to ? (
                  <Link to={c.to} className="transition hover:text-white/70">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="flex items-start gap-4">
          {icon && (
            <div
              className={cn(
                "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
                icon.gradient,
              )}
            >
              <Icon name={icon.name} className="h-8 w-8" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="section-title text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
