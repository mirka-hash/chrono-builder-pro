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
      gradient: "gradient-peach",
    },
    {
      icon: Target,
      label: "Weekly Goal",
      value: `${weeklyProgress}%`,
      subtext: `${weeklyGoal}h target`,
      gradient: "gradient-lime",
    },
    {
      icon: Flame,
      label: "Streak",
      value: `${streak}`,
      subtext: "days",
      gradient: "gradient-amber",
    },
    {
      icon: Calendar,
      label: "Daily Avg",
      value: `${avgDailyHours}h`,
      subtext: "this week",
      gradient: "gradient-lavender",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.gradient} rounded-3xl p-5 card-shadow card-hover`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-background/30 rounded-xl backdrop-blur-sm">
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
            <p className="text-xs opacity-60">{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
