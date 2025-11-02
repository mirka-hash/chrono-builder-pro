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
      "rounded-3xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
      gradientClasses[variant]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-primary/70 font-semibold mb-1.5 tracking-wide uppercase">{category}</p>
          <p className="text-base font-bold text-primary leading-tight">{project}</p>
        </div>
        <p className="text-4xl font-bold text-primary ml-4 tracking-tight">{progress}%</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.map((initial, i) => (
            <Avatar key={i} className={cn(
              "w-8 h-8 border-[3px] border-white shadow-sm transition-transform hover:scale-110 hover:z-10",
              avatarColors[i % avatarColors.length]
            )}>
              <AvatarFallback className="text-xs font-bold text-primary">
                {initial}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-primary/70 bg-white/40 px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-semibold">{time}</span>
        </div>
      </div>
    </div>
  );
}
