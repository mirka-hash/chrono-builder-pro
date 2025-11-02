import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WorkingActivityWidget() {
  const days = [
    { day: "Wed", date: 24, bars: [{ color: "bg-chart-peach", height: "h-16" }, { color: "bg-chart-lime", height: "h-24" }] },
    { day: "Thu", date: 25, bars: [{ color: "bg-chart-amber", height: "h-20" }, { color: "bg-chart-lime", height: "h-28" }] },
    { day: "Fri", date: 26, bars: [{ color: "bg-chart-amber", height: "h-32", striped: true }, { color: "bg-chart-lavender", height: "h-20" }], active: true },
    { day: "Sat", date: 27, bars: [{ color: "bg-chart-lime", height: "h-28" }] },
    { day: "Sun", date: 28, bars: [{ color: "bg-chart-pink", height: "h-24" }, { color: "bg-chart-amber", height: "h-20" }] },
  ];

  return (
    <div className="bg-card rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold">Working activity</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs font-medium text-muted-foreground px-2">July 24 - 28</span>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 h-48 mb-4">
        {days.map((day) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-medium text-muted-foreground">{day.day}</div>
            <div className={cn(
              "text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center",
              day.active ? "bg-chart-lavender text-primary" : "text-foreground"
            )}>
              {day.date}
            </div>
            <div className="flex-1 w-full flex flex-col justify-end gap-2">
              {day.bars.map((bar, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-full rounded-t-2xl transition-all",
                    bar.color,
                    bar.height,
                    bar.striped && "relative overflow-hidden"
                  )}
                  style={bar.striped ? {
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 4px,
                      rgba(0, 0, 0, 0.1) 4px,
                      rgba(0, 0, 0, 0.1) 8px
                    )`
                  } : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t">
        <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-2 inline-block mb-2">
          <div className="text-xl font-bold">10:59:16</div>
          <div className="text-xs opacity-80">Today</div>
        </div>
        <div className="text-sm">
          <span className="font-bold">Total time:</span>
          <span className="text-muted-foreground ml-1">24 hours</span>
        </div>
      </div>
    </div>
  );
}
