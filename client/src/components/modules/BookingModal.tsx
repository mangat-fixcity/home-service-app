import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const LOCATION_SUGGESTIONS = [
  // Tier 2/3 Cities - Common Areas
  { area: "Civil Lines", city: "Nagpur" },
  { area: "Indira Nagar", city: "Lucknow" },
  { area: "Main Market", city: "Jaipur" },
  { area: "Station Road", city: "Bhopal" },
  { area: "Sector 18", city: "Noida" },
  { area: "Bani Park", city: "Jaipur" },
  { area: "New Town", city: "Kolkata" },
  { area: "MG Road", city: "Bangalore" },
  { area: "Kala Ghoda", city: "Mumbai" },
  { area: "Whitefield", city: "Bangalore" },
  { area: "BTM Layout", city: "Bangalore" },
  { area: "Sector 5", city: "Noida" },
  { area: "Sector 10", city: "Pune" },
  { area: "Laxmi Nagar", city: "Delhi" },
  { area: "Juhu", city: "Mumbai" },
  { area: "Sector 31", city: "Gurgaon" },
  { area: "Mohan Garden", city: "Delhi" },
  { area: "Vaishnavi Nagar", city: "Lucknow" },
  { area: "Sundar Nagar", city: "Nagpur" },
  { area: "Hitech City", city: "Hyderabad" },
];

export default function BookingModal({ 
  providerId,
  providerName, 
  price,
  category
}: { 
  providerId: number,
  providerName: string, 
  price: number,
  category: string
}) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");
  const [address, setAddress] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState<string>("");

  const filteredSuggestions = LOCATION_SUGGESTIONS.filter(loc =>
    `${loc.area}, ${loc.city}`.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setAddress(location);
    setSearchInput("");
    setShowSuggestions(false);
  };

  const handleBook = () => {
    if (!date || !time || !address.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const booking = {
      id: Date.now().toString(),
      providerId,
      providerName,
      category,
      price,
      date: format(date, "PPP"),
      time,
      address,
      status: "Pending",
      bookingDate: new Date().toLocaleDateString(),
      total: price + 20
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = [...existingBookings, booking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    
    setBookingId(booking.id);
    setStep(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full font-semibold text-base h-12" data-testid="button-trigger-booking">
          Book Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Book {providerName}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">Complete these 3 steps to confirm your booking</p>
            </DialogHeader>
            
            {/* Progress Indicator */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 h-1 bg-primary rounded-full"></div>
              <div className="flex-1 h-1 bg-muted rounded-full"></div>
              <div className="flex-1 h-1 bg-muted rounded-full"></div>
            </div>
            
            <div className="grid gap-6 py-4">
              <div className="flex flex-col gap-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      data-testid="button-date-picker"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      data-testid="calendar-picker"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="time">Preferred Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input 
                    id="time" 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10"
                    data-testid="input-time"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Service Location
                </Label>
                
                {address ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">{address}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setAddress("");
                        setSearchInput("");
                      }}
                      data-testid="button-change-location"
                      className="h-7 px-2 text-xs"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-primary pointer-events-none" />
                      <Input 
                        placeholder="Search location..." 
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="pl-10"
                        data-testid="input-location-search"
                      />
                    </div>
                    
                    {showSuggestions && searchInput && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((location, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLocationSelect(`${location.area}, ${location.city}`)}
                              className="w-full px-4 py-3 text-left hover:bg-primary/10 border-b last:border-b-0 flex items-center gap-3 transition-colors"
                              data-testid={`location-suggestion-${idx}`}
                            >
                              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{location.area}</p>
                                <p className="text-xs text-muted-foreground">{location.city}</p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-muted-foreground">
                            No locations found
                          </div>
                        )}
                      </div>
                    )}
                    
                    {showSuggestions && !searchInput && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                        <div className="px-4 py-2 text-xs text-muted-foreground font-medium">Popular Locations</div>
                        {LOCATION_SUGGESTIONS.slice(0, 8).map((location, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLocationSelect(`${location.area}, ${location.city}`)}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 border-b last:border-b-0 flex items-center gap-3 transition-colors"
                            data-testid={`location-popular-${idx}`}
                          >
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{location.area}</p>
                              <p className="text-xs text-muted-foreground">{location.city}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                 <div className="flex justify-between text-sm">
                   <span>Service Charge</span>
                   <span>₹{price}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span>Platform Fee</span>
                   <span>₹20</span>
                 </div>
                 <div className="border-t pt-2 flex justify-between font-bold">
                   <span>Total</span>
                   <span>₹{price + 20}</span>
                 </div>
              </div>
            </div>
            <Button 
              onClick={handleBook} 
              className="w-full bg-primary hover:bg-primary/90 font-bold h-12 text-base" 
              disabled={!date || !address.trim()}
              data-testid="button-confirm-booking"
            >
              ✓ Confirm & Book
            </Button>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <DialogTitle className="text-3xl">✓ Booking Confirmed!</DialogTitle>
            
            {/* Booking Details Card */}
            <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-4 space-y-3">
              <div className="text-left space-y-2">
                <p className="text-sm text-muted-foreground">Provider Name</p>
                <p className="font-bold text-lg">{providerName}</p>
              </div>
              <div className="h-px bg-green-200" />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Booking ID</p>
                  <p className="font-mono text-sm font-bold text-green-700">{bookingId}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold text-green-600">🟢 Pending Confirmation</p>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="w-full bg-blue-50 rounded-lg border-2 border-blue-200 p-4 text-left space-y-2">
              <p className="font-bold text-sm">📋 What Happens Next:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Professional receives your booking request</li>
                <li>✓ Chat will open for communication</li>
                <li>✓ You'll get live booking status updates</li>
                <li>✓ 24/7 support available if needed</li>
              </ul>
            </div>
            
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setStep(1);
                  setDate(undefined);
                  setTime("10:00");
                  setAddress("");
                  setSearchInput("");
                  setShowSuggestions(false);
                }}
                data-testid="button-close-booking"
              >
                Close
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                data-testid="button-view-booking-status"
              >
                View Status
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
