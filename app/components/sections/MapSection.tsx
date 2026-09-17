import { MapPin } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function MapSection() {
  return (
    <section id="location" className="relative bg-[var(--bg)]">
      {/* Section header */}
      <ScrollReveal className="mx-auto max-w-[1440px] px-6 pt-20 pb-10 lg:px-10">
        <p className="text-[9px] tracking-[0.3em] text-[#C9A24D]">VISIT US</p>
        <h2
          className="mt-3 font-['Cormorant_Garamond',serif] text-3xl font-light tracking-[0.06em] text-[var(--text)] md:text-4xl"
        >
          FIND OUR{" "}
          <span className="bg-gradient-to-r from-[#C9A24D] via-[#E5C77A] to-[#C9A24D] bg-clip-text text-transparent">
            STUDIO
          </span>
        </h2>
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <MapPin size={12} className="text-[#C9A24D]/50" />
          <span>4097 Gumamela Street, Purok 4, Cofradia, City of Malolos, Bulacan 3000</span>
        </div>
      </ScrollReveal>

      {/* Full-width map */}
      <ScrollReveal className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <div className="overflow-hidden border border-[var(--border-light)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.6!2d120.829045!3d14.844549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339675e3a1b2c5ab%3A0x1234567890abcdef!2s14.844549%2C%20120.829045!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
            className="map-embed"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Boss D Hair Studio — 4097 Gumamela Street, Purok 4, Cofradia, City of Malolos, Bulacan"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}