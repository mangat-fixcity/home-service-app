import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LogOut, Users, CheckCircle, XCircle, Clock, Home } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  createdAt: string;
}

interface Provider {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [stats, setStats] = useState({ customers: { total: 0, pending: 0, approved: 0, rejected: 0 }, providers: { total: 0, pending: 0, approved: 0, rejected: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    checkAdminAuth();
    fetchData();
  }, []);

  const checkAdminAuth = () => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      setLocation("/admin-login");
    }
  };

  const fetchData = async () => {
    try {
      const [customersRes, providersRes, statsRes] = await Promise.all([
        fetch("/api/admin/customers"),
        fetch("/api/admin/providers"),
        fetch("/api/admin/stats"),
      ]);

      if (customersRes.ok) setCustomers(await customersRes.json());
      if (providersRes.ok) setProviders(await providersRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const approveCustomer = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/customers/${id}/approve`, { method: "POST" });
      if (response.ok) {
        toast.success("Customer approved!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to approve customer");
    }
  };

  const rejectCustomer = async (id: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    try {
      const response = await fetch(`/api/admin/customers/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      });
      if (response.ok) {
        toast.success("Customer rejected!");
        setRejectingId(null);
        setRejectionReason("");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to reject customer");
    }
  };

  const approveProvider = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/providers/${id}/approve`, { method: "POST" });
      if (response.ok) {
        toast.success("Provider approved!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to approve provider");
    }
  };

  const rejectProvider = async (id: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    try {
      const response = await fetch(`/api/admin/providers/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      });
      if (response.ok) {
        toast.success("Provider rejected!");
        setRejectingId(null);
        setRejectionReason("");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to reject provider");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminUsername");
    toast.success("Logged out!");
    setLocation("/admin-login");
  };

  if (!mounted) return null;

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-100 text-green-800";
    if (status === "rejected") return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getStatusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle className="w-4 h-4" />;
    if (status === "rejected") return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">🔐 Admin Dashboard</h1>
            <p className="text-orange-100 mt-1">Fixcity Administration Panel</p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button 
                variant="outline"
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold border-orange-300"
                data-testid="button-go-home"
              >
                <Home className="w-4 h-4 mr-2" /> Main Dashboard
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="bg-white text-red-600 hover:bg-red-50 font-bold"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card data-testid="stat-card-customers">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.customers.total}</div>
              <p className="text-xs text-muted-foreground mt-2">Pending: {stats.customers.pending}</p>
            </CardContent>
          </Card>

          <Card data-testid="stat-card-approved-customers">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.customers.approved}</div>
            </CardContent>
          </Card>

          <Card data-testid="stat-card-providers">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.providers.total}</div>
              <p className="text-xs text-muted-foreground mt-2">Pending: {stats.providers.pending}</p>
            </CardContent>
          </Card>

          <Card data-testid="stat-card-approved-providers">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.providers.approved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Approvals</CardTitle>
                <CardDescription>Manage customer registrations and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading...</p>
                ) : customers.length === 0 ? (
                  <p className="text-muted-foreground">No customers yet</p>
                ) : (
                  <div className="space-y-3">
                    {customers.map((customer) => (
                      <div key={customer.id} className="border rounded-lg p-4 flex justify-between items-start" data-testid={`customer-row-${customer.id}`}>
                        <div className="flex-1">
                          <h4 className="font-bold">{customer.name}</h4>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          {customer.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className={getStatusColor(customer.status)}>
                              {getStatusIcon(customer.status)} {customer.status}
                            </Badge>
                            {customer.reason && <span className="text-xs text-red-600">Reason: {customer.reason}</span>}
                          </div>
                        </div>
                        {customer.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => approveCustomer(customer.id)}
                              data-testid={`button-approve-customer-${customer.id}`}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setRejectingId(customer.id)}
                              data-testid={`button-reject-customer-${customer.id}`}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {rejectingId === customer.id && (
                          <div className="ml-4 space-y-2 w-64">
                            <Input 
                              placeholder="Rejection reason" 
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              data-testid="input-rejection-reason"
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => rejectCustomer(customer.id)}
                                data-testid="button-confirm-reject"
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Confirm
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setRejectingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Provider Approvals</CardTitle>
                <CardDescription>Manage provider registrations and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading...</p>
                ) : providers.length === 0 ? (
                  <p className="text-muted-foreground">No providers yet</p>
                ) : (
                  <div className="space-y-3">
                    {providers.map((provider) => (
                      <div key={provider.id} className="border rounded-lg p-4 flex justify-between items-start" data-testid={`provider-row-${provider.id}`}>
                        <div className="flex-1">
                          <h4 className="font-bold">{provider.name}</h4>
                          <p className="text-sm text-muted-foreground">{provider.email}</p>
                          {provider.phone && <p className="text-sm text-muted-foreground">{provider.phone}</p>}
                          <p className="text-sm font-semibold text-blue-600 mt-1">Category: {provider.category}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge className={getStatusColor(provider.status)}>
                              {getStatusIcon(provider.status)} {provider.status}
                            </Badge>
                            {provider.reason && <span className="text-xs text-red-600">Reason: {provider.reason}</span>}
                          </div>
                        </div>
                        {provider.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => approveProvider(provider.id)}
                              data-testid={`button-approve-provider-${provider.id}`}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setRejectingId(provider.id)}
                              data-testid={`button-reject-provider-${provider.id}`}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {rejectingId === provider.id && (
                          <div className="ml-4 space-y-2 w-64">
                            <Input 
                              placeholder="Rejection reason" 
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              data-testid="input-rejection-reason"
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => rejectProvider(provider.id)}
                                data-testid="button-confirm-reject"
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Confirm
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setRejectingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
