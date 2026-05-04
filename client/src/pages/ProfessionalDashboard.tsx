import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, Wallet, Star, Users, Settings, ArrowRight } from "lucide-react";

export default function ProfessionalDashboard() {
  const [, setLocation] = useLocation();
  const [professional, setProfessional] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const profId = localStorage.getItem("currentProfessional");
    const profName = localStorage.getItem("currentProfessionalName");

    if (!profId) {
      setLocation("/professional-login");
      return;
    }

    const professionals = JSON.parse(localStorage.getItem("professionals") || "[]");
    const prof = professionals.find((p: any) => p.id === profId);

    if (prof) {
      setProfessional(prof);
    }

    const savedServices = JSON.parse(localStorage.getItem(`services_${profId}`) || "[]");
    setServices(savedServices);

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const profBookings = allBookings.filter((b: any) => b.providerId === profId);
    setBookings(profBookings);
  }, [setLocation]);

  if (!professional) {
    return (
      <div className="min-h-screen bg-background font-sans flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const totalEarnings = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {professional.name}! 👋</h1>
          <p className="text-muted-foreground">
            Status: <span className={`font-medium ${professional.status === "approved" ? "text-green-600" : "text-yellow-600"}`}>
              {professional.status === "approved" ? "✅ Approved" : "⏳ Pending Admin Review"}
            </span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{totalEarnings}</p>
                </div>
                <Wallet className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Services Listed</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed Jobs</p>
                  <p className="text-2xl font-bold">{completedBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <p className="text-2xl font-bold">{professional.rating || "4.5"}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <Button 
                  className="justify-between h-auto py-3"
                  onClick={() => setLocation("/professional-services")}
                  data-testid="button-manage-services"
                >
                  <span>Manage Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="justify-between h-auto py-3"
                  onClick={() => setLocation("/professional-bookings")}
                  data-testid="button-manage-bookings"
                >
                  <span>View Bookings</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="justify-between h-auto py-3"
                  data-testid="button-edit-profile"
                >
                  <span>Edit Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="justify-between h-auto py-3"
                  data-testid="button-view-reviews"
                >
                  <span>View Reviews</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>{bookings.length} total bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No bookings yet. Wait for customers to book your services!</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.address}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            booking.status === "completed" ? "bg-green-100 text-green-700" :
                            booking.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium">₹{booking.price} • {booking.date} at {booking.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-semibold">{professional.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-semibold">{professional.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold text-sm">{professional.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold">{professional.phone}</p>
                </div>
                {professional.experience && (
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-semibold">{professional.experience}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Bookings Alert */}
            {pendingBookings > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-blue-900 font-medium mb-2">🔔 Pending Bookings</p>
                  <p className="text-sm text-blue-800 mb-4">You have {pendingBookings} pending booking{pendingBookings !== 1 ? 's' : ''} waiting for confirmation.</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => setLocation("/professional-bookings")}
                    data-testid="button-view-pending"
                  >
                    View Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
