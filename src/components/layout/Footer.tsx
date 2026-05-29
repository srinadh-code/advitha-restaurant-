import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { HOTEL } from "@/lib/mockData";

export function Footer() {
  return (
    <footer className="mt-20 bg-foreground text-background">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl text-gold">{HOTEL.name}</h3>
          <p className="mt-3 text-sm text-background/70">{HOTEL.tagline}</p>
          <div className="mt-4 flex gap-3 text-background/80">
            <a href={HOTEL.social.facebook} className="hover:text-gold"><Facebook className="h-4 w-4" /></a>
            <a href={HOTEL.social.instagram} className="hover:text-gold"><Instagram className="h-4 w-4" /></a>
            <a href={HOTEL.social.twitter} className="hover:text-gold"><Twitter className="h-4 w-4" /></a>
            <a href={HOTEL.social.youtube} className="hover:text-gold"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/rooms" className="hover:text-gold">Rooms</Link></li>
            <li><Link to="/book" className="hover:text-gold">Book Now</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li><Link to="/restaurant" className="hover:text-gold">Restaurant</Link></li>
            <li><Link to="/tourism" className="hover:text-gold">Tourism Places</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {HOTEL.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {HOTEL.email}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> {HOTEL.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-4 text-center text-xs text-background/60">
        © {new Date().getFullYear()} {HOTEL.name}. All rights reserved.
      </div>
    </footer>
  );
}