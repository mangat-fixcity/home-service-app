import { useState } from "react";
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import LoginPopupModal from "./LoginPopupModal";

interface ProviderCardProps {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  image?: string;
  category?: string;
  availability?: string;
  jobsCompleted?: number;
  responseTime?: string;
  certifications?: string[];
  completionRate?: number;
  isActive?: boolean;
  lastActiveTime?: string;
  onCompare?: (id: string) => void;
  isCompared?: boolean;
  onSaveFavorite?: (id: string) => void;
  isFavorite?: boolean;
  isEmergencyService?: boolean;
  paymentVerified?: boolean;
  backgroundChecked?: boolean;
}

export default function ProviderCard({
  id,
  name,
  service,
  rating,
  reviews,
  price,
  location,
  image,
  availability = "Available today",
  jobsCompleted = 0,
  responseTime = "30 mins",
  certifications = [],
  completionRate = 98,
  isActive = Math.random() > 0.3,
  lastActiveTime = "5 mins ago",
  onCompare,
  isCompared = false,
  onSaveFavorite,
  isFavorite = false,
  isEmergencyService = Math.random() > 0.7,
  paymentVerified = true,
  backgroundChecked = true
}: ProviderCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [, setLocation] = useLocation();
  
  const handleBookClick = (e: React.MouseEvent) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    } else {
      setLocation(`/profile/${id}`);
    }
  };
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-white" data-testid={`card-provider-${id}`}>
      <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-muted to-muted/50">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        
        {/* Trust Badge - Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-sm">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        
        {/* Comparison Checkbox - Center Top */}
        {onCompare && (
          <button
            onClick={() => onCompare(id)}
            className={`absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-bold text-xs transition-all ${
              isCompared
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/90 text-foreground hover:bg-blue-100"
            }`}
            data-testid={`compare-toggle-${id}`}
          >
            {isCompared ? "✓ Comparing" : "📊 Compare"}
          </button>
        )}
        
        {/* Save Favorite Button - Top Left */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-green-500/90 text-white hover:bg-green-600 text-xs font-semibold">
            {availability.includes("Available") ? "✓ Available" : availability}
          </Badge>
          {isEmergencyService && (
            <Badge className="bg-red-600/95 text-white hover:bg-red-700 text-xs font-bold animate-pulse">
              🚨 Emergency
            </Badge>
          )}
          {onSaveFavorite && (
            <button
              onClick={() => onSaveFavorite(id)}
              className={`px-2 py-1 rounded-full font-bold text-xs transition-all ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-foreground hover:bg-red-100"
              }`}
              data-testid={`favorite-toggle-${id}`}
            >
              {isFavorite ? "❤️ Saved" : "🤍"}
            </button>
          )}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-3">
        {/* Payment Security & Trust Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-2xs font-semibold">💳 Cash</Badge>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-2xs font-semibold">🔵 Card</Badge>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-2xs font-semibold">📱 UPI</Badge>
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 text-2xs font-semibold">🛡️ Guaranteed</Badge>
          {paymentVerified && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-2xs font-semibold">✓ Payment Secure</Badge>
          )}
          {backgroundChecked && (
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-2xs font-semibold">🔐 ID Verified</Badge>
          )}
        </div>
        <div className="flex gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{service}</Badge>
        </div>
        <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
        <div className="flex items-center text-xs text-muted-foreground gap-1">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 space-y-3">
        {/* Jobs Completed, Response Time & Completion Rate */}
        <div className="grid grid-cols-3 gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div>
            <p className="text-xs text-blue-600 font-bold">Jobs Done</p>
            <p className="text-sm font-bold text-foreground">{jobsCompleted.toLocaleString()}+</p>
          </div>
          <div>
            <p className="text-xs text-blue-600 font-bold">Response</p>
            <p className="text-sm font-bold text-foreground">{responseTime}</p>
          </div>
          <div>
            <p className="text-xs text-green-600 font-bold">Completion</p>
            <p className="text-sm font-bold text-green-700">{completionRate}%</p>
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">₹{price}</span>
          <span className="text-xs text-muted-foreground">/hour</span>
        </div>
        
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {certifications.slice(0, 2).map((cert, idx) => (
              <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                ✓ {cert}
              </span>
            ))}
          </div>
        )}
        
        {/* Trust Indicators & Status */}
        <div className="flex gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
            Verified Pro
          </div>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            100% Safe
          </div>
          {isActive && (
            <div className="flex items-center gap-1 text-emerald-600 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Active Now
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 font-semibold" 
          onClick={handleBookClick}
          data-testid={`button-book-${id}`}
        >
          Book Now →
        </Button>
        <LoginPopupModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} providerId={id} />
      </CardFooter>
    </Card>
  );
}
