import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductivityGaugeProps {
  score: number; // 0-100
  totalHours: number;
  productiveHours: number;
}

export function ProductivityGauge({ score, totalHours, productiveHours }: ProductivityGaugeProps) {
  // Create data for semi-circle gauge
  const gaugeData = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ];

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--chart-lime))";
    if (score >= 60) return "hsl(var(--chart-amber))";
    if (score >= 40) return "hsl(var(--chart-peach))";
    return "hsl(var(--destructive))";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Card variant="elevated">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Productivity Score</CardTitle>
          <Badge variant="secondary" className="text-xs">This Week</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative h-40 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="85%"
                startAngle={180}
                endAngle={0}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={getScoreColor(score)} />
                <Cell fill="hsl(var(--muted))" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <span 
              className="text-5xl font-bold"
              style={{ color: getScoreColor(score) }}
            >
              {score}
            </span>
            <span className="text-sm font-medium text-muted-foreground mt-1">
              {getScoreLabel(score)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-lime">{productiveHours}h</p>
            <p className="text-xs text-muted-foreground">Productive</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground">{totalHours}h</p>
            <p className="text-xs text-muted-foreground">Total Tracked</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
