import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineUpCard } from "@/components/dashboard/LineUpCard";
import { ActivityWidget } from "@/components/dashboard/ActivityWidget";
import { ProgressWidget } from "@/components/dashboard/ProgressWidget";
import { WorkingActivityWidget } from "@/components/dashboard/WorkingActivityWidget";

const lineUpProjects = [
  { project: "Banking app shot", category: "Dribbble", progress: 43, time: "23:00:57", team: ["A"], variant: "peach" as const },
  { project: "Geological website case", category: "Behance", progress: 67, time: "16:20:32", team: ["B", "C", "D"], variant: "lime" as const },
];

const trendingProjects = [
  { project: "Banking App Animation", category: "Dribbble", progress: 12, time: "10:48:14", team: ["A", "B"], variant: "lavender" as const },
  { project: "AI chat app case", category: "Behance", progress: 36, time: "6:39:43", team: ["C"], variant: "peach" as const },
  { project: "Logotype design", category: "Bona Fide Internal", progress: 98, time: "24:05:09", team: ["D"], variant: "lime" as const },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 animate-fade-in">
      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-1 tracking-tight">Good Morning, Rafael!</h1>
            <p className="text-sm text-muted-foreground">Friday, July 26, 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 rounded-2xl">
              <ExternalLink className="w-4 h-4" />
              Projects <span className="text-xs bg-muted px-1.5 py-0.5 rounded">44</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-2xl">
              <ExternalLink className="w-4 h-4" />
              Tasks <span className="text-xs bg-muted px-1.5 py-0.5 rounded">116</span>
            </Button>
          </div>
        </div>

        {/* LineUp Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            LineUp <span className="text-lg text-muted-foreground">(2)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lineUpProjects.map((project, i) => (
              <LineUpCard key={i} {...project} />
            ))}
            <button className="rounded-3xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex items-center justify-center min-h-[140px] group">
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Add Task</span>
              </div>
            </button>
          </div>
        </div>

        {/* Trending Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Trending <span className="text-lg text-muted-foreground">(3)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingProjects.map((project, i) => (
              <LineUpCard key={i} {...project} />
            ))}
          </div>
        </div>

        {/* My Work Section */}
        <div className="bg-card rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              My Work <span className="text-base text-muted-foreground">(3)</span>
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-medium">
                To do <span className="ml-1">6</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                Comments <span className="ml-1">2</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                Done <span className="ml-1">15</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                Delegate <span className="ml-1">4</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { task: "Dribbble: Banking app shot", path: "Publications / Shots / Dribbble", id: "3/19", date: "July 22" },
              { task: "Behance: Mobile delivery app", path: "Publications / Shots / Behance", id: "1/8", date: "July 24" },
              { task: "Event: User research methods", path: "Internal / Events / Design", id: "2/14", date: "July 26" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/40 transition-colors">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{item.path}</p>
                  <p className="text-sm font-bold">{item.task}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{item.id}</span>
                  <div className="flex -space-x-2">
                    {["A", "B", "C"].slice(0, i + 2).map((letter, j) => (
                      <div key={j} className="w-6 h-6 rounded-full bg-chart-peach border-2 border-white flex items-center justify-center text-xs font-bold text-primary">
                        {letter}
                      </div>
                    ))}
                    {i === 2 && <div className="w-6 h-6 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-bold">+3</div>}
                  </div>
                  <span>{item.date}</span>
                  <button className="text-muted-foreground hover:text-foreground">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4">
        <ActivityWidget />
        <ProgressWidget />
        <WorkingActivityWidget />
      </div>
    </div>
  );
}
