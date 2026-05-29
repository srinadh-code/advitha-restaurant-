import { Phone, MessageCircle } from "lucide-react";
import { HOTEL } from "@/lib/mockData";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${HOTEL.whatsapp}?text=Hello%20Mulugu%20Hotel`}
        target="_blank" rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-600 text-white shadow-luxury hover:scale-105 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${HOTEL.phone}`}
        aria-label="Call"
        className="grid h-12 w-12 place-items-center rounded-full gradient-gold text-gold-foreground shadow-luxury hover:scale-105 transition"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}