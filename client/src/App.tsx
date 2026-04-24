import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import MyBookings from "@/pages/MyBookings";
import ProfessionalSignup from "@/pages/ProfessionalSignup";
import ProfessionalLogin from "@/pages/ProfessionalLogin";
import ProfessionalDashboard from "@/pages/ProfessionalDashboard";
import ProfessionalServices from "@/pages/ProfessionalServices";
import ProfessionalBookings from "@/pages/ProfessionalBookings";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/my-bookings" component={MyBookings} />
      <Route path="/professional-signup" component={ProfessionalSignup} />
      <Route path="/professional-login" component={ProfessionalLogin} />
      <Route path="/professional-dashboard" component={ProfessionalDashboard} />
      <Route path="/professional-services" component={ProfessionalServices} />
      <Route path="/professional-bookings" component={ProfessionalBookings} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="fixcity-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
