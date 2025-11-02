import { TrendingUp } from "lucide-react";

export function ProgressWidget() {
  const progress = 56;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-widget-pink rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-5">
        <p className="text-base font-bold text-primary leading-tight">Total progress<br/>this week</p>
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-white/30 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          +7%
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32 group-hover:scale-105 transition-transform">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-primary/20"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary tracking-tight">{progress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
