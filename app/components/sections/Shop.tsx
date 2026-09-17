"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function Shop() {
  return (
    <section id="shop" className="bg-[var(--bg)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <ScrollReveal direction="left">
          <div className="relative min-h-[500px] overflow-hidden">
            <Image
              src="/image/hero/hero.jpg"
              alt="Boss D premium products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-8 left-8">
              <p className="text-[10px] tracking-[0.3em] text-[#E5C77A]">
                BOSS D COLLECTION
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={200}>
          <div className="flex flex-col justify-center">
            <div className="gold-line mb-6" />
            <p className="text-[10px] tracking-[0.3em] text-[var(--text-muted)]">
              THE SHOP
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-tight text-[var(--text)] sm:text-6xl">
              Elevate your{" "}
              <span className="gold-text">routine.</span>
            </h2>
            <p className="mt-7 max-w-[520px] text-sm leading-8 text-[var(--text-secondary)]">
              Discover carefully selected hair and beauty essentials
              designed to complement the Boss D experience.
            </p>
            <Link
              href="#booking"
              className="btn-outline-gold group mt-9 w-fit"
            >
              <span>INQUIRE ABOUT PRODUCTS</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
