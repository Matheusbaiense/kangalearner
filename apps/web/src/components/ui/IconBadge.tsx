import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  label?: string;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "success" | "warning" | "danger" | "muted" | "brand";
  className?: string;
  iconClassName?: string;
};

export function IconBadge({
  icon: Icon,
  label,
  size = "md",
  tone = "default",
  className = "",
  iconClassName = ""
}: IconBadgeProps) {
  const cls = ["icon-badge", `icon-badge--${size}`, `icon-badge--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  const icoCls = ["icon-badge__icon", iconClassName].filter(Boolean).join(" ");

  return (
    <span className={cls} aria-hidden={label ? undefined : true} aria-label={label}>
      <Icon className={icoCls} strokeWidth={2.2} />
    </span>
  );
}
