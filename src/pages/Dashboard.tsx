import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineUpCard } from "@/components/dashboard/LineUpCard";
import { ActivityWidget } from "@/components/dashboard/ActivityWidget";
import { ProgressWidget } from "@/components/dashboard/ProgressWidget";
import { WorkingActivityWidget } from "@/components/dashboard/WorkingActivityWidget";
import { DailyTimelineWidget } from "@/components/dashboard/DailyTimelineWidget";

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
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold tracking-tight">
              LineUp <span className="text-xl text-muted-foreground font-semibold">(2)</span>
            </h2>
            <Button size="sm" className="gap-2 rounded-2xl shadow-sm h-8">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lineUpProjects.map((project, i) => (
              <LineUpCard key={i} {...project} />
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div>
          <h2 className="text-2xl font-bold mb-5 tracking-tight">
            Trending <span className="text-xl text-muted-foreground font-semibold">(3)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trendingProjects.map((project, i) => (
              <LineUpCard key={i} {...project} />
            ))}
          </div>
        </div>

        {/* My Work Section */}
        <div className="bg-card rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">
              My Work <span className="text-lg text-muted-foreground font-semibold">(3)</span>
            </h2>
            <div className="flex items-center gap-1 bg-muted/50 rounded-2xl p-1">
              <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all hover:scale-105">
                To do <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded">6</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-xl font-medium text-sm transition-colors hover:bg-background">
                Comments <span className="ml-1">2</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-xl font-medium text-sm transition-colors hover:bg-background">
                Done <span className="ml-1">15</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-xl font-medium text-sm transition-colors hover:bg-background">
                Delegate <span className="ml-1">4</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {[
              { task: "Dribbble: Banking app shot", path: "Publications / Shots / Dribbble", id: "3/19", date: "July 22" },
              { task: "Behance: Mobile delivery app", path: "Publications / Shots / Behance", id: "1/8", date: "July 24" },
              { task: "Event: User research methods", path: "Internal / Events / Design", id: "2/14", date: "July 26" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/40 transition-all border border-transparent hover:border-border/40 cursor-pointer group">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium mb-1.5">{item.path}</p>
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.task}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-semibold bg-muted px-2 py-1 rounded-lg">{item.id}</span>
                  <div className="flex -space-x-2">
                    {["A", "B", "C"].slice(0, i + 2).map((letter, j) => (
                      <div key={j} className="w-7 h-7 rounded-full bg-chart-peach border-[3px] border-white flex items-center justify-center text-xs font-bold text-primary shadow-sm hover:scale-110 hover:z-10 transition-transform">
                        {letter}
                      </div>
                    ))}
                    {i === 2 && <div className="w-7 h-7 rounded-full bg-muted border-[3px] border-white flex items-center justify-center text-xs font-bold shadow-sm hover:scale-110 hover:z-10 transition-transform">+3</div>}
                  </div>
                  <span className="font-medium">{item.date}</span>
                  <button className="text-muted-foreground hover:text-foreground font-bold text-lg transition-colors">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-5">
        <ProgressWidget />
        <DailyTimelineWidget />
      </div>
    </div>
  );
}
