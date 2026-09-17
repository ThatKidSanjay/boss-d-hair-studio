"use client";

import { Check, Clock, Sparkles, ArrowRight } from "lucide-react";
import { SERVICES, type ServiceItem } from "../../lib/booking-data";

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
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[var(--text)] sm:text-3xl">
          Choose a Service
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Select the service you wish to book. Pricing and estimated duration are shown below.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s);
                }
              }}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D] shadow-[0_4px_20px_rgba(201,162,77,0.15)]"
                  : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50 hover:bg-[var(--bg-alt)]"
              }`}
            >
              {s.popular && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-[#C9A24D] px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-[#0A0A0A] uppercase">
                  <Sparkles size={10} /> Popular
                </span>
              )}

              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-[var(--text)]">
                    {s.title}
                  </h3>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-[#C9A24D] bg-[#C9A24D] text-[#0A0A0A]"
                        : "border-[var(--border)] bg-[var(--bg)] text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#C9A24D]" />
                    {s.duration} mins
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                <span className="text-[10px] tracking-wider text-[var(--text-faint)] uppercase">
                  PRICE
                </span>
                <span className="font-serif text-xl font-bold text-[#C9A24D]">
                  ₱{s.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedId}
          className={`btn-gold group flex items-center gap-2 ${
            !selectedId ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          <span>CONTINUE TO DATE & TIME</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
