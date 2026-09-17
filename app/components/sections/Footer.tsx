"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "../icons";

const nav = [
  { name: "HOME", href: "/#home" },
  { name: "SERVICES", href: "/#services" },
  { name: "GALLERY", href: "/#gallery" },
  { name: "ABOUT", href: "/#about" },
  { name: "REVIEWS", href: "/#reviews" },
  { name: "LOCATION", href: "/#location" },
  { name: "BOOK NOW", href: "/book" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
        {/* Main grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/image/logo/logo.png"
              alt="Boss D Hair Studio"
              width={150}
              height={55}
              className="w-[130px]"
            />
            <p className="mt-5 max-w-[300px] text-xs leading-6 text-[var(--text-muted)]">
              Premium hair styling and beauty experiences in
              Malolos, Bulacan. Elevating your look since day one.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[#C9A24D] hover:text-[#C9A24D]" aria-label="Instagram">
                <InstagramIcon size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[#C9A24D] hover:text-[#C9A24D]" aria-label="Facebook">
                <FacebookIcon size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#C9A24D]">
              NAVIGATION
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-fit text-xs tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#C9A24D]">
              CONTACT
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <a href="tel:+639123456789" className="flex items-center gap-3 text-xs text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D]">
                <Phone size={12} className="text-[var(--text-faint)]" />
                +63 912 345 6789
              </a>
              <div className="flex items-start gap-3 text-xs text-[var(--text-secondary)]">
                <MapPin size={12} className="mt-0.5 shrink-0 text-[var(--text-faint)]" />
                <span>
                  4097 Gumamela Street<br />
                  Purok 4, Cofradia<br />
                  City of Malolos, Bulacan<br />
                  3000, Philippines
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                <Clock size={12} className="text-[var(--text-faint)]" />
                Mon–Sat · 9AM–8PM
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[9px] tracking-[0.3em] text-[#C9A24D]">
              FIND US
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <p className="text-xs leading-5 text-[var(--text-muted)]">
                Malolos, Bulacan<br />
                Philippines
              </p>
              <a
                href="https://maps.app.goo.gl/akvLZBQ9r2TTk9148"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 border border-[#C9A24D]/40 px-4 py-2 text-[10px] tracking-[0.12em] text-[#C9A24D] transition-all hover:border-[#C9A24D] hover:bg-[#C9A24D] hover:text-[#0A0A0A]"
              >
                <MapPin size={10} />
                VIEW ON GOOGLE MAPS
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-light)] pt-7 sm:flex-row">
          <p className="text-[9px] tracking-[0.18em] text-[var(--text-faint)]">
            &copy; {new Date().getFullYear()} BOSS D HAIR STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9px] tracking-[0.15em] text-[var(--text-faint)]">
              MALOLOS, BULACAN, PHILIPPINES
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
