import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, clients, activities..."
            className="pl-11 bg-background/50 border-border/60 rounded-2xl h-11 focus-visible:ring-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative rounded-2xl hover:bg-muted">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted">
          <div className="w-9 h-9 bg-gradient-lavender rounded-2xl flex items-center justify-center shadow-sm">
            <User className="w-5 h-5 text-primary" />
          </div>
        </Button>
      </div>
    </header>
  );
}
