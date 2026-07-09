interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  eyebrow?: string;
  action?: React.ReactNode;
}

export default function SectionTitle({
  title,
  subtitle,
  icon,
  eyebrow,
  action,
}: SectionTitleProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-500/20">
            {icon}
          </div>
        )}
        <div>
          {eyebrow && (
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
              {eyebrow}
            </div>
          )}
          <h2 className="section-title text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 max-w-2xl text-sm text-white/50">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
