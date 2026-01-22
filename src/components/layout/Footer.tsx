import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground pb-20 lg:pb-8">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              <span className="text-terracotta-light">Siaya</span> Boutique
            </h2>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Your premier destination for modern fashion in Siaya County. 
              Quality meets elegance.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=ladies" className="hover:text-primary-foreground transition-colors">Ladies</Link></li>
              <li><Link to="/shop?category=men" className="hover:text-primary-foreground transition-colors">Men</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Visit Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Main Street, Siaya Town<br />Siaya County, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@siayaboutique.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© 2024 Siaya Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
