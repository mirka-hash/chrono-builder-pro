import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Clock, 
  FolderKanban, 
  Users, 
  BarChart3,
  Settings,
  Timer,
  FileText,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Time Tracking", href: "/time-tracking", icon: Clock },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 rounded-r-3xl">
      {/* Logo */}
      <div className="p-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-card-pink rounded-2xl flex items-center justify-center">
            <Timer className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">TimeFlow</span>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-6 pt-4 pb-2">
        <span className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">General</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-foreground/10 text-sidebar-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "stroke-[2]")} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-sidebar-foreground/10 text-sidebar-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground"
            )
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
