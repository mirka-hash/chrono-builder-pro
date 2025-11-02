import { MoreVertical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockEntries = [
  {
    id: 1,
    project: "Website Redesign",
    client: "Acme Corp",
    activity: "Design",
    duration: "3.5",
    description: "Created new homepage mockups and design system",
    date: "Today, 2:30 PM",
    color: "peach",
  },
  {
    id: 2,
    project: "Mobile App Development",
    client: "TechStart Inc",
    activity: "Development",
    duration: "5.0",
    description: "Implemented user authentication flow",
    date: "Today, 9:00 AM",
    color: "lavender",
  },
  {
    id: 3,
    project: "Brand Identity",
    client: "DesignCo",
    activity: "Planning",
    duration: "2.0",
    description: "Client meeting and project planning",
    date: "Yesterday, 4:00 PM",
    color: "lime",
  },
];

export function TimeEntriesList() {
  return (
    <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Time Entries</h2>
        <Button variant="outline" size="sm" className="rounded-2xl">View All</Button>
      </div>

      <div className="space-y-3">
        {mockEntries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-4 p-5 rounded-2xl hover:bg-muted/40 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl gradient-${entry.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <Clock className="w-5 h-5 text-primary" strokeWidth={2.5} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="font-bold text-sm">{entry.project}</h3>
                  <p className="text-sm text-muted-foreground">{entry.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{entry.duration}h</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2.5 py-1 bg-muted rounded-xl font-medium">{entry.activity}</span>
                <span>{entry.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
