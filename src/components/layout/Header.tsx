import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10 card-shadow">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, clients, activities..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 bg-gradient-lavender rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-accent-foreground" />
          </div>
        </Button>
      </div>
    </header>
  );
}
