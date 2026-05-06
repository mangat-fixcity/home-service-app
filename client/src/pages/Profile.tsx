import { useParams } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/modules/BookingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, ShieldCheck, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Import all provider images
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

// All providers data
const ALL_PROVIDERS = [
  {
    id: "1",
    name: "Rajesh Kumar",
    service: "Plumbing Expert",
    rating: 4.8,
    reviews: 124,
    price: 299,
    location: "Civil Lines, Nagpur",
    image: plumbingImage,
    category: "plumbing",
    description: "10+ years of experience in residential and commercial plumbing. Certified professional with excellent customer reviews.",
    availability: "Available today",
    response_time: "15 mins",
    languages: "Hindi, English"
  },
  {
    id: "2",
    name: "Priya Sharma",
    service: "Home Cleaning",
    rating: 4.9,
    reviews: 456,
    price: 199,
    location: "Indira Nagar, Lucknow",
    image: cleaningImage,
    category: "cleaning",
    description: "Professional home cleaning with eco-friendly products. Trusted by 500+ families.",
    availability: "Available today",
    response_time: "10 mins",
    languages: "Hindi, English"
  },
  {
    id: "3",
    name: "Vikas Beauty Studio",
    service: "Women's Salon",
    rating: 4.7,
    reviews: 289,
    price: 399,
    location: "Main Market, Jaipur",
    image: womenBeautyImage,
    category: "beauty",
    description: "Full beauty services - hair, makeup, nails. Premium products used.",
    availability: "Available today",
    response_time: "20 mins",
    languages: "Hindi, English"
  },
  {
    id: "4",
    name: "AC Cool Masters",
    service: "AC Servicing",
    rating: 4.6,
    reviews: 178,
    price: 399,
    location: "Station Road, Bhopal",
    image: repairImage,
    category: "repair",
    description: "AC installation, repair, and maintenance. 5-year warranty on services.",
    availability: "Available today",
    response_time: "30 mins",
    languages: "Hindi, English"
  },
  {
    id: "5",
    name: "Fresh Carpet Care",
    service: "Carpet Cleaning",
    rating: 4.8,
    reviews: 213,
    price: 549,
    location: "Sector 5, Noida",
    image: carpetImage,
    category: "carpet-cleaning",
    description: "Deep carpet and upholstery cleaning with eco-friendly solutions.",
    availability: "Available today",
    response_time: "15 mins",
    languages: "Hindi, English"
  },
];

export default function Profile() {
  const { id } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
  const sampleReviews = [
    { author: "Ananya Sharma", rating: 5, text: "Excellent service! Very professional. Would recommend to anyone." },
    { author: "Vikram Singh", rating: 4.5, text: "Great work, quick response time. Will book again." },
    { author: "Priya Gupta", rating: 5, text: "Outstanding! Best cleaning service I've used." }
  ];

  useEffect(() => {
    // Find provider from ID
    const foundProvider = ALL_PROVIDERS.find(p => p.id === id);
    setProvider(foundProvider);
    const savedFavorites = JSON.parse(localStorage.getItem("savedFavorites") || "[]");
    setIsFavorited(savedFavorites.includes(id));
  }, [id]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Professional Not Found</h1>
          <p className="text-muted-foreground mb-6">The professional you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = "/services"}>
            Back to Services
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header with Image */}
      <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Provider Info */}
          <div className="lg:col-span-2">
            {/* Provider Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-black mb-2">{provider.name}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{provider.service}</p>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg">{provider.rating}</span>
                  <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                </div>
                <Badge className="bg-green-500/20 text-green-700 border-green-200">✓ Verified Pro</Badge>
                <Badge className="bg-blue-500/20 text-blue-700 border-blue-200">🛡️ 100% Safe</Badge>
                <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-200">✓ ID Verified</Badge>
                <Badge className="bg-indigo-500/20 text-indigo-700 border-indigo-200">💳 Payment Verified</Badge>
                <Badge className="bg-purple-500/20 text-purple-700 border-purple-200">📍 Background Checked</Badge>
              </div>

              {/* Location & Quick Info */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-semibold">{provider.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Response Time</p>
                        <p className="font-semibold">{provider.response_time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Availability</p>
                        <p className="font-semibold">{provider.availability}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">About</h3>
                  <p className="text-foreground/80 leading-relaxed">{provider.description}</p>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.split(", ").map((lang: string) => (
                      <Badge key={lang} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">⭐ Recent Reviews ({provider.reviews})</h3>
                  <div className="space-y-4">
                    {sampleReviews.map((review, idx) => (
                      <div key={idx} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm">{review.author}</p>
                          <span className="text-yellow-500 font-bold">{review.rating} ⭐</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Save Favorite Button */}
              <button
                onClick={() => {
                  setIsFavorited(!isFavorited);
                  const savedFavorites = JSON.parse(localStorage.getItem("savedFavorites") || "[]");
                  const newFavorites = isFavorited
                    ? savedFavorites.filter((fid: string) => fid !== id)
                    : [...savedFavorites, id];
                  localStorage.setItem("savedFavorites", JSON.stringify(newFavorites));
                }}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  isFavorited
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-100 text-foreground hover:bg-red-100"
                }`}
                data-testid="button-favorite-profile"
              >
                {isFavorited ? "❤️ Saved to Favorites" : "🤍 Save to Favorites"}
              </button>

              <Card className="border-2 border-primary/20 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  {/* Price Section */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Service Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-primary">₹{provider.price}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <p className="text-sm font-bold text-foreground mb-3">📅 Select Date & Time</p>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-primary/20 rounded-lg mb-3"
                      data-testid="booking-date-input"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 rounded-lg font-bold text-sm transition-all ${
                            selectedTimeSlot === slot
                              ? "bg-primary text-white"
                              : "bg-gray-100 hover:bg-primary/10"
                          }`}
                          data-testid={`time-slot-${slot}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-2 bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>✓ 100% ID Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>💳 Payment Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>💰 Money Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-900 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>📍 Background Checked</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-900 font-semibold mt-2 pt-2 border-t border-emerald-200">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>24/7 Support Available</span>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-xs font-bold text-yellow-900 mb-1">📋 Free Cancellation</p>
                    <p className="text-xs text-yellow-800">Cancel anytime before 2 hours of booking for full refund.</p>
                  </div>

                  {/* Booking Modal */}
                  <BookingModal
                    providerId={parseInt(provider.id)}
                    providerName={provider.name}
                    price={provider.price}
                    category={provider.category}
                  />

                  {/* Info Text */}
                  <p className="text-xs text-muted-foreground text-center">
                    Book now to confirm. You can cancel anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
