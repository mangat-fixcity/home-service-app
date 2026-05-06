import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("priya.sharma@gmail.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getReturnUrl = () => {
    // Get query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo");
    return returnTo || "/";
  };

  const handleGoogleLogin = (emailVal: string) => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", "customer");
      localStorage.setItem("userEmail", emailVal);
      localStorage.setItem("loginMethod", "google");
      setIsLoading(false);
      setLocation(getReturnUrl());
    }, 600);
  };

  const handleEmailLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", "customer");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loginMethod", "email");
      setIsLoading(false);
      setLocation(getReturnUrl());
    }, 600);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>
      </div>

      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg">
              FX
            </div>
          </div>
          <CardTitle className="text-3xl font-black">Fixcity</CardTitle>
          <CardDescription>Sign in as a Customer</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google Sign In */}
          <button
            onClick={() => handleGoogleLogin("priya.sharma@gmail.com")}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
            data-testid="button-google-login"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white text-muted-foreground">Or with email</span>
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> Email Address
            </Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" /> Password
            </Label>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              data-testid="input-password"
            />
          </div>

          <Button 
            onClick={handleEmailLogin} 
            disabled={isLoading}
            className="w-full"
            data-testid="button-email-login"
          >
            Sign In
          </Button>

          {/* Professional Portal Link */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">👷 Are you a Professional?</p>
            <p className="text-xs text-blue-800 mb-3">Use the dedicated professional portal to manage your business and bookings.</p>
            <button
              onClick={() => setLocation("/professional-login")}
              className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-md transition-all shadow-md"
              data-testid="button-professional-portal"
            >
              Professional Login
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            <button 
              onClick={() => setLocation("/")}
              className="text-primary hover:underline font-medium"
              data-testid="link-home"
            >
              Continue as Guest
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
