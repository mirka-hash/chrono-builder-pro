import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeeklyActivityChart } from "@/components/charts/WeeklyActivityChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reports() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Reports</h1>
          <p className="text-muted-foreground text-base">Analyze your time and project data</p>
        </div>
        <Button className="gap-2 rounded-2xl shadow-sm">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      <div className="bg-card rounded-3xl p-5 card-shadow flex items-center gap-4 flex-wrap">
        <Select defaultValue="week">
          <SelectTrigger className="w-[150px] rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] rounded-2xl">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="web-redesign">Website Redesign</SelectItem>
            <SelectItem value="mobile-app">Mobile App</SelectItem>
            <SelectItem value="brand">Brand Identity</SelectItem>
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

        <Button variant="outline" className="gap-2 rounded-2xl">
          <Calendar className="w-4 h-4" />
          Custom Date
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
          <p className="text-sm font-medium text-muted-foreground mb-2">Total Hours</p>
          <p className="text-5xl font-bold mb-1 tracking-tight">156.5</p>
          <p className="text-sm font-semibold text-success-foreground">+12% from last period</p>
        </div>

        <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
          <p className="text-sm font-medium text-muted-foreground mb-2">Billable Hours</p>
          <p className="text-5xl font-bold mb-1 tracking-tight">142.3</p>
          <p className="text-sm font-semibold text-success-foreground">91% billable rate</p>
        </div>

        <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
          <p className="text-sm font-medium text-muted-foreground mb-2">Revenue</p>
          <p className="text-5xl font-bold mb-1 tracking-tight">$21,345</p>
          <p className="text-sm font-semibold text-success-foreground">+8% from last period</p>
        </div>
      </div>

      <WeeklyActivityChart />

      <div className="bg-card rounded-3xl p-7 card-shadow card-hover">
        <h2 className="text-xl font-bold mb-6">Time by Project</h2>
        <div className="space-y-5">
          {[
            { name: "Website Redesign", hours: 45.5, percentage: 29, color: "gradient-peach" },
            { name: "Mobile App Development", hours: 56.2, percentage: 36, color: "gradient-lavender" },
            { name: "Brand Identity", hours: 34.8, percentage: 22, color: "gradient-lime" },
            { name: "Other Projects", hours: 20.0, percentage: 13, color: "gradient-amber" },
          ].map((project) => (
            <div key={project.name}>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-bold">{project.name}</span>
                <span className="text-sm font-semibold text-muted-foreground">{project.hours}h ({project.percentage}%)</span>
              </div>
              <div className="w-full h-3.5 bg-muted rounded-2xl overflow-hidden shadow-sm">
                <div
                  className={`h-full ${project.color} transition-all duration-500`}
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
