import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe, Code, Palette, Users, FolderOpen, Mail, Calendar } from "lucide-react";

interface TimeBlock {
  id: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  project: string;
  app: string;
  title: string;
  activity: string;
  color: string;
  productivityRating: "productive" | "neutral" | "unproductive";
  lane?: number;
}

const appIcons: Record<string, React.ReactNode> = {
  "Arc": <Globe className="w-3 h-3" />,
  "Cursor": <Code className="w-3 h-3" />,
  "Figma": <Palette className="w-3 h-3" />,
  "Zoom": <Users className="w-3 h-3" />,
  "Finder": <FolderOpen className="w-3 h-3" />,
  "Mail": <Mail className="w-3 h-3" />,
  "Calendar": <Calendar className="w-3 h-3" />,
};

const productivityColors = {
  productive: "border-l-4 border-l-success",
  neutral: "border-l-4 border-l-warning",
  unproductive: "border-l-4 border-l-destructive",
};

export function EnhancedTimelineWidget() {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  
  const currentHour = 14;
  const currentMinute = 30;
  
  const timeBlocks: TimeBlock[] = [
    { 
      id: "1",
      startHour: 9, startMinute: 0, endHour: 10, endMinute: 30, 
      project: "Website Redesign", 
      app: "Figma",
      title: "Homepage mockup - Client Project",
      activity: "Design",
      color: "bg-chart-peach",
      productivityRating: "productive",
      lane: 0
    },
    { 
      id: "2",
      startHour: 10, startMinute: 0, endHour: 11, endMinute: 0, 
      project: "MWT Work", 
      app: "Arc",
      title: "Research - competitor analysis",
      activity: "Research",
      color: "bg-chart-blue",
      productivityRating: "productive",
      lane: 1
    },
    { 
      id: "3",
      startHour: 10, startMinute: 45, endHour: 12, endMinute: 30, 
      project: "Mobile App Dev", 
      app: "Cursor",
      title: "Implement auth flow - TimeFlow",
      activity: "Development",
      color: "bg-chart-lavender",
      productivityRating: "productive",
      lane: 0
    },
    { 
      id: "4",
      startHour: 12, startMinute: 30, endHour: 13, endMinute: 0, 
      project: "Break", 
      app: "Calendar",
      title: "Lunch break",
      activity: "Personal",
      color: "bg-muted",
      productivityRating: "neutral",
      lane: 0
    },
    { 
      id: "5",
      startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, 
      project: "Client Meeting", 
      app: "Zoom",
      title: "Weekly sync - Acme Corp",
      activity: "Meetings",
      color: "bg-chart-lime",
      productivityRating: "productive",
      lane: 0
    },
    { 
      id: "6",
      startHour: 15, startMinute: 0, endHour: 17, endMinute: 0, 
      project: "Brand Identity", 
      app: "Figma",
      title: "Logo variations - DesignCo",
      activity: "Design",
      color: "bg-chart-amber",
      productivityRating: "productive",
      lane: 0
    },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const lanes = 2;

  const getBlockPosition = (hour: number, minute: number) => {
    return ((hour - 8) * 60 + minute) / (12 * 60) * 100;
  };

  const getCurrentTimePosition = () => {
    return getBlockPosition(currentHour, currentMinute);
  };

  const formatTime = (hour: number, minute: number) => {
    const h = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${h}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const getDuration = (block: TimeBlock) => {
    const startMinutes = block.startHour * 60 + block.startMinute;
    const endMinutes = block.endHour * 60 + block.endMinute;
    const diff = endMinutes - startMinutes;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="bg-card rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold">Today's Timeline</h3>
          <div className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            {formatTime(currentHour, currentMinute)}
          </div>
        </div>

        <div className="relative" style={{ height: `${hours.length * 48}px` }}>
          {/* Hour grid lines */}
          {hours.map((hour, idx) => (
            <div 
              key={hour} 
              className="absolute left-0 right-0 border-t border-border/30"
              style={{ top: `${(idx / hours.length) * 100}%` }}
            >
              <span className="absolute -top-2.5 right-0 text-[10px] font-medium text-muted-foreground bg-card px-1">
                {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
              </span>
            </div>
          ))}

          {/* Time blocks container */}
          <div className="absolute inset-0 pr-10">
            {timeBlocks.map((block) => {
              const top = getBlockPosition(block.startHour, block.startMinute);
              const height = getBlockPosition(block.endHour, block.endMinute) - top;
              const laneWidth = 100 / lanes;
              const left = (block.lane || 0) * laneWidth;
              
              return (
                <Tooltip key={block.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "absolute rounded-xl shadow-sm cursor-pointer transition-all overflow-hidden",
                        block.color,
                        productivityColors[block.productivityRating],
                        hoveredBlock === block.id ? "scale-[1.02] shadow-md z-20" : "z-10"
                      )}
                      style={{
                        top: `${top}%`,
                        height: `${Math.max(height, 3)}%`,
                        left: `${left}%`,
                        width: `${laneWidth - 2}%`,
                      }}
                      onMouseEnter={() => setHoveredBlock(block.id)}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      <div className="p-2 h-full flex flex-col">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-primary/70">
                            {appIcons[block.app] || <Globe className="w-3 h-3" />}
                          </span>
                          <span className="text-[10px] font-semibold text-primary/70 truncate">
                            {block.app}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-primary leading-tight line-clamp-2">
                          {block.project}
                        </p>
                        {height > 8 && (
                          <p className="text-[10px] text-primary/60 truncate mt-auto">
                            {block.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="left" 
                    className="bg-card border border-border shadow-xl rounded-2xl p-4 max-w-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-bold">
                          {formatTime(block.startHour, block.startMinute)}
                        </span>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          block.productivityRating === "productive" && "bg-success/20 text-success",
                          block.productivityRating === "neutral" && "bg-warning/20 text-warning",
                          block.productivityRating === "unproductive" && "bg-destructive/20 text-destructive"
                        )}>
                          {block.productivityRating}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">App:</span>
                          <span className="flex items-center gap-1.5 font-medium">
                            {appIcons[block.app]}
                            {block.app}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {formatTime(block.startHour, block.startMinute)} – {formatTime(block.endHour, block.endMinute)} ({getDuration(block)})
                          </span>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground">Title:</span>
                          <span className="font-medium">{block.title}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Project:</span>
                          <span className={cn(
                            "font-medium px-2 py-0.5 rounded-lg text-xs",
                            block.color
                          )}>
                            {block.project}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Activity:</span>
                          <span className="font-medium">{block.activity}</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Current time indicator */}
          <div
            className="absolute left-0 right-0 pointer-events-none z-30"
            style={{ top: `${getCurrentTimePosition()}%` }}
          >
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive shadow-lg ring-2 ring-destructive/30" />
              <div className="flex-1 h-[2px] bg-destructive" />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-5 border-t border-border/60">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Total logged</p>
              <p className="text-xl font-bold tracking-tight">7h 45m</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium mb-1">Remaining</p>
              <p className="text-xl font-bold tracking-tight text-muted-foreground">0h 15m</p>
            </div>
          </div>
          
          {/* Productivity legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Productive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Unproductive</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
