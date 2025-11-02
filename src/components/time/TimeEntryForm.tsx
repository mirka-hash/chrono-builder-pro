import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Play, Square } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function TimeEntryForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [isTracking, setIsTracking] = useState(false);

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">New Time Entry</h2>
        <Button
          onClick={() => setIsTracking(!isTracking)}
          className={cn(
            "gap-2",
            isTracking && "bg-destructive hover:bg-destructive/90"
          )}
        >
          {isTracking ? (
            <>
              <Square className="w-4 h-4" />
              Stop Timer
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Timer
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-redesign">Website Redesign</SelectItem>
                <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                <SelectItem value="brand-identity">Brand Identity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Client</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acme">Acme Corp</SelectItem>
                <SelectItem value="techstart">TechStart Inc</SelectItem>
                <SelectItem value="designco">DesignCo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Activity</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Duration (hours)</Label>
          <Input type="number" placeholder="0.00" step="0.25" />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="What did you work on?"
            className="min-h-[100px]"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="flex-1">Save Entry</Button>
          <Button variant="outline" className="flex-1">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
