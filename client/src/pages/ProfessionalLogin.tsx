import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function ProfessionalLogin() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const demoCredentials = [
    { email: "rajesh@plumbing.com", password: "password123" },
    { email: "sunita@cleaning.com", password: "password123" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const professionals = JSON.parse(localStorage.getItem("professionals") || "[]");
    const professional = professionals.find(
      (p: any) => p.email === formData.email && p.password === formData.password
    );

    if (professional) {
      localStorage.setItem("professionalLoggedIn", "true");
      localStorage.setItem("currentProfessional", professional.id);
      localStorage.setItem("currentProfessionalName", professional.name);
      setLocation("/professional-dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleDemoLogin = (email: string) => {
    const professionals = JSON.parse(localStorage.getItem("professionals") || "[]");
    let professional = professionals.find((p: any) => p.email === email);

    if (!professional) {
      professional = {
        id: Date.now().toString(),
        name: email === "rajesh@plumbing.com" ? "Rajesh Kumar" : "Sunita Sharma",
        email,
        phone: "+91 98765 43210",
        category: email === "rajesh@plumbing.com" ? "Plumbing" : "Cleaning",
        experience: "5 years",
        status: "approved",
        rating: 4.8,
        reviews: 124,
        password: "password123"
      };
      professionals.push(professional);
      localStorage.setItem("professionals", JSON.stringify(professionals));
    }

    localStorage.setItem("professionalLoggedIn", "true");
    localStorage.setItem("currentProfessional", professional.id);
    localStorage.setItem("currentProfessionalName", professional.name);
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
          <h1 className="text-3xl font-bold">Professional Login</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Professional Login</CardTitle>
              <CardDescription>Login to your professional account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Demo Credentials */}
              <div>
                <p className="text-sm font-medium mb-3">Try Demo Credentials:</p>
                <div className="space-y-2">
                  {demoCredentials.map((cred) => (
                    <Button
                      key={cred.email}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => handleDemoLogin(cred.email)}
                      data-testid={`button-demo-${cred.email.split("@")[0]}`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium">{cred.email}</p>
                        <p className="text-xs text-muted-foreground">Password: {cred.password}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or login with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-password"
                  />
                </div>

                <Button type="submit" className="w-full" data-testid="button-login">
                  Login
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setLocation("/professional-signup")}
                  className="text-primary hover:underline font-medium"
                  data-testid="link-signup"
                >
                  Sign up here
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
