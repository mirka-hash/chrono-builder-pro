import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Project {
  name: string;
  hours: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  color: string;
}

interface TopProjectsWidgetProps {
  projects: Project[];
}

export function TopProjectsWidget({ projects }: TopProjectsWidgetProps) {
  const maxHours = Math.max(...projects.map(p => p.hours));

  return (
    <div className="bg-card rounded-3xl p-6 card-shadow card-hover">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold">Top Projects</h3>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-lg">
          This Week
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-sm font-medium">{project.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{project.hours}h</span>
                <div className={`flex items-center gap-0.5 text-xs ${
                  project.trend === "up" 
                    ? "text-chart-lime" 
                    : project.trend === "down" 
                    ? "text-destructive" 
                    : "text-muted-foreground"
                }`}>
                  {project.trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {project.trend === "down" && <TrendingDown className="w-3 h-3" />}
                  {project.trend === "stable" && <Minus className="w-3 h-3" />}
                  <span>{project.trendPercent}%</span>
                </div>
              </div>
            </div>
            <Progress 
              value={(project.hours / maxHours) * 100} 
              className="h-2"
              style={{ 
                // @ts-ignore
                '--progress-background': project.color 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
