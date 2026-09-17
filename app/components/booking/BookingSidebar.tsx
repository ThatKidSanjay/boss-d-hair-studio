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
    <aside className="space-y-6">
      <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-sm">
        <h3 className="text-xs font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase">
          SUMMARY & AVAILABILITY
        </h3>

        {/* Selected Details List */}
        <div className="mt-5 space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10">
              <Sparkles size={16} className="text-[#C9A24D]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--text)]">
                {selectedService?.title || "No service selected"}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {selectedService ? `${selectedService.duration} mins` : "Choose a service"}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--border-light)]" />

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10">
              <CalendarCheck size={16} className="text-[#C9A24D]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[var(--text)]">
                {selectedDate ? formatDateNice(selectedDate) : "No date selected"}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {selectedTime ? formatSlotLabel(selectedTime) : "Pick a time slot"}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--border-light)]" />

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A24D]/10">
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
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              ESTIMATED TOTAL
            </span>
            <span className="font-serif text-2xl font-bold text-[#C9A24D]">
              {selectedService ? `₱${selectedService.price}` : "—"}
            </span>
          </div>
        </div>
{/* Live Availability Box */}
        {selectedDate && (
          <div className="mt-6 rounded-xl border border-[var(--border-light)] bg-[var(--bg)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-muted)] uppercase">
                LIVE AVAILABILITY
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-[var(--text-faint)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
                {syncedAt.toLocaleTimeString("en-PH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text)]">{availableCount}</strong> of{" "}
              {totalSlots} slots remaining for {formatDateNice(selectedDate)}.
              {availableCount < 5 && availableCount > 0 && (
                <span className="mt-1 block font-semibold text-[#C9A24D]">
                  ⚡ Slots for this date are filling quickly!
                </span>
              )}
            </p>
          </div>
        )}

        {/* Studio Info & Quick Dial */}
        <div className="mt-6 space-y-3 border-t border-[var(--border-light)] pt-5 text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-[#C9A24D]" />
            <span>
              Mon–Sat · 9:00 AM – 8:00 PM ·{" "}
              <strong className={isOpenNow() ? "text-[#22C55E]" : "text-[var(--text-faint)]"}>
                {isOpenNow() ? "Open now" : "Closed"}
              </strong>
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={13} className="mt-0.5 shrink-0 text-[#C9A24D]" />
            <span>4097 Gumamela St., Purok 4, Cofradia, Malolos, Bulacan</span>
          </div>

          <a
            href="tel:+639123456789"
            className="flex items-center gap-2 transition-colors hover:text-[#C9A24D]"
          >
            <Phone size={13} className="text-[#C9A24D]" />
            <span>+63 912 345 6789</span>
          </a>

          <div className="mt-3 flex items-center gap-1.5 pt-2 text-[10px] text-[var(--text-faint)]">
            <ShieldCheck size={13} className="text-[#22C55E]" />
            <span>Instant confirmation · No advance fee required</span>
          </div>
        </div>
      </div>
    </aside>
  );
}