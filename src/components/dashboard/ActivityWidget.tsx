import { TrendingUp } from "lucide-react";

export function ActivityWidget() {
  // Simple sparkline path
  const sparklinePath = "M 0 30 Q 10 20, 20 25 T 40 15 T 60 20 T 80 10 T 100 15";

  return (
    <div className="bg-widget-lime rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <p className="text-base font-bold text-primary">Weekly activity</p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-white/30 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            +3%
          </div>
        </div>
        <p className="text-4xl font-bold text-primary tracking-tight">58%</p>
      </div>
      
      <svg 
        className="absolute bottom-0 left-0 w-full h-20 opacity-30 group-hover:opacity-40 transition-opacity"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d={sparklinePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-primary"
        />
      </svg>
    </div>
  );
}
