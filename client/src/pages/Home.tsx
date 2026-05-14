import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceCategoryCard from "@/components/modules/ServiceCategoryCard";
import ProviderCard from "@/components/modules/ProviderCard";
import SmartSearch from "@/components/modules/SmartSearch";
import LoginPopupModal from "@/components/modules/LoginPopupModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShieldCheck, Users, Clock, Calendar, MapPin, TrendingUp, Star, ChevronDown, Share2 } from "lucide-react";
import heroImage from "@assets/generated_images/happy_family_in_a_clean_home.png";
import cleaningImage from "@assets/generated_images/friendly_indian_home_cleaning_professional_smiling.png";
import plumbingImage from "@assets/generated_images/professional_plumber_fixing_a_sink.png";
import beautyImage from "@assets/generated_images/barber_giving_a_haircut_in_a_salon.png";
import womenBeautyImage from "@assets/generated_images/women's_beauty_salon_professional_styling.png";
import paintingImage from "@assets/generated_images/professional_interior_painter_at_work.png";
import carpentryImage from "@assets/generated_images/professional_carpenter_working_on_woodwork.png";
import repairImage from "@assets/generated_images/electrician_repairing_an_ac_unit.png";
import pestImage from "@assets/generated_images/professional_pest_control_service.png";
import applianceImage from "@assets/generated_images/washing_machine_appliance_repair.png";
import electricianImage from "@assets/generated_images/professional_electrician_at_work.png";
import laundryImage from "@assets/generated_images/professional_laundry_and_ironing.png";
import moversImage from "@assets/generated_images/packers_and_movers_packing_service.png";
import carpetImage from "@assets/generated_images/professional_carpet_and_sofa_cleaning.png";
import photographyImage from "@assets/generated_images/professional_portrait_photography.png";
import carWashImage from "@assets/generated_images/car_wash_and_auto_detailing.png";
import petImage from "@assets/generated_images/pet_grooming_and_care.png";
import handymanImage from "@assets/generated_images/handyman_services.png";
import fitnessImage from "@assets/generated_images/yoga_and_fitness_training.png";
import tutoringImage from "@assets/generated_images/tutoring_and_coaching.png";
import massageImage from "@assets/generated_images/massage_and_spa_services.png";
import chefImage from "@assets/generated_images/chef_and_cooking_services.png";
import gardenImage from "@assets/generated_images/gardening_and_landscaping.png";
import babysitterImage from "@assets/generated_images/babysitting_and_childcare.png";
import techImage from "@assets/generated_images/mobile_and_computer_repair.png";
import categoryCleaningImage from "@assets/generated_images/professional_home_cleaning_worker.png";
import categoryRepairImage from "@assets/generated_images/professional_repair_technician.png";
import categoryBeautyImage from "@assets/generated_images/professional_beauty_salon_service.png";
import categoryPaintingImage from "@assets/generated_images/professional_interior_painter.png";
import categoryPlumbingImage from "@assets/generated_images/professional_plumbing_service.png";
import categoryCarpentryImage from "@assets/generated_images/professional_carpentry_work.png";
import categorySalonImage from "@assets/generated_images/professional_barbershop_service.png";
import categoryPestImage from "@assets/generated_images/professional_pest_control_service.png";
import categoryMoversImage from "@assets/generated_images/professional_moving_service.png";
import categoryLaundryImage from "@assets/generated_images/professional_laundry_service.png";
import categoryFitnessImage from "@assets/generated_images/professional_fitness_training.png";
import categoryTutoringImage from "@assets/generated_images/professional_tutoring_service.png";

const INDIAN_CITIES = [
  { name: "Civil Lines, Nagpur", state: "Nagpur", lat: 21.1603, lng: 79.0849 },
  { name: "Indira Nagar, Lucknow", state: "Lucknow", lat: 26.8657, lng: 80.9537 },
  { name: "Main Market, Jaipur", state: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Station Road, Bhopal", state: "Bhopal", lat: 23.1815, lng: 77.4104 },
  { name: "Sector 5, Noida", state: "Noida", lat: 28.5709, lng: 77.3690 },
  { name: "Sector 18, Noida", state: "Noida", lat: 28.5821, lng: 77.3622 },
  { name: "Whitefield, Bangalore", state: "Bangalore", lat: 12.9698, lng: 77.7499 },
  { name: "Koramangala, Bangalore", state: "Bangalore", lat: 12.9352, lng: 77.6245 },
  { name: "Laxmi Nagar, Delhi", state: "Delhi", lat: 28.5679, lng: 77.2547 },
  { name: "Connaught Place, Delhi", state: "Delhi", lat: 28.6295, lng: 77.1895 },
  { name: "Sector 10, Pune", state: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Bani Park, Jaipur", state: "Jaipur", lat: 26.8924, lng: 75.8093 },
  { name: "MG Road, Bangalore", state: "Bangalore", lat: 12.9716, lng: 77.6412 },
  { name: "Fort, Mumbai", state: "Mumbai", lat: 18.9316, lng: 72.8342 },
  { name: "Bandra, Mumbai", state: "Mumbai", lat: 19.0596, lng: 72.8295 },
];

// Function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Google Maps Reverse Geocoding to detect city
const detectCityWithGoogle = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!googleApiKey) return null;
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}&result_type=locality`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Extract formatted address or city name
      const result = data.results[0];
      const formattedAddress = result.formatted_address;
      
      // Try to find matching city from our list
      for (let city of INDIAN_CITIES) {
        if (formattedAddress.includes(city.state)) {
          return city.name;
        }
      }
      
      // If no exact match, return the formatted address
      return formattedAddress;
    }
  } catch (error) {
    console.log("Google Maps API not available, using distance calculation");
  }
  return null;
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Connaught Place, Delhi");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check if logged in as regular user OR admin
    const isRegularUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    const loggedIn = isRegularUserLoggedIn || isAdminLoggedIn;
    
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const email = isAdminLoggedIn 
        ? (localStorage.getItem("adminUsername") || "Admin") 
        : (localStorage.getItem("userEmail") || "User");
      setUserEmail(email);
      const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(savedBookings);
    }
    
    // Auto-detect location for BOTH logged-in and non-logged-in users
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Try Google Maps API first for accurate city detection
          const googleCity = await detectCityWithGoogle(latitude, longitude);
          if (googleCity) {
            setSelectedCity(googleCity);
            setIsAutoDetected(true);
            return;
          }
          
          // Fallback: Find the closest city using distance calculation
          let closestCity = INDIAN_CITIES[0];
          let minDistance = calculateDistance(latitude, longitude, closestCity.lat, closestCity.lng);
          
          for (let city of INDIAN_CITIES) {
            const distance = calculateDistance(latitude, longitude, city.lat, city.lng);
            if (distance < minDistance) {
              minDistance = distance;
              closestCity = city;
            }
          }
          
          setSelectedCity(closestCity.name);
          setIsAutoDetected(true);
        },
        (error) => {
          // Geolocation denied or error - use default
          setIsAutoDetected(false);
        }
      );
    }
  }, []);

  const featuredProviders = [
    {
      id: "1",
      name: "Rajesh Kumar",
      service: "Plumbing Expert",
      rating: 4.8,
      reviews: 124,
      price: 299,
      location: "Civil Lines, Nagpur",
      image: plumbingImage,
      availability: "Available in 30 mins"
    },
    {
      id: "2",
      name: "Sunita Sharma",
      service: "Deep Cleaning",
      rating: 4.9,
      reviews: 89,
      price: 499,
      location: "Indira Nagar, Lucknow",
      image: cleaningImage,
      availability: "Available tomorrow"
    },
    {
      id: "3",
      name: "Classic Cuts Salon",
      service: "Women's Salon",
      rating: 4.7,
      reviews: 215,
      price: 199,
      location: "Main Market, Jaipur",
      image: womenBeautyImage,
      availability: "Available today"
    },
     {
      id: "4",
      name: "Amit Electricals",
      service: "AC Repair",
      rating: 4.6,
      reviews: 156,
      price: 399,
      location: "Station Road, Bhopal",
      image: repairImage,
      availability: "Available today"
    }
  ];

  // Dashboard View (Logged In)
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        {/* NO professional banner on dashboard - only for landing page */}
        
        <main className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {userEmail.split('@')[0]}! 👋</h1>
                <p className="text-muted-foreground text-lg">Find and book trusted home services instantly</p>
              </div>
              
              {/* Desktop QR Code - Enhanced Welcome position */}
              <div className="block group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-x pointer-events-none"></div>
                <Card className="relative bg-gradient-to-br from-white to-cyan-50/50 border-2 border-cyan-200/50 p-2.5 shadow-2xl hover:shadow-cyan-200/50 transition-all duration-500 rounded-2xl hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-xl border-2 border-cyan-100 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <div className="bg-white p-2 rounded-lg">
                       <QRCodeSVG 
                        value="https://home-service-app.onrender.com" 
                        size={96}
                        level="H"
                        className="rounded-sm transition-transform duration-300 group-hover:scale-110"
                      />
                     </div>   
                    </div>
                    <div className="text-left space-y-1 pr-1">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="bg-cyan-500/10 text-[9px] h-4 border-cyan-200 text-cyan-700 font-bold px-1.5 uppercase tracking-tighter">Mobile Sync</Badge>
                      </div>
                      <p className="font-black text-cyan-900 text-xs tracking-tight">Scan for Mobile App</p>
                      <p className="text-[10px] font-medium text-cyan-700/70 leading-tight">Continue booking<br/>on the go</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Location & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-4xl">
              {/* Location Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className={`w-full sm:w-auto h-12 px-4 pr-10 rounded-lg border-2 transition-all shadow-sm flex items-center gap-2 font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    isAutoDetected 
                      ? "border-green-300 bg-green-50 hover:border-green-400" 
                      : "border-primary/20 bg-white hover:border-primary/40"
                  }`}
                  data-testid="button-location-menu"
                  title={isAutoDetected ? "📍 Auto-detected location" : "Select your location"}
                >
                  <span className="text-lg">📍</span>
                  <span className="text-sm truncate">{selectedCity}</span>
                  {isAutoDetected && (
                    <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">Auto</span>
                  )}
                  <span className="ml-auto text-xs">▼</span>
                </button>
                
                {/* Location Dropdown Menu */}
                {isLocationOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary/20 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {INDIAN_CITIES.map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCity(city.name);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors border-b last:border-b-0 ${
                          selectedCity === city.name ? "bg-primary/10 border-l-4 border-l-primary" : ""
                        }`}
                        data-testid={`location-option-${idx}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{city.name}</span>
                          {selectedCity === city.name && <span className="text-xs text-primary font-bold ml-auto">✓</span>}
                          <span className="text-xs text-muted-foreground ml-auto">{city.state}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Smart Search Bar */}
              <SmartSearch placeholder="Search 'plumber', 'cleaning', 'electrician'..." showSearchHistory={true} />
              <Button size="lg" className="h-12 px-8 text-base font-semibold hidden sm:flex" onClick={() => setLocation("/services")}>
                Explore
              </Button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Stats & Bookings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-blue-900">{bookings.length}</p>
                      <p className="text-xs text-blue-700 font-medium">My Bookings</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-amber-600 mx-auto mb-2 fill-amber-600" />
                      <p className="text-3xl font-bold text-amber-900">4.8</p>
                      <p className="text-xs text-amber-700 font-medium">Avg Rating</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <ShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-green-900">100%</p>
                      <p className="text-xs text-green-700 font-medium">Verified Pros</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>
                    {bookings.length === 0 ? "No bookings yet" : `${bookings.length} booking${bookings.length !== 1 ? 's' : ''}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">No bookings yet. Browse services to get started!</p>
                      <Button onClick={() => setLocation("/services")}>Browse Services</Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((booking: any) => (
                        <div key={booking.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">{booking.providerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.category}</p>
                            </div>
                            <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {booking.time}
                            </span>
                          </div>
                        </div>
                      ))}
                      {bookings.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setLocation("/my-bookings")}
                        >
                          View All Bookings ({bookings.length})
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="ghost"
                    onClick={() => setLocation("/services")}
                  >
                    <Search className="w-4 h-4 mr-2" /> Browse All Services
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="ghost"
                    onClick={() => setLocation("/my-bookings")}
                  >
                    <Calendar className="w-4 h-4 mr-2" /> My Bookings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="ghost"
                  >
                    <Star className="w-4 h-4 mr-2" /> Saved Favorites
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Badge */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Your Safety Matters</p>
                      <p className="text-sm text-blue-800">All professionals are verified and background checked.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Offers & Discounts Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black">🎉 Offers & Discounts</h2>
                <p className="text-muted-foreground mt-1">Limited time deals on popular services</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Offer Card 1 - Entrance Makeover */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50">
                <div className="aspect-video bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100 flex items-center justify-center text-6xl relative overflow-hidden">
                  🏠
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg leading-tight">Entrance Wall Makeover</h3>
                    <Badge className="bg-orange-500/90 text-white text-xs whitespace-nowrap">20% OFF</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">Professional painting & design</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">₹6,999</span>
                    <span className="text-xs text-muted-foreground line-through">₹8,999</span>
                  </div>
                  <Button onClick={() => window.location.href = "/services?category=painting"} className="w-full bg-orange-500 hover:bg-orange-600 font-bold" data-testid="button-offer-1">
                    Book Now →
                  </Button>
                </div>
              </div>

              {/* Offer Card 2 - Sofa Deep Cleaning */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50">
                <div className="aspect-video bg-gradient-to-br from-blue-300 via-cyan-100 to-blue-50 flex items-center justify-center text-6xl relative overflow-hidden">
                  🛋️
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg leading-tight">Sofa Deep Cleaning</h3>
                    <Badge className="bg-blue-500/90 text-white text-xs whitespace-nowrap">Starting</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">Stain removal & sanitization</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">₹569</span>
                  </div>
                  <Button onClick={() => window.location.href = "/services?category=cleaning"} className="w-full bg-blue-500 hover:bg-blue-600 font-bold" data-testid="button-offer-2">
                    Book Now →
                  </Button>
                </div>
              </div>

              {/* Offer Card 3 - Wedding Package */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50">
                <div className="aspect-video bg-gradient-to-br from-purple-300 via-pink-100 to-purple-50 flex items-center justify-center text-6xl relative overflow-hidden">
                  💍
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg leading-tight">Wedding Package</h3>
                    <Badge className="bg-purple-500/90 text-white text-xs whitespace-nowrap">Price Drop</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">Hair, makeup & beauty services</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">₹2,499</span>
                    <span className="text-xs text-muted-foreground line-through">₹3,999</span>
                  </div>
                  <Button onClick={() => window.location.href = "/services?category=beauty"} className="w-full bg-purple-500 hover:bg-purple-600 font-bold" data-testid="button-offer-3">
                    Book Now →
                  </Button>
                </div>
              </div>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    );
  }

  // Handle login modal display
  const handleLoginModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  };

  // Landing Page View (Not Logged In)
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Top Notification Banner - Limited Offer */}
      <div className="bg-gradient-to-r from-primary via-teal-500 to-secondary text-white border-b shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center text-center">
          <div className="flex items-center gap-3 text-sm font-bold">
            <span className="text-lg animate-bounce">🎁</span>
            <span>NEW USERS: Get ₹500 OFF on first booking + Free Cancellation!</span>
            <span className="text-lg animate-bounce">🎁</span>
          </div>
        </div>
      </div>

      {/* Professional Banner */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Desktop QR Code - Enhanced Top Left position */}
            <div className="hidden md:block group cursor-help relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-x pointer-events-none"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm p-2 border-2 border-primary/20 shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="relative p-1.5 bg-white rounded-lg border border-primary/10 shadow-inner transition-colors">
                    <div>
                      <QRCodeSVG
                      value="https://home-service-app.onrender.com" 
                      size={96}
                      level="H"
                      includeMargin={false}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                   </div>   
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[11px] font-black uppercase tracking-wider text-primary leading-none">Live Booking</p>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground leading-tight">Scan for Instant<br/>Mobile Access</p>
                  </div>
                </div>
              </Card>
              
              {/* Floating tooltip on hover */}
              <div className="absolute -bottom-10 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-primary text-[10px] text-white px-2 py-1 rounded shadow-lg text-center font-bold whitespace-nowrap">
                  Open on your phone! 📱
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">✨ Welcome to Fixcity</p>
              <p className="text-sm text-muted-foreground">India's fastest-growing home services platform. Are you a professional? Join now and grow your business!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setLocation("/professional-login")} data-testid="button-pro-login">Professional Login</Button>
            <Button size="sm" onClick={() => setLocation("/professional-signup")} data-testid="button-pro-signup">Join Now</Button>
          </div>
        </div>
      </div>
      
      {/* Unified Fixcity Win Message - Compact */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b-2 border-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-bounce">🏆</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              Fixcity Wins. Here's Why.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium">Only Fixcity has comparison tool, recently viewed, fastest booking to 60+ verified professionals</p>
          </div>
          
          {/* 4 Key Cards - Compact */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Unique Feature 1 */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="font-black text-sm mb-2 text-green-900">Compare Professionals</h3>
              <p className="text-xs text-green-700 font-medium">Only Fixcity - side-by-side comparison</p>
            </div>
            
            {/* Unique Feature 2 */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">👀</div>
              <h3 className="font-black text-sm mb-2 text-blue-900">Recently Viewed</h3>
              <p className="text-xs text-blue-700 font-medium">Book again instantly - unique feature</p>
            </div>
            
            {/* Tier 2/3 Focus */}
            <div className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="font-black text-sm mb-2 text-orange-900">Explore Your City</h3>
              <p className="text-xs text-orange-700 font-medium">Available in 50+ Indian cities & towns</p>
            </div>
            
            {/* Speed & Trust */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="font-black text-sm mb-2 text-purple-900">2x Faster Booking</h3>
              <p className="text-xs text-purple-700 font-medium">40% faster than competitors</p>
            </div>
          </div>
          
          {/* Trust & Stats - Inline & Compact */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              <div>
                <p className="text-lg font-black text-primary">60+</p>
                <p className="text-2xs text-muted-foreground font-medium">Professionals</p>
              </div>
              <div>
                <p className="text-lg font-black text-primary">4.7⭐</p>
                <p className="text-2xs text-muted-foreground font-medium">Avg Rating</p>
              </div>
              <div>
                <p className="text-lg font-black text-primary">2,300+</p>
                <p className="text-2xs text-muted-foreground font-medium">Reviews</p>
              </div>
              <div>
                <p className="text-lg font-black text-primary">15</p>
                <p className="text-2xs text-muted-foreground font-medium">Cities</p>
              </div>
              <div>
                <p className="text-lg font-black text-primary">15min</p>
                <p className="text-2xs text-muted-foreground font-medium">Avg Response</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="space-y-8 z-10">
              {/* USP Badges - Why Fixcity is Better */}
              <div className="flex flex-row gap-2 mb-6 w-full">
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 h-11 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-bold text-xs border-2 border-green-300 shadow-sm shadow-green-500/20 animate-pulse">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">100% Verified</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 h-11 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-bold text-xs border-2 border-blue-300 shadow-sm">
                  <span>⏱️</span>
                  <span className="truncate">15 Min Response</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 h-11 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-bold text-xs border-2 border-purple-300 shadow-sm">
                  <span>🚀</span>
                  <span className="truncate">60+ Professionals</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
                Expert Home <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-secondary">Services in 2 Mins</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                <strong>Fixcity:</strong> India's fastest-growing home services marketplace. <strong>24+ categories</strong> • 100% verified professionals • Cash, Card, UPI accepted • 100% money-back guarantee • No hidden charges
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Button 
                  size="lg" 
                  className="flex-1 h-13 px-8 text-base font-bold shadow-xl shadow-primary/30 rounded-xl" 
                  onClick={() => {
                    if (isLoggedIn) {
                      setLocation("/services");
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  data-testid="button-find-services-hero"
                >
                  Find Services
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="flex-1 h-13 px-8 text-base font-bold rounded-xl border-2" 
                  onClick={() => {
                    if (isLoggedIn) {
                      setLocation("/services");
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  data-testid="button-browse-services-hero"
                >
                  Browse All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold pt-6">
                <div className="flex flex-col items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  <div className="text-lg mb-1">✅</div>
                  <span className="text-blue-700">100% Verified</span>
                </div>
                <div className="flex flex-col items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <div className="text-lg mb-1">💳</div>
                  <span className="text-green-700">Cash/Card/UPI</span>
                </div>
                <div className="flex flex-col items-center bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                  <div className="text-lg mb-1">🛡️</div>
                  <span className="text-purple-700">Money Back</span>
                </div>
                <div className="flex flex-col items-center bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                  <div className="text-lg mb-1">⏱️</div>
                  <span className="text-orange-700">No Hidden Charges</span>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-2xl -z-10" />
              <img 
                src={heroImage} 
                alt="Happy family" 
                className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 max-w-xs animate-in slide-in-from-bottom-4 duration-1000 delay-300 text-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">100% Verified</p>
                  <p className="text-xs text-muted-foreground">All professionals are background checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers & Discounts Section - Landing Page */}
      <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-5xl animate-bounce">🎁</span>
            </div>
            <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">Limited Time Offers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Exclusive deals on our most popular services. Sign in to book now! Valid for next 48 hours only.</p>
            <div className="flex justify-center gap-2 mt-4 text-xs font-bold">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">⏰ 48 HRS LEFT</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">✅ 2,847 BOOKINGS</span>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Offer Card 1 - Entrance Makeover */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 hover:border-orange-300">
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white font-black text-sm px-3 py-1 rounded-bl-xl shadow-lg">20% OFF</div>
              <div className="aspect-video bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                🏠
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg mb-1 text-foreground">Entrance Wall Makeover</h3>
                <p className="text-muted-foreground text-sm mb-3 font-medium">Professional painting & design</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-orange-600">₹6,999</span>
                    <span className="text-sm text-muted-foreground line-through">₹8,999</span>
                  </div>
                  <p className="text-xs font-bold text-green-600">Save ₹2,000!</p>
                </div>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 font-bold text-white shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => {
                    if (isLoggedIn) {
                      setLocation("/dashboard");
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  data-testid="button-offer-landing-1"
                >
                  See Details →
                </Button>
              </div>
            </div>

            {/* Offer Card 2 - Sofa Deep Cleaning */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300">
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white font-black text-sm px-3 py-1 rounded-bl-xl shadow-lg">STARTING</div>
              <div className="aspect-video bg-gradient-to-br from-blue-300 via-cyan-100 to-blue-50 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                🧳
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg mb-1 text-foreground">Sofa Deep Cleaning</h3>
                <p className="text-muted-foreground text-sm mb-3 font-medium">Stain removal & sanitization</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-blue-600">₹569</span>
                    <span className="text-xs font-bold text-blue-500 bg-blue-100 px-2 py-1 rounded">Budget Pick</span>
                  </div>
                  <p className="text-xs font-bold text-green-600">⭐ 4.9/5 · 234 reviews</p>
                </div>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 font-bold text-white shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => {
                    if (isLoggedIn) {
                      setLocation("/dashboard");
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  data-testid="button-offer-landing-2"
                >
                  See Details →
                </Button>
              </div>
            </div>

            {/* Offer Card 3 - Home Deep Clean */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300">
              <div className="absolute -top-1 -right-1 bg-green-500 text-white font-black text-sm px-3 py-1 rounded-bl-xl shadow-lg">NEW</div>
              <div className="aspect-video bg-gradient-to-br from-green-300 via-emerald-100 to-green-50 flex items-center justify-center text-6xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                ✨
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg mb-1 text-foreground">Home Deep Cleaning</h3>
                <p className="text-muted-foreground text-sm mb-3 font-medium">Complete home sanitization</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-green-600">₹1,299</span>
                    <span className="text-sm text-muted-foreground line-through">₹1,699</span>
                  </div>
                  <p className="text-xs font-bold text-green-600">Save ₹400! Most Popular</p>
                </div>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 font-bold text-white shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => {
                    if (isLoggedIn) {
                      setLocation("/dashboard");
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  data-testid="button-offer-landing-3"
                >
                  See Details →
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
              variant="outline" 
              className="font-bold border-2 hover:bg-muted"
              onClick={() => {
                if (isLoggedIn) {
                  setLocation("/dashboard");
                } else {
                  setShowLoginModal(true);
                }
              }}
              data-testid="button-view-all-offers"
            >
              View All Offers & Login
            </Button>
            <p className="text-xs text-muted-foreground mt-4">💳 No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* CUSTOMER SUCCESS STORIES - Social Proof */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">⭐ What Customers Say</h2>
            <p className="text-muted-foreground">Real stories from 100,000+ satisfied users</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-foreground font-medium mb-4">"Fixcity saved me so much time! Found a plumber in 30 seconds and he arrived within an hour. Outstanding service!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">P</div>
                <div>
                  <p className="font-bold text-sm">Priya Sharma</p>
                  <p className="text-xs text-muted-foreground">Delhi • Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-foreground font-medium mb-4">"Best home cleaning service I've used. Professional, thorough, and the prices are so transparent. No hidden charges!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <p className="font-bold text-sm">Rajesh Kumar</p>
                  <p className="text-xs text-muted-foreground">Mumbai • Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-foreground font-medium mb-4">"Fixcity is so much better than other platforms. Quick booking, verified professionals, and instant support. Love it!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <p className="font-bold text-sm">Anjali Singh</p>
                  <p className="text-xs text-muted-foreground">Bangalore • Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING NOW Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">🔥 Trending Now This Week</h2>
            <p className="text-muted-foreground">Most booked services near {selectedCity}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Trending 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">🧹</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">Hot</span>
              </div>
              <h3 className="font-bold mb-1">Home Cleaning</h3>
              <p className="text-xs text-muted-foreground mb-2">2,341 bookings this week</p>
              <p className="font-bold text-primary">From ₹299</p>
            </div>

            {/* Trending 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">🔧</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">Fast</span>
              </div>
              <h3 className="font-bold mb-1">AC Service</h3>
              <p className="text-xs text-muted-foreground mb-2">1,892 bookings this week</p>
              <p className="font-bold text-primary">From ₹399</p>
            </div>

            {/* Trending 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">💅</span>
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">New</span>
              </div>
              <h3 className="font-bold mb-1">Beauty & Salon</h3>
              <p className="text-xs text-muted-foreground mb-2">1,567 bookings this week</p>
              <p className="font-bold text-primary">From ₹199</p>
            </div>

            {/* Trending 4 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">🚰</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">24/7</span>
              </div>
              <h3 className="font-bold mb-1">Plumbing</h3>
              <p className="text-xs text-muted-foreground mb-2">1,743 bookings this week</p>
              <p className="font-bold text-primary">From ₹299</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Quick Guide */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">⚡ Book in 3 Simple Steps</h2>
            <p className="text-muted-foreground">Fastest home services booking in India</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Select Service</h3>
              <p className="text-sm text-muted-foreground">Choose from 24+ categories and your location</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Pick Pro & Date</h3>
              <p className="text-sm text-muted-foreground">Select verified professional and preferred time slot</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Get Service!</h3>
              <p className="text-sm text-muted-foreground">Professional arrives on time, payment verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section - High Discoverability */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b-2 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black mb-3">Find Your Service in Seconds</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Search by service name or browse by category - find verified professionals instantly</p>
          </div>
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search 'plumber', 'cleaning', 'electrician'..." 
                className="w-full h-14 pl-12 pr-4 rounded-lg border-2 border-primary/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-md text-base"
                data-testid="landing-search"
              />
            </div>
            <Button size="lg" className="h-14 px-8 font-bold">Search</Button>
          </div>
        </div>
      </section>

      {/* Trust Guarantees Section - First-Time User Confidence */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-sm text-green-900">100% Verified</p>
                <p className="text-xs text-green-700">All professionals checked</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="font-bold text-sm text-blue-900">Money-Back Guarantee</p>
                <p className="text-xs text-blue-700">Not satisfied? Full refund</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-2xl">💳</span>
              <div>
                <p className="font-bold text-sm text-purple-900">Multiple Payments</p>
                <p className="text-xs text-purple-700">Cash • Card • UPI</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="font-bold text-sm text-orange-900">No Hidden Charges</p>
                <p className="text-xs text-orange-700">Transparent pricing always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Landing Page */}
          <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
              <p className="text-muted-foreground">Everything you need for your home</p>
            </div>
            <Button variant="outline" className="hidden sm:flex">View All</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <ServiceCategoryCard title="Home Cleaning" image={cleaningImage} count={120} slug="cleaning" delay={0} startingPrice={299} badgePosition="right" />
            <ServiceCategoryCard title="Plumbing" image={plumbingImage} count={85} slug="plumbing" delay={1} startingPrice={299} badgePosition="right" />
            <ServiceCategoryCard title="Women's Beauty" image={womenBeautyImage} count={200} slug="beauty" delay={2} startingPrice={199} badgePosition="right" />
            <ServiceCategoryCard title="AC & Repair" image={repairImage} count={95} slug="repair" delay={3} startingPrice={399} badgePosition="right" />
            <ServiceCategoryCard title="Painting" image={paintingImage} count={75} slug="painting" delay={4} startingPrice={2499} badgePosition="right" />
            <ServiceCategoryCard title="Carpentry" image={carpentryImage} count={60} slug="carpentry" delay={5} startingPrice={3999} />
            <ServiceCategoryCard title="Men's Salon" image={beautyImage} count={200} slug="men-salon" delay={6} startingPrice={199} />
            <ServiceCategoryCard title="Pest Control" image={pestImage} count={150} slug="pest-control" delay={7} startingPrice={499} />
            <ServiceCategoryCard title="Appliance Repair" image={applianceImage} count={120} slug="appliance-repair" delay={8} startingPrice={349} badgePosition="right" />
            <ServiceCategoryCard title="Electricians" image={electricianImage} count={110} slug="electrician" delay={9} startingPrice={299} badgePosition="right" />
            <ServiceCategoryCard title="Laundry & Ironing" image={laundryImage} count={85} slug="laundry" delay={10} startingPrice={199} />
            <ServiceCategoryCard title="Packers & Movers" image={moversImage} count={140} slug="movers" delay={11} startingPrice={1999} />
            <ServiceCategoryCard title="Carpet Cleaning" image={carpetImage} count={95} slug="carpet-cleaning" delay={12} startingPrice={499} badgePosition="right" />
            <ServiceCategoryCard title="Photography" image={photographyImage} count={110} slug="photography" delay={13} startingPrice={999} />
            <ServiceCategoryCard title="Car Wash" image={carWashImage} count={80} slug="car-wash" delay={14} startingPrice={349} />
            <ServiceCategoryCard title="Pet Grooming" image={petImage} count={90} slug="pet-care" delay={15} startingPrice={299} badgePosition="right" />
            <ServiceCategoryCard title="Handyman" image={handymanImage} count={105} slug="handyman" delay={16} startingPrice={399} badgePosition="right" />
            <ServiceCategoryCard title="Yoga & Fitness" image={fitnessImage} count={125} slug="fitness" delay={17} startingPrice={299} badgePosition="right" />
            <ServiceCategoryCard title="Tutoring" image={tutoringImage} count={70} slug="tutoring" delay={18} startingPrice={399} />
            <ServiceCategoryCard title="Massage & Spa" image={massageImage} count={115} slug="massage" delay={19} startingPrice={499} />
            <ServiceCategoryCard title="Chef Services" image={chefImage} count={60} slug="chef" delay={20} startingPrice={599} />
            <ServiceCategoryCard title="Gardening" image={gardenImage} count={75} slug="gardening" delay={21} startingPrice={299} />
            <ServiceCategoryCard title="Babysitting" image={babysitterImage} count={100} slug="babysitting" delay={22} startingPrice={249} />
            <ServiceCategoryCard title="Tech Repair" image={techImage} count={95} slug="tech-repair" delay={23} startingPrice={399} />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground text-sm">All service providers are thoroughly background checked and verified</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Safe & Secure</h3>
              <p className="text-muted-foreground text-sm">Your privacy and security are our top priority with encrypted transactions</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground text-sm">Guaranteed satisfaction with transparent pricing and quality service</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Login Modal */}
      <LoginPopupModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
