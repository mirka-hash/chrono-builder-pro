import { Plus, Search, Mail, Phone, Building2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockClients = [
  {
    id: 1,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    projects: 3,
    totalHours: 156.5,
    color: "peach",
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "hello@techstart.io",
    phone: "+1 (555) 234-5678",
    projects: 2,
    totalHours: 234.8,
    color: "lavender",
  },
  {
    id: 3,
    name: "DesignCo",
    email: "info@designco.com",
    phone: "+1 (555) 345-6789",
    projects: 1,
    totalHours: 89.2,
    color: "lime",
  },
];

export default function Clients() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Client
        </Button>
      </div>

      <div className="bg-card rounded-2xl p-4 card-shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClients.map((client) => (
          <div
            key={client.id}
            className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl gradient-${client.color} flex items-center justify-center`}>
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Client</DropdownMenuItem>
                  <DropdownMenuItem>View Projects</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="text-xl font-semibold mb-4">{client.name}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{client.projects}</p>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{client.totalHours}h</p>
                <p className="text-xs text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
