import { Clock, FolderKanban, Users, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WeeklyActivityChart } from "@/components/charts/WeeklyActivityChart";
import { TimeEntriesList } from "@/components/time/TimeEntriesList";
import { ProjectsList } from "@/components/projects/ProjectsList";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Good Morning, Alex!</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Hours"
          value="6.5"
          subtitle="2 hours left to target"
          icon={Clock}
          gradient="peach"
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Active Projects"
          value="8"
          subtitle="3 due this week"
          icon={FolderKanban}
          gradient="lavender"
        />
        <StatsCard
          title="Active Clients"
          value="12"
          subtitle="2 new this month"
          icon={Users}
          gradient="lime"
          trend={{ value: "20%", isPositive: true }}
        />
        <StatsCard
          title="Weekly Total"
          value="45.5"
          subtitle="hours logged"
          icon={TrendingUp}
          gradient="amber"
          trend={{ value: "8%", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart />
        <ProjectsList />
      </div>

      <TimeEntriesList />
    </div>
  );
}
