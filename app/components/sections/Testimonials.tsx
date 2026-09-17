"use client";

import { Star } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

const testimonials = [
  {
    name: "nyak.",
    rating: 5,
    text: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    service: "botox",
  },
  {
    name: "Test.",
    rating: 5,
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    service: "5&1 treatment",
  },
  {
    name: "juan T.",
    rating: 5,
    text: "wow",
    service: "Collagen",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal>
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A24D]" />
                <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]">
                  CLIENT REVIEWS
                </span>
              </div>
              <h2 className="font-serif text-5xl text-[var(--text)] sm:text-6xl">
                What they say about{" "}
                <span className="gold-text">us.</span>
              </h2>
            </div>
            <p className="max-w-[400px] text-sm leading-7 text-[var(--text-secondary)]">
              Real feedback from our valued clients.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="card-luxury p-8">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="star-gold fill-[#E5C77A]" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-[var(--text-body)]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-8 border-t border-[var(--border-light)] pt-6">
                  <p className="text-xs font-semibold tracking-[0.15em] text-[var(--text)]">
                    {t.name}
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.1em] text-[#C9A24D]/70">
                    {t.service}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
