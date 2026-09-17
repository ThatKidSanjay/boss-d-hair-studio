"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  SERVICES,
  getAvailableSlots,
  getBookedCount,
  futureDates,
  saveBooking,
  loadBookings,
  type Booking,
} from "../lib/booking-data";
import StepService from "./booking/StepService";
import StepDateTime from "./booking/StepDateTime";
import StepDetails from "./booking/StepDetails";
import BookingSuccess from "./booking/BookingSuccess";
import BookingSidebar from "./booking/BookingSidebar";

interface FormState {
  serviceId: string;
  artist: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}

const EMPTY: FormState = {
  serviceId: "",
  artist: "Any available",
  date: "",
  time: "",
  name: "",
  phone: "",
  notes: "",
};

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [available, setAvailable] = useState<string[]>([]);
  const [dates] = useState(() => futureDates(14));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncedAt, setSyncedAt] = useState(() => new Date());
  const [lastBookings, setLastBookings] = useState<Booking[]>(() =>
    typeof window === "undefined" ? [] : loadBookings()
  );

  useEffect(() => {
    if (dates.length > 0 && !form.date) {
      setForm((prev) => ({ ...prev, date: dates[0] }));
    }
  }, [dates, form.date]);

  const refresh = useCallback(() => {
    setLastBookings(typeof window === "undefined" ? [] : loadBookings());
    setSyncedAt(new Date());
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bdhs_bookings_v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    const timer = setInterval(refresh, 30000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(timer);
    };
  }, [refresh]);

  useEffect(() => {
    if (form.date) {
      setAvailable(getAvailableSlots(form.date));
    } else {
      setAvailable([]);
    }
  }, [form.date, lastBookings]);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === form.serviceId),
    [form.serviceId]
  );

  const totalSlots = useMemo(() => {
    if (!form.date) return 0;
    return getAvailableSlots(form.date).length + getBookedCount(form.date);
  }, [form.date, lastBookings]);

  const confirmBooking = () => {
    if (!form.serviceId) {
      setError("Please select a service.");
      return;
    }
    if (!form.date || !form.time) {
      setError("Please choose an appointment date and time.");
      return;
    }
    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    const phoneClean = form.phone.replace(/[\s\-()+ ]/g, "");
    if (!/^(09|\+639|639)\d{9}$/.test(phoneClean) && !/^\d{10,11}$/.test(phoneClean)) {
      setError("Please enter a valid Philippine mobile number (e.g. 0917 123 4567).");
      return;
    }

    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const booking = saveBooking({
        serviceId: form.serviceId,
        serviceTitle: selectedService!.title,
        price: selectedService!.price,
        artist: form.artist || "Any available",
        date: form.date,
        time: form.time,
        name: form.name.trim(),
        phone: phoneClean,
        notes: form.notes.trim(),
      });
      setConfirmed(booking);
      setIsSubmitting(false);
      refresh();
    }, 400);
  };

  const reset = () => {
    setForm(EMPTY);
    setStep(0);
    setConfirmed(null);
    setError("");
  };
  const steps = ["Choose Service", "Date & Stylist", "Your Details"];
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      {/* ===== Left: wizard steps ===== */}
      <div>
        {confirmed ? (
          <BookingSuccess
            booking={confirmed}
            service={selectedService}
            onReset={reset}
          />
        ) : (
          <>
            {/* Step indicator */}
            <div className="mb-8 flex items-center gap-2 sm:gap-4">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                      i === step
                        ? "border-[#C9A24D] bg-[#C9A24D] text-[#0A0A0A] shadow-[0_2px_10px_rgba(201,162,77,0.3)]"
                        : i < step
                          ? "border-[#C9A24D] bg-[#C9A24D]/20 text-[#C9A24D]"
                          : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                    }`}
                  >
                    {i < step ? <Check size={15} strokeWidth={3} /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[10px] font-bold tracking-[0.15em] uppercase truncate ${
                        i === step
                          ? "text-[#C9A24D]"
                          : i < step
                            ? "text-[var(--text)]"
                            : "text-[var(--text-faint)]"
                      }`}
                    >
                      STEP {i + 1}
                    </span>
                    <span
                      className={`hidden text-xs truncate sm:block ${
                        i <= step ? "text-[var(--text)] font-medium" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors ${
                        i < step ? "bg-[#C9A24D]" : "bg-[var(--border)]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8">
              {step === 0 && (
                <StepService
                  selectedId={form.serviceId}
                  onSelect={(s) => setForm((p) => ({ ...p, serviceId: s.id }))}
                  onNext={() => setStep(1)}
                />
              )}

              {step === 1 && (
                <StepDateTime
                  artist={form.artist}
                  selectedDate={form.date}
                  selectedTime={form.time}
                  dates={dates}
                  availableSlots={available}
                  onSelectArtist={(artist) => setForm((p) => ({ ...p, artist }))}
                  onSelectDate={(date) => setForm((p) => ({ ...p, date }))}
                  onSelectTime={(time) => setForm((p) => ({ ...p, time }))}
                  onBack={() => setStep(0)}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <StepDetails
                  name={form.name}
                  phone={form.phone}
                  notes={form.notes}
                  artist={form.artist}
                  selectedDate={form.date}
                  selectedTime={form.time}
                  selectedService={selectedService}
                  error={error}
                  isSubmitting={isSubmitting}
                  onChange={(patch) => setForm((p) => ({ ...p, ...patch }))}
                  onBack={() => setStep(1)}
                  onSubmit={confirmBooking}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* ===== Right: order summary sidebar ===== */}
      <BookingSidebar
        selectedService={selectedService}
        artist={form.artist}
        selectedDate={form.date}
        selectedTime={form.time}
        availableCount={available.length}
        totalSlots={totalSlots}
        syncedAt={syncedAt}
      />
    </div>
  );
}