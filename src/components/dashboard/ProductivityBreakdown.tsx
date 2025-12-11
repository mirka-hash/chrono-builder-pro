import { CheckCircle, MinusCircle, XCircle } from "lucide-react";

interface ProductivityBreakdownProps {
  productive: { hours: number; sessions: number };
  neutral: { hours: number; sessions: number };
  unproductive: { hours: number; sessions: number };
}

export function ProductivityBreakdown({ productive, neutral, unproductive }: ProductivityBreakdownProps) {
  const total = productive.hours + neutral.hours + unproductive.hours;

  const categories = [
    {
      icon: CheckCircle,
      label: "Productive",
      hours: productive.hours,
      sessions: productive.sessions,
      percentage: total > 0 ? (productive.hours / total) * 100 : 0,
      color: "bg-chart-lime",
      textColor: "text-chart-lime",
    },
    {
      icon: MinusCircle,
      label: "Neutral",
      hours: neutral.hours,
      sessions: neutral.sessions,
      percentage: total > 0 ? (neutral.hours / total) * 100 : 0,
      color: "bg-chart-amber",
      textColor: "text-chart-amber",
    },
    {
      icon: XCircle,
      label: "Unproductive",
      hours: unproductive.hours,
      sessions: unproductive.sessions,
      percentage: total > 0 ? (unproductive.hours / total) * 100 : 0,
      color: "bg-chart-peach",
      textColor: "text-chart-peach",
    },
  ];

  return (
    <div className="bg-card rounded-3xl p-6 card-shadow card-hover">
      <h3 className="text-lg font-bold mb-5">Productivity Breakdown</h3>

      {/* Stacked bar */}
      <div className="h-4 flex rounded-full overflow-hidden mb-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`${cat.color} transition-all duration-500`}
            style={{ width: `${cat.percentage}%` }}
          />
        ))}
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 ${cat.color}/20 rounded-xl`}>
                <cat.icon className={`w-5 h-5 ${cat.textColor}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.sessions} sessions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{cat.hours.toFixed(1)}h</p>
              <p className="text-xs text-muted-foreground">{cat.percentage.toFixed(0)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
