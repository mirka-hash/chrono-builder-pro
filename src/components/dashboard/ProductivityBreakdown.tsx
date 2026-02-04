import { CheckCircle, MinusCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      bgColor: "bg-card-green",
      iconColor: "text-success",
    },
    {
      icon: MinusCircle,
      label: "Neutral",
      hours: neutral.hours,
      sessions: neutral.sessions,
      percentage: total > 0 ? (neutral.hours / total) * 100 : 0,
      bgColor: "bg-card-yellow",
      iconColor: "text-warning",
    },
    {
      icon: XCircle,
      label: "Unproductive",
      hours: unproductive.hours,
      sessions: unproductive.sessions,
      percentage: total > 0 ? (unproductive.hours / total) * 100 : 0,
      bgColor: "bg-card-pink",
      iconColor: "text-destructive",
    },
  ];

  return (
    <Card variant="elevated">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Productivity Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Stacked bar */}
        <div className="h-3 flex rounded-full overflow-hidden mb-5">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`${cat.bgColor} transition-all duration-500`}
              style={{ width: `${cat.percentage}%` }}
            />
          ))}
        </div>

        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-xl ${cat.bgColor} transition-all hover:-translate-y-0.5 hover:shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/50 rounded-lg">
                  <cat.icon className={`w-5 h-5 ${cat.iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{cat.label}</p>
                  <p className="text-xs text-foreground/60">{cat.sessions} sessions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{cat.hours.toFixed(1)}h</p>
                <p className="text-xs text-foreground/60">{cat.percentage.toFixed(0)}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
