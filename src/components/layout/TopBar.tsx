import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { HOTEL } from "@/lib/mockData";

export function TopBar() {
  return (
    <div className="hidden md:block bg-foreground text-background text-xs">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-5">
          <a href={`tel:${HOTEL.phone}`} className="flex items-center gap-1.5 hover:text-gold transition">
            <Phone className="h-3.5 w-3.5" /> {HOTEL.phone}
          </a>
          <a href={`mailto:${HOTEL.email}`} className="flex items-center gap-1.5 hover:text-gold transition">
            <Mail className="h-3.5 w-3.5" /> {HOTEL.email}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {HOTEL.address}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href={HOTEL.social.facebook} aria-label="Facebook" className="hover:text-gold"><Facebook className="h-3.5 w-3.5" /></a>
          <a href={HOTEL.social.instagram} aria-label="Instagram" className="hover:text-gold"><Instagram className="h-3.5 w-3.5" /></a>
          <a href={HOTEL.social.twitter} aria-label="Twitter" className="hover:text-gold"><Twitter className="h-3.5 w-3.5" /></a>
          <a href={HOTEL.social.youtube} aria-label="YouTube" className="hover:text-gold"><Youtube className="h-3.5 w-3.5" /></a>
          <a
            href={`https://wa.me/${HOTEL.whatsapp}`}
            target="_blank" rel="noreferrer"
            className="ml-2 inline-flex items-center gap-1 rounded bg-green-600 px-2 py-0.5 text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}