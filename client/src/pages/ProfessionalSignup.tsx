import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function ProfessionalSignup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    experience: "",
    documents: "",
    password: "",
    confirmPassword: ""
  });

  const categories = [
    "Home Cleaning",
    "Plumbing",
    "Women's Beauty & Salon",
    "Men's Salon",
    "AC & Repair",
    "Painting",
    "Carpentry",
    "Pest Control",
    "Appliance Repair",
    "Electricians",
    "Laundry & Ironing",
    "Packers & Movers",
    "Carpet Cleaning",
    "Photography",
    "Car Wash & Detailing",
    "Pet Grooming & Care",
    "Handyman Services",
    "Yoga & Fitness",
    "Tutoring & Coaching",
    "Massage & Spa",
    "Chef & Cooking",
    "Gardening & Landscaping",
    "Babysitting & Childcare",
    "Mobile & Computer Repair"
  ];

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.category || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const professional = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString()
    };

    const existingProfessionals = JSON.parse(localStorage.getItem("professionals") || "[]");
    existingProfessionals.push(professional);
    localStorage.setItem("professionals", JSON.stringify(existingProfessionals));

    localStorage.setItem("professionalLoggedIn", "true");
    localStorage.setItem("currentProfessional", professional.id);
    localStorage.setItem("currentProfessionalName", formData.name);

    alert("Registration successful! Your profile is pending admin approval.");
    setLocation("/professional-dashboard");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold">Join as a Professional</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Join Fixcity?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">📈 Grow Your Business</h4>
                  <p className="text-sm text-muted-foreground">Access to thousands of customers looking for your services</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Earn More</h4>
                  <p className="text-sm text-muted-foreground">Flexible pricing, instant payments, no hidden charges</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🛡️ Trusted Platform</h4>
                  <p className="text-sm text-muted-foreground">Verified customers, secure payments, professional support</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Fill in your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Service Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-category"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience (Years)</label>
                  <input
                    type="text"
                    placeholder="e.g., 5+ years"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-experience"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button type="submit" className="w-full" data-testid="button-signup">Sign Up</Button>
              </form>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                Already registered? <button onClick={() => setLocation("/professional-login")} className="text-primary font-semibold">Login here</button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
