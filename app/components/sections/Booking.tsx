"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function Booking() {
  return (
    <section id="booking" className="relative overflow-hidden bg-[var(--bg-alt)]">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A24D]/20" />
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A24D]/15" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A24D]/10" />
      </div>

      <div className="relative mx-auto max-w-[1000px] px-6 py-28 text-center lg:py-36">
        <ScrollReveal>
          <div className="mx-auto mb-6 gold-line-wide" />
          <p className="text-[10px] tracking-[0.35em] text-[#C9A24D]">
            YOUR NEXT LOOK STARTS HERE
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-tight text-[var(--text)] sm:text-7xl">
            Ready to define{" "}
            <span className="gold-text">your style?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[520px] text-sm leading-7 text-[var(--text-secondary)]">
            Reserve your appointment and experience the Boss D standard.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="btn-gold group"
            >
              <span>BOOK NOW ONLINE</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+639123456789"
              className="btn-outline-gold group"
            >
              <span>CALL TO BOOK</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-16 flex items-center justify-center gap-8 text-[11px] tracking-[0.12em] text-[var(--text-muted)]">
            <div className="text-center">
              <p className="text-[9px] text-[var(--text-faint)]">PHONE</p>
              <a href="tel:+639123456789" className="mt-1 block text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D]">
                +63 912 345 6789
              </a>
            </div>
            <div className="h-8 w-px bg-[var(--border)]" />
            <div className="text-center">
              <p className="text-[9px] text-[var(--text-faint)]">HOURS</p>
              <p className="mt-1 text-[var(--text-secondary)]">MON–SAT · 9AM–8PM</p>
            </div>
            <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />
            <div className="hidden text-center sm:block">
              <p className="text-[9px] text-[var(--text-faint)]">WALK-INS</p>
              <p className="mt-1 text-[var(--text-secondary)]">WELCOME</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
