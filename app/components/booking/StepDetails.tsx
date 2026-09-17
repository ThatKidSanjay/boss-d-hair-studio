"use client";

import {
  User,
  Phone,
  MessageSquare,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  CalendarCheck,
} from "lucide-react";
import {
  formatDateNice,
  formatSlotLabel,
  type ServiceItem,
} from "../../lib/booking-data";

interface StepDetailsProps {
  name: string;
  phone: string;
  notes: string;
  artist: string;
  selectedDate: string;
  selectedTime: string;
  selectedService: ServiceItem | undefined;
  error: string;
  isSubmitting?: boolean;
  onChange: (patch: { name?: string; phone?: string; notes?: string }) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepDetails({
  name,
  phone,
  notes,
  artist,
  selectedDate,
  selectedTime,
  selectedService,
  error,
  isSubmitting,
  onChange,
  onBack,
  onSubmit,
}: StepDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[var(--text)] sm:text-3xl">
          Your Information
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Provide your contact details so we can confirm and reserve your appointment.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-medium text-red-500">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Full Name <span className="text-[#C9A24D]">*</span>
          </label>
          <div className="relative mt-2">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Juan Dela Cruz"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Mobile Number <span className="text-[#C9A24D]">*</span>
          </label>
          <div className="relative mt-2">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="0917 123 4567"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D]"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--text-faint)]">
            Used for appointment SMS updates and studio verification.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Special Requests / Notes{" "}
            <span className="text-[10px] lowercase text-[var(--text-faint)]">(optional)</span>
          </label>
          <div className="relative mt-2">
            <MessageSquare
              size={16}
              className="absolute left-3.5 top-3 text-[var(--text-faint)]"
            />
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="Tell us any hairstyle preferences, reference styles, or allergies..."
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D]"
            />
          </div>
        </div>
      </div>
{/* Appointment Summary Review Box */}
      <div className="rounded-2xl border border-[#C9A24D]/30 bg-[#C9A24D]/5 p-5">
        <h4 className="text-xs font-bold tracking-wider text-[#C9A24D] uppercase">
          Review Appointment Details
        </h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Sparkles size={14} className="text-[#C9A24D]" />
            <span>
              <strong className="text-[var(--text)]">{selectedService?.title}</strong> (₱{selectedService?.price})
            </span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <CalendarCheck size={14} className="text-[#C9A24D]" />
            <span>
              <strong className="text-[var(--text)]">{formatDateNice(selectedDate)}</strong> at{" "}
              <strong className="text-[var(--text)]">{formatSlotLabel(selectedTime)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <User size={14} className="text-[#C9A24D]" />
            <span>
              Stylist: <strong className="text-[var(--text)]">{artist || "Any available"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <span className="text-[11px] font-semibold text-[#C9A24D]">Payment:</span>
            <span>Payable in-studio via Cash / GCash</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D]"
        >
          <ChevronLeft size={16} />
          <span>BACK TO DATE & TIME</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn-gold group flex items-center gap-2 shadow-[0_4px_25px_rgba(201,162,77,0.35)]"
        >
          <CheckCircle2 size={16} />
          <span>{isSubmitting ? "CONFIRMING..." : "CONFIRM & BOOK APPOINTMENT"}</span>
        </button>
      </div>
    </div>
  );
}