import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t py-12 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
              <span className="text-xs font-black">FX</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">Fixcity</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            Connecting trusted local professionals with customers in Tier 2 & 3 cities. Quality service, right at your doorstep.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services?category=cleaning">Home Cleaning</Link></li>
            <li><Link href="/services?category=plumbing">Plumbing</Link></li>
            <li><Link href="/services?category=beauty">Women's Beauty & Salon</Link></li>
            <li><Link href="/services?category=men-salon">Men's Salon</Link></li>
            <li><Link href="/services?category=repair">AC & Repair</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">More Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services?category=painting">Painting</Link></li>
            <li><Link href="/services?category=carpentry">Carpentry</Link></li>
            <li><Link href="/services?category=pest-control">Pest Control</Link></li>
            <li><Link href="/services?category=appliance-repair">Appliance Repair</Link></li>
            <li><Link href="/services?category=electrician">Electricians</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About Us</li>
            <li>Join as Professional</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        © 2025 Fixcity. All rights reserved.
      </div>
    </footer>
  );
}
