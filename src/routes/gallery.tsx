import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GALLERY } from "@/lib/mockData";
import { X } from "lucide-react";

const CATS = ["Hotel", "Rooms", "Restaurant", "Tourism", "Customer Experiences"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery — Mulugu Hotel & Restaurant" },
    { name: "description", content: "Browse our hotel, rooms, restaurant and tourism gallery." },
    { property: "og:title", content: "Gallery — Mulugu Hotel" },
    { property: "og:description", content: "Hotel, room, restaurant and guest experience photos." },
  ]}),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Hotel");
  const [open, setOpen] = useState<string | null>(null);
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 pt-14 pb-8">
        <SectionHeading eyebrow="Memories" title="Our Gallery" />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition border ${cat === c ? "gradient-gold text-gold-foreground border-transparent shadow-soft" : "bg-card border-border hover:bg-secondary"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {GALLERY[cat].map((src) => (
            <button key={src} onClick={() => setOpen(src)} className="group block overflow-hidden rounded-2xl shadow-soft">
              <img src={src} alt={cat} className="h-64 w-full object-cover transition group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4" onClick={() => setOpen(null)}>
          <button onClick={() => setOpen(null)} className="absolute top-5 right-5 text-white"><X /></button>
          <img src={open} alt="" className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain" />
        </div>
      )}
    </SiteLayout>
  );
}