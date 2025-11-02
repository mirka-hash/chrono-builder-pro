import { TrendingUp } from "lucide-react";

export function ProgressWidget() {
  const progress = 56;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-widget-pink rounded-3xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-bold text-primary">Total progress<br/>this week</p>
        <div className="flex items-center gap-1 text-xs font-bold text-primary">
          <TrendingUp className="w-3 h-3" />
          +7%
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="56"
              cy="56"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary/20"
            />
            {/* Progress circle */}
            <circle
              cx="56"
              cy="56"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{progress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
