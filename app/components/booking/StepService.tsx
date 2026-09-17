"use client";

import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  SERVICES,
  type ServiceItem,
} from "../../lib/booking-data";

interface StepServiceProps {
  selectedId: string;
  onSelect: (service: ServiceItem) => void;
  onNext: () => void;
}

export default function StepService({
  selectedId,
  onSelect,
  onNext,
}: StepServiceProps) {
  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="min-w-0">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-[var(--text)]">
          Choose a Service
        </h2>

        <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          Select the service you wish to book. Pricing and estimated duration
          are shown below.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {SERVICES.map((s) => {
          const isSelected = selectedId === s.id;

          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s);
                }
              }}
              className={`relative flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border p-3.5 text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#C9A24D] focus-visible:ring-offset-2 sm:p-5 ${
                isSelected
                  ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D] shadow-[0_4px_20px_rgba(201,162,77,0.15)]"
                  : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50 hover:bg-[var(--bg-alt)]"
              }`}
            >
              {/* Popular Badge */}
              {s.popular && (
                <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-[#C9A24D] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#0A0A0A] shadow-sm sm:text-[9px]">
                  <Sparkles
                    size={10}
                    className="shrink-0"
                  />
                  Popular
                </span>
              )}

              {/* Card Content */}
              <div className="min-w-0">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <h3 className="min-w-0 break-words font-serif text-base font-semibold leading-snug text-[var(--text)] sm:text-lg md:text-xl">
                    {s.title}
                  </h3>

                  {/* Selected Indicator */}
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "border-[#C9A24D] bg-[#C9A24D] text-[#0A0A0A]"
                        : "border-[var(--border)] bg-[var(--bg)] text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <Check
                      size={13}
                      strokeWidth={3}
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock
                      size={12}
                      className="shrink-0 text-[#C9A24D]"
                    />

                    <span>{s.duration} mins</span>
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2.5 break-words text-xs leading-relaxed text-[var(--text-secondary)] sm:text-[13px]">
                  {s.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-4 flex min-w-0 items-center justify-between gap-3 border-t border-[var(--border-light)] pt-3">
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-faint)] sm:text-[10px]">
                  Price
                </span>

                <span className="shrink-0 font-serif text-lg font-bold text-[#C9A24D] sm:text-xl md:text-2xl">
                  ₱{s.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex min-w-0 justify-stretch border-t border-[var(--border-light)] pt-4 sm:justify-end sm:pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedId}
          className={`btn-gold group flex min-h-[46px] w-full items-center justify-center gap-2 px-5 py-3 text-center text-xs tracking-wider sm:w-auto ${
            !selectedId
              ? "cursor-not-allowed opacity-40"
              : ""
          }`}
        >
          <span>CONTINUE TO DATE &amp; TIME</span>

          <ArrowRight
            size={15}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}