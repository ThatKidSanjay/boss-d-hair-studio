
"use client";

import {
  Sparkles,
  CalendarCheck,
  User,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  formatDateNice,
  formatSlotLabel,
  isOpenNow,
  type ServiceItem,
} from "../../lib/booking-data";

interface BookingSidebarProps {
  selectedService?: ServiceItem;
  artist: string;
  selectedDate: string;
  selectedTime: string;
  availableCount: number;
  totalSlots: number;
  syncedAt: Date;
}

export default function BookingSidebar({
  selectedService,
  artist,
  selectedDate,
  selectedTime,
  availableCount,
  totalSlots,
  syncedAt,
}: BookingSidebarProps) {
  return (
    <aside className="w-full min-w-0 lg:sticky lg:top-28 lg:self-start space-y-4 sm:space-y-6">
      <div className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-sm sm:p-5 lg:p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-xs sm:tracking-[0.2em]">
          SUMMARY &amp; AVAILABILITY
        </h3>

        {/* Selected Details List */}
        <div className="mt-4 space-y-3.5 sm:mt-5">
          {/* Selected Service */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10 sm:h-10 sm:w-10">
              <Sparkles size={16} className="text-[#C9A24D]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--text)]">
                {selectedService?.title || "No service selected"}
              </p>

              <p className="text-[11px] text-[var(--text-muted)]">
                {selectedService
                  ? `${selectedService.duration} mins`
                  : "Choose a service"}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--border-light)]" />

          {/* Selected Date & Time */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10 sm:h-10 sm:w-10">
              <CalendarCheck size={16} className="text-[#C9A24D]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--text)]">
                {selectedDate
                  ? formatDateNice(selectedDate)
                  : "No date selected"}
              </p>

              <p className="text-[11px] text-[var(--text-muted)]">
                {selectedTime
                  ? formatSlotLabel(selectedTime)
                  : "Pick a time slot"}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--border-light)]" />

          {/* Selected Artist */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10 sm:h-10 sm:w-10">
              <User size={16} className="text-[#C9A24D]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--text)]">
                {artist || "Any available"}
              </p>

              <p className="text-[11px] text-[var(--text-muted)]">
                Master Stylist
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--border-light)]" />

          {/* Total Price */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)] sm:text-xs sm:tracking-wider">
              ESTIMATED TOTAL
            </span>

            <span className="font-serif text-xl font-bold text-[#C9A24D] sm:text-2xl">
              {selectedService ? `₱${selectedService.price}` : "—"}
            </span>
          </div>
        </div>

        {/* Live Availability Box */}
        {selectedDate && (
          <div className="mt-5 min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--bg)] p-3.5 sm:mt-6 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-[0.15em]">
                LIVE AVAILABILITY
              </span>

              <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-[var(--text-faint)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />

                {syncedAt.toLocaleTimeString("en-PH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-secondary)]">
              <strong className="text-[var(--text)]">
                {availableCount}
              </strong>{" "}
              of {totalSlots} slots remaining for{" "}
              {formatDateNice(selectedDate)}.

              {availableCount < 5 && availableCount > 0 && (
                <span className="mt-1 block font-semibold text-[#C9A24D]">
                  ⚡ Slots for this date are filling quickly!
                </span>
              )}
            </p>
          </div>
        )}

        {/* Studio Info & Quick Dial */}
        <div className="mt-5 space-y-3 border-t border-[var(--border-light)] pt-4 text-[11px] text-[var(--text-muted)] sm:mt-6 sm:pt-5">
          {/* Opening Hours */}
          <div className="flex min-w-0 items-start gap-2">
            <Clock
              size={13}
              className="mt-0.5 shrink-0 text-[#C9A24D]"
            />

            <span className="min-w-0 leading-relaxed">
              Mon–Sat · 9:00 AM – 8:00 PM ·{" "}
              <strong
                className={
                  isOpenNow()
                    ? "text-[#22C55E]"
                    : "text-[var(--text-faint)]"
                }
              >
                {isOpenNow() ? "Open now" : "Closed"}
              </strong>
            </span>
          </div>

          {/* Address */}
          <div className="flex min-w-0 items-start gap-2">
            <MapPin
              size={13}
              className="mt-0.5 shrink-0 text-[#C9A24D]"
            />

            <span className="min-w-0 break-words leading-relaxed">
              4097 Gumamela St., Purok 4, Cofradia, Malolos, Bulacan
            </span>
          </div>

          {/* Phone */}
          <a
            href="tel:+639123456789"
            className="flex min-w-0 items-center gap-2 break-all transition-colors hover:text-[#C9A24D]"
          >
            <Phone size={13} className="shrink-0 text-[#C9A24D]" />

            <span>+63 912 345 6789</span>
          </a>

          {/* Confirmation */}
          <div className="mt-3 flex min-w-0 items-start gap-1.5 pt-2 text-[10px] text-[var(--text-faint)]">
            <ShieldCheck
              size={13}
              className="mt-0.5 shrink-0 text-[#22C55E]"
            />

            <span className="min-w-0 leading-relaxed">
              Instant confirmation · No advance fee required
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}