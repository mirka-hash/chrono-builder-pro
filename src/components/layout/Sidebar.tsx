import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Clock, 
  FolderKanban, 
  Users, 
  BarChart3,
  Settings,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Time Tracking", href: "/time-tracking", icon: Clock },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-primary text-primary-foreground flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-primary-foreground/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-chart-lime rounded-lg flex items-center justify-center">
            <Timer className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold">TimeFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary-foreground/10 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-primary-foreground/10">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary-foreground/10 text-primary-foreground"
                : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
            )
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
