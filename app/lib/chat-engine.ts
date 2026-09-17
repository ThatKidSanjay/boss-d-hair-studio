import {
  SERVICES,
  isOpenNow,
  getAvailableSlots,
  formatDateNice,
  futureDates,
  formatSlotLabel,
  saveBooking,
} from "./booking-data";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  options?: string[];
  cta?: { label: string; href: string };
}

export interface ChatState {
  step: "idle" | "service" | "date" | "time" | "name" | "phone";
  draft: {
    serviceId?: string;
    serviceTitle?: string;
    price?: number;
    date?: string;
    time?: string;
    name?: string;
    phone?: string;
  };
}

let counter = 0;
export const nextId = () => `c${Date.now()}_${counter++}`;
const L = (s: string) => s.toLowerCase();

function parseDateHint(input: string): string | null {
  const t = new Date();
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  const add = (n: number) => {
    const d = new Date(t);
    d.setDate(d.getDate() + n);
    return fmt(d);
  };
  const li = L(input);
  if (/today|asap|now/.test(li)) return add(0);
  if (/tomorrow|tmrw|tmr/.test(li)) return add(1);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  for (let i = 0; i < 7; i++) {
    if (li.includes(days[i])) return add(((i - t.getDay() + 7) % 7) || 7);
  }
  return null;
}

function parseTimeHint(input: string): string | null {
  const m = L(input).match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const period = m[3];
  if (period === "pm" && h < 12) h += 12;
  if (period === "am" && h === 12) h = 0;
  if (!period && h < 7) h += 12;
  if (h < 9 || h >= 20) return null;
  const closest = [0, 15, 30, 45].reduce((a, c) =>
    Math.abs(c - min) < Math.abs(a - min) ? c : a
  );
  return `${String(h).padStart(2, "0")}:${String(closest).padStart(2, "0")}`;
}

function matchService(input: string) {
  const li = L(input);
  return SERVICES.find(
    (s) =>
      li.includes(L(s.title)) ||
      li.includes(s.id.replace(/-/g, " ")) ||
      (li.includes("cut") && s.id === "signature-cut") ||
      (li.includes("style") && s.id === "hair-styling") ||
      (li.includes("treat") && s.id === "hair-treatment") ||
      (li.includes("premium") && s.id === "premium-experience")
  );
}

function makeDateOpts(): string[] {
  return futureDates(6).map(formatDateNice);
}

function makeTimeOpts(dateStr: string): string[] {
  const slots = getAvailableSlots(dateStr);
  const r = slots.slice(0, 6).map(formatSlotLabel);
  if (slots.length > 6) r.push("More times...");
  return r;
}

function resolveDateOpt(opt: string): string | null {
  return futureDates(6).find((d) => formatDateNice(d) === opt) || null;
}

function resolveTimeOpt(opt: string): string | null {
  if (opt === "More times...") return null;
  for (let h = 9; h < 20; h++) {
    for (let m = 0; m < 60; m += 30) {
      const slot = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      if (formatSlotLabel(slot) === opt) return slot;
    }
  }
  return null;
}

export function getWelcome(): ChatMessage {
  return {
    id: nextId(),
    role: "bot",
    text: `Hi! I'm Boss D's AI assistant. 👋\n${
      isOpenNow()
        ? "We're open right now!"
        : "We're currently closed — but you can still book an appointment!"
    }\n\nI can help you explore services, check prices, find store hours, or book a visit in real-time.`,
    options: [
      "Services & Prices",
      "Book an appointment",
      "Store hours",
      "Location",
      "Talk to a human",
    ],
  };
}

export function respond(
  input: string,
  state: ChatState
): { replies: ChatMessage[]; state: ChatState } {
  const t = input.trim();
  const li = L(t);
  const replies: ChatMessage[] = [];
  const push = (msg: Partial<ChatMessage>) =>
    replies.push({ id: nextId(), role: "bot", text: "", ...msg });
  const ns = { ...state, draft: { ...state.draft } };

  // — Booking flow steps —
  if (ns.step === "service") {
    const svc = matchService(t);
    if (svc) {
      ns.draft.serviceId = svc.id;
      ns.draft.serviceTitle = svc.title;
      ns.draft.price = svc.price;
      ns.step = "date";
      push({
        text: `Great choice! **${svc.title}** (₱${svc.price}, ~${svc.duration} min).\n\nWhen would you like to come in?`,
        options: ["Today", "Tomorrow", ...makeDateOpts().slice(0, 4)],
      });
    } else {
      push({
        text: "Which service would you like?",
        options: SERVICES.map((s) => s.title),
      });
    }
    return { replies, state: ns };
  }

  if (ns.step === "date") {
    const dateStr = resolveDateOpt(t) || parseDateHint(t);
    if (dateStr) {
      if (getAvailableSlots(dateStr).length === 0) {
        ns.step = "idle";
        push({
          text: `No available slots on ${formatDateNice(
            dateStr
          )}. Would you like to try another date?`,
          options: ["Try another day", "Go back to services"],
        });
      } else {
        ns.draft.date = dateStr;
        ns.step = "time";
        push({
          text: `Available slots on **${formatDateNice(dateStr)}**:`,
          options: makeTimeOpts(dateStr),
        });
      }
    } else {
      push({
        text: 'Please select a date from the options or type e.g. "tomorrow":',
        options: ["Today", "Tomorrow", ...makeDateOpts().slice(0, 3)],
      });
    }
    return { replies, state: ns };
  }

  if (ns.step === "time") {
    const timeStr = resolveTimeOpt(t) || parseTimeHint(t);
    if (t === "More times..." && ns.draft.date) {
      push({
        text: `Additional times for ${formatDateNice(ns.draft.date)}:`,
        options: getAvailableSlots(ns.draft.date)
          .slice(6, 12)
          .map(formatSlotLabel),
      });
    } else if (
      timeStr &&
      ns.draft.date &&
      getAvailableSlots(ns.draft.date).includes(timeStr)
    ) {
      ns.draft.time = timeStr;
      ns.step = "name";
      push({
        text: `Got it! **${formatSlotLabel(timeStr)}** on ${formatDateNice(
          ns.draft.date
        )}.\n\nMay I have your name?`,
      });
    } else {
      push({
        text: 'Please pick a time from the list or type e.g. "3:00 PM":',
        options: ns.draft.date ? makeTimeOpts(ns.draft.date) : [],
      });
    }
    return { replies, state: ns };
  }

  if (ns.step === "name") {
    if (t.length >= 2 && t.length <= 50) {
      ns.draft.name = t;
      ns.step = "phone";
      push({
        text: `Nice to meet you, **${t}**! 🤝\n\nWhat's your mobile number? (e.g. 0917 123 4567)`,
      });
    } else {
      push({ text: "Please enter your name (2–50 characters)." });
    }
    return { replies, state: ns };
  }

  if (ns.step === "phone") {
    const phoneClean = t.replace(/[\s\-()+ ]/g, "");
    if (/^(09|\+639|639)\d{9}$/.test(phoneClean) || /^\d{10,11}$/.test(phoneClean)) {
      ns.draft.phone = phoneClean;
      ns.step = "idle";
      const b = saveBooking({
        serviceId: ns.draft.serviceId!,
        serviceTitle: ns.draft.serviceTitle!,
        price: ns.draft.price!,
        artist: "Any available",
        date: ns.draft.date!,
        time: ns.draft.time!,
        name: ns.draft.name!,
        phone: phoneClean,
        notes: "Booked via chat assistant",
      });
      push({
        text: `🎉 **Booking Confirmed!**\n\n📋 Reference: **${b.code}**\n✂️ Service: **${b.serviceTitle}**\n📅 Date: **${formatDateNice(b.date)}** at **${formatSlotLabel(b.time)}**\n👤 Name: **${b.name}**\n💰 Total: **₱${b.price}**\n\nWe look forward to seeing you!`,
        cta: { label: "View Booking Page", href: "/book" },
        options: ["Book another", "Talk to a human", "Thanks!"],
      });
      ns.draft = {};
    } else {
      push({
        text: "Please enter a valid Philippine mobile number (e.g. 09171234567).",
      });
    }
    return { replies, state: ns };
  }
  // — Intent detection (idle) —
  const pickService = () => {
    ns.step = "service";
    push({
      text: "Let's get you booked! Which service would you like?",
      options: SERVICES.map((s) => s.title),
    });
  };

  const mainMenu = () =>
    push({
      text: "Here's what I can help with:",
      options: [
        "Services & Prices",
        "Book an appointment",
        "Store hours",
        "Location",
        "Talk to a human",
      ],
    });

  if (/service|price|menu|offer/i.test(li)) {
    push({
      text: `Here are our studio services:\n\n${SERVICES.map(
        (s) => `• **${s.title}** — ₱${s.price} (${s.duration} min)\n  ${s.description}`
      ).join("\n\n")}\n\nWould you like to book one?`,
      options: ["Book an appointment", "Back to main menu"],
    });
  } else if (/book|appointment|reserve|schedule|paschedul/i.test(li)) {
    pickService();
  } else if (/hour|open|close|when/i.test(li)) {
    push({
      text: `🕒 **Business Hours**\nMonday – Saturday: 9:00 AM – 8:00 PM\nSunday: Closed\n\n${
        isOpenNow()
          ? "✅ We're currently **open**!"
          : "⏳ We're currently **closed**."
      }\nWalk-ins are always welcome!`,
      options: ["Book an appointment", "Location"],
    });
  } else if (/where|location|address|map|malolos/i.test(li)) {
    push({
      text: "📍 **Boss D Hair Studio**\n4097 Gumamela Street, Purok 4, Cofradia,\nCity of Malolos, Bulacan 3000\n\nWe're easy to find on Google Maps!",
      cta: {
        label: "Open in Maps",
        href: "https://maps.app.goo.gl/akvLZBQ9r2TTk9148",
      },
      options: ["Book an appointment", "Store hours"],
    });
  } else if (/phone|call|contact|number|tawag/i.test(li)) {
    push({
      text: "📞 **Contact Us**\nPhone: +63 912 345 6789\nFacebook: Boss D Hair Studio\n\nCall or message us anytime!",
      cta: { label: "Call Now", href: "tel:+639123456789" },
      options: ["Book an appointment", "Location"],
    });
  } else if (/product|shop|buy|merch/i.test(li)) {
    push({
      text: "🛍️ **Boss D Collection**\nWe carry premium hair and beauty products selected to complement your salon experience.\n\nVisit us in-store to browse the collection.",
      options: ["Book an appointment", "Location"],
    });
  } else if (/human|agent|person|talk/i.test(li)) {
    push({
      text: "You can reach Boss D directly:\n\n📞 +63 912 345 6789\n💬 In-studio consultation\n📍 4097 Gumamela St., Malolos\n\nMon–Sat · 9:00 AM – 8:00 PM",
      cta: { label: "Call Now", href: "tel:+639123456789" },
    });
  } else if (/thank|salamat|nice|great|awesome|cool/i.test(li)) {
    push({
      text: "You're welcome! 😊 Anything else I can help with?",
      options: [
        "Book an appointment",
        "Services & Prices",
        "Back to main menu",
      ],
    });
  } else if (/try another day|go back to services/i.test(li)) {
    ns.step = "idle";
    pickService();
  } else if (/main menu|back|start|hi|hello|hey/i.test(li)) {
    if (/book an appointment/i.test(li)) pickService();
    else mainMenu();
  } else {
    push({
      text: "I can help with:\n• Services & prices\n• Booking appointments\n• Store hours & location\n• Contact info\n\nWhat would you like to know?",
      options: [
        "Services & Prices",
        "Book an appointment",
        "Store hours",
        "Location",
      ],
    });
  }

  return { replies, state: ns };
}
