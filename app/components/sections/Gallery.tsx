"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

const galleryItems = [
  { src: "/image/hero/hero.jpg", label: "SIGNATURE STYLING", aspect: "col-span-1 row-span-2" },
  { src: "/image/logo/logo.png", label: "THE BOSS D BRAND", aspect: "col-span-1 row-span-1" },
  { src: "/image/hero/hero.jpg", label: "SALON EXPERIENCE", aspect: "col-span-1 row-span-1" },
  { src: "/image/hero/hero.jpg", label: "PREMIUM TREATMENTS", aspect: "col-span-1 row-span-2" },
  { src: "/image/hero/hero.jpg", label: "CLIENT RESULTS", aspect: "col-span-1 row-span-1" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal>
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A24D]" />
                <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]">
                  OUR WORK
                </span>
              </div>
              <h2 className="font-serif text-5xl text-[var(--text)] sm:text-6xl">
                A glimpse of the{" "}
                <span className="gold-text">Boss D standard.</span>
              </h2>
            </div>
            <p className="max-w-[400px] text-sm leading-7 text-[var(--text-secondary)]">
              Every detail matters. Explore our latest work and see the
              precision behind every style.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`gallery-item ${item.aspect} relative min-h-[200px] overflow-hidden sm:min-h-[280px] lg:min-h-[320px]`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="gallery-label">
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-[#E5C77A]">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
