import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  DollarSign, 
  Trash2, 
  RefreshCw,
  Building2,
  User
} from "lucide-react";
import { toast } from "sonner";

// Mock data
const projects = [
  { id: "1", name: "Website Redesign", client: "Acme Corp", hourlyRate: 150 },
  { id: "2", name: "Mobile App", client: "TechStart", hourlyRate: 175 },
  { id: "3", name: "Brand Identity", client: "StyleCo", hourlyRate: 125 },
];

const timeEntries = [
  { id: "1", projectId: "1", description: "Homepage design", hours: 8, date: "2024-11-20", rate: 150 },
  { id: "2", projectId: "1", description: "Navigation implementation", hours: 6, date: "2024-11-21", rate: 150 },
  { id: "3", projectId: "1", description: "Responsive testing", hours: 4, date: "2024-11-22", rate: 150 },
  { id: "4", projectId: "2", description: "API integration", hours: 10, date: "2024-11-20", rate: 175 },
  { id: "5", projectId: "2", description: "UI components", hours: 8, date: "2024-11-21", rate: 175 },
];

const mockInvoices = [
  { id: "INV-001", client: "Acme Corp", project: "Website Redesign", amount: 2700, date: "2024-11-25", status: "sent" },
  { id: "INV-002", client: "TechStart", project: "Mobile App", amount: 3150, date: "2024-11-20", status: "paid" },
  { id: "INV-003", client: "StyleCo", project: "Brand Identity", amount: 1875, date: "2024-11-15", status: "draft" },
];

interface LineItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export default function Invoices() {
  const [invoices] = useState(mockInvoices);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState("monthly");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const handleAutoGenerate = () => {
    if (!selectedProject) {
      toast.error("Please select a project");
      return;
    }

    const project = projects.find(p => p.id === selectedProject);
    const projectEntries = timeEntries.filter(e => e.projectId === selectedProject);
    
    const items: LineItem[] = projectEntries.map(entry => ({
      id: entry.id,
      description: entry.description,
      hours: entry.hours,
      rate: entry.rate,
    }));

    setLineItems(items);
    if (project) {
      setClientName(project.client);
    }
    toast.success(`Loaded ${items.length} time entries`);
  };

  const addManualItem = () => {
    setLineItems([
      ...lineItems,
      { id: crypto.randomUUID(), description: "", hours: 0, rate: 150 }
    ]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
  };

  const generatePDF = () => {
    // In a real app, this would generate an actual PDF
    toast.success("Invoice PDF generated and downloaded!");
    setIsCreateOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProject("");
    setDateFrom("");
    setDateTo("");
    setLineItems([]);
    setIsRecurring(false);
    setRecurringInterval("monthly");
    setClientName("");
    setClientEmail("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-success-foreground/20 text-success-foreground";
      case "sent": return "bg-chart-amber/20 text-chart-amber";
      case "draft": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Invoices</h1>
          <p className="text-muted-foreground">Create and manage invoices from your time entries</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create Invoice</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="auto" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto" className="gap-2">
                  <Clock className="w-4 h-4" />
                  From Time Entries
                </TabsTrigger>
                <TabsTrigger value="manual" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Manual Entry
                </TabsTrigger>
              </TabsList>

              <TabsContent value="auto" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleAutoGenerate} variant="secondary" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Load Time Entries
                </Button>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input 
                      value={clientName} 
                      onChange={e => setClientName(e.target.value)}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Email</Label>
                    <Input 
                      type="email"
                      value={clientEmail} 
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="client@example.com"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-4" />

            {/* Line Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Line Items</h3>
                <Button variant="outline" size="sm" onClick={addManualItem} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {lineItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No items yet. Load from time entries or add manually.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Hours</div>
                    <div className="col-span-2">Rate</div>
                    <div className="col-span-2">Total</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {lineItems.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 rounded-xl bg-muted/50">
                      <div className="col-span-5">
                        <Input
                          value={item.description}
                          onChange={e => updateLineItem(item.id, "description", e.target.value)}
                          placeholder="Description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          value={item.hours}
                          onChange={e => updateLineItem(item.id, "hours", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={e => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2 font-semibold">
                        ${(item.hours * item.rate).toLocaleString()}
                      </div>
                      <div className="col-span-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeLineItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-end p-4 rounded-xl gradient-lime">
                    <div className="text-right">
                      <p className="text-sm text-primary/70 font-medium">Total Amount</p>
                      <p className="text-3xl font-bold text-primary">${calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Recurring Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Recurring Invoice</h3>
                  <p className="text-sm text-muted-foreground">Automatically generate invoices on a schedule</p>
                </div>
                <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
              </div>

              {isRecurring && (
                <div className="p-4 rounded-xl gradient-lavender space-y-3">
                  <Label className="text-primary">Billing Interval</Label>
                  <Select value={recurringInterval} onValueChange={setRecurringInterval}>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-primary/70">
                    Invoice will be generated every {recurringInterval === "biweekly" ? "two weeks" : recurringInterval.replace("ly", "")}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={generatePDF} className="gap-2" disabled={lineItems.length === 0}>
                <Download className="w-4 h-4" />
                Generate PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="bg-card rounded-3xl card-shadow card-hover gradient-lime border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">$7,725</span>
            </div>
            <p className="text-sm font-semibold text-primary/80">Total Invoiced</p>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow card-hover gradient-peach border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">3</span>
            </div>
            <p className="text-sm font-semibold text-primary/80">Total Invoices</p>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow card-hover gradient-amber border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">$2,700</span>
            </div>
            <p className="text-sm font-semibold text-primary/80">Pending</p>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow card-hover gradient-lavender border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-primary">2</span>
            </div>
            <p className="text-sm font-semibold text-primary/80">Recurring</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card className="bg-card rounded-3xl card-shadow border-0">
        <CardHeader>
          <CardTitle className="text-xl">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice, index) => {
              const gradients = ["gradient-lime", "gradient-peach", "gradient-lavender", "gradient-amber"];
              return (
                <div 
                  key={invoice.id} 
                  className={`flex items-center justify-between p-4 rounded-2xl ${gradients[index % gradients.length]} hover:scale-[1.01] transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-primary">{invoice.id}</p>
                      <div className="flex items-center gap-2 text-sm text-primary/70">
                        <Building2 className="w-3 h-3" />
                        <span>{invoice.client}</span>
                        <span>•</span>
                        <span>{invoice.project}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${invoice.amount.toLocaleString()}</p>
                      <p className="text-xs text-primary/70">{invoice.date}</p>
                    </div>
                    <Badge className={`${getStatusColor(invoice.status)} capitalize`}>
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-primary">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}