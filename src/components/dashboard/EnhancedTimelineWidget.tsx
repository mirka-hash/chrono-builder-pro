import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe, Code, Palette, Users, FolderOpen, Mail, Calendar } from "lucide-react";

interface AppSession {
  id: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  app: string;
  title: string;
  color: string;
}

interface AggregatedBlock {
  id: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  project: string;
  activity: string;
  sessions: number;
  color: string;
  productivityRating: "productive" | "neutral" | "unproductive";
}

const appIcons: Record<string, React.ReactNode> = {
  "Arc": <Globe className="w-2.5 h-2.5" />,
  "Cursor": <Code className="w-2.5 h-2.5" />,
  "Figma": <Palette className="w-2.5 h-2.5" />,
  "Zoom": <Users className="w-2.5 h-2.5" />,
  "Finder": <FolderOpen className="w-2.5 h-2.5" />,
  "Mail": <Mail className="w-2.5 h-2.5" />,
  "Calendar": <Calendar className="w-2.5 h-2.5" />,
};

const appColors: Record<string, string> = {
  "Arc": "bg-chart-blue",
  "Cursor": "bg-chart-lavender",
  "Figma": "bg-chart-peach",
  "Zoom": "bg-chart-lime",
  "Finder": "bg-muted",
  "Mail": "bg-chart-amber",
  "Calendar": "bg-chart-pink",
};

export function EnhancedTimelineWidget() {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  
  const currentHour = 14;
  const currentMinute = 30;
  
  // Individual app sessions (tiny bars on left)
  const appSessions: AppSession[] = [
    { id: "s1", startHour: 9, startMinute: 0, endHour: 9, endMinute: 15, app: "Arc", title: "Research - competitor sites", color: "bg-chart-blue" },
    { id: "s2", startHour: 9, startMinute: 15, endHour: 10, endMinute: 30, app: "Figma", title: "Homepage mockup", color: "bg-chart-peach" },
    { id: "s3", startHour: 10, startMinute: 30, endHour: 10, endMinute: 45, app: "Arc", title: "Slack - team chat", color: "bg-chart-blue" },
    { id: "s4", startHour: 10, startMinute: 45, endHour: 11, endMinute: 30, app: "Cursor", title: "Auth flow implementation", color: "bg-chart-lavender" },
    { id: "s5", startHour: 11, startMinute: 30, endHour: 12, endMinute: 0, app: "Arc", title: "API documentation", color: "bg-chart-blue" },
    { id: "s6", startHour: 12, startMinute: 0, endHour: 12, endMinute: 30, app: "Cursor", title: "Bug fixes", color: "bg-chart-lavender" },
    { id: "s7", startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, app: "Zoom", title: "Weekly sync call", color: "bg-chart-lime" },
    { id: "s8", startHour: 15, startMinute: 0, endHour: 15, endMinute: 20, app: "Arc", title: "Email responses", color: "bg-chart-blue" },
    { id: "s9", startHour: 15, startMinute: 20, endHour: 17, endMinute: 0, app: "Figma", title: "Logo variations", color: "bg-chart-peach" },
  ];

  // Aggregated project blocks (larger blocks on right)
  const aggregatedBlocks: AggregatedBlock[] = [
    { 
      id: "b1", startHour: 9, startMinute: 0, endHour: 10, endMinute: 30, 
      project: "Website Redesign", activity: "Design", sessions: 2,
      color: "bg-chart-peach", productivityRating: "productive"
    },
    { 
      id: "b2", startHour: 10, startMinute: 45, endHour: 12, endMinute: 30, 
      project: "Mobile App Dev", activity: "Development", sessions: 3,
      color: "bg-chart-lavender", productivityRating: "productive"
    },
    { 
      id: "b3", startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, 
      project: "Client Meeting", activity: "Meetings", sessions: 1,
      color: "bg-chart-lime", productivityRating: "productive"
    },
    { 
      id: "b4", startHour: 15, startMinute: 0, endHour: 17, endMinute: 0, 
      project: "Brand Identity", activity: "Design", sessions: 2,
      color: "bg-chart-amber", productivityRating: "productive"
    },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

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

  const getDuration = (startHour: number, startMinute: number, endHour: number, endMinute: number) => {
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
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

        <div className="relative flex" style={{ height: `${hours.length * 48}px` }}>
          {/* App Sessions Column (left - tiny bars) */}
          <div className="relative w-8 mr-2 flex-shrink-0">
            {appSessions.map((session) => {
              const top = getBlockPosition(session.startHour, session.startMinute);
              const height = getBlockPosition(session.endHour, session.endMinute) - top;
              
              return (
                <Tooltip key={session.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "absolute left-0 right-0 rounded-sm cursor-pointer transition-all",
                        session.color,
                        hoveredSession === session.id ? "opacity-100 scale-x-110 z-20" : "opacity-70"
                      )}
                      style={{
                        top: `${top}%`,
                        height: `${Math.max(height, 0.8)}%`,
                      }}
                      onMouseEnter={() => setHoveredSession(session.id)}
                      onMouseLeave={() => setHoveredSession(null)}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-card border border-border shadow-xl rounded-xl p-3 max-w-xs">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("p-1 rounded", appColors[session.app])}>
                          {appIcons[session.app]}
                        </span>
                        <span className="font-semibold text-sm">{session.app}</span>
                        <span className="text-xs text-muted-foreground">
                          ({getDuration(session.startHour, session.startMinute, session.endHour, session.endMinute)})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{session.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatTime(session.startHour, session.startMinute)} – {formatTime(session.endHour, session.endMinute)}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Aggregated Blocks Column (main content) */}
          <div className="relative flex-1">
            {/* Hour grid lines */}
            {hours.map((hour, idx) => (
              <div 
                key={hour} 
                className="absolute left-0 right-0 border-t border-border/30"
                style={{ top: `${(idx / hours.length) * 100}%` }}
              />
            ))}

            {/* Aggregated blocks */}
            {aggregatedBlocks.map((block) => {
              const top = getBlockPosition(block.startHour, block.startMinute);
              const height = getBlockPosition(block.endHour, block.endMinute) - top;
              
              return (
                <Tooltip key={block.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "absolute left-0 right-8 rounded-xl shadow-sm cursor-pointer transition-all overflow-hidden border-l-4",
                        block.color,
                        block.productivityRating === "productive" && "border-l-success",
                        block.productivityRating === "neutral" && "border-l-warning",
                        block.productivityRating === "unproductive" && "border-l-destructive",
                        hoveredBlock === block.id ? "scale-[1.02] shadow-md z-20" : "z-10"
                      )}
                      style={{
                        top: `${top}%`,
                        height: `${Math.max(height, 4)}%`,
                      }}
                      onMouseEnter={() => setHoveredBlock(block.id)}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      <div className="p-2 h-full flex flex-col">
                        <p className="text-xs font-bold text-primary leading-tight line-clamp-1">
                          {block.project}
                        </p>
                        {height > 6 && (
                          <p className="text-[10px] text-primary/60 mt-0.5">
                            {block.activity} · {block.sessions} {block.sessions === 1 ? 'session' : 'sessions'}
                          </p>
                        )}
                        {height > 10 && (
                          <p className="text-[10px] font-medium text-primary/70 mt-auto">
                            {getDuration(block.startHour, block.startMinute, block.endHour, block.endMinute)}
                          </p>
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="bg-card border border-border shadow-xl rounded-2xl p-4 max-w-xs">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-bold">{block.project}</span>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          block.productivityRating === "productive" && "bg-success/20 text-success",
                          block.productivityRating === "neutral" && "bg-warning/20 text-warning",
                          block.productivityRating === "unproductive" && "bg-destructive/20 text-destructive"
                        )}>
                          {block.productivityRating}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">{block.activity}</span> · {block.sessions} sessions
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatTime(block.startHour, block.startMinute)} – {formatTime(block.endHour, block.endMinute)}
                        </p>
                        <p className="font-semibold">
                          {getDuration(block.startHour, block.startMinute, block.endHour, block.endMinute)}
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Current time indicator */}
            <div
              className="absolute left-0 right-0 pointer-events-none z-30"
              style={{ top: `${getCurrentTimePosition()}%` }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-destructive shadow-lg ring-2 ring-destructive/30" />
                <div className="flex-1 h-[2px] bg-destructive" />
              </div>
            </div>
          </div>

          {/* Hour Labels (right side) */}
          <div className="relative w-10 flex-shrink-0">
            {hours.map((hour, idx) => (
              <span 
                key={hour}
                className="absolute right-0 text-[10px] font-medium text-muted-foreground -translate-y-1/2"
                style={{ top: `${(idx / hours.length) * 100}%` }}
              >
                {hour > 12 ? hour - 12 : hour}
              </span>
            ))}
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
              <p className="text-xs text-muted-foreground font-medium mb-1">Sessions</p>
              <p className="text-xl font-bold tracking-tight text-muted-foreground">{appSessions.length}</p>
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
