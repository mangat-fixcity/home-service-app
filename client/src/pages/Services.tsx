import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProviderCard from "@/components/modules/ProviderCard";
import ServiceCategoryCard from "@/components/modules/ServiceCategoryCard";
import SmartSearch from "@/components/modules/SmartSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
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

export default function Services() {
  const [location, setLocation] = useLocation();
  
  // Get initial category from URL
  const getInitialCategory = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
  };
  
  // Get initial search from URL
  const getInitialSearch = (): string => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    return searchParam ? decodeURIComponent(searchParam) : "";
  };
  
  const [category, setCategory] = useState<string | null>(getInitialCategory());
  const [searchQuery, setSearchQuery] = useState(getInitialSearch());
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"rating" | "price" | "reviews">("rating");
  const [comparisonProvidersIds, setComparisonProvidersIds] = useState<string[]>([]);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(JSON.parse(localStorage.getItem("savedFavorites") || "[]"));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(JSON.parse(localStorage.getItem("recentlyViewed") || "[]"));

  // Update category/search when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("search");
    
    if (categoryParam) {
      setCategory(categoryParam);
      setSearchQuery(""); // Clear search query when category is set
    } else {
      setCategory(null);
    }
    
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location]);

  // Track recently viewed professionals
  const trackRecentlyViewed = (providerId: string) => {
    const updated = [providerId, ...recentlyViewed.filter(id => id !== providerId)].slice(0, 10);
    setRecentlyViewed(updated);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  const providers = [
    // Plumbing Services
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
      jobsCompleted: 1200,
      responseTime: "15 mins",
      certifications: ["Certified Plumber", "Background Verified", "10+ Years"]
    },
    {
      id: "6",
      name: "Quick Fix Plumbers",
      service: "Plumbing & Pipes",
      rating: 4.2,
      reviews: 30,
      price: 250,
      location: "Sector 18, Noida",
      image: plumbingImage,
      category: "plumbing",
      jobsCompleted: 450,
      responseTime: "25 mins",
      certifications: ["Licensed", "Quick Response", "2+ Years"]
    },
    {
      id: "7",
      name: "Master Plumbing",
      service: "Pipe Installation",
      rating: 4.6,
      reviews: 78,
      price: 350,
      location: "Vikas Nagar, Lucknow",
      image: plumbingImage,
      category: "plumbing",
      jobsCompleted: 850,
      responseTime: "20 mins",
      certifications: ["Expert Installer", "Warranty Offered", "5+ Years"]
    },

    // Cleaning Services
    {
      id: "2",
      name: "Sunita Sharma",
      service: "Deep Cleaning",
      rating: 4.9,
      reviews: 89,
      price: 499,
      location: "Indira Nagar, Lucknow",
      image: cleaningImage,
      category: "cleaning",
      jobsCompleted: 2100,
      responseTime: "10 mins",
      certifications: ["Deep Cleaning Expert", "Eco-Friendly", "8+ Years"]
    },
    {
      id: "8",
      name: "Sparkle Clean Team",
      service: "Home Cleaning",
      rating: 4.7,
      reviews: 156,
      price: 450,
      location: "Bani Park, Jaipur",
      image: cleaningImage,
      category: "cleaning",
      jobsCompleted: 1450,
      responseTime: "18 mins",
      certifications: ["Team Cleaning", "Quality Assured", "5+ Years"]
    },
    {
      id: "9",
      name: "Fresh Homes",
      service: "Residential Cleaning",
      rating: 4.5,
      reviews: 42,
      price: 399,
      location: "Thane, Mumbai",
      image: cleaningImage,
      category: "cleaning",
      jobsCompleted: 680,
      responseTime: "22 mins",
      certifications: ["Residential Specialist", "Quick Response", "3+ Years"]
    },

    // Women's Beauty & Salon Services
    {
      id: "3",
      name: "Classic Cuts Salon",
      service: "Women's Salon",
      rating: 4.7,
      reviews: 215,
      price: 199,
      location: "Main Market, Jaipur",
      image: womenBeautyImage,
      category: "beauty",
      jobsCompleted: 3200,
      responseTime: "12 mins",
      certifications: ["Professional Stylist", "Premium Products", "10+ Years"]
    },
    {
      id: "5",
      name: "Priya's Parlour",
      service: "Style & Makeup Studio",
      rating: 4.5,
      reviews: 45,
      price: 250,
      location: "New Town, Kolkata",
      image: womenBeautyImage,
      category: "beauty",
      jobsCompleted: 890,
      responseTime: "20 mins",
      certifications: ["Makeup Artist", "Certified", "4+ Years"]
    },
    {
      id: "10",
      name: "Hair & Beyond",
      service: "Women's Hair Studio",
      rating: 4.8,
      reviews: 189,
      price: 299,
      location: "Connaught Place, Delhi",
      image: womenBeautyImage,
      category: "beauty",
      jobsCompleted: 2750,
      responseTime: "15 mins",
      certifications: ["Hair Specialist", "Trending Styles", "7+ Years"]
    },

    // AC & Repair Services
    {
      id: "4",
      name: "Amit Electricals",
      service: "AC Repair",
      rating: 4.6,
      reviews: 156,
      price: 399,
      location: "Station Road, Bhopal",
      image: repairImage,
      category: "repair",
      jobsCompleted: 1890,
      responseTime: "20 mins",
      certifications: ["AC Expert", "Installation", "6+ Years"]
    },
    {
      id: "11",
      name: "Cool Air Services",
      service: "AC Installation",
      rating: 4.4,
      reviews: 67,
      price: 1299,
      location: "MG Road, Bangalore",
      image: repairImage,
      category: "repair",
      jobsCompleted: 560,
      responseTime: "30 mins",
      certifications: ["Installation Specialist", "Warranty", "3+ Years"]
    },
    {
      id: "12",
      name: "Electricians Plus",
      service: "Electrical Work",
      rating: 4.7,
      reviews: 203,
      price: 299,
      location: "Anna Nagar, Chennai",
      image: repairImage,
      category: "repair",
      jobsCompleted: 2450,
      responseTime: "18 mins",
      certifications: ["Licensed Electrician", "Safety Certified", "7+ Years"]
    },

    // Painting Services
    {
      id: "13",
      name: "Color Dreams",
      service: "Interior Painting",
      rating: 4.6,
      reviews: 94,
      price: 2999,
      location: "Kala Ghoda, Mumbai",
      image: paintingImage,
      category: "painting",
      jobsCompleted: 560,
      responseTime: "2 days",
      certifications: ["Interior Design", "Professional Painter", "6+ Years"]
    },
    {
      id: "14",
      name: "Pro Painters",
      service: "Wall Painting",
      rating: 4.5,
      reviews: 72,
      price: 2499,
      location: "Whitefield, Bangalore",
      image: paintingImage,
      category: "painting",
      jobsCompleted: 430,
      responseTime: "2 days",
      certifications: ["Wall Specialist", "Quality", "4+ Years"]
    },
    {
      id: "15",
      name: "Paint Masters",
      service: "Exterior Painting",
      rating: 4.7,
      reviews: 108,
      price: 3499,
      location: "Sector 7, Chandigarh",
      image: paintingImage,
      category: "painting",
      jobsCompleted: 680,
      responseTime: "1 day",
      certifications: ["Exterior Expert", "Weather Resistant", "8+ Years"]
    },

    // Carpentry Services
    {
      id: "16",
      name: "Woodcraft Studio",
      service: "Furniture Making",
      rating: 4.8,
      reviews: 135,
      price: 5999,
      location: "BTM Layout, Bangalore",
      image: carpentryImage,
      category: "carpentry",
      jobsCompleted: 890,
      responseTime: "3 days",
      certifications: ["Furniture Expert", "Custom Design", "9+ Years"]
    },
    {
      id: "17",
      name: "Expert Carpenters",
      service: "Modular Furniture",
      rating: 4.6,
      reviews: 89,
      price: 4999,
      location: "Malviya Nagar, Delhi",
      image: carpentryImage,
      category: "carpentry",
      jobsCompleted: 645,
      responseTime: "2 days",
      certifications: ["Modular Design", "Installation", "5+ Years"]
    },
    {
      id: "18",
      name: "Timber Solutions",
      service: "Cabinet Installation",
      rating: 4.5,
      reviews: 56,
      price: 3999,
      location: "Indiranagar, Bangalore",
      image: carpentryImage,
      category: "carpentry",
      jobsCompleted: 420,
      responseTime: "2 days",
      certifications: ["Cabinet Specialist", "Quality", "4+ Years"]
    },

    // Men's Salon Services
    {
      id: "22",
      name: "Men's Style Studio",
      service: "Salon for men",
      rating: 4.8,
      reviews: 198,
      price: 179,
      location: "Sector 5, Noida",
      image: beautyImage,
      category: "men-salon",
      jobsCompleted: 2890,
      responseTime: "15 mins",
      certifications: ["Men's Expert", "Trendy", "6+ Years"]
    },
    {
      id: "23",
      name: "Relax Spa & Massage",
      service: "Men's Massage",
      rating: 4.7,
      reviews: 234,
      price: 399,
      location: "Lakewood, Hyderabad",
      image: beautyImage,
      category: "men-salon",
      jobsCompleted: 1340,
      responseTime: "20 mins",
      certifications: ["Massage Therapy", "Certified", "5+ Years"]
    },

    // Pest Control Services
    {
      id: "24",
      name: "Elite Pest Control",
      service: "Professional Pest Control",
      rating: 4.8,
      reviews: 167,
      price: 399,
      location: "Sector 10, Pune",
      image: pestImage,
      category: "pest-control",
      jobsCompleted: 1780,
      responseTime: "Same Day",
      certifications: ["Certified Expert", "Safe Chemical", "7+ Years"]
    },
    {
      id: "25",
      name: "SafeZone Pest Services",
      service: "Termite & Insect Control",
      rating: 4.6,
      reviews: 94,
      price: 349,
      location: "Whitefield, Bangalore",
      image: pestImage,
      category: "pest-control",
      jobsCompleted: 980,
      responseTime: "Next Day",
      certifications: ["Termite Specialist", "Eco-Friendly", "4+ Years"]
    },
    {
      id: "26",
      name: "Guardian Pest Management",
      service: "Monthly Pest Control",
      rating: 4.7,
      reviews: 142,
      price: 299,
      location: "Hitech City, Hyderabad",
      image: pestImage,
      category: "pest-control",
      jobsCompleted: 1230,
      responseTime: "Same Day",
      certifications: ["Pest Expert", "Monthly Plans", "5+ Years"]
    },

    // Appliance Repair Services
    {
      id: "27",
      name: "QuickFix Appliances",
      service: "Washing Machine Repair",
      rating: 4.8,
      reviews: 201,
      price: 349,
      location: "Bani Park, Jaipur",
      image: applianceImage,
      category: "appliance-repair",
      jobsCompleted: 1340,
      responseTime: "2 hours",
      certifications: ["Appliance Expert", "Fast Service", "5+ Years"]
    },
    {
      id: "28",
      name: "ProRepair Services",
      service: "Refrigerator & AC Repair",
      rating: 4.5,
      reviews: 78,
      price: 449,
      location: "Sector 5, Chandigarh",
      image: applianceImage,
      category: "appliance-repair",
      jobsCompleted: 680,
      responseTime: "3 hours",
      certifications: ["Repair Specialist", "Warranty", "3+ Years"]
    },
    {
      id: "29",
      name: "Expert Appliance Care",
      service: "Water Purifier & Geyser",
      rating: 4.6,
      reviews: 123,
      price: 399,
      location: "Indiranagar, Bangalore",
      image: applianceImage,
      category: "appliance-repair",
      jobsCompleted: 950,
      responseTime: "2 hours",
      certifications: ["Care Specialist", "Installation", "4+ Years"]
    },

    // Electrician Services
    {
      id: "30",
      name: "Volt Electric Solutions",
      service: "Electrical Installation",
      rating: 4.7,
      reviews: 156,
      price: 349,
      location: "Laxmi Nagar, Delhi",
      image: electricianImage,
      category: "electrician",
      jobsCompleted: 1670,
      responseTime: "1 hour",
      certifications: ["Licensed", "Safety First", "6+ Years"]
    },
    {
      id: "31",
      name: "SafeWire Electricians",
      service: "House Wiring",
      rating: 4.8,
      reviews: 189,
      price: 299,
      location: "Powai, Mumbai",
      image: electricianImage,
      category: "electrician",
      jobsCompleted: 2100,
      responseTime: "45 mins",
      certifications: ["Wiring Expert", "Safe Code", "7+ Years"]
    },
    {
      id: "32",
      name: "Current Electrical Services",
      service: "Panel & Switch Installation",
      rating: 4.6,
      reviews: 112,
      price: 399,
      location: "JP Nagar, Bangalore",
      image: electricianImage,
      category: "electrician",
      jobsCompleted: 1340,
      responseTime: "1 hour",
      certifications: ["Panel Expert", "Safe", "5+ Years"]
    },

    // Laundry & Ironing Services
    {
      id: "33",
      name: "FreshPress Laundry",
      service: "Laundry & Ironing",
      rating: 4.7,
      reviews: 234,
      price: 199,
      location: "Sector 18, Noida",
      image: laundryImage,
      category: "laundry",
      jobsCompleted: 3450,
      responseTime: "24 hours",
      certifications: ["Laundry Expert", "Stain Removal", "8+ Years"]
    },
    {
      id: "34",
      name: "SpotClean Laundry",
      service: "Dry Cleaning & Ironing",
      rating: 4.6,
      reviews: 167,
      price: 249,
      location: "Koramangala, Bangalore",
      image: laundryImage,
      category: "laundry",
      jobsCompleted: 2340,
      responseTime: "24 hours",
      certifications: ["Dry Clean", "Express", "5+ Years"]
    },

    // Packers & Movers Services
    {
      id: "35",
      name: "Swift Movers",
      service: "House Relocation",
      rating: 4.8,
      reviews: 289,
      price: 3999,
      location: "Whitefield, Bangalore",
      image: moversImage,
      category: "movers",
      jobsCompleted: 890,
      responseTime: "1 day",
      certifications: ["Move Expert", "Safe Packing", "8+ Years"]
    },
    {
      id: "36",
      name: "QuickShift Packers",
      service: "Packing & Moving",
      rating: 4.7,
      reviews: 156,
      price: 4499,
      location: "Sector 7, Chandigarh",
      image: moversImage,
      category: "movers",
      jobsCompleted: 670,
      responseTime: "1 day",
      certifications: ["Pack Expert", "Insurance", "5+ Years"]
    },

    // Sofa & Carpet Cleaning Services
    {
      id: "37",
      name: "SpotlessClean Carpets",
      service: "Carpet & Upholstery Cleaning",
      rating: 4.8,
      reviews: 178,
      price: 599,
      location: "Anna Nagar, Chennai",
      image: carpetImage,
      category: "carpet-cleaning",
      jobsCompleted: 1230,
      responseTime: "1 day",
      certifications: ["Carpet Expert", "Eco-Friendly", "6+ Years"]
    },
    {
      id: "38",
      name: "FreshFabric Services",
      service: "Sofa & Rug Cleaning",
      rating: 4.7,
      reviews: 145,
      price: 649,
      location: "Bani Park, Jaipur",
      image: carpetImage,
      category: "carpet-cleaning",
      jobsCompleted: 980,
      responseTime: "1 day",
      certifications: ["Sofa Expert", "Stain Removal", "5+ Years"]
    },

    // Photography Services
    {
      id: "39",
      name: "Moments Captured Photography",
      service: "Portrait & Event Photography",
      rating: 4.9,
      reviews: 234,
      price: 2999,
      location: "Connaught Place, Delhi",
      image: photographyImage,
      category: "photography",
      jobsCompleted: 680,
      responseTime: "2 hours",
      certifications: ["Professional", "Event Pro", "8+ Years"]
    },
    {
      id: "40",
      name: "Frame Perfect Studios",
      service: "Professional Photo Sessions",
      rating: 4.8,
      reviews: 189,
      price: 2499,
      location: "Koramangala, Bangalore",
      image: photographyImage,
      category: "photography",
      jobsCompleted: 560,
      responseTime: "2 hours",
      certifications: ["Studio Pro", "Editing", "6+ Years"]
    },

    // Car Wash & Detailing Services
    {
      id: "41",
      name: "Shine Auto Detailing",
      service: "Professional Car Wash",
      rating: 4.7,
      reviews: 145,
      price: 499,
      location: "Sector 7, Bangalore",
      image: carWashImage,
      category: "car-wash",
      jobsCompleted: 2340,
      responseTime: "2 hours",
      certifications: ["Car Expert", "Quality", "6+ Years"]
    },
    {
      id: "42",
      name: "Express Car Care",
      service: "Interior & Exterior Detailing",
      rating: 4.6,
      reviews: 98,
      price: 799,
      location: "Salt Lake, Kolkata",
      image: carWashImage,
      category: "car-wash",
      jobsCompleted: 1120,
      responseTime: "2 hours",
      certifications: ["Detail Expert", "Polish", "4+ Years"]
    },

    // Pet Grooming & Care Services
    {
      id: "43",
      name: "Paws & Fur Grooming",
      service: "Dog Grooming & Bathing",
      rating: 4.9,
      reviews: 167,
      price: 699,
      location: "Indira Nagar, Bangalore",
      image: petImage,
      category: "pet-care",
      jobsCompleted: 1450,
      responseTime: "24 hours",
      certifications: ["Grooming Expert", "Pet Lover", "6+ Years"]
    },
    {
      id: "44",
      name: "Happy Paws Studio",
      service: "Pet Grooming & Care",
      rating: 4.7,
      reviews: 124,
      price: 599,
      location: "Sector 18, Noida",
      image: petImage,
      category: "pet-care",
      jobsCompleted: 890,
      responseTime: "24 hours",
      certifications: ["Pet Care", "Gentle", "4+ Years"]
    },

    // Handyman Services
    {
      id: "45",
      name: "All Fix Handyman",
      service: "General Home Repairs",
      rating: 4.8,
      reviews: 189,
      price: 399,
      location: "Whitefield, Bangalore",
      image: handymanImage,
      category: "handyman",
      jobsCompleted: 2100,
      responseTime: "2 hours",
      certifications: ["Fix Expert", "Multiple Skills", "7+ Years"]
    },
    {
      id: "46",
      name: "Expert Handyman Services",
      service: "Furniture Assembly & Repairs",
      rating: 4.6,
      reviews: 112,
      price: 349,
      location: "Civil Lines, Nagpur",
      image: handymanImage,
      category: "handyman",
      jobsCompleted: 1340,
      responseTime: "2 hours",
      certifications: ["Assembly Pro", "Furniture", "5+ Years"]
    },

    // Yoga & Fitness Services
    {
      id: "47",
      name: "Home Yoga Studio",
      service: "Personalized Yoga Sessions",
      rating: 4.9,
      reviews: 234,
      price: 599,
      location: "Jubilee Hills, Hyderabad",
      image: fitnessImage,
      category: "fitness",
      jobsCompleted: 1670,
      responseTime: "Online",
      certifications: ["Yoga Teacher", "Certified", "6+ Years"]
    },
    {
      id: "48",
      name: "Fit Home Training",
      service: "Personal Fitness Coaching",
      rating: 4.7,
      reviews: 167,
      price: 699,
      location: "Sector 7, Chandigarh",
      image: fitnessImage,
      category: "fitness",
      jobsCompleted: 1230,
      responseTime: "Online",
      certifications: ["Fitness Coach", "Certified", "5+ Years"]
    },

    // Tutoring & Coaching Services
    {
      id: "49",
      name: "Scholar Tutoring",
      service: "Mathematics & Science Coaching",
      rating: 4.8,
      reviews: 156,
      price: 499,
      location: "Bani Park, Jaipur",
      image: tutoringImage,
      category: "tutoring",
      jobsCompleted: 1340,
      responseTime: "Online",
      certifications: ["Tutor Expert", "Subject Master", "6+ Years"]
    },
    {
      id: "50",
      name: "Expert Coaching Classes",
      service: "Academic Tutoring",
      rating: 4.7,
      reviews: 134,
      price: 449,
      location: "BTM Layout, Bangalore",
      image: tutoringImage,
      category: "tutoring",
      jobsCompleted: 1120,
      responseTime: "Online",
      certifications: ["Coach Expert", "Certified", "5+ Years"]
    },

    // Massage & Spa Services
    {
      id: "51",
      name: "Serenity Spa & Massage",
      service: "Full Body Massage",
      rating: 4.9,
      reviews: 212,
      price: 899,
      location: "New Town, Kolkata",
      image: massageImage,
      category: "massage",
      jobsCompleted: 1560,
      responseTime: "1 hour",
      certifications: ["Massage Expert", "Therapy", "7+ Years"]
    },
    {
      id: "52",
      name: "Wellness Massage Studio",
      service: "Relaxation & Therapy",
      rating: 4.8,
      reviews: 178,
      price: 799,
      location: "Koramangala, Bangalore",
      image: massageImage,
      category: "massage",
      jobsCompleted: 1340,
      responseTime: "1 hour",
      certifications: ["Wellness Expert", "Spa", "6+ Years"]
    },

    // Chef & Cooking Services
    {
      id: "53",
      name: "Home Chef Delights",
      service: "Private Chef Services",
      rating: 4.8,
      reviews: 145,
      price: 2499,
      location: "Sector 10, Pune",
      image: chefImage,
      category: "chef",
      jobsCompleted: 560,
      responseTime: "1 day",
      certifications: ["Chef Expert", "Culinary", "6+ Years"]
    },
    {
      id: "54",
      name: "Culinary Experience",
      service: "Meal Preparation & Cooking",
      rating: 4.7,
      reviews: 112,
      price: 1999,
      location: "Whitefield, Bangalore",
      image: chefImage,
      category: "chef",
      jobsCompleted: 450,
      responseTime: "1 day",
      certifications: ["Cook Expert", "Hygiene", "4+ Years"]
    },

    // Gardening & Landscaping Services
    {
      id: "55",
      name: "Green Gardens Landscaping",
      service: "Garden Maintenance & Design",
      rating: 4.7,
      reviews: 134,
      price: 799,
      location: "Sector 7, Chandigarh",
      image: gardenImage,
      category: "gardening",
      jobsCompleted: 780,
      responseTime: "1 day",
      certifications: ["Garden Expert", "Landscape", "6+ Years"]
    },
    {
      id: "56",
      name: "Bloom Garden Services",
      service: "Lawn & Plant Care",
      rating: 4.6,
      reviews: 98,
      price: 699,
      location: "MG Road, Bangalore",
      image: gardenImage,
      category: "gardening",
      jobsCompleted: 620,
      responseTime: "1 day",
      certifications: ["Lawn Expert", "Plant Care", "4+ Years"]
    },

    // Babysitting & Childcare Services
    {
      id: "57",
      name: "Trusted Childcare",
      service: "Professional Babysitting",
      rating: 4.9,
      reviews: 189,
      price: 599,
      location: "Sector 5, Noida",
      image: babysitterImage,
      category: "babysitting",
      jobsCompleted: 1340,
      responseTime: "30 mins",
      certifications: ["Child Expert", "CPR Trained", "6+ Years"]
    },
    {
      id: "58",
      name: "Safe & Happy Kids",
      service: "Child Care & Supervision",
      rating: 4.8,
      reviews: 156,
      price: 549,
      location: "Thane, Mumbai",
      image: babysitterImage,
      category: "babysitting",
      jobsCompleted: 1120,
      responseTime: "30 mins",
      certifications: ["Care Expert", "Safe", "5+ Years"]
    },

    // Mobile & Computer Repair Services
    {
      id: "59",
      name: "Tech Fix Solutions",
      service: "Mobile & Laptop Repair",
      rating: 4.8,
      reviews: 178,
      price: 399,
      location: "Laxmi Nagar, Delhi",
      image: techImage,
      category: "tech-repair",
      jobsCompleted: 1560,
      responseTime: "2 hours",
      certifications: ["Tech Expert", "Certified", "6+ Years"]
    },
    {
      id: "60",
      name: "Pro Tech Repair",
      service: "Computer & Phone Service",
      rating: 4.7,
      reviews: 145,
      price: 349,
      location: "Sector 31, Gurgaon",
      image: techImage,
      category: "tech-repair",
      jobsCompleted: 1230,
      responseTime: "2 hours",
      certifications: ["Phone Expert", "Warranty", "5+ Years"]
    }
  ];

  const filteredProviders = (category 
    ? providers.filter(p => p.category === category)
    : providers)
    .filter(p => {
      // Search filter - by name, service, or location
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        p.name.toLowerCase().includes(searchLower) ||
        p.service.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower);
      
      // Price filter
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      
      // Rating filter
      const matchesRating = p.rating >= minRating;
      
      return matchesSearch && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      // Sorting logic
      if (sortBy === "rating") {
        return b.rating - a.rating; // Highest rating first
      } else if (sortBy === "price") {
        return a.price - b.price; // Lowest price first
      } else {
        return b.reviews - a.reviews; // Most reviews first
      }
    });

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
    : "All Services";

  const categoryEmojis: { [key: string]: string } = {
    plumbing: "🔧",
    cleaning: "🧹",
    beauty: "💅",
    repair: "⚡",
    painting: "🎨",
    carpentry: "🪵",
    "men-salon": "💈",
    "pest-control": "🐛",
    "appliance-repair": "🔩",
    electrician: "⚙️",
    laundry: "👔",
    movers: "📦",
    "carpet-cleaning": "🧺",
    photography: "📷",
    "car-wash": "🚗",
    "pet-care": "🐾",
    handyman: "🔨",
    fitness: "🧘",
    tutoring: "📚",
    massage: "💆",
    chef: "👨‍🍳",
    gardening: "🌿",
    babysitting: "👶",
    "tech-repair": "💻"
  };

  // Toggle comparison for providers
  const toggleComparison = (id: string) => {
    if (comparisonProvidersIds.includes(id)) {
      setComparisonProvidersIds(comparisonProvidersIds.filter(cid => cid !== id));
    } else if (comparisonProvidersIds.length < 3) {
      setComparisonProvidersIds([...comparisonProvidersIds, id]);
    }
  };

  // If no category selected, show categories grid (category-first exploration)
  if (!category) {
    return (
      <div key="categories" className="min-h-screen bg-background font-sans">
        <Navbar />
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 border-b-2 border-primary/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-black mb-4">🏠 Explore Services</h1>
            <p className="text-muted-foreground max-w-2xl mb-6">Browse 24+ service categories and find verified professionals ready to help. Click any category to see available professionals.</p>
            
            {/* Smart Search Bar */}
            <div className="max-w-2xl mb-6">
              <SmartSearch placeholder="Search 'plumber', 'cleaning', 'electrician'..." showSearchHistory={true} />
            </div>
            
            {/* Trending Badge */}
            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              🔥 Most Popular This Week: Cleaning (89 bookings), Plumbing (67 bookings), Beauty (120 bookings)
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <ServiceCategoryCard title="Home Cleaning" image={categoryCleaningImage} count={120} slug="cleaning" delay={0} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Plumbing" image={categoryPlumbingImage} count={85} slug="plumbing" delay={1} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Women's Beauty" image={categoryBeautyImage} count={200} slug="beauty" delay={2} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="AC & Repair" image={categoryRepairImage} count={95} slug="repair" delay={3} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Painting" image={categoryPaintingImage} count={75} slug="painting" delay={4} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Carpentry" image={categoryCarpentryImage} count={60} slug="carpentry" delay={5} onSelect={setCategory} />
            <ServiceCategoryCard title="Men's Salon" image={categorySalonImage} count={200} slug="men-salon" delay={6} onSelect={setCategory} />
            <ServiceCategoryCard title="Pest Control" image={categoryPestImage} count={150} slug="pest-control" delay={7} onSelect={setCategory} />
            <ServiceCategoryCard title="Appliance Repair" image={repairImage} count={120} slug="appliance-repair" delay={8} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Electricians" image={electricianImage} count={110} slug="electrician" delay={9} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Laundry & Ironing" image={categoryLaundryImage} count={85} slug="laundry" delay={10} onSelect={setCategory} />
            <ServiceCategoryCard title="Packers & Movers" image={categoryMoversImage} count={140} slug="movers" delay={11} onSelect={setCategory} />
            <ServiceCategoryCard title="Carpet Cleaning" image={carpetImage} count={95} slug="carpet-cleaning" delay={12} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Photography" image={photographyImage} count={110} slug="photography" delay={13} onSelect={setCategory} />
            <ServiceCategoryCard title="Car Wash" image={carWashImage} count={80} slug="car-wash" delay={14} onSelect={setCategory} />
            <ServiceCategoryCard title="Pet Grooming" image={petImage} count={90} slug="pet-care" delay={15} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Handyman" image={handymanImage} count={105} slug="handyman" delay={16} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Yoga & Fitness" image={categoryFitnessImage} count={125} slug="fitness" delay={17} onSelect={setCategory} badgePosition="right" />
            <ServiceCategoryCard title="Tutoring" image={categoryTutoringImage} count={70} slug="tutoring" delay={18} onSelect={setCategory} />
            <ServiceCategoryCard title="Massage & Spa" image={massageImage} count={115} slug="massage" delay={19} onSelect={setCategory} />
            <ServiceCategoryCard title="Chef Services" image={chefImage} count={60} slug="chef" delay={20} onSelect={setCategory} />
            <ServiceCategoryCard title="Gardening" image={gardenImage} count={75} slug="gardening" delay={21} onSelect={setCategory} />
            <ServiceCategoryCard title="Babysitting" image={babysitterImage} count={100} slug="babysitting" delay={22} onSelect={setCategory} />
            <ServiceCategoryCard title="Tech Repair" image={techImage} count={95} slug="tech-repair" delay={23} onSelect={setCategory} />
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // If category is selected, show professionals for that category
  return (
    <div key={`category-${category}`} className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Sticky Category Carousel */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-primary/20 shadow-md backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollBehavior: "smooth" }}>
            <button
              onClick={() => setCategory(null)}
              className="flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm bg-white border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all whitespace-nowrap"
              data-testid="category-all"
            >
              ← Back
            </button>
            {[
              { slug: "cleaning", title: "🧹 Cleaning" },
              { slug: "plumbing", title: "🔧 Plumbing" },
              { slug: "beauty", title: "💅 Beauty" },
              { slug: "repair", title: "⚡ AC Repair" },
              { slug: "painting", title: "🎨 Painting" },
              { slug: "carpentry", title: "🪵 Carpentry" },
              { slug: "men-salon", title: "💈 Salon" },
              { slug: "pest-control", title: "🐛 Pest" },
              { slug: "appliance-repair", title: "🔩 Appliance" },
              { slug: "electrician", title: "⚙️ Electric" },
              { slug: "laundry", title: "👔 Laundry" },
              { slug: "movers", title: "📦 Movers" },
              { slug: "carpet-cleaning", title: "🧺 Carpet" },
              { slug: "photography", title: "📷 Photo" },
              { slug: "car-wash", title: "🚗 Car Wash" },
              { slug: "pet-care", title: "🐾 Pet Care" },
              { slug: "handyman", title: "🔨 Handyman" },
              { slug: "fitness", title: "🧘 Fitness" },
              { slug: "tutoring", title: "📚 Tutoring" },
              { slug: "massage", title: "💆 Massage" },
              { slug: "chef", title: "👨‍🍳 Chef" },
              { slug: "gardening", title: "🌿 Garden" },
              { slug: "babysitting", title: "👶 Babysit" },
              { slug: "tech-repair", title: "💻 Tech" }
            ].map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategory(cat.slug)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  category === cat.slug
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg border-2 border-primary"
                    : "bg-white/80 text-foreground border-2 border-primary/20 hover:border-primary/50 hover:bg-white"
                }`}
                data-testid={`category-chip-${cat.slug}`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 border-b-2 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{categoryEmojis[category as string] || "🏠"}</span>
            <div>
              <h1 className="text-4xl font-black">{categoryTitle}</h1>
              <p className="text-sm text-muted-foreground font-medium">
                {filteredProviders.length} verified professional{filteredProviders.length !== 1 ? 's' : ''} ready to help
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search by name, service, or location..." 
              className="pl-12 bg-white border-2 border-primary/20 focus:border-primary rounded-lg h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="services-search"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sort Dropdown */}
            <div>
              <label className="text-sm font-bold text-foreground block mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "price" | "reviews")}
                className="w-full px-4 py-2.5 border-2 border-primary/20 rounded-lg bg-white focus:border-primary focus:outline-none font-medium"
                data-testid="sort-select"
              >
                <option value="rating">⭐ Best Rating</option>
                <option value="price">💰 Lowest Price</option>
                <option value="reviews">👥 Most Reviews</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-bold text-foreground block mb-2">Max Price: ₹{maxPrice}</label>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full"
                data-testid="price-range-slider"
              />
              <p className="text-xs text-muted-foreground mt-1">₹0 - ₹{maxPrice}</p>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-sm font-bold text-foreground block mb-2">Min Rating: {minRating.toFixed(1)}⭐</label>
              <select 
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border-2 border-primary/20 rounded-lg bg-white focus:border-primary focus:outline-none font-medium"
                data-testid="rating-select"
              >
                <option value="0">All Ratings</option>
                <option value="3">3.0⭐ & Up</option>
                <option value="3.5">3.5⭐ & Up</option>
                <option value="4">4.0⭐ & Up</option>
                <option value="4.5">4.5⭐ & Up</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setMinPrice(0);
                  setMaxPrice(1000);
                  setMinRating(0);
                  setSortBy("rating");
                }}
                className="w-full px-4 py-2.5 border-2 border-muted-foreground/20 rounded-lg bg-muted/50 hover:bg-muted font-semibold text-foreground transition-colors"
                data-testid="clear-filters"
              >
                🔄 Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {filteredProviders.length > 0 ? (
          <>
            {/* City-Specific Trending */}
            <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-900">
                <strong>🔥 Hot in {category?.charAt(0).toUpperCase() + category?.slice(1).replace("-", " ")} This Week:</strong> {Math.floor(Math.random() * 50) + 40}+ bookings | Avg 4.7⭐ rating | Response time: 20 mins avg
              </p>
            </div>

            {/* Recently Viewed Professionals */}
            {recentlyViewed.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">👀 Recently Viewed</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {recentlyViewed.slice(0, 5).map((viewedId) => {
                    const viewedPro = providers.find(p => p.id === viewedId && p.category === category);
                    return viewedPro ? (
                      <button
                        key={viewedId}
                        onClick={() => trackRecentlyViewed(viewedId)}
                        className="flex-shrink-0 px-4 py-2 bg-white border-2 border-primary/30 rounded-lg font-medium text-sm hover:border-primary transition-all hover:bg-primary/5"
                      >
                        {viewedPro.name.split(" ")[0]}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Info Tip */}
            <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> All professionals are verified & background checked. Check ratings and reviews before booking.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProviders.map((provider) => (
                <ProviderCard 
                  key={provider.id} 
                  id={provider.id}
                  name={provider.name}
                  service={provider.service}
                  rating={provider.rating}
                  reviews={provider.reviews}
                  price={provider.price}
                  location={provider.location}
                  image={provider.image}
                  category={provider.category}
                  jobsCompleted={provider.jobsCompleted}
                  responseTime={provider.responseTime}
                  certifications={provider.certifications}
                  completionRate={92 + Math.floor(Math.random() * 8)}
                  isActive={Math.random() > 0.3}
                  onCompare={() => toggleComparison(provider.id)}
                  isCompared={comparisonProvidersIds.includes(provider.id)}
                  onSaveFavorite={(id: string) => {
                    const newFavorites = savedFavorites.includes(id)
                      ? savedFavorites.filter(fid => fid !== id)
                      : [...savedFavorites, id];
                    setSavedFavorites(newFavorites);
                    localStorage.setItem("savedFavorites", JSON.stringify(newFavorites));
                    trackRecentlyViewed(id);
                  }}
                  isFavorite={savedFavorites.includes(provider.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No providers found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">We're still adding more professionals in this area. Please check back soon or browse other categories.</p>
            <Button onClick={() => window.location.href = "/services"} size="lg">
              Browse All Services
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
