import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  gradient: "peach" | "lavender" | "lime" | "amber";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  trend,
}: StatsCardProps) {
  const gradientClasses = {
    peach: "gradient-peach",
    lavender: "gradient-lavender",
    lime: "gradient-lime",
    amber: "gradient-amber",
  };

  return (
    <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
      <div className="flex items-start justify-between mb-5">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", gradientClasses[gradient])}>
          <Icon className="w-7 h-7 text-primary" strokeWidth={2.5} />
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-semibold px-3 py-1.5 rounded-xl",
            trend.isPositive ? "bg-success text-success-foreground" : "bg-destructive/10 text-destructive"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
        <p className="text-4xl font-bold tracking-tight mb-1">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
