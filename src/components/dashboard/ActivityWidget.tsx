import { TrendingUp } from "lucide-react";

export function ActivityWidget() {
  // Simple sparkline path
  const sparklinePath = "M 0 30 Q 10 20, 20 25 T 40 15 T 60 20 T 80 10 T 100 15";

  return (
    <div className="bg-widget-lime rounded-3xl p-6 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm font-bold text-primary">Weekly activity</p>
          <div className="flex items-center gap-1 text-xs font-bold text-primary">
            <TrendingUp className="w-3 h-3" />
            +3%
          </div>
        </div>
        <p className="text-2xl font-bold text-primary">58%</p>
      </div>
      
      <svg 
        className="absolute bottom-0 left-0 w-full h-16 opacity-40"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d={sparklinePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
      </svg>
    </div>
  );
}
