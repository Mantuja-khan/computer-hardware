import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-background">Ecostore</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted destination for laptops, desktops, and computer accessories. Quality products at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-background font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=Laptops" className="hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link to="/shop?category=Desktops" className="hover:text-primary transition-colors">Desktops</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 77426-76574
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                support@ecolaptopstore.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                71 street ,Ahmedabad, Gujarat, 380001
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-muted/20">
        <div className="container py-4 text-center text-xs">
          © 2026 ecostore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
