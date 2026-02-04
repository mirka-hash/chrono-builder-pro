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
  onClick?: () => void;
}

export function LineUpCard({ project, category, progress, time, team, variant, onClick }: LineUpCardProps) {
  const colorClasses = {
    peach: "bg-card-pink",
    lavender: "bg-card-lavender",
    lime: "bg-card-green",
    amber: "bg-card-yellow",
  };

  const avatarColors = [
    "bg-card-pink",
    "bg-card-lavender", 
    "bg-card-green",
    "bg-card-yellow",
  ];

  return (
    <div 
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
        colorClasses[variant]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-foreground/60 font-semibold mb-1.5 tracking-wide uppercase">{category}</p>
          <p className="text-base font-bold text-foreground leading-tight">{project}</p>
        </div>
        <p className="text-4xl font-bold text-foreground ml-4 tracking-tight">{progress}%</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.map((initial, i) => (
            <Avatar key={i} className={cn(
              "w-8 h-8 border-2 border-white shadow-sm transition-transform hover:scale-110 hover:z-10",
              avatarColors[i % avatarColors.length]
            )}>
              <AvatarFallback className="text-xs font-bold text-foreground bg-white/60">
                {initial}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-foreground/70 bg-white/50 px-2.5 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-semibold">{time}</span>
        </div>
      </div>
    </div>
  );
}
