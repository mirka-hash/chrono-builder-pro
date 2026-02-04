import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  "Arc": "bg-card-blue",
  "Cursor": "bg-card-lavender",
  "Figma": "bg-card-pink",
  "Zoom": "bg-card-green",
  "Finder": "bg-muted",
  "Mail": "bg-card-yellow",
  "Calendar": "bg-card-pink",
};

export function EnhancedTimelineWidget() {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  
  const currentHour = 14;
  const currentMinute = 30;
  
  // Individual app sessions (tiny bars on left)
  const appSessions: AppSession[] = [
    { id: "s1", startHour: 9, startMinute: 0, endHour: 9, endMinute: 15, app: "Arc", title: "Research - competitor sites", color: "bg-card-blue" },
    { id: "s2", startHour: 9, startMinute: 15, endHour: 10, endMinute: 30, app: "Figma", title: "Homepage mockup", color: "bg-card-pink" },
    { id: "s3", startHour: 10, startMinute: 30, endHour: 10, endMinute: 45, app: "Arc", title: "Slack - team chat", color: "bg-card-blue" },
    { id: "s4", startHour: 10, startMinute: 45, endHour: 11, endMinute: 30, app: "Cursor", title: "Auth flow implementation", color: "bg-card-lavender" },
    { id: "s5", startHour: 11, startMinute: 30, endHour: 12, endMinute: 0, app: "Arc", title: "API documentation", color: "bg-card-blue" },
    { id: "s6", startHour: 12, startMinute: 0, endHour: 12, endMinute: 30, app: "Cursor", title: "Bug fixes", color: "bg-card-lavender" },
    { id: "s7", startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, app: "Zoom", title: "Weekly sync call", color: "bg-card-green" },
    { id: "s8", startHour: 15, startMinute: 0, endHour: 15, endMinute: 20, app: "Arc", title: "Email responses", color: "bg-card-blue" },
    { id: "s9", startHour: 15, startMinute: 20, endHour: 17, endMinute: 0, app: "Figma", title: "Logo variations", color: "bg-card-pink" },
  ];

  // Aggregated project blocks (larger blocks on right)
  const aggregatedBlocks: AggregatedBlock[] = [
    { 
      id: "b1", startHour: 9, startMinute: 0, endHour: 10, endMinute: 30, 
      project: "Website Redesign", activity: "Design", sessions: 2,
      color: "bg-card-pink", productivityRating: "productive"
    },
    { 
      id: "b2", startHour: 10, startMinute: 45, endHour: 12, endMinute: 30, 
      project: "Mobile App Dev", activity: "Development", sessions: 3,
      color: "bg-card-lavender", productivityRating: "productive"
    },
    { 
      id: "b3", startHour: 13, startMinute: 0, endHour: 14, endMinute: 30, 
      project: "Client Meeting", activity: "Meetings", sessions: 1,
      color: "bg-card-green", productivityRating: "productive"
    },
    { 
      id: "b4", startHour: 15, startMinute: 0, endHour: 17, endMinute: 0, 
      project: "Brand Identity", activity: "Design", sessions: 2,
      color: "bg-card-yellow", productivityRating: "productive"
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
      <Card variant="elevated">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Today's Timeline</CardTitle>
            <Badge variant="yellow">{formatTime(currentHour, currentMinute)}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative flex" style={{ height: `${hours.length * 48}px` }}>
            {/* App Sessions Column (left - tiny bars) */}
            <div className="relative w-6 mr-3 flex-shrink-0">
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
                          hoveredSession === session.id ? "opacity-100 scale-x-125 z-20" : "opacity-90"
                        )}
                        style={{
                          top: `${top}%`,
                          height: `${Math.max(height, 0.8)}%`,
                        }}
                        onMouseEnter={() => setHoveredSession(session.id)}
                        onMouseLeave={() => setHoveredSession(null)}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="p-3 max-w-xs">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn("p-1.5 rounded-lg", appColors[session.app])}>
                            {appIcons[session.app]}
                          </span>
                          <span className="font-bold text-sm">{session.app}</span>
                          <span className="text-xs text-muted-foreground font-medium">
                            ({getDuration(session.startHour, session.startMinute, session.endHour, session.endMinute)})
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">{session.title}</p>
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
                  className="absolute left-0 right-0 border-t border-dashed border-border/60"
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
                          "absolute left-0 right-8 rounded-xl cursor-pointer transition-all overflow-hidden",
                          block.color,
                          hoveredBlock === block.id ? "-translate-y-0.5 shadow-md z-20" : "z-10"
                        )}
                        style={{
                          top: `${top}%`,
                          height: `${Math.max(height, 4)}%`,
                        }}
                        onMouseEnter={() => setHoveredBlock(block.id)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        {/* Productivity indicator stripe */}
                        <div className={cn(
                          "absolute left-0 top-0 bottom-0 w-1",
                          block.productivityRating === "productive" && "bg-success",
                          block.productivityRating === "neutral" && "bg-warning",
                          block.productivityRating === "unproductive" && "bg-destructive"
                        )} />
                        <div className="p-2.5 pl-3.5 h-full flex flex-col">
                          <p className="text-xs font-bold text-foreground leading-tight line-clamp-1">
                            {block.project}
                          </p>
                          {height > 6 && (
                            <p className="text-[10px] text-foreground/60 font-medium mt-0.5">
                              {block.activity} · {block.sessions} {block.sessions === 1 ? 'session' : 'sessions'}
                            </p>
                          )}
                          {height > 10 && (
                            <p className="text-[10px] font-bold text-foreground/70 mt-auto">
                              {getDuration(block.startHour, block.startMinute, block.endHour, block.endMinute)}
                            </p>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="p-4 max-w-xs">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-bold">{block.project}</span>
                          <Badge variant={
                            block.productivityRating === "productive" ? "green" :
                            block.productivityRating === "neutral" ? "yellow" : "pink"
                          }>
                            {block.productivityRating}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-bold text-foreground">{block.activity}</span> · {block.sessions} sessions
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatTime(block.startHour, block.startMinute)} – {formatTime(block.endHour, block.endMinute)}
                          </p>
                          <p className="font-bold text-lg">
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
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                  <div className="flex-1 h-0.5 bg-destructive" />
                </div>
              </div>
            </div>

            {/* Hour Labels (right side) */}
            <div className="relative w-8 flex-shrink-0">
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
          <div className="mt-5 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-card-green px-3 py-2 rounded-xl">
                <p className="text-[10px] text-foreground/60 font-medium mb-0.5">Total logged</p>
                <p className="text-xl font-bold tracking-tight text-foreground">7h 45m</p>
              </div>
              <div className="text-right bg-card-lavender px-3 py-2 rounded-xl">
                <p className="text-[10px] text-foreground/60 font-medium mb-0.5">Sessions</p>
                <p className="text-xl font-bold tracking-tight text-foreground">{appSessions.length}</p>
              </div>
            </div>
            
            {/* Productivity legend */}
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="green" className="gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-success" />
                Productive
              </Badge>
              <Badge variant="yellow" className="gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-warning" />
                Neutral
              </Badge>
              <Badge variant="pink" className="gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-destructive" />
                Unproductive
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
