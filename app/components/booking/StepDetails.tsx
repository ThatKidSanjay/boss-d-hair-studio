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
  calculatePayment,
  type ServiceItem,
  type PaymentType,
} from "../../lib/booking-data";
import GCashQRCard from "./GCashQRCard";

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
  paymentType: PaymentType;
  onChangePayment: (type: PaymentType) => void;
  onChange: (patch: {
    name?: string;
    phone?: string;
    notes?: string;
  }) => void;
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
  paymentType,
  onChangePayment,
  onChange,
  onBack,
  onSubmit,
}: StepDetailsProps) {
  const payment = calculatePayment(selectedService?.price ?? 0, paymentType);
  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="min-w-0">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-[var(--text)]">
          Your Information
        </h2>

        <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
          Provide your contact details so we can confirm and reserve your
          appointment.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="flex min-w-0 items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium leading-relaxed text-red-500 sm:p-4"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />

          <span className="min-w-0 break-words">
            {error}
          </span>
        </div>
      )}

      {/* Form Fields */}
      <div className="min-w-0 space-y-4 sm:space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3.5 sm:p-5 md:p-6 shadow-sm">
        {/* Full Name */}
        <div className="min-w-0">
          <label
            htmlFor="booking-name"
            className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs"
          >
            Full Name <span className="text-[#C9A24D]">*</span>
          </label>

          <div className="relative mt-1.5 sm:mt-2">
            <User
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />

            <input
              id="booking-name"
              type="text"
              value={name}
              onChange={(e) =>
                onChange({ name: e.target.value })
              }
              placeholder="e.g. Juan Dela Cruz"
              autoComplete="name"
              className="min-h-[46px] sm:min-h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-3.5 text-base sm:text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D]/30"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="min-w-0">
          <label
            htmlFor="booking-phone"
            className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs"
          >
            Mobile Number <span className="text-[#C9A24D]">*</span>
          </label>

          <div className="relative mt-1.5 sm:mt-2">
            <Phone
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />

            <input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) =>
                onChange({ phone: e.target.value })
              }
              placeholder="0917 123 4567"
              autoComplete="tel"
              inputMode="tel"
              className="min-h-[46px] sm:min-h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-3.5 text-base sm:text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D]/30"
            />
          </div>

          <p className="mt-1.5 text-[10px] leading-relaxed text-[var(--text-faint)] sm:text-[11px]">
            Used for appointment SMS updates and studio verification.
          </p>
        </div>

        {/* Notes */}
        <div className="min-w-0">
          <label
            htmlFor="booking-notes"
            className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs"
          >
            Special Requests / Notes{" "}
            <span className="text-[10px] lowercase text-[var(--text-faint)]">
              (optional)
            </span>
          </label>

          <div className="relative mt-1.5 sm:mt-2">
            <MessageSquare
              size={16}
              className="pointer-events-none absolute left-3.5 top-3 text-[var(--text-faint)]"
            />

            <textarea
              id="booking-notes"
              rows={3}
              value={notes}
              onChange={(e) =>
                onChange({ notes: e.target.value })
              }
              placeholder="Tell us any hairstyle preferences, reference styles, or allergies..."
              className="min-h-[90px] w-full min-w-0 resize-y rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-3.5 text-base sm:text-sm leading-relaxed text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D]/30"
            />
          </div>
        </div>
      </div>

      {/* Appointment Summary Review Box */}
      <div className="min-w-0 rounded-2xl border border-[#C9A24D]/30 bg-[#C9A24D]/5 p-3.5 sm:p-5 shadow-sm">
        <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
          Review Appointment Details
        </h4>

        <div className="mt-3.5 grid min-w-0 gap-3 text-xs sm:grid-cols-2 sm:gap-3.5">
          {/* Service */}
          <div className="flex min-w-0 items-start gap-2 text-[var(--text-secondary)]">
            <Sparkles
              size={14}
              className="mt-0.5 shrink-0 text-[#C9A24D]"
            />

            <span className="min-w-0 break-words leading-relaxed">
              <strong className="text-[var(--text)]">
                {selectedService?.title || "Selected service"}
              </strong>{" "}
              {selectedService?.price !== undefined && (
                <> (₱{selectedService.price})</>
              )}
            </span>
          </div>

          {/* Date and Time */}
          <div className="flex min-w-0 items-start gap-2 text-[var(--text-secondary)]">
            <CalendarCheck
              size={14}
              className="mt-0.5 shrink-0 text-[#C9A24D]"
            />

            <span className="min-w-0 break-words leading-relaxed">
              <strong className="text-[var(--text)]">
                {formatDateNice(selectedDate)}
              </strong>{" "}
              at{" "}
              <strong className="text-[var(--text)]">
                {formatSlotLabel(selectedTime)}
              </strong>
            </span>
          </div>

          {/* Stylist */}
          <div className="flex min-w-0 items-start gap-2 text-[var(--text-secondary)]">
            <User
              size={14}
              className="mt-0.5 shrink-0 text-[#C9A24D]"
            />

            <span className="min-w-0 break-words leading-relaxed">
              Stylist:{" "}
              <strong className="text-[var(--text)]">
                {artist || "Any available"}
              </strong>
            </span>
          </div>

          {/* Payment summary */}
          <div className="flex min-w-0 items-start gap-2 text-[var(--text-secondary)]">
            <span className="shrink-0 text-[11px] font-semibold text-[#C9A24D]">
              Payment:
            </span>
            <span className="min-w-0 break-words leading-relaxed">
              {payment.label} — ₱{payment.amountPaid.toLocaleString("en-PH")} via GCash
              {payment.balanceDue > 0 && (
                <span className="text-[var(--text-muted)]">
                  {" "}· ₱{payment.balanceDue.toLocaleString("en-PH")} balance in-studio
                </span>
              )}
            </span>
          </div>
        </div>
      </div>


      {/* ── Step 4: GCash Payment ── */}
      <section className="min-w-0 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] p-3.5 sm:p-5">
        <div className="border-b border-[var(--border-light)] pb-3">
          <h3 className="font-serif text-base font-semibold text-[var(--text)] sm:text-lg">
            4. GCash Payment
          </h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--text-secondary)]">
            A GCash down payment is required to confirm your slot. Choose 50% deposit or pay the full amount upfront.
          </p>
        </div>

        {/* Payment type selector */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChangePayment("downpayment")}
            className={`relative flex flex-col rounded-2xl border-2 p-4 text-left transition-all focus:outline-none ${
              paymentType === "downpayment"
                ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D]"
                : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50"
            }`}
          >
            {paymentType === "downpayment" && (
              <span className="absolute -top-2.5 right-3 rounded-full bg-[#C9A24D] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                Selected
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">50% Down Payment</span>
            <span className="mt-1 font-serif text-xl font-bold text-[#C9A24D]">
              ₱{calculatePayment(selectedService?.price ?? 0, "downpayment").amountPaid.toLocaleString("en-PH")}
            </span>
            <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
              Pay half now. ₱{calculatePayment(selectedService?.price ?? 0, "downpayment").balanceDue.toLocaleString("en-PH")} balance in-studio.
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangePayment("full")}
            className={`relative flex flex-col rounded-2xl border-2 p-4 text-left transition-all focus:outline-none ${
              paymentType === "full"
                ? "border-[#C9A24D] bg-[#C9A24D]/10 ring-1 ring-[#C9A24D]"
                : "border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C9A24D]/50"
            }`}
          >
            {paymentType === "full" && (
              <span className="absolute -top-2.5 right-3 rounded-full bg-[#C9A24D] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                Selected
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">100% Full Payment</span>
            <span className="mt-1 font-serif text-xl font-bold text-[#C9A24D]">
              ₱{(selectedService?.price ?? 0).toLocaleString("en-PH")}
            </span>
            <span className="mt-1 text-[11px] text-[var(--text-secondary)]">
              Pay the full amount now. No balance due in-studio.
            </span>
          </button>
        </div>

        {/* GCash QR Card */}
        {selectedService && (
          <GCashQRCard
            amount={payment.amountPaid}
            paymentLabel={payment.label}
            customerName={name}
          />
        )}

        {/* Warning notice */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>
            <strong>Important:</strong> Your slot is only confirmed after GCash payment is verified by the studio. <strong>No payment = no confirmed booking.</strong>
          </span>
        </div>
      </section>


      {/* Action Buttons */}
      <div className="flex min-w-0 flex-col-reverse gap-3 border-t border-[var(--border-light)] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-xs font-semibold tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[#C9A24D] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:justify-start"
        >
          <ChevronLeft
            size={16}
            className="shrink-0"
          />

          <span>BACK TO DATE &amp; TIME</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn-gold flex min-h-[48px] w-full items-center justify-center gap-2 px-5 py-3 text-center text-xs tracking-wider shadow-[0_4px_25px_rgba(201,162,77,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <CheckCircle2
            size={16}
            className="shrink-0"
          />

          <span>
            {isSubmitting ? "CONFIRMING..." : "I'VE PAID — CONFIRM BOOKING"}
          </span>
        </button>
      </div>
    </div>
  );
}