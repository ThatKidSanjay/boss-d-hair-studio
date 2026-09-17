import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
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
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <Header />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-[var(--border)] bg-[var(--bg-alt)] pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        {/* Ambient Background Effects */}
        <div className="pointer-events-none absolute -right-32 -top-24 -z-10 h-72 w-72 rounded-full bg-[#C9A24D]/10 blur-[90px] sm:-right-20 sm:-top-40 sm:h-[420px] sm:w-[420px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-72 w-72 rounded-full bg-[#C9A24D]/5 blur-[100px] sm:h-[420px] sm:w-[420px]" />

        <div className="mx-auto w-full max-w-[1300px] px-3.5 pb-8 sm:px-6 sm:pb-12 lg:px-10 lg:pb-14">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex min-w-0 flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)] sm:mb-8 sm:gap-2 sm:text-xs"
          >
            <Link
              href="/"
              className="inline-flex min-h-7 items-center gap-1.5 rounded-full transition-colors hover:text-[#C9A24D]"
            >
              <ArrowLeft
                size={13}
                className="shrink-0"
              />

              <span>Home</span>
            </Link>

            <span className="text-[var(--text-faint)]">
              /
            </span>

            <span className="break-words text-[#C9A24D]">
              Online Booking
            </span>
          </nav>

          {/* Hero Main Content */}
          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
            {/* Hero Text */}
            <div className="min-w-0">
              {/* Eyebrow */}
              <div className="mb-3 sm:mb-4">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#C9A24D]/30 bg-[#C9A24D]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#C9A24D] sm:px-3 sm:py-1.5 sm:text-[10px]">
                  <Sparkles
                    size={11}
                    className="shrink-0"
                  />

                  <span>Real-Time Scheduler</span>
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-4xl font-serif text-[clamp(1.85rem,5.5vw,3.75rem)] leading-[1.1] tracking-tight text-[var(--text)]">
                Reserve Your{" "}
                <span className="gold-text block sm:inline">
                  Appointment
                </span>
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-sm md:text-base">
                Choose your desired service, master stylist, and time slot.
                Secure your slot with a 50% GCash down payment or pay in full upfront.
              </p>

              {/* Trust Note */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-medium text-[var(--text-muted)] sm:mt-5 sm:text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck
                    size={14}
                    className="shrink-0 text-[#C9A24D]"
                  />
                  <span>Secure booking</span>
                </div>
                <span className="text-[var(--text-faint)]">•</span>
                <span>GCash down payment required</span>
                <span className="text-[var(--text-faint)]">•</span>
                <span className="text-emerald-500 font-medium">Instant confirmation</span>
              </div>
            </div>

            {/* Studio Details */}
            <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:flex lg:w-72 lg:flex-col lg:items-stretch lg:gap-3">
              {/* Opening Hours */}
              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 sm:p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10 sm:h-9 sm:w-9">
                  <Clock
                    size={16}
                    className="text-[#C9A24D]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-faint)]">
                    Opening Hours
                  </p>

                  <p className="mt-0.5 break-words text-[11px] font-semibold text-[var(--text)] sm:text-xs">
                    Mon–Sat · 9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 sm:p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10 sm:h-9 sm:w-9">
                  <MapPin
                    size={16}
                    className="text-[#C9A24D]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-faint)]">
                    Location
                  </p>

                  <p className="mt-0.5 break-words text-[11px] font-semibold text-[var(--text)] sm:text-xs">
                    Malolos, Bulacan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Small Booking Status Strip */}
          <div className="mt-6 flex min-w-0 flex-col gap-2.5 rounded-2xl border border-[#C9A24D]/20 bg-[#C9A24D]/5 p-3.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A24D]/10">
                <CalendarCheck
                  size={16}
                  className="text-[#C9A24D]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)]">
                  Plan your next visit
                </p>

                <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--text-muted)] sm:text-xs">
                  Select a service and available time slot below.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A24D] sm:text-right">
              Easy online booking
            </span>
          </div>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section className="relative w-full min-w-0">
        <div className="mx-auto w-full max-w-[1300px] px-3.5 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          <div className="min-w-0 rounded-2xl sm:rounded-3xl">
            <BookingWizard />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}