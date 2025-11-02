import { FolderKanban, MoreVertical, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Acme Corp",
    progress: 67,
    hours: 45.5,
    budget: 120,
    status: "active",
    color: "peach",
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "TechStart Inc",
    progress: 43,
    hours: 89.2,
    budget: 200,
    status: "active",
    color: "lavender",
  },
  {
    id: 3,
    name: "Brand Identity",
    client: "DesignCo",
    progress: 85,
    hours: 34.8,
    budget: 50,
    status: "active",
    color: "lime",
  },
];

export function ProjectsList() {
  return (
    <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Active Projects</h2>
        <Button variant="outline" size="sm" className="rounded-2xl">View All</Button>
      </div>

      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-start gap-4 p-5 rounded-2xl hover:bg-muted/40 transition-all group border border-border/60"
          >
            <div className={`w-14 h-14 rounded-2xl gradient-${project.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <FolderKanban className="w-6 h-6 text-primary" strokeWidth={2.5} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-base mb-0.5">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
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
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2.5" />

                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-success-foreground" strokeWidth={2.5} />
                    <span className="text-muted-foreground font-medium">{project.hours}h logged</span>
                  </div>
                  <span className="text-muted-foreground font-medium">{project.budget}h budget</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
