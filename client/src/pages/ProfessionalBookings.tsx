import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";

export default function ProfessionalBookings() {
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const profId = localStorage.getItem("currentProfessional");
    if (!profId) {
      setLocation("/professional-login");
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const profBookings = allBookings.filter((b: any) => b.providerId === profId);
    setBookings(profBookings);
  }, [setLocation]);

  const handleUpdateStatus = (bookingId: string, newStatus: string) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = allBookings.map((b: any) => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updated));
    
    const profId = localStorage.getItem("currentProfessional");
    const profBookings = updated.filter((b: any) => b.providerId === profId);
    setBookings(profBookings);
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length
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
            <h1 className="text-3xl font-bold">Manage Bookings</h1>
            <p className="text-muted-foreground">{bookings.length} total bookings</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold">{stats.confirmed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Cancelled</p>
              <p className="text-2xl font-bold">{stats.cancelled}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              data-testid={`button-filter-${status}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No {filter !== "all" ? filter : ""} bookings yet.</p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-6 justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <div>
                          <p className="font-semibold text-lg">{booking.customerName}</p>
                          <p className="text-sm text-muted-foreground">{booking.category}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-medium">{booking.time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Address</p>
                          <p className="font-medium text-xs">{booking.address}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-bold">₹{booking.price}</p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-3 bg-muted rounded">
                          <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                          <p className="text-sm">{booking.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[150px]">
                      <span className={`text-xs font-medium px-3 py-1 rounded text-center ${
                        booking.status === "completed" ? "bg-green-100 text-green-700" :
                        booking.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                        booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>

                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                            className="gap-2"
                            data-testid={`button-confirm-${booking.id}`}
                          >
                            <CheckCircle className="w-3 h-3" /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                            className="gap-2"
                            data-testid={`button-decline-${booking.id}`}
                          >
                            <XCircle className="w-3 h-3" /> Decline
                          </Button>
                        </>
                      )}

                      {booking.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(booking.id, "completed")}
                          className="gap-2"
                          data-testid={`button-complete-${booking.id}`}
                        >
                          <CheckCircle className="w-3 h-3" /> Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
