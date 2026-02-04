import { Bell, Search, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card-cream border border-border/50 flex items-center justify-center">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search"
            className="pl-14 bg-card border-border/50 rounded-full h-11 focus-visible:ring-1"
          />
          {/* Filter Pills */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Badge variant="outline" className="text-[10px] py-0.5 px-2">Projects</Badge>
            <Badge variant="outline" className="text-[10px] py-0.5 px-2">Clients</Badge>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-9 h-9 bg-card-lavender rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-foreground" />
          </div>
        </Button>
      </div>
    </header>
  );
}
