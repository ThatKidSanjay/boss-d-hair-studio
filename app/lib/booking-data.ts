export type PaymentType = "downpayment" | "full";
export type PaymentStatus = "verified" | "pending";

export interface Booking {
  id: string;
  code: string;
  serviceId: string;
  serviceTitle: string;
  price: number;
  paymentType: PaymentType;
  amountPaid: number;
  balanceDue: number;
  gcashRef: string;
  gcashAccountName?: string;
  receiptImage?: string;
  paymentStatus: PaymentStatus;
  artist: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
  createdAt: number;
}

export const GCASH_ACCOUNT = {
  name: "BOSS D HAIR STUDIO / David Arreza",
  shortName: "BOSS D HAIR STUDIO",
  rawNumber: "09171234567",
  formattedNumber: "0917 123 4567",
  qrPayloadPrefix: "00020101021128500014ph.com.gcash",
};

export function calculatePayment(price: number, type: PaymentType) {
  if (type === "full") {
    return {
      type,
      percentage: 100,
      amountPaid: price,
      balanceDue: 0,
      label: "100% Full Payment",
    };
  }
  // 50% down payment
  const amountPaid = Math.round((price * 0.5) * 100) / 100;
  const balanceDue = Math.round((price - amountPaid) * 100) / 100;
  return {
    type,
    percentage: 50,
    amountPaid,
    balanceDue,
    label: "50% Down Payment (Slot Deposit)",
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
  popular?: boolean;
}

export interface StylistItem {
  id: string;
  name: string;
  role: string;
  specialty: string;
  badge?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "botox",
    title: "Botox",
    price: 1499,
    duration: 45,
    description: "Precision haircut tailored to your face shape, styled with premium pomade, plus refreshing hot towel.",
    popular: true,
  },
  {
    id: "collagen",
    title: "Collagen",
    price: 1999,
    duration: 60,
    description: "Wash, customized blowout, texture cut, and bespoke styling with luxury salon finish.",
  },
  {
    id: "cystein",
    title: "Cystein",
    price: 2499,
    duration: 75,
    description: "Deep conditioning, scalp revitalization, and damage repair therapy for silky hair.",
  },
  {
    id: "protein",
    title: "Protein",
    price: 3499,
    duration: 90,
    description: "Full service cut, beard sculpting, scalp massage, hair treatment, and complimentary beverage.",
    popular: true,
  },
];

export const ARTISTS: StylistItem[] = [
  {
    id: "any",
    name: "Any available",
    role: "Fastest Booking",
    specialty: "First available master stylist",
    badge: "Recommended",
  },
  {
    id: "boss-d",
    name: "Boss D",
    role: "Founder & Master Barber",
    specialty: "10+ yrs · Signature fades & tailored silhouettes",
  },
  {
    id: "Test",
    name: "Test",
    role: "Stylist",
    specialty: "Color harmony, blowout & texture treatments",
  },
  {
    id: "TESTING",
    name: "TESTING",
    role: "Stylist",
    specialty: "Beard sculpting, razor fades & precision line-ups",
  },
];

export const OPEN_HOURS = { start: 9, end: 20 };
export const SLOT_MINUTES = 30;
export const STORAGE_KEY = "bdhs_bookings_v1";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isSunday(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  return d.getDay() === 0;
}

export function isPast(dateStr: string, timeStr: string): boolean {
  const now = new Date();
  const d = new Date(`${dateStr}T${timeStr}:00`);
  return d.getTime() < now.getTime() - 60_000;
}

export function generateSlots(dateStr: string): string[] {
  const slots: string[] = [];
  for (let h = OPEN_HOURS.start; h < OPEN_HOURS.end; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      if (h === OPEN_HOURS.end - 1 && m + SLOT_MINUTES > 60) break;
      slots.push(`${pad(h)}:${pad(m)}`);
    }
  }
  return slots;
}

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getBookedSlots(dateStr: string): string[] {
  const bookings = loadBookings();
  return bookings
    .filter((b) => b.date === dateStr)
    .map((b) => b.time);
}

export function getAvailableSlots(dateStr: string): string[] {
  const all = generateSlots(dateStr);
  const booked = getBookedSlots(dateStr);
  return all.filter((s) => !booked.includes(s) && !isPast(dateStr, s));
}

export function getBookedCount(dateStr: string): number {
  return generateSlots(dateStr).filter((s) =>
    getBookedSlots(dateStr).includes(s)
  ).length;
}

export function saveBooking(b: Omit<Booking, "id" | "code" | "createdAt">): Booking {
  const bookings = loadBookings();
  const code = `BD-${Date.now().toString(36).toUpperCase().slice(-4)}`;
  const entry: Booking = {
    ...b,
    id: `bk_${Date.now()}`,
    code,
    createdAt: Date.now(),
  };
  bookings.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return entry;
}

export function formatSlotLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${pad(m)} ${period}`;
}

export function isOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay();
  if (day === 0) return false;
  const hour = now.getHours();
  return hour >= OPEN_HOURS.start && hour < OPEN_HOURS.end;
}

export function formatDateNice(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function futureDates(count: number): string[] {
  const dates: string[] = [];
  const d = new Date();
  // Include today if it's Monday-Saturday and before closing time
  if (d.getDay() !== 0 && d.getHours() < OPEN_HOURS.end) {
    dates.push(dateKey(d));
  }
  while (dates.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) {
      dates.push(dateKey(d));
    }
  }
  return dates;
}
