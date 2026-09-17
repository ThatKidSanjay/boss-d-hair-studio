"use client";

import { useMemo } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  ChevronLeft,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import {
  ARTISTS,
  formatSlotLabel,
  formatDateNice,
  generateSlots,
  type StylistItem,
} from "../../lib/booking-data";

interface StepDateTimeProps {
  artist: string;
  selectedDate: string;
  selectedTime: string;
  dates: string[];
  availableSlots: string[];
  onSelectArtist: (artist: string) => void;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepDateTime({
  artist,
  selectedDate,
  selectedTime,
  dates,
  availableSlots,
  onSelectArtist,
  onSelectDate,
  onSelectTime,
  onBack,
  onNext,
}: StepDateTimeProps) {
  const allSlots = useMemo(
    () => (selectedDate ? generateSlots(selectedDate) : []),
    [selectedDate]
  );

  const morningSlots = useMemo(
    () => allSlots.filter((s) => parseInt(s.split(":")[0], 10) < 12),
    [allSlots]
  );

  const afternoonSlots = useMemo(
    () =>
      allSlots.filter((s) => {
        const h = parseInt(s.split(":")[0], 10);
        return h >= 12 && h < 17;
      }),
    [allSlots]
  );

  const eveningSlots = useMemo(
    () => allSlots.filter((s) => parseInt(s.split(":")[0], 10) >= 17),
    [allSlots]
  );

  const getRelativeBadge = (dateStr: string) => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    if (dateStr === todayStr) return "Today";
    if (dateStr === tomorrowStr) return "Tomorrow";
    return null;
  };

  const renderSlotSection = (
    title: string,
    icon: React.ReactNode,
    slots: string[]
  ) => {
    if (slots.length === 0) return null;
    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
          {icon}
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {slots.map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isSelected = selectedTime === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectTime(slot)}
                className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-2 text-xs font-medium transition-all ${
                  isSelected
                    ? "border-[#C9A24D] bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-[0_2px_12px_rgba(201,162,77,0.3)]"
                    : isAvailable
                      ? "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[#C9A24D] hover:text-[#C9A24D]"
                      : "border-[var(--border-light)] bg-[var(--bg)] text-[var(--text-faint)] opacity-40 cursor-not-allowed line-through"
                }`}
              >
                <span>{formatSlotLabel(slot)}</span>
                <span className="mt-0.5 text-[9px] font-normal opacity-80">
                  {isAvailable ? "Available" : "Booked"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
{/* 1. Stylist selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <UserCheck size={18} className="text-[#C9A24D]" />
          <h3 className="font-serif text-lg font-semibold text-[var(--text)]">
            1. Select Stylist
          </h3>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {ARTISTS.map((st: StylistItem) => {
            const isSelected = (artist || "Any available") === st.name;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectArtist(st.name)}
                className={`relative flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D]"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50"
                }`}
              >
                {st.badge && (
                  <span className="absolute top-2 right-2 rounded-full bg-[#C9A24D]/20 px-2 py-0.5 text-[9px] font-bold text-[#C9A24D]">
                    {st.badge}
                  </span>
                )}
                <span className="font-serif text-sm font-semibold text-[var(--text)]">
                  {st.name}
                </span>
                <span className="mt-0.5 text-[11px] text-[#C9A24D]">
                  {st.role}
                </span>
                <span className="mt-1 text-[10px] text-[var(--text-muted)] line-clamp-1">
                  {st.specialty}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Date selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#C9A24D]" />
            <h3 className="font-serif text-lg font-semibold text-[var(--text)]">
              2. Select Date
            </h3>
          </div>
          {selectedDate && (
            <span className="text-xs font-medium text-[#C9A24D]">
              {formatDateNice(selectedDate)}
            </span>
          )}
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {dates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            const d = new Date(dateStr + "T00:00:00");
            const dayName = d.toLocaleDateString("en-PH", { weekday: "short" });
            const dayNum = d.getDate();
            const monthName = d.toLocaleDateString("en-PH", { month: "short" });
            const relBadge = getRelativeBadge(dateStr);

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => {
                  onSelectDate(dateStr);
                  onSelectTime("");
                }}
                className={`relative flex min-w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border py-3 px-2 transition-all ${
                  isSelected
                    ? "border-[#C9A24D] bg-[#C9A24D] text-[#0A0A0A] shadow-[0_4px_16px_rgba(201,162,77,0.25)] font-semibold"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[#C9A24D]"
                }`}
              >
                {relBadge && (
                  <span
                    className={`mb-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold tracking-wide uppercase ${
                      isSelected
                        ? "bg-[#0A0A0A] text-[#E5C77A]"
                        : "bg-[#C9A24D]/20 text-[#C9A24D]"
                    }`}
                  >
                    {relBadge}
                  </span>
                )}
                <span
                  className={`text-[10px] uppercase ${
                    isSelected ? "text-[#0A0A0A]" : "text-[var(--text-muted)]"
                  }`}
                >
                  {dayName}
                </span>
                <span className="font-serif text-xl font-bold">{dayNum}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-[#0A0A0A]" : "text-[var(--text-faint)]"
                  }`}
                >
                  {monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
{/* 3. Time slot selection */}
      {selectedDate && (
        <div className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-5">
          <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#C9A24D]" />
              <h3 className="font-serif text-lg font-semibold text-[var(--text)]">
                3. Select Time
              </h3>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">
              <span className="font-bold text-[#C9A24D]">{availableSlots.length}</span>{" "}
              slots available
            </span>
          </div>

          {availableSlots.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">
              No time slots available for this date. Please select another date.
            </div>
          ) : (
            <div className="space-y-5">
              {renderSlotSection(
                "Morning (9 AM – 12 PM)",
                <Sun size={14} className="text-[#C9A24D]" />,
                morningSlots
              )}
              {renderSlotSection(
                "Afternoon (12 PM – 5 PM)",
                <Sunset size={14} className="text-[#C9A24D]" />,
                afternoonSlots
              )}
              {renderSlotSection(
                "Evening (5 PM – 8 PM)",
                <Moon size={14} className="text-[#C9A24D]" />,
                eveningSlots
              )}
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D]"
        >
          <ChevronLeft size={16} />
          <span>BACK TO SERVICES</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className={`btn-gold group flex items-center gap-2 ${
            !selectedDate || !selectedTime
              ? "opacity-40 cursor-not-allowed pointer-events-none"
              : ""
          }`}
        >
          <span>CONTINUE TO DETAILS</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}