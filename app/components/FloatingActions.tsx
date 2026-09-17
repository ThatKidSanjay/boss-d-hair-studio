"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Advanced chat assistant (replaces WhatsApp button) */}
      <ChatWidget />

      {/* Scroll to top */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={scrollTop}
        className={`fixed bottom-6 left-6 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#C9A24D] hover:text-[#C9A24D] ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}