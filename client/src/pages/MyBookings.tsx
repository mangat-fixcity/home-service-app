import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Trash2, CheckCircle2, Clock3 } from "lucide-react";

interface Booking {
  id: string;
  providerId: number;
  providerName: string;
  category: string;
  price: number;
  date: string;
  time: string;
  address: string;
  status: string;
  bookingDate: string;
  total: number;
}

export default function MyBookings() {
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setLocation("/login");
      return;
    }

    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const deleteBooking = (id: string) => {
    const updatedBookings = bookings.filter(b => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your service bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Bookings Yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start by browsing services and booking your first service professional today!
              </p>
              <Button onClick={() => setLocation("/services")} data-testid="button-browse-services">
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {/* Recently Viewed Professionals - Quick Book Again */}
            {(() => {
              const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
              if (recentlyViewed.length > 0) {
                return (
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">⭐ Book Again - Recently Viewed</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {recentlyViewed.slice(0, 5).map((id: string) => (
                          <button
                            key={id}
                            className="flex-shrink-0 px-4 py-2 bg-white border-2 border-primary/30 rounded-lg font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all whitespace-nowrap"
                            data-testid={`quick-rebook-${id}`}
                          >
                            👥 Book #{id}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })()}

            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden" data-testid={`card-booking-${booking.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.providerName}</CardTitle>
                      <CardDescription>{booking.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant={booking.status === "Confirmed" ? "default" : "secondary"}
                        className="gap-1"
                        data-testid={`status-${booking.id}`}
                      >
                        {booking.status === "Confirmed" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock3 className="w-3 h-3" />
                        )}
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-3">
                      <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{booking.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{booking.address}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg flex justify-between items-center gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-bold">₹{booking.total}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 font-bold"
                        data-testid={`button-book-again-${booking.id}`}
                      >
                        📖 Book Again
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBooking(booking.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        data-testid={`button-delete-${booking.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
