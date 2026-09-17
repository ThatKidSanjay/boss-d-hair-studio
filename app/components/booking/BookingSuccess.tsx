"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  CheckCheck,
  Calendar,
  Sparkles,
  CalendarCheck,
  User,
  Clock,
  MapPin,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  formatDateNice,
  formatSlotLabel,
  type Booking,
  type ServiceItem,
} from "../../lib/booking-data";

interface BookingSuccessProps {
  booking: Booking;
  service?: ServiceItem;
  onReset: () => void;
}

export default function BookingSuccess({
  booking,
  service,
  onReset,
}: BookingSuccessProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(booking.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Hair Appointment: ${booking.serviceTitle} at Boss D Hair Studio`
    );

    const details = encodeURIComponent(
      `Booking Reference: ${booking.code}\nStylist: ${booking.artist}\nService: ${booking.serviceTitle} (₱${booking.price})\nLocation: Boss D Hair Studio, 4097 Gumamela St., Malolos, Bulacan`
    );

    const location = encodeURIComponent(
      "Boss D Hair Studio, 4097 Gumamela Street, Malolos, Bulacan"
    );

    const [h, m] = booking.time.split(":");
    const dateClean = booking.date.replace(/-/g, "");
    const durationMin = service?.duration || 45;

    const startH = h.padStart(2, "0");
    const startM = m.padStart(2, "0");

    const startDate = new Date(
      `${booking.date}T${startH}:${startM}:00`
    );

    const endDate = new Date(
      startDate.getTime() + durationMin * 60000
    );

    const pad = (n: number) => String(n).padStart(2, "0");

    const endClean = `${endDate.getFullYear()}${pad(
      endDate.getMonth() + 1
    )}${pad(endDate.getDate())}T${pad(
      endDate.getHours()
    )}${pad(endDate.getMinutes())}00`;

    const startClean = `${dateClean}T${startH}${startM}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startClean}/${endClean}&details=${details}&location=${location}`;
  };

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#C9A24D]/30 bg-[var(--bg-elevated)] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
      {/* Header Checkmark */}
      <div className="flex min-w-0 flex-col items-center text-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#8F6B28] to-[#C9A24D] text-[#0A0A0A] shadow-[0_4px_20px_rgba(201,162,77,0.35)] sm:h-16 sm:w-16">
          <Check
            size={28}
            strokeWidth={3}
            className="sm:h-8 sm:w-8"
          />
        </div>

        <span className="mt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#C9A24D] sm:text-[11px] sm:tracking-[0.25em]">
          APPOINTMENT CONFIRMED
        </span>

        <h2 className="mt-2 font-serif text-2xl leading-tight text-[var(--text)] sm:text-3xl md:text-4xl">
          You&apos;re all set!
        </h2>

        <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          We&apos;ve reserved your slot. A confirmation has also been saved
          to your browser session.
        </p>
      </div>

      {/* Booking Reference Code Box */}
      <div className="mt-6 flex min-w-0 flex-col gap-4 rounded-2xl border border-[#C9A24D]/40 bg-[#C9A24D]/10 p-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-[0.15em]">
            BOOKING REFERENCE
          </span>

          <p className="mt-1 break-all font-serif text-xl font-bold tracking-wider text-[#C9A24D] sm:text-2xl">
            {booking.code}
          </p>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#C9A24D]/40 bg-[var(--bg)] px-4 py-3 text-xs font-semibold transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D] sm:w-auto sm:py-2"
        >
          {copied ? (
            <>
              <CheckCheck
                size={15}
                className="text-[#22C55E]"
              />
              <span className="text-[#22C55E]">
                COPIED!
              </span>
            </>
          ) : (
            <>
              <Copy
                size={15}
                className="text-[#C9A24D]"
              />
              <span>COPY CODE</span>
            </>
          )}
        </button>
      </div>

      {/* Receipt Breakdown Details */}
      <div className="mt-5 min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm sm:mt-6 sm:p-5">
        {/* Service */}
        <div className="flex min-w-0 flex-col gap-2 border-b border-[var(--border-light)] pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--text-muted)]">
            <Sparkles
              size={14}
              className="shrink-0 text-[#C9A24D]"
            />
            Service
          </span>

          <span className="min-w-0 break-words text-left font-semibold text-[var(--text)] sm:text-right">
            {booking.serviceTitle}
          </span>
        </div>

        {/* Date and Time */}
        <div className="flex min-w-0 flex-col gap-2 border-b border-[var(--border-light)] py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--text-muted)]">
            <CalendarCheck
              size={14}
              className="shrink-0 text-[#C9A24D]"
            />
            Date &amp; Time
          </span>

          <span className="min-w-0 break-words text-left font-semibold text-[var(--text)] sm:text-right">
            {formatDateNice(booking.date)}{" "}
            <span className="text-[var(--text-muted)]">·</span>{" "}
            {formatSlotLabel(booking.time)}
          </span>
        </div>

        {/* Stylist */}
        <div className="flex min-w-0 flex-col gap-2 border-b border-[var(--border-light)] py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--text-muted)]">
            <User
              size={14}
              className="shrink-0 text-[#C9A24D]"
            />
            Stylist
          </span>

          <span className="min-w-0 break-words text-left font-semibold text-[var(--text)] sm:text-right">
            {booking.artist}
          </span>
        </div>

        {/* Duration */}
        <div className="flex min-w-0 flex-col gap-2 border-b border-[var(--border-light)] py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--text-muted)]">
            <Clock
              size={14}
              className="shrink-0 text-[#C9A24D]"
            />
            Duration
          </span>

          <span className="text-left text-[var(--text-secondary)] sm:text-right">
            ~{service?.duration || 45} mins
          </span>
        </div>

        {/* Payment breakdown */}
        <div className="flex min-w-0 flex-col gap-2 border-b border-[var(--border-light)] py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="text-[#C9A24D]">₱</span>
            Paid via GCash
          </span>
          <span className="text-left font-semibold text-emerald-500 sm:text-right">
            ₱{booking.amountPaid.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            {" "}
            <span className="text-[11px] font-normal text-[var(--text-muted)]">
              ({booking.paymentType === "full" ? "Full Payment" : "50% Down Payment"})
            </span>
          </span>
        </div>

        {/* Total / Balance due */}
        <div className="flex min-w-0 flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] sm:text-xs sm:tracking-wider">
            {booking.balanceDue > 0 ? "Balance Due in Studio" : "Total Paid — Fully Settled"}
          </span>

          <span className={`font-serif text-2xl font-bold sm:text-3xl ${booking.balanceDue > 0 ? "text-[#C9A24D]" : "text-emerald-500"}`}>
            {booking.balanceDue > 0
              ? `₱${booking.balanceDue.toLocaleString("en-PH")}`
              : "₱0"}
          </span>
        </div>
      </div>

      {/* Studio Advisory Notes */}
      <div className="mt-5 min-w-0 space-y-3 rounded-2xl bg-[var(--bg-alt)] p-4 text-xs text-[var(--text-secondary)] sm:mt-6 sm:p-5">
        <p className="flex min-w-0 items-start gap-2 font-medium leading-relaxed text-[var(--text)]">
          <MapPin
            size={14}
            className="mt-0.5 shrink-0 text-[#C9A24D]"
          />

          <span className="min-w-0 break-words">
            4097 Gumamela Street, Purok 4, Cofradia, Malolos, Bulacan
          </span>
        </p>

        <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
          • Please arrive 5–10 minutes before your scheduled slot.
          <br />
          • If you need to reschedule or cancel, please contact us at{" "}
          <a
            href="tel:+639123456789"
            className="break-words text-[#C9A24D] underline underline-offset-2"
          >
            +63 912 345 6789
          </a>
          .
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-6 flex min-w-0 flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 sm:mt-8">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex min-h-[46px] w-full items-center justify-center gap-2 px-5 py-3 text-center text-xs tracking-wider sm:w-auto"
        >
          <Calendar
            size={15}
            className="shrink-0"
          />

          <span>ADD TO GOOGLE CALENDAR</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="btn-outline-gold flex min-h-[46px] w-full items-center justify-center gap-2 px-5 py-3 text-center text-xs tracking-wider sm:w-auto"
        >
          <RotateCcw
            size={15}
            className="shrink-0"
          />

          <span>BOOK ANOTHER</span>
        </button>

        <Link
          href="/"
          className="flex min-h-[46px] w-full items-center justify-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-3 text-center text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D] sm:w-auto"
        >
          <span>HOME</span>

          <ArrowRight
            size={14}
            className="shrink-0"
          />
        </Link>
      </div>
    </div>
  );
}