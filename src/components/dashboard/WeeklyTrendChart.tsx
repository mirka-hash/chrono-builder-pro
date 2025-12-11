import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WeeklyData {
  day: string;
  productive: number;
  neutral: number;
  unproductive: number;
}

interface WeeklyTrendChartProps {
  data: WeeklyData[];
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  const totalHours = data.reduce((sum, day) => sum + day.productive + day.neutral + day.unproductive, 0);

  return (
    <div className="bg-card rounded-3xl p-6 card-shadow card-hover">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Weekly Activity</h3>
          <p className="text-sm text-muted-foreground">
            {totalHours.toFixed(1)} hours tracked this week
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-lime" />
            <span className="text-xs text-muted-foreground">Productive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-amber" />
            <span className="text-xs text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-peach" />
            <span className="text-xs text-muted-foreground">Unproductive</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProductive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-lime))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-lime))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-amber))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-amber))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUnproductive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-peach))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-peach))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-lg">
                      <p className="font-semibold text-sm mb-1">{label}</p>
                      {payload.map((item, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mr-1.5"
                            style={{ backgroundColor: item.stroke }}
                          />
                          {item.name}: {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}h
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="productive"
              name="Productive"
              stroke="hsl(var(--chart-lime))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProductive)"
            />
            <Area
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke="hsl(var(--chart-amber))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNeutral)"
            />
            <Area
              type="monotone"
              dataKey="unproductive"
              name="Unproductive"
              stroke="hsl(var(--chart-peach))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUnproductive)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
