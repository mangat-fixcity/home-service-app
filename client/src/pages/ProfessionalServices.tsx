import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, ArrowLeft } from "lucide-react";

export default function ProfessionalServices() {
  const [, setLocation] = useLocation();
  const [services, setServices] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: ""
  });

  useEffect(() => {
    const profId = localStorage.getItem("currentProfessional");
    if (!profId) {
      setLocation("/professional-login");
      return;
    }

    const savedServices = JSON.parse(localStorage.getItem(`services_${profId}`) || "[]");
    setServices(savedServices);
  }, [setLocation]);

  const handleAddService = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill name and price");
      return;
    }

    const profId = localStorage.getItem("currentProfessional");
    const newService = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price)
    };

    const updatedServices = editingId
      ? services.map(s => s.id === editingId ? { ...s, ...newService } : s)
      : [...services, newService];

    localStorage.setItem(`services_${profId}`, JSON.stringify(updatedServices));
    setServices(updatedServices);
    setFormData({ name: "", description: "", price: "", duration: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEditService = (service: any) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDeleteService = (id: string) => {
    const profId = localStorage.getItem("currentProfessional");
    const updatedServices = services.filter(s => s.id !== id);
    localStorage.setItem(`services_${profId}`, JSON.stringify(updatedServices));
    setServices(updatedServices);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/professional-dashboard")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Manage Your Services</h1>
            <p className="text-muted-foreground">{services.length} service{services.length !== 1 ? 's' : ''} listed</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Services</CardTitle>
                <CardDescription>All services you offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No services yet. Add your first service!</p>
                ) : (
                  services.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-semibold">{service.name}</p>
                          {service.description && (
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-primary">₹{service.price}</span>
                      </div>
                      {service.duration && (
                        <p className="text-xs text-muted-foreground mb-3">Duration: {service.duration}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2"
                          onClick={() => handleEditService(service)}
                          data-testid={`button-edit-${service.id}`}
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1 gap-2"
                          onClick={() => handleDeleteService(service.id)}
                          data-testid={`button-delete-${service.id}`}
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add/Edit Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {editingId ? "Edit Service" : "Add New Service"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Pipe Installation"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-service-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the service..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 h-20"
                    data-testid="input-service-desc"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-service-price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 1-2 hours"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-service-duration"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleAddService}
                  data-testid="button-save-service"
                >
                  {editingId ? "Update" : <Plus className="w-4 h-4 mr-2" />}
                  {editingId ? "Update Service" : "Add Service"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
