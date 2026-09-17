"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X, Sun, Moon, ChevronDown } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "../icons";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../ThemeProvider";

const nav = [
  { name: "HOME", href: "/#home" },
  { name: "SERVICES", href: "/#services" },
  { name: "GALLERY", href: "/#gallery" },
  { name: "ABOUT", href: "/#about" },
  { name: "REVIEWS", href: "/#reviews" },
  { name: "LOCATION", href: "/#location" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.location.pathname !== "/") return;
      const ids = ["booking","location","reviews","about","gallery","services","home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(id); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);


  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "header-scrolled backdrop-blur-2xl" : "bg-transparent"}`}>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent opacity-80" />
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-12">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3.5">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-[#C9A24D]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image src="/image/logo/logo.png" alt="Boss D Hair Studio" width={56} height={56} className="relative h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-14 lg:w-14" priority />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="font-serif text-[15px] font-semibold leading-none tracking-[0.06em] text-[var(--text)]">BOSS D</span>
              <span className="mt-1 text-[8px] font-medium tracking-[0.28em] text-[#C9A24D]">HAIR STUDIO</span>
            </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href.replace("/#", "");
              return (
                <Link key={item.name} href={item.href} className={`group relative px-4 py-2.5 text-[10.5px] font-semibold tracking-[0.22em] transition-colors duration-200 ${isActive ? "text-[#C9A24D]" : "text-[var(--text)] hover:text-[#C9A24D]"}`}>
                  {item.name}
                  <span className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-[#8f6b28] via-[#E5C77A] to-[#8f6b28] transition-all duration-300 origin-center ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>
          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-1.5 border-r border-[var(--border)] pr-3.5 lg:flex">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all duration-200 hover:bg-[#C9A24D]/10 hover:text-[#C9A24D]"><InstagramIcon size={14} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all duration-200 hover:bg-[#C9A24D]/10 hover:text-[#C9A24D]"><FacebookIcon size={14} /></a>
            </div>
            <button type="button" onClick={toggle} aria-label={theme === "dark" ? "Light mode" : "Dark mode"} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-200 hover:border-[#C9A24D] hover:text-[#C9A24D]">
              {theme === "dark" ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
            </button>
            <Link href="/book" className="hidden h-10 items-center gap-2 bg-[#C9A24D] px-6 text-[10.5px] font-bold tracking-[0.22em] text-[#0A0A0A] transition-all duration-300 hover:bg-[#E5C77A] hover:shadow-[0_0_30px_rgba(201,162,77,0.35)] active:scale-[0.97] lg:flex">BOOK NOW</Link>
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(v => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-all duration-200 hover:border-[#C9A24D] hover:text-[#C9A24D] lg:hidden">
              {open ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-overlay ${open ? "active" : ""}`} onClick={close} />

      <MobileDrawer open={open} close={close} theme={theme} toggle={toggle} />
    </>
  );
}

function MobileDrawer({ open, close, theme, toggle }: { open: boolean; close: () => void; theme: string; toggle: () => void }) {
  return (
    <div className={`fixed inset-x-0 top-0 z-[60] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />
      <div className="bg-[var(--bg-98)] shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-light)] px-5 py-4 sm:px-8">
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <Image src="/image/logo/logo.png" alt="Boss D" width={44} height={44} className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-[13px] font-semibold tracking-[0.06em] text-[var(--text)]">BOSS D</span>
              <span className="text-[7px] font-medium tracking-[0.28em] text-[#C9A24D]">HAIR STUDIO</span>
            </div>
          </Link>
          <button type="button" onClick={close} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] hover:border-[#C9A24D] hover:text-[#C9A24D]"><X size={17} strokeWidth={1.8} /></button>
        </div>
        <nav className="px-5 py-4 sm:px-8">
          {nav.map((item) => (
            <Link key={item.name} href={item.href} onClick={close} className="group flex items-center justify-between border-b border-[var(--border-light)] py-4 text-[11px] font-semibold tracking-[0.24em] text-[var(--text)] transition-colors hover:text-[#C9A24D]">
              <span>{item.name}</span>
              <ChevronDown size={13} className="-rotate-90 text-[var(--text-faint)] group-hover:text-[#C9A24D]" />
            </Link>
          ))}
          <Link href="/book" onClick={close} className="mt-5 flex h-12 w-full items-center justify-center bg-[#C9A24D] text-[11px] font-bold tracking-[0.24em] text-[#0A0A0A] hover:bg-[#E5C77A]">BOOK AN APPOINTMENT</Link>
          <div className="mt-5 flex items-center justify-between pb-3">
            <a href="tel:+639123456789" className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-[var(--text-muted)] hover:text-[#C9A24D]"><Phone size={11} />+63 912 345 6789</a>
            <div className="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#C9A24D] hover:text-[#C9A24D]"><InstagramIcon size={13} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#C9A24D] hover:text-[#C9A24D]"><FacebookIcon size={13} /></a>
              <button type="button" onClick={toggle} aria-label="Toggle theme" className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#C9A24D] hover:text-[#C9A24D]">{theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
