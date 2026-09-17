
"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end overflow-hidden bg-[#FAF9F6] transition-colors duration-500 dark:bg-[#11100E]"
    >
      {/* Background */}
      <div className="absolute inset-0">

        {/* Light mode background */}
        <div className="absolute inset-0 bg-[#FAF9F6] transition-colors duration-500 dark:bg-[#11100E]" />

        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/95 to-[#F1EBDD]/70 transition-opacity duration-500 dark:opacity-0" />

        {/* Night mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100E] via-[#191714]/95 to-[#29241D]/80 opacity-0 transition-opacity duration-500 dark:opacity-100" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent transition-colors duration-500 dark:from-[#11100E]" />

        {/* Light gold glow */}
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#D4B56A]/10 blur-3xl dark:bg-[#C9A24D]/10" />

      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="max-w-[800px]">

          {/* Eyebrow */}
          <div
            className={`mb-7 flex items-center gap-4 transition-all duration-1000 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="h-px w-12 bg-[#B08D3B] dark:bg-[#C9A24D]" />

            <span className="text-[10px] font-medium tracking-[0.35em] text-[#B08D3B] dark:text-[#E5C77A]">
              PREMIUM SALON &middot; MALOLOS, BULACAN
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif text-[clamp(3.5rem,8vw,7.8rem)] font-medium leading-[0.84] tracking-[-0.04em] text-[#1C1C1C] transition-all duration-1000 delay-200 dark:text-[#F5F1E8] ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            BOSS D
            <br />

            <span className="gold-text text-[#B08D3B] dark:text-[#E5C77A]">
              HAIR STUDIO
            </span>
          </h1>

          {/* Subtext */}
          <div
            className={`mt-9 max-w-[580px] transition-all duration-1000 delay-400 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="font-serif text-2xl leading-tight text-[#292722] transition-colors duration-500 sm:text-3xl dark:text-[#F5F1E8]">
              DEFINE YOUR STYLE.
            </p>

            <p className="mt-5 max-w-[500px] text-sm font-light leading-7 tracking-wide text-[#6B665D] transition-colors duration-500 dark:text-[#B8B1A5]">
              Premium hair styling, grooming, and carefully selected products
              for those who demand excellence.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col gap-3 transition-all duration-1000 delay-500 sm:flex-row ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Link
              href="/book"
              className="btn-gold group"
            >
              <span>BOOK AN APPOINTMENT</span>

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#services"
              className="btn-outline-gold group"
            >
              <span>EXPLORE SERVICES</span>

              <ArrowDown
                size={14}
                className="transition-transform group-hover:translate-y-1"
              />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`hidden justify-center transition-all duration-1000 delay-700 lg:flex ${
            loaded
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mt-16 flex flex-col items-center gap-3">
            <span className="text-[9px] tracking-[0.3em] text-[#B08D3B]/60 dark:text-[#E5C77A]/60">
              SCROLL
            </span>

            <div className="h-10 w-px bg-gradient-to-b from-[#B08D3B]/60 to-transparent dark:from-[#C9A24D]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}