import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { X } from "lucide-react";
import API from "@/api/api";

const CATS = [
  "All",
  "Hotel",
  "Rooms",
  "Restaurant",
  "Tourism",
  "Customer Experiences",
] as const;

type GalleryImage = {
  id: number;
  title: string;
  category: string;
  image_url: string;
};

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery — Mulugu Hotel & Restaurant",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] =
    useState<(typeof CATS)[number]>("All");

  const [open, setOpen] = useState<string | null>(null);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await API.get(
        "/api/gallery/images/"
      );

      setImages(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch gallery images",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredImages =
    cat === "All"
      ? images
      : images.filter(
          (img) => img.category === cat
        );

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="container mx-auto px-4 pt-14 pb-10">
        <SectionHeading
          eyebrow="Luxury Moments"
          title="Our Gallery"
          sub="Explore our hotel, rooms, dining experiences and nearby attractions."
        />

        {/* FILTERS */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                cat === c
                  ? "gradient-gold text-gold-foreground border-transparent shadow-soft"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-3xl animate-pulse bg-secondary"
              />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No images available in this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filteredImages.map((img, i) => (
             <motion.button
  key={img.id}
  onClick={() => setOpen(img.image_url)}
  aria-label={`View full size: ${img.title}`}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                }}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-soft hover:shadow-luxury"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
                    {img.category}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-8 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-lg font-semibold text-white">
                      {img.title}
                    </h3>

                    <p className="mt-1 text-sm text-gold">
                      Click to view
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* FULL SCREEN VIEWER */}
      <AnimatePresence>
        {open && (
         <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  role="dialog"
  aria-modal="true"
  aria-label="Gallery image viewer"

            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <button
  onClick={() => setOpen(null)}
  aria-label="Close gallery viewer"
              className="absolute right-6 top-6 text-white hover:text-gold"
            >
              <X size={34} />
            </button>

            <motion.img
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              src={open}
              alt="Gallery"
              className="max-h-[90vh] max-w-[95vw] rounded-3xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}