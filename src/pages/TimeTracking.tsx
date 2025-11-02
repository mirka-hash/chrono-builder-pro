import { TimeEntryForm } from "@/components/time/TimeEntryForm";
import { TimeEntriesList } from "@/components/time/TimeEntriesList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download } from "lucide-react";

export default function TimeTracking() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground text-base">Track and manage your time entries</p>
        </div>
        <Button className="gap-2 rounded-2xl shadow-sm">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TimeEntryForm />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl p-5 card-shadow flex items-center gap-4">
            <Input
              placeholder="Search entries..."
              className="flex-1 rounded-2xl"
            />
            <Button variant="outline" className="gap-2 rounded-2xl">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <TimeEntriesList />
        </div>
      </div>
    </div>
  );
}
