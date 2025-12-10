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
  X,
  Pencil,
  Mail,
  Phone,
  MapPin
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

interface LineItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

interface Invoice {
  id: string;
  client: string;
  clientEmail: string;
  clientAddress: string;
  project: string;
  amount: number;
  date: string;
  dueDate: string;
  status: string;
  items: LineItem[];
}

const mockInvoices: Invoice[] = [
  { 
    id: "INV-001", 
    client: "Acme Corp", 
    clientEmail: "billing@acmecorp.com",
    clientAddress: "123 Business Ave, New York, NY 10001",
    project: "Website Redesign", 
    amount: 2700, 
    date: "2024-11-25", 
    dueDate: "2024-12-25",
    status: "sent",
    items: [
      { id: "1", description: "Homepage design", hours: 8, rate: 150 },
      { id: "2", description: "Navigation implementation", hours: 6, rate: 150 },
      { id: "3", description: "Responsive testing", hours: 4, rate: 150 },
    ]
  },
  { 
    id: "INV-002", 
    client: "TechStart", 
    clientEmail: "finance@techstart.io",
    clientAddress: "456 Tech Blvd, San Francisco, CA 94102",
    project: "Mobile App", 
    amount: 3150, 
    date: "2024-11-20", 
    dueDate: "2024-12-20",
    status: "paid",
    items: [
      { id: "1", description: "API integration", hours: 10, rate: 175 },
      { id: "2", description: "UI components", hours: 8, rate: 175 },
    ]
  },
  { 
    id: "INV-003", 
    client: "StyleCo", 
    clientEmail: "accounts@styleco.com",
    clientAddress: "789 Design St, Los Angeles, CA 90001",
    project: "Brand Identity", 
    amount: 1875, 
    date: "2024-11-15", 
    dueDate: "2024-12-15",
    status: "draft",
    items: [
      { id: "1", description: "Logo design concepts", hours: 10, rate: 125 },
      { id: "2", description: "Brand guidelines", hours: 5, rate: 125 },
    ]
  },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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

  const openEditDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setLineItems([...invoice.items]);
    setClientName(invoice.client);
    setClientEmail(invoice.clientEmail);
    setIsEditOpen(true);
  };

  const saveInvoiceChanges = () => {
    if (!selectedInvoice) return;
    
    const updatedInvoice = {
      ...selectedInvoice,
      client: clientName,
      clientEmail: clientEmail,
      items: lineItems,
      amount: calculateTotal(),
    };

    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice.id ? updatedInvoice : inv
    ));
    setSelectedInvoice(updatedInvoice);
    setIsEditOpen(false);
    toast.success("Invoice updated successfully!");
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

      {/* Main Content - Invoice List + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice List */}
        <Card className={`bg-card rounded-3xl card-shadow border-0 ${selectedInvoice ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <CardHeader>
            <CardTitle className="text-xl">Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => {
                const gradients = ["gradient-lime", "gradient-peach", "gradient-lavender", "gradient-amber"];
                const isSelected = selectedInvoice?.id === invoice.id;
                return (
                  <div 
                    key={invoice.id} 
                    onClick={() => setSelectedInvoice(invoice)}
                    className={`flex items-center justify-between p-4 rounded-2xl ${gradients[index % gradients.length]} hover:scale-[1.01] transition-all cursor-pointer ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Preview */}
        {selectedInvoice && (
          <Card className="lg:col-span-2 bg-card rounded-3xl card-shadow border-0">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedInvoice.id}</CardTitle>
                <p className="text-muted-foreground mt-1">{selectedInvoice.project}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => openEditDialog(selectedInvoice)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setSelectedInvoice(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invoice Header Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl gradient-peach">
                  <p className="text-xs text-primary/70 font-medium mb-1">Bill To</p>
                  <p className="font-bold text-primary text-lg">{selectedInvoice.client}</p>
                  <div className="flex items-center gap-2 text-sm text-primary/80 mt-2">
                    <Mail className="w-3 h-3" />
                    <span>{selectedInvoice.clientEmail}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-primary/80 mt-1">
                    <MapPin className="w-3 h-3 mt-0.5" />
                    <span>{selectedInvoice.clientAddress}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl gradient-lavender">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-primary/70 font-medium mb-1">Invoice Date</p>
                      <p className="font-semibold text-primary">{selectedInvoice.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/70 font-medium mb-1">Due Date</p>
                      <p className="font-semibold text-primary">{selectedInvoice.dueDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-primary/70 font-medium mb-1">Status</p>
                      <Badge className={`${getStatusColor(selectedInvoice.status)} capitalize`}>
                        {selectedInvoice.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Line Items</h3>
                <div className="rounded-2xl border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-right">Hours</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  {selectedInvoice.items.map((item, index) => (
                    <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <div className="col-span-6 font-medium">{item.description}</div>
                      <div className="col-span-2 text-right text-muted-foreground">{item.hours}</div>
                      <div className="col-span-2 text-right text-muted-foreground">${item.rate}</div>
                      <div className="col-span-2 text-right font-semibold">${(item.hours * item.rate).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="w-64 p-4 rounded-2xl gradient-lime">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary/70">Subtotal</span>
                    <span className="font-semibold text-primary">${selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary/70">Tax (0%)</span>
                    <span className="font-semibold text-primary">$0</span>
                  </div>
                  <Separator className="my-2 bg-primary/20" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">Total</span>
                    <span className="text-2xl font-bold text-primary">${selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button className="gap-2" onClick={() => toast.success("Invoice sent to client!")}>
                  <Mail className="w-4 h-4" />
                  Send to Client
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Invoice Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Invoice {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input 
                  value={clientName} 
                  onChange={e => setClientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Client Email</Label>
                <Input 
                  type="email"
                  value={clientEmail} 
                  onChange={e => setClientEmail(e.target.value)}
                />
              </div>
            </div>

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

              <div className="space-y-3">
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

                <div className="flex justify-end p-4 rounded-xl gradient-lime">
                  <div className="text-right">
                    <p className="text-sm text-primary/70 font-medium">Total Amount</p>
                    <p className="text-3xl font-bold text-primary">${calculateTotal().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveInvoiceChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}