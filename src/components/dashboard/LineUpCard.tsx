import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LineUpCardProps {
  project: string;
  category: string;
  progress: number;
  time: string;
  team: string[];
  variant: "peach" | "lavender" | "lime" | "amber";
}

export function LineUpCard({ project, category, progress, time, team, variant }: LineUpCardProps) {
  const gradientClasses = {
    peach: "gradient-peach",
    lavender: "gradient-lavender",
    lime: "gradient-lime",
    amber: "gradient-amber",
  };

  const avatarColors = [
    "bg-chart-peach",
    "bg-chart-lavender", 
    "bg-chart-lime",
    "bg-chart-amber",
  ];

  return (
    <div className={cn(
      "rounded-3xl p-5 shadow-sm transition-all hover:shadow-md",
      gradientClasses[variant]
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs text-primary/60 font-medium mb-1">{category}</p>
          <p className="text-sm font-bold text-primary leading-tight">{project}</p>
        </div>
        <p className="text-3xl font-bold text-primary ml-3">{progress}%</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.map((initial, i) => (
            <Avatar key={i} className={cn("w-7 h-7 border-2 border-white", avatarColors[i % avatarColors.length])}>
              <AvatarFallback className="text-xs font-bold text-primary">
                {initial}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-primary/60">
          <Clock className="w-3 h-3" />
          <span className="font-medium">{time}</span>
        </div>
      </div>
    </div>
  );
}
