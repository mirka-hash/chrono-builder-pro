import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimeCategory {
  name: string;
  hours: number;
  color: string;
}

interface TimeDistributionChartProps {
  data: TimeCategory[];
}

export function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card variant="elevated">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Time by Category</CardTitle>
          <Badge variant="secondary">{total.toFixed(1)}h total</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-6">
          <div className="relative h-44 w-44 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="hours"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-lg">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.hours}h ({((item.hours / total) * 100).toFixed(0)}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{item.hours}h</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({((item.hours / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
