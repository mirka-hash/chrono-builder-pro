import { ExternalLink, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineUpCard } from "@/components/dashboard/LineUpCard";
import { useNavigate } from "react-router-dom";
import { EnhancedTimelineWidget } from "@/components/dashboard/EnhancedTimelineWidget";
import { ProductivityGauge } from "@/components/dashboard/ProductivityGauge";
import { TimeDistributionChart } from "@/components/dashboard/TimeDistributionChart";
import { WeeklyTrendChart } from "@/components/dashboard/WeeklyTrendChart";
import { TopProjectsWidget } from "@/components/dashboard/TopProjectsWidget";
import { QuickStatsGrid } from "@/components/dashboard/QuickStatsGrid";
import { ProductivityBreakdown } from "@/components/dashboard/ProductivityBreakdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - in production this would come from your database
const lineUpProjects = [
  { project: "Banking app shot", category: "Dribbble", progress: 43, time: "23:00:57", team: ["A"], variant: "peach" as const },
  { project: "Geological website case", category: "Behance", progress: 67, time: "16:20:32", team: ["B", "C", "D"], variant: "lime" as const },
];

const timeDistributionData = [
  { name: "Development", hours: 18.5, color: "hsl(var(--chart-lime))" },
  { name: "Design", hours: 12.3, color: "hsl(var(--chart-lavender))" },
  { name: "Meetings", hours: 6.2, color: "hsl(var(--chart-amber))" },
  { name: "Research", hours: 4.8, color: "hsl(var(--chart-blue))" },
  { name: "Admin", hours: 3.7, color: "hsl(var(--chart-peach))" },
];

const weeklyTrendData = [
  { day: "Mon", productive: 6.5, neutral: 1.2, unproductive: 0.5 },
  { day: "Tue", productive: 7.2, neutral: 0.8, unproductive: 0.3 },
  { day: "Wed", productive: 5.8, neutral: 1.5, unproductive: 0.7 },
  { day: "Thu", productive: 8.1, neutral: 0.6, unproductive: 0.2 },
  { day: "Fri", productive: 6.9, neutral: 1.0, unproductive: 0.4 },
  { day: "Sat", productive: 2.5, neutral: 1.8, unproductive: 0.2 },
  { day: "Sun", productive: 1.2, neutral: 0.6, unproductive: 0.1 },
];

const topProjectsData = [
  { name: "Banking App", hours: 12.5, trend: "up" as const, trendPercent: 15, color: "hsl(var(--chart-lime))" },
  { name: "E-commerce Site", hours: 8.3, trend: "up" as const, trendPercent: 8, color: "hsl(var(--chart-lavender))" },
  { name: "Mobile App", hours: 6.7, trend: "down" as const, trendPercent: 5, color: "hsl(var(--chart-amber))" },
  { name: "Dashboard UI", hours: 4.2, trend: "stable" as const, trendPercent: 0, color: "hsl(var(--chart-blue))" },
  { name: "API Integration", hours: 3.1, trend: "up" as const, trendPercent: 22, color: "hsl(var(--chart-peach))" },
];

const productivityData = {
  productive: { hours: 38.2, sessions: 24 },
  neutral: { hours: 7.5, sessions: 12 },
  unproductive: { hours: 2.4, sessions: 8 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Calculate productivity score
  const totalHours = productivityData.productive.hours + productivityData.neutral.hours + productivityData.unproductive.hours;
  const productivityScore = Math.round((productivityData.productive.hours / totalHours) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-1 tracking-tight">Good Morning, Rafael!</h1>
          <p className="text-sm text-muted-foreground">Friday, July 26, 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/projects")}>
            <ExternalLink className="w-4 h-4" />
            Projects <Badge variant="secondary" className="ml-1">44</Badge>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Tasks <Badge variant="secondary" className="ml-1">116</Badge>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid
        todayHours={6.5}
        weeklyGoal={40}
        weeklyProgress={82}
        streak={12}
        avgDailyHours={6.9}
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Trend Chart */}
          <WeeklyTrendChart data={weeklyTrendData} />

          {/* LineUp Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold tracking-tight">
                LineUp <span className="text-xl text-muted-foreground font-semibold">(2)</span>
              </h2>
              <Button size="sm" className="gap-2 h-8">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lineUpProjects.map((project, i) => (
                <LineUpCard key={i} {...project} onClick={() => navigate(`/projects/${i + 1}`)} />
              ))}
            </div>
          </div>

          {/* Time Distribution + Top Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimeDistributionChart data={timeDistributionData} />
            <TopProjectsWidget projects={topProjectsData} />
          </div>
        </div>

        {/* Right Column - Productivity & Timeline */}
        <div className="space-y-6">
          <ProductivityGauge
            score={productivityScore}
            totalHours={totalHours}
            productiveHours={productivityData.productive.hours}
          />
          <ProductivityBreakdown
            productive={productivityData.productive}
            neutral={productivityData.neutral}
            unproductive={productivityData.unproductive}
          />
          <EnhancedTimelineWidget />
        </div>
      </div>

      {/* My Work Section */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              My Work <span className="text-lg text-muted-foreground font-semibold">(3)</span>
            </CardTitle>
            <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium text-sm transition-all hover:opacity-90">
                To do <Badge variant="secondary" className="ml-1.5">6</Badge>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-full font-medium text-sm transition-colors hover:bg-background">
                Comments <span className="ml-1">2</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-full font-medium text-sm transition-colors hover:bg-background">
                Done <span className="ml-1">15</span>
              </button>
              <button className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-full font-medium text-sm transition-colors hover:bg-background">
                Delegate <span className="ml-1">4</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { task: "Dribbble: Banking app shot", path: "Publications / Shots / Dribbble", id: "3/19", date: "July 22", color: "bg-card-yellow" },
              { task: "Behance: Mobile delivery app", path: "Publications / Shots / Behance", id: "1/8", date: "July 24", color: "bg-card-pink" },
              { task: "Event: User research methods", path: "Internal / Events / Design", id: "2/14", date: "July 26", color: "bg-card-green" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${item.color} hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer group`}>
                <div className="flex-1">
                  <p className="text-xs text-foreground/60 font-medium mb-1.5">{item.path}</p>
                  <p className="text-sm font-bold text-foreground">{item.task}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-foreground/70">
                  <span className="font-semibold bg-white/50 px-2 py-1 rounded-lg">{item.id}</span>
                  <div className="flex -space-x-2">
                    {["A", "B", "C"].slice(0, i + 2).map((letter, j) => (
                      <div key={j} className="w-7 h-7 rounded-full bg-white/60 border-2 border-white flex items-center justify-center text-xs font-bold text-foreground shadow-sm hover:scale-110 hover:z-10 transition-transform">
                        {letter}
                      </div>
                    ))}
                    {i === 2 && <div className="w-7 h-7 rounded-full bg-white/40 border-2 border-white flex items-center justify-center text-xs font-bold shadow-sm hover:scale-110 hover:z-10 transition-transform">+3</div>}
                  </div>
                  <span className="font-medium">{item.date}</span>
                  <button className="text-foreground/60 hover:text-foreground font-bold text-lg transition-colors">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Productivity Info Card */}
      <Card variant="lavender">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/50 rounded-xl">
              <Settings className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-foreground">How is productivity calculated?</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Your productivity score is based on how you categorize your time sessions. 
                Mark sessions as <span className="text-chart-lime font-medium">Productive</span>, 
                <span className="text-chart-amber font-medium"> Neutral</span>, or 
                <span className="text-chart-peach font-medium"> Unproductive</span> when logging time. 
                The score shows the percentage of productive hours vs total tracked time.
              </p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => navigate("/settings")}>
                Configure Productivity Rules
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
