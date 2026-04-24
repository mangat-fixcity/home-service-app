import { Link, useLocation } from "wouter";
import { Menu, X, Search, LogOut, ShoppingCart, Bell, MapPin, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import premiumLogo from "@assets/generated_images/premium_fixcity_luxury_logo.png";

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

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const SERVICE_CATEGORIES_LIST = [
  { id: "cleaning", name: "Home Cleaning", aliases: ["cleaning", "clean", "sweep", "house clean"] },
  { id: "plumbing", name: "Plumbing", aliases: ["plumb", "pipe", "tap", "leak", "water"] },
  { id: "beauty", name: "Women's Beauty", aliases: ["beauty", "salon", "haircut", "makeup", "hair"] },
  { id: "repair", name: "AC & Repair", aliases: ["ac", "repair", "air", "cool", "fan", "electric"] },
  { id: "painting", name: "Painting", aliases: ["paint", "wall", "color", "interior"] },
  { id: "carpentry", name: "Carpentry", aliases: ["carpenter", "wood", "furniture", "cabinet"] },
  { id: "men-salon", name: "Men's Salon", aliases: ["barber", "salon", "haircut", "men"] },
  { id: "pest-control", name: "Pest Control", aliases: ["pest", "insect", "termite", "bug"] },
  { id: "appliance-repair", name: "Appliance Repair", aliases: ["appliance", "fridge", "washing", "microwave"] },
  { id: "electrician", name: "Electricians", aliases: ["electrician", "wiring", "electrical", "light"] },
  { id: "laundry", name: "Laundry & Ironing", aliases: ["laundry", "iron", "wash", "dry clean"] },
  { id: "movers", name: "Packers & Movers", aliases: ["mover", "packer", "relocate", "move"] },
  { id: "carpet-cleaning", name: "Carpet Cleaning", aliases: ["carpet", "sofa", "fabric", "rug"] },
  { id: "photography", name: "Photography", aliases: ["photo", "photographer", "picture", "wedding"] },
  { id: "car-wash", name: "Car Wash", aliases: ["car", "wash", "auto", "detail", "vehicle"] },
  { id: "pet-care", name: "Pet Grooming", aliases: ["pet", "dog", "groom", "veterinary", "cat"] },
  { id: "handyman", name: "Handyman", aliases: ["handyman", "fix", "repair", "maintenance"] },
  { id: "fitness", name: "Yoga & Fitness", aliases: ["yoga", "fitness", "gym", "trainer", "exercise"] },
  { id: "tutoring", name: "Tutoring", aliases: ["tutor", "coaching", "classes", "education", "school"] },
  { id: "massage", name: "Massage & Spa", aliases: ["massage", "spa", "relaxation", "therapy"] },
  { id: "chef", name: "Chef Services", aliases: ["chef", "cook", "catering", "food"] },
  { id: "gardening", name: "Gardening", aliases: ["garden", "plant", "landscaping", "lawn"] },
  { id: "babysitting", name: "Babysitting", aliases: ["babysit", "childcare", "nanny", "kids"] },
  { id: "tech-repair", name: "Tech Repair", aliases: ["tech", "phone", "computer", "repair", "laptop"] },
];

export default function Navbar() {
  const [, setPageLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [selectedCity, setSelectedCity] = useState("Connaught Place, Delhi");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Function to find matching category
  const findMatchingCategory = (query: string) => {
    const queryLower = query.toLowerCase();
    return SERVICE_CATEGORIES_LIST.find(cat => {
      if (cat.name.toLowerCase().startsWith(queryLower)) return true;
      if (cat.aliases.some(alias => alias.toLowerCase().startsWith(queryLower))) return true;
      if (cat.name.toLowerCase().includes(queryLower)) return true;
      if (cat.aliases.some(alias => alias.toLowerCase().includes(queryLower))) return true;
      return false;
    });
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    
    const matchedCategory = findMatchingCategory(searchQuery);
    
    if (matchedCategory) {
      // Navigate to matched category
      window.location.href = `/services?category=${matchedCategory.id}`;
    } else {
      // General search
      window.location.href = `/services?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check if logged in as regular user OR admin
    const isRegularUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdminLoggedInValue = localStorage.getItem("adminLoggedIn") === "true";
    const loggedIn = isRegularUserLoggedIn || isAdminLoggedInValue;
    
    setIsLoggedIn(loggedIn);
    setAdminLoggedIn(isAdminLoggedInValue);
    if (loggedIn) {
      const email = isAdminLoggedInValue 
        ? (localStorage.getItem("adminUsername") || "Admin") 
        : (localStorage.getItem("userEmail") || "User");
      setUserEmail(email);
    }

    // Auto-detect location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
        () => {
          setIsAutoDetected(false);
        }
      );
    }
  }, []);

  const handleLogout = () => {
    // Clear regular user login
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    
    // Clear admin login
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="relative group px-3 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300">
        <span>Home</span>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
      </Link>
      <Link href="/services" className="relative group px-3 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300">
        <span>Services</span>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
      </Link>
      {isLoggedIn && (
        <>
          <Link href="/my-bookings" className="relative group px-3 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300">
            <span>My Bookings</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/profile/1" className="relative group px-3 py-2 text-foreground/80 hover:text-primary font-semibold transition-all duration-300">
            <span>My Profile</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl shadow-sm" data-testid="navbar">
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" data-testid="link-home">
            <div className="relative w-14 h-14 flex-shrink-0">
              <img 
                src={premiumLogo} 
                alt="Fixcity" 
                className="w-full h-full rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 object-cover object-center"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:flex flex-col -space-y-0.5">
              <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left">Fixcity</span>
              <span className="text-xs font-bold text-primary/70 tracking-widest uppercase">Fix It Fast</span>
            </div>
          </Link>

          {/* Location + Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-4xl mx-4 gap-3 items-center">
            {/* Location Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className={`h-11 px-4 pr-10 rounded-lg border-2 transition-all shadow-sm flex items-center gap-2 font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap ${
                  isAutoDetected 
                    ? "border-green-300 bg-green-50 hover:border-green-400" 
                    : "border-primary/10 bg-gradient-to-r from-primary/5 to-secondary/5 hover:border-primary/20"
                }`}
                data-testid="button-location-navbar"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm truncate max-w-[140px]">{selectedCity.split(',')[0]}</span>
                {isAutoDetected && <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">📍</span>}
                <span className="ml-auto text-xs">▼</span>
              </button>
              
              {isLocationOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary/20 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto min-w-[280px]">
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
                      data-testid={`location-navbar-${idx}`}
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

            {/* Search Bar */}
            <div className="relative flex-1 group h-11">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search 'plumber', 'cleaning'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearchSubmit();
                  }
                }}
                className="w-full h-full pl-12 pr-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/10 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300 font-medium"
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLinks />
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* 24/7 Support Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold" title="24/7 Customer Support Available">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>24/7 Support</span>
            </div>
            
            {/* Admin Login Button - Only show if NOT admin logged in */}
            {!adminLoggedIn && (
              <Link href="/admin-login">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="rounded-lg px-4 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold transition-all" 
                  data-testid="button-admin-login-desktop"
                >
                  🔐 Admin
                </Button>
              </Link>
            )}
            
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            {isLoggedIn ? (
              <>
                <Bell className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <div className="h-8 w-px bg-primary/10" />
                <div className="flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-xs text-muted-foreground">Welcome back</p>
                    <p className="text-sm font-semibold text-foreground truncate max-w-[150px]">{userEmail}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-300"
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button 
                  size="sm" 
                  className="rounded-lg px-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300" 
                  data-testid="button-login-desktop"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                data-testid="button-theme-toggle-mobile"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  data-testid="button-menu"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-background to-primary/5">
                <div className="flex flex-col gap-8 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search services..." 
                      className="pl-10 bg-primary/5 border-primary/20 rounded-lg"
                    />
                  </div>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-4">
                    <NavLinks />
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                  {/* Mobile Auth */}
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-4">
                      <div className="text-sm text-muted-foreground px-2">{userEmail}</div>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all rounded-lg"
                        variant="outline"
                        onClick={handleLogout}
                        data-testid="button-logout-mobile"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {!adminLoggedIn && (
                        <>
                          <Link href="/login" className="w-full">
                            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all rounded-lg" data-testid="button-login-mobile">
                              Login / Sign Up
                            </Button>
                          </Link>
                          <Link href="/admin-login" className="w-full">
                            <Button className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 border-2 font-semibold rounded-lg" variant="outline" data-testid="button-admin-login-mobile">
                              🔐 Admin Login
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
