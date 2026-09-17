import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, ArrowLeft, Clock, MapPin, Sparkles } from "lucide-react";
import BookingWizard from "../components/BookingWizard";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

export const metadata: Metadata = {
  title: "Book Online | Boss D Hair Studio",
  description:
    "Book your appointment at Boss D Hair Studio in Malolos, Bulacan. Real-time availability, choose your service, date, and stylist.",
  openGraph: {
    title: "Book Online | Boss D Hair Studio",
    description:
      "Book your appointment with real-time availability at Boss D Hair Studio, Malolos, Bulacan.",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-alt)] pt-32 pb-14 lg:pt-36 lg:pb-16">
        {/* Subtle Ambient Gold Glow */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[350px] w-[350px] rounded-full bg-[#C9A24D]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10">
          {/* Breadcrumbs & Home Link */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--text-muted)]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A24D]"
            >
              <ArrowLeft size={14} />
              <span>HOME</span>
            </Link>
            <span>/</span>
            <span className="text-[#C9A24D]">ONLINE BOOKING</span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A24D]/30 bg-[#C9A24D]/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#C9A24D] uppercase">
                  <Sparkles size={11} /> Real-Time Scheduler
                </span>
              </div>
              <h1 className="font-serif text-4xl text-[var(--text)] sm:text-5xl lg:text-6xl">
                Reserve Your <span className="gold-text">Appointment</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                Choose your desired service, master stylist, and time slot. Instant reservation with no upfront payment required.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
                <Clock size={15} className="text-[#C9A24D]" />
                <span>Mon–Sat · 9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
                <MapPin size={15} className="text-[#C9A24D]" />
                <span>Malolos, Bulacan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Wizard Section */}
      <section className="mx-auto max-w-[1300px] px-6 py-10 lg:px-10 lg:py-14">
        <BookingWizard />
      </section>

      <Footer />
    </main>
  );
}
