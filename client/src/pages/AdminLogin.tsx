import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminId", data.admin.id);
      localStorage.setItem("adminUsername", data.admin.username);
      
      toast.success("Admin login successful!");
      setLocation("/admin-dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
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
        <CardHeader className="text-center bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl font-black shadow-lg">
              🔐
            </div>
          </div>
          <CardTitle className="text-3xl font-black text-white">Admin Portal</CardTitle>
          <CardDescription className="text-orange-100">Fixcity Administration</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          <div>
            <Label htmlFor="username" className="flex items-center gap-2 mb-2 font-semibold">
              <Lock className="w-4 h-4" /> Username
            </Label>
            <Input 
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              disabled={isLoading}
              data-testid="input-admin-username"
              className="border-2"
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2 font-semibold">
              <Lock className="w-4 h-4" /> Password
            </Label>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              data-testid="input-admin-password"
              className="border-2"
            />
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 font-bold py-6 text-lg"
            data-testid="button-admin-login"
          >
            {isLoading ? "Logging in..." : "Admin Login"}
          </Button>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-800 font-semibold">📌 Demo Credentials:</p>
            <p className="text-xs text-orange-700 mt-1">Username: <span className="font-mono font-bold">mangat.kuttys</span></p>
            <p className="text-xs text-orange-700">Password: <span className="font-mono font-bold">Mangatram@1979</span></p>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            <button 
              onClick={() => setLocation("/")}
              className="text-primary hover:underline font-medium"
              data-testid="link-home"
            >
              Back to Home
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
