import { cn } from "@/lib/utils";

interface TimeBlock {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  project: string;
  color: string;
}

export function DailyTimelineWidget() {
  const currentHour = 14; // 2 PM for demo
  const currentMinute = 30;
  
  const timeBlocks: TimeBlock[] = [
    { startHour: 9, startMinute: 0, endHour: 10, endMinute: 30, project: "Website Redesign", color: "bg-chart-peach" },
    { startHour: 10, startMinute: 45, endHour: 12, endMinute: 0, project: "Mobile App Dev", color: "bg-chart-lavender" },
    { startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, project: "Client Meeting", color: "bg-chart-lime" },
    { startHour: 15, startMinute: 0, endHour: 17, endMinute: 0, project: "Brand Identity", color: "bg-chart-amber" },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getBlockPosition = (hour: number, minute: number) => {
    return ((hour - 8) * 60 + minute) / (12 * 60) * 100;
  };

  const getCurrentTimePosition = () => {
    return getBlockPosition(currentHour, currentMinute);
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold">Today's Timeline</h3>
        <div className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          {currentHour > 12 ? currentHour - 12 : currentHour}:{currentMinute.toString().padStart(2, '0')} {currentHour >= 12 ? 'PM' : 'AM'}
        </div>
      </div>

      <div className="relative">
        {/* Time labels and lines */}
        <div className="space-y-0">
          {hours.map((hour) => (
            <div key={hour} className="relative h-12 border-t border-border/40 first:border-t-0">
              <span className="absolute -left-1 -top-2.5 text-xs font-semibold text-muted-foreground bg-card px-1">
                {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
              </span>
            </div>
          ))}
        </div>

        {/* Time blocks */}
        <div className="absolute inset-0 pointer-events-none">
          {timeBlocks.map((block, i) => {
            const top = getBlockPosition(block.startHour, block.startMinute);
            const height = getBlockPosition(block.endHour, block.endMinute) - top;
            
            return (
              <div
                key={i}
                className={cn(
                  "absolute left-12 right-0 rounded-2xl shadow-sm border-2 border-white pointer-events-auto cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md",
                  block.color
                )}
                style={{
                  top: `${top}%`,
                  height: `${height}%`,
                }}
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-primary leading-tight line-clamp-2">
                      {block.project}
                    </p>
                  </div>
                  <p className="text-[10px] font-semibold text-primary/70">
                    {block.startHour > 12 ? block.startHour - 12 : block.startHour}:{block.startMinute.toString().padStart(2, '0')} - 
                    {block.endHour > 12 ? block.endHour - 12 : block.endHour}:{block.endMinute.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current time indicator */}
        <div
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{ top: `${getCurrentTimePosition()}%` }}
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-destructive shadow-lg border-2 border-white" />
            <div className="flex-1 h-0.5 bg-destructive" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1">Total logged</p>
          <p className="text-xl font-bold tracking-tight">7.75h</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground font-medium mb-1">Remaining</p>
          <p className="text-xl font-bold tracking-tight text-muted-foreground">0.25h</p>
        </div>
      </div>
    </div>
  );
}
