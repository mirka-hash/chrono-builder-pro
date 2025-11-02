import { useState } from "react";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectsList } from "@/components/projects/ProjectsList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Projects() {
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-base">Manage all your projects in one place</p>
        </div>
        <Button className="gap-2 rounded-2xl shadow-sm">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="bg-card rounded-3xl p-5 card-shadow">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-11 rounded-2xl"
              />
            </div>
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] rounded-2xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] rounded-2xl">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="techstart">TechStart Inc</SelectItem>
              <SelectItem value="designco">DesignCo</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="rounded-2xl">
            <Filter className="w-4 h-4" />
          </Button>

          <div className="flex gap-1 border border-border/60 rounded-2xl p-1 bg-background/50">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setView("list")}
              className="rounded-xl"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
              className="rounded-xl"
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ProjectsList />
    </div>
  );
}
