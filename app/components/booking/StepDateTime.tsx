"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  LayoutGrid,
  Columns,
  Sparkles,
} from "lucide-react";

import {
  ARTISTS,
  formatSlotLabel,
  formatDateNice,
  generateSlots,
  getBookedSlots,
  getAvailableSlots,
  isPast,
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
  const [dateViewMode, setDateViewMode] = useState<"grid" | "carousel">("grid");
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "afternoon" | "evening">("all");
  const [showPastSlots, setShowPastSlots] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedDateRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the selected date into view smoothly when selectedDate changes or on mount
  useEffect(() => {
    if (dateViewMode === "carousel" && selectedDateRef.current && scrollContainerRef.current) {
      selectedDateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDate, dateViewMode]);

  const scrollDates = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const allSlots = useMemo(
    () => (selectedDate ? generateSlots(selectedDate) : []),
    [selectedDate]
  );

  const bookedSlots = useMemo(
    () => (selectedDate ? getBookedSlots(selectedDate) : []),
    [selectedDate]
  );

  const dateAvailabilityMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of dates) {
      map[d] = getAvailableSlots(d).length;
    }
    return map;
  }, [dates]);

  const morningSlots = useMemo(
    () =>
      allSlots.filter(
        (slot) => Number(slot.split(":")[0]) < 12
      ),
    [allSlots]
  );

  const afternoonSlots = useMemo(
    () =>
      allSlots.filter((slot) => {
        const hour = Number(slot.split(":")[0]);
        return hour >= 12 && hour < 17;
      }),
    [allSlots]
  );

  const eveningSlots = useMemo(
    () =>
      allSlots.filter(
        (slot) => Number(slot.split(":")[0]) >= 17
      ),
    [allSlots]
  );

  const morningAvailableCount = useMemo(
    () =>
      morningSlots.filter(
        (s) =>
          availableSlots.includes(s) &&
          !bookedSlots.includes(s) &&
          !isPast(selectedDate, s)
      ).length,
    [morningSlots, availableSlots, bookedSlots, selectedDate]
  );

  const afternoonAvailableCount = useMemo(
    () =>
      afternoonSlots.filter(
        (s) =>
          availableSlots.includes(s) &&
          !bookedSlots.includes(s) &&
          !isPast(selectedDate, s)
      ).length,
    [afternoonSlots, availableSlots, bookedSlots, selectedDate]
  );

  const eveningAvailableCount = useMemo(
    () =>
      eveningSlots.filter(
        (s) =>
          availableSlots.includes(s) &&
          !bookedSlots.includes(s) &&
          !isPast(selectedDate, s)
      ).length,
    [eveningSlots, availableSlots, bookedSlots, selectedDate]
  );

  const getRelativeBadge = (dateStr: string) => {
    const today = new Date();

    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowStr = `${tomorrow.getFullYear()}-${String(
      tomorrow.getMonth() + 1
    ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    if (dateStr === todayStr) return "Today";
    if (dateStr === tomorrowStr) return "Tomorrow";

    return null;
  };

  const renderSlotSection = (
    title: string,
    icon: React.ReactNode,
    slots: string[]
  ) => {
    const filteredSlots = showPastSlots
      ? slots
      : slots.filter((slot) => {
          const isPastSlot = isPast(selectedDate, slot);
          const isBooked = bookedSlots.includes(slot);
          const isAvail =
            availableSlots.includes(slot) && !isBooked && !isPastSlot;
          return isAvail || isBooked; // Hide past slots by default to avoid clutter
        });

    if (filteredSlots.length === 0) return null;

    const availableCount = filteredSlots.filter(
      (s) =>
        availableSlots.includes(s) &&
        !bookedSlots.includes(s) &&
        !isPast(selectedDate, s)
    ).length;

    return (
      <div className="min-w-0 space-y-3">
        {/* Time Section Header */}
        <div className="flex min-w-0 items-center justify-between gap-2 border-b border-[var(--border-light)]/60 pb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="shrink-0">{icon}</span>
            <span className="truncate">{title}</span>
          </div>

          <span className="shrink-0 text-[10px] font-normal text-[var(--text-faint)]">
            {availableCount} available
          </span>
        </div>

        {/* Time Slots */}
        <div className="grid min-w-0 grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {filteredSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isPastSlot = isPast(selectedDate, slot);
            const isAvailable =
              availableSlots.includes(slot) &&
              !isBooked &&
              !isPastSlot;

            const isSelected = selectedTime === slot;

            let slotLabel = "Available";

            if (isBooked) {
              slotLabel = "Booked";
            } else if (isPastSlot) {
              slotLabel = "Past";
            }

            return (
              <button
                key={slot}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectTime(slot)}
                aria-pressed={isSelected}
                aria-label={`${formatSlotLabel(slot)} - ${slotLabel}`}
                className={`group relative flex min-h-[52px] sm:min-h-[58px] min-w-0 flex-col items-center justify-center rounded-xl border p-2 text-center transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] ${
                  isSelected
                    ? "border-[#C9A24D] bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-[0_2px_14px_rgba(201,162,77,0.35)] scale-[1.02]"
                    : isAvailable
                      ? "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 hover:text-[#C9A24D] active:scale-[0.98]"
                      : isBooked
                        ? "cursor-not-allowed border-red-500/20 bg-red-500/5 text-[var(--text-muted)] opacity-60"
                        : "cursor-not-allowed border-[var(--border-light)] bg-[var(--bg)] text-[var(--text-faint)] opacity-40"
                }`}
              >
                <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">
                  {formatSlotLabel(slot)}
                </span>

                <span
                  className={`mt-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider ${
                    isSelected
                      ? "text-[#0A0A0A]/85 font-bold"
                      : isAvailable
                        ? "text-emerald-500 font-bold"
                        : isBooked
                          ? "text-red-500"
                          : "text-[var(--text-faint)]"
                  }`}
                >
                  {slotLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDateCard = (dateStr: string, isGridMode: boolean) => {
    const isSelected = selectedDate === dateStr;
    const date = new Date(`${dateStr}T00:00:00`);

    const dayName = date.toLocaleDateString("en-PH", {
      weekday: "short",
    });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString("en-PH", {
      month: "short",
    });
    const relativeBadge = getRelativeBadge(dateStr);
    const slotsCount = dateAvailabilityMap[dateStr] ?? 0;

    return (
      <button
        key={dateStr}
        ref={isSelected && !isGridMode ? selectedDateRef : null}
        type="button"
        onClick={() => {
          onSelectDate(dateStr);
          onSelectTime("");
        }}
        aria-pressed={isSelected}
        aria-label={`${dayName}, ${monthName} ${dayNumber} (${slotsCount} slots available)`}
        className={`group relative flex min-h-[96px] sm:min-h-[104px] ${
          isGridMode
            ? "w-full min-w-0"
            : "min-w-[64px] sm:min-w-[72px] md:min-w-[78px] shrink-0 snap-start"
        } flex-col items-center justify-between rounded-2xl border p-2 text-center transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] ${
          isSelected
            ? "border-[#C9A24D] bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-[0_4px_18px_rgba(201,162,77,0.35)] scale-[1.02]"
            : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 active:scale-95"
        }`}
      >
        {/* Badge slot */}
        <div className="flex h-4 items-center justify-center">
          {relativeBadge ? (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${
                isSelected
                  ? "bg-[#0A0A0A] text-[#E5C77A]"
                  : "bg-[#C9A24D]/20 text-[#C9A24D]"
              }`}
            >
              {relativeBadge}
            </span>
          ) : (
            <span className="text-[8px] uppercase opacity-0" aria-hidden="true">
              -
            </span>
          )}
        </div>

        {/* Day name & date */}
        <div className="flex flex-col items-center">
          <span
            className={`text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider ${
              isSelected ? "text-[#0A0A0A]/90" : "text-[var(--text-muted)]"
            }`}
          >
            {dayName}
          </span>

          <span className="font-serif text-lg sm:text-xl font-bold leading-tight my-0.5">
            {dayNumber}
          </span>
        </div>

        {/* Month & Available Count */}
        <div className="flex flex-col items-center gap-0.5">
          <span
            className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wider ${
              isSelected ? "text-[#0A0A0A]/80" : "text-[var(--text-faint)]"
            }`}
          >
            {monthName}
          </span>

          <span
            className={`text-[8px] font-semibold ${
              isSelected
                ? "text-[#0A0A0A]/85 font-bold"
                : slotsCount > 0
                  ? "text-emerald-500 font-bold"
                  : "text-red-400 opacity-60"
            }`}
          >
            {slotsCount > 0 ? `${slotsCount} left` : "Full"}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-7">
      {/* 1. Stylist Selection */}
      <section className="min-w-0 space-y-2.5 sm:space-y-3">
        <div className="flex min-w-0 items-center gap-2">
          <UserCheck
            size={17}
            className="shrink-0 text-[#C9A24D]"
          />

          <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--text)]">
            1. Select Stylist
          </h3>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {ARTISTS.map((stylist: StylistItem) => {
            const isSelected =
              (artist || "Any available") === stylist.name;

            return (
              <button
                key={stylist.id}
                type="button"
                onClick={() => onSelectArtist(stylist.name)}
                aria-pressed={isSelected}
                className={`relative flex min-w-0 flex-col rounded-xl border p-3 sm:p-3.5 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24D] ${
                  isSelected
                    ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D] shadow-sm"
                    : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50 hover:bg-[#C9A24D]/5"
                }`}
              >
                <div className="flex min-w-0 items-start justify-between gap-1.5 w-full">
                  <span className="truncate font-serif text-sm font-semibold text-[var(--text)]">
                    {stylist.name}
                  </span>

                  {stylist.badge && (
                    <span className="shrink-0 rounded-full bg-[#C9A24D]/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-[#C9A24D]">
                      {stylist.badge}
                    </span>
                  )}
                </div>

                <span className="mt-0.5 truncate text-[11px] text-[#C9A24D]">
                  {stylist.role}
                </span>

                <span className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
                  {stylist.specialty}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Date Selection */}
      <section className="min-w-0 space-y-2.5 sm:space-y-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Calendar
              size={17}
              className="shrink-0 text-[#C9A24D]"
            />

            <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--text)]">
              2. Select Date
            </h3>

            {selectedDate && (
              <span className="hidden min-[480px]:inline-flex items-center rounded-full bg-[#C9A24D]/15 px-2.5 py-0.5 text-xs font-semibold text-[#C9A24D]">
                {formatDateNice(selectedDate)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedDate && (
              <span className="min-[480px]:hidden text-xs font-semibold text-[#C9A24D]">
                {formatDateNice(selectedDate)}
              </span>
            )}

            {/* View Mode Toggle: Grid vs Carousel */}
            <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setDateViewMode("grid")}
                aria-pressed={dateViewMode === "grid"}
                aria-label="Grid view"
                className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all ${
                  dateViewMode === "grid"
                    ? "bg-[#C9A24D] text-[#0A0A0A] font-bold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[#C9A24D]"
                }`}
              >
                <LayoutGrid size={13} className="shrink-0" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setDateViewMode("carousel")}
                aria-pressed={dateViewMode === "carousel"}
                aria-label="Strip carousel view"
                className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all ${
                  dateViewMode === "carousel"
                    ? "bg-[#C9A24D] text-[#0A0A0A] font-bold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[#C9A24D]"
                }`}
              >
                <Columns size={13} className="shrink-0" />
                <span className="hidden sm:inline">Strip</span>
              </button>
            </div>

            {/* Navigation Arrows for Carousel */}
            {dateViewMode === "carousel" && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollDates("left")}
                  aria-label="Previous dates"
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D] active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollDates("right")}
                  aria-label="Next dates"
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[#C9A24D] hover:text-[#C9A24D] active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-[10px] text-[var(--text-muted)] sm:text-xs">
          Select any date (Mon–Sat) to view open appointment slots.
        </p>

        {/* Date Selector Display: Grid or Carousel */}
        {dateViewMode === "grid" ? (
          <div className="grid min-w-0 grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5">
            {dates.map((d) => renderDateCard(d, true))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex min-w-0 gap-2 overflow-x-auto pb-2 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin"
          >
            {dates.map((d) => renderDateCard(d, false))}
          </div>
        )}
      </section>

      {/* 3. Time Slot Selection */}
      {selectedDate && (
        <section className="min-w-0 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-3.5 sm:p-5">
          {/* Time Header */}
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--border-light)] pb-3">
            <div className="flex min-w-0 items-center gap-2">
              <Clock
                size={18}
                className="shrink-0 text-[#C9A24D]"
              />

              <h3 className="font-serif text-base font-semibold text-[var(--text)] sm:text-lg">
                3. Select Time
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[var(--text-secondary)] sm:text-xs">
                <span className="font-bold text-[#C9A24D]">
                  {availableSlots.length}
                </span>{" "}
                slots available
              </span>

              {/* Show past toggle */}
              <button
                type="button"
                onClick={() => setShowPastSlots((prev) => !prev)}
                className="text-[10px] text-[var(--text-muted)] underline-offset-2 hover:underline hover:text-[var(--text)] transition-colors"
              >
                {showPastSlots ? "Hide past slots" : "Show past slots"}
              </button>
            </div>
          </div>

          {/* Time Period Filter Tabs */}
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 pt-0.5">
            <button
              type="button"
              onClick={() => setTimeFilter("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                timeFilter === "all"
                  ? "bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-xs"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[#C9A24D]"
              }`}
            >
              All Slots ({availableSlots.length})
            </button>

            <button
              type="button"
              onClick={() => setTimeFilter("morning")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                timeFilter === "morning"
                  ? "bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-xs"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[#C9A24D]"
              }`}
            >
              Morning ({morningAvailableCount})
            </button>

            <button
              type="button"
              onClick={() => setTimeFilter("afternoon")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                timeFilter === "afternoon"
                  ? "bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-xs"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[#C9A24D]"
              }`}
            >
              Afternoon ({afternoonAvailableCount})
            </button>

            <button
              type="button"
              onClick={() => setTimeFilter("evening")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                timeFilter === "evening"
                  ? "bg-[#C9A24D] font-bold text-[#0A0A0A] shadow-xs"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[#C9A24D]"
              }`}
            >
              Evening ({eveningAvailableCount})
            </button>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-[var(--text-muted)] sm:text-xs pt-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Booked
            </span>

            {showPastSlots && (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--text-faint)]" />
                Past
              </span>
            )}
          </div>

          {availableSlots.length === 0 ? (
            <div className="px-2 py-8 text-center text-sm leading-relaxed text-[var(--text-muted)]">
              No time slots available for this date. Please select another date.
            </div>
          ) : (
            <div className="min-w-0 space-y-5 pt-1">
              {(timeFilter === "all" || timeFilter === "morning") &&
                renderSlotSection(
                  "Morning (9 AM – 12 PM)",
                  <Sun size={14} className="text-[#C9A24D]" />,
                  morningSlots
                )}

              {(timeFilter === "all" || timeFilter === "afternoon") &&
                renderSlotSection(
                  "Afternoon (12 PM – 5 PM)",
                  <Sunset size={14} className="text-[#C9A24D]" />,
                  afternoonSlots
                )}

              {(timeFilter === "all" || timeFilter === "evening") &&
                renderSlotSection(
                  "Evening (5 PM – 8 PM)",
                  <Moon size={14} className="text-[#C9A24D]" />,
                  eveningSlots
                )}
            </div>
          )}
        </section>
      )}

      {/* Action Buttons */}
      <div className="flex min-w-0 flex-col-reverse gap-3 border-t border-[var(--border-light)] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D] sm:w-auto sm:justify-start"
        >
          <ChevronLeft
            size={16}
            className="shrink-0"
          />

          <span>BACK TO SERVICES</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className={`btn-gold group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-4 text-center text-xs sm:w-auto sm:min-w-[210px] ${
            !selectedDate || !selectedTime
              ? "pointer-events-none cursor-not-allowed opacity-40"
              : ""
          }`}
        >
          <span>CONTINUE TO DETAILS</span>

          <ArrowRight
            size={16}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}