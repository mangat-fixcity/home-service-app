import { useState } from "react";
import { X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface LoginPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId?: string;
}

export default function LoginPopupModal({ isOpen, onClose, providerId }: LoginPopupModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={onClose}
        data-testid="modal-backdrop-login"
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/10 p-8 space-y-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            data-testid="button-close-login-modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg">
              <LogIn className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-black text-foreground">Login Required</h2>
            <p className="text-sm text-muted-foreground">Sign in to book services</p>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-sm text-blue-900">Member Benefits:</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="text-lg">✅</span>
                <span>Book services instantly</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">💰</span>
                <span>₹500 OFF on first booking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🛡️</span>
                <span>100% secure & verified</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">⭐</span>
                <span>Track bookings in real-time</span>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
            <p className="font-bold">Demo Credentials:</p>
            <p>📧 <span className="font-mono">priya.sharma@gmail.com</span></p>
            <p>🔒 <span className="font-mono">password123</span></p>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <Link href={providerId ? `/login?returnTo=/profile/${providerId}` : "/login"} className="w-full">
              <Button 
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-bold text-base"
                onClick={onClose}
                data-testid="button-login-modal-go"
              >
                Login / Sign Up
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full h-11 font-medium"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              Continue Browsing
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-center text-muted-foreground">
            🔒 Your data is 100% secure. We never share your information.
          </p>
        </div>
      </div>
    </>
  );
}
