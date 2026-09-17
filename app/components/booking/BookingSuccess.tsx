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

    const startDate = new Date(`${booking.date}T${startH}:${startM}:00`);
    const endDate = new Date(startDate.getTime() + durationMin * 60000);

    const pad = (n: number) => String(n).padStart(2, "0");
    const endClean = `${endDate.getFullYear()}${pad(
      endDate.getMonth() + 1
    )}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(
      endDate.getMinutes()
    )}00`;
    const startClean = `${dateClean}T${startH}${startM}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startClean}/${endClean}&details=${details}&location=${location}`;
  };

  return (
    <div className="rounded-3xl border border-[#C9A24D]/30 bg-[var(--bg-elevated)] p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      {/* Header checkmark */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#8F6B28] to-[#C9A24D] text-[#0A0A0A] shadow-[0_4px_20px_rgba(201,162,77,0.35)]">
          <Check size={32} strokeWidth={3} />
        </div>
        <span className="mt-4 text-[11px] font-bold tracking-[0.25em] text-[#C9A24D] uppercase">
          APPOINTMENT CONFIRMED
        </span>
        <h2 className="mt-2 font-serif text-3xl text-[var(--text)] sm:text-4xl">
          You&apos;re all set!
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
          We&apos;ve reserved your slot. A confirmation has also been saved to your browser session.
        </p>
      </div>

      {/* Booking Reference Code Box */}
      <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#C9A24D]/40 bg-[#C9A24D]/10 p-5 sm:flex-row">
        <div>
          <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-muted)] uppercase">
            BOOKING REFERENCE
          </span>
          <p className="font-serif text-2xl font-bold tracking-wider text-[#C9A24D]">
            {booking.code}
          </p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#C9A24D]/40 bg-[var(--bg)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D]"
        >
          {copied ? (
            <>
              <CheckCheck size={15} className="text-[#22C55E]" />
              <span className="text-[#22C55E]">COPIED!</span>
            </>
          ) : (
            <>
              <Copy size={15} className="text-[#C9A24D]" />
              <span>COPY CODE</span>
            </>
          )}
        </button>
      </div>
      {/* Receipt Breakdown Details */}
      <div className="mt-6 divide-y divide-[var(--border-light)] rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-sm">
        <div className="flex items-center justify-between pb-3">
          <span className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Sparkles size={14} className="text-[#C9A24D]" /> Service
          </span>
          <span className="font-semibold text-[var(--text)]">
            {booking.serviceTitle}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <CalendarCheck size={14} className="text-[#C9A24D]" /> Date & Time
          </span>
          <span className="font-semibold text-[var(--text)]">
            {formatDateNice(booking.date)} · {formatSlotLabel(booking.time)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <User size={14} className="text-[#C9A24D]" /> Stylist
          </span>
          <span className="font-semibold text-[var(--text)]">
            {booking.artist}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Clock size={14} className="text-[#C9A24D]" /> Duration
          </span>
          <span className="text-[var(--text-secondary)]">
            ~{service?.duration || 45} mins
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <span className="text-xs font-bold tracking-wider text-[var(--text-muted)] uppercase">
            Total Due in Salon
          </span>
          <span className="font-serif text-2xl font-bold text-[#C9A24D]">
            ₱{booking.price}
          </span>
        </div>
      </div>

      {/* Studio advisory notes */}
      <div className="mt-6 space-y-2 rounded-2xl bg-[var(--bg-alt)] p-4 text-xs text-[var(--text-secondary)]">
        <p className="flex items-center gap-2 font-medium text-[var(--text)]">
          <MapPin size={14} className="text-[#C9A24D]" />
          4097 Gumamela Street, Purok 4, Cofradia, Malolos, Bulacan
        </p>
        <p className="text-[11px] text-[var(--text-muted)]">
          • Please arrive 5–10 minutes before your scheduled slot.
          <br />
          • If you need to reschedule or cancel, please contact us at{" "}
          <a href="tel:+639123456789" className="text-[#C9A24D] underline">
            +63 912 345 6789
          </a>.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold group flex items-center justify-center gap-2"
        >
          <Calendar size={16} />
          <span>ADD TO GOOGLE CALENDAR</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="btn-outline-gold flex items-center justify-center gap-2"
        >
          <RotateCcw size={15} />
          <span>BOOK ANOTHER</span>
        </button>

        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-3 text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D]"
        >
          <span>HOME</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

