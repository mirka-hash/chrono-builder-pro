import { Clock, Target, Flame, Calendar } from "lucide-react";

interface QuickStatsGridProps {
  todayHours: number;
  weeklyGoal: number;
  weeklyProgress: number;
  streak: number;
  avgDailyHours: number;
}

export function QuickStatsGrid({ 
  todayHours, 
  weeklyGoal, 
  weeklyProgress, 
  streak, 
  avgDailyHours 
}: QuickStatsGridProps) {
  const stats = [
    {
      icon: Clock,
      label: "Today",
      value: `${todayHours}h`,
      subtext: "tracked",
      bgClass: "bg-card-pink",
    },
    {
      icon: Target,
      label: "Weekly Goal",
      value: `${weeklyProgress}%`,
      subtext: `${weeklyGoal}h target`,
      bgClass: "bg-card-green",
    },
    {
      icon: Flame,
      label: "Streak",
      value: `${streak}`,
      subtext: "days",
      bgClass: "bg-card-yellow",
    },
    {
      icon: Calendar,
      label: "Daily Avg",
      value: `${avgDailyHours}h`,
      subtext: "this week",
      bgClass: "bg-card-blue",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgClass} rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-white/50 rounded-xl">
              <stat.icon className="w-5 h-5 text-foreground" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm font-medium text-foreground/80">{stat.label}</p>
            <p className="text-xs text-foreground/60">{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
