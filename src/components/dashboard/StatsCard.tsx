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
    <div className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", gradientClasses[gradient])}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-lg",
            trend.isPositive ? "bg-success text-success-foreground" : "bg-destructive/10 text-destructive"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
