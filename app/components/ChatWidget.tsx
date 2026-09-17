"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MessageCircle, X, Send, Sparkles, CalendarCheck, MapPin, Phone, Clock,
} from "lucide-react";
import { getWelcome, respond, type ChatMessage, type ChatState } from "../lib/chat-engine";

const INIT_STATE: ChatState = { step: "idle", draft: {} };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>(INIT_STATE);
  const [unread, setUnread] = useState(0);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startChat = useCallback(() => {
    if (started) return;
    setStarted(true);
    setMessages([getWelcome()]);
  }, [started]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const userMsg: ChatMessage = { id: `u${Date.now()}`, role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setChatState((prev) => {
        const { replies, state } = respond(trimmed, prev);
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages((curr) => [...curr, ...replies]);
        }, 700 + Math.random() * 500);
        return state;
      });
      setInput("");
    },
    []
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [open]);

  const onToggle = () => {
    setOpen((v) => {
      if (!v) {
        startChat();
        setUnread(0);
      } else {
        setUnread((u) => (messages.length && started ? u + 1 : u));
      }
      return !v;
    });
  };

  return (
<>
    {/* Chat panel */}
    <div
      className={`fixed bottom-24 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] chat-panel transition-all duration-300 sm:right-6 ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ height: "min(72vh, 560px)" }}
      role="dialog"
      aria-label="Boss D chat assistant"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#8F6B28] via-[#C9A24D] to-[#E5C77A] px-5 py-4">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] font-serif text-lg font-semibold text-[#E5C77A]">
          D
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]">
            BOSS D ASSISTANT
            <Sparkles size={13} />
          </p>
          <p className="text-[11px] font-medium text-[#0A0A0A]/70">
            Usually replies instantly
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A0A0A]/70 transition-colors hover:bg-[#0A0A0A]/10"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-[var(--bg)] px-4 py-5">
        {messages.map((m) => (
          <div key={m.id} className={`chat-msg-in flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-[#C9A24D] font-medium text-[#0A0A0A]"
                  : "rounded-bl-sm border border-[var(--border-light)] bg-[var(--bg-elevated)] text-[var(--text)]"
              }`}
            >
              {m.text}
            </div>

            {/* In-message dynamic options */}
            {m.options && m.options.length > 0 && (
              <div className="mt-2 flex max-w-[90%] flex-wrap gap-1.5">
                {m.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => sendMessage(opt)}
                    className="rounded-full border border-[#C9A24D]/50 bg-[var(--bg-elevated)] px-3 py-1 text-[11px] font-medium text-[#C9A24D] transition-all hover:border-[#C9A24D] hover:bg-[#C9A24D] hover:text-[#0A0A0A]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* In-message CTA */}
            {m.cta && (
              <a
                href={m.cta.href}
                className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#C9A24D] px-4 py-2 text-xs font-bold text-[#0A0A0A] transition-transform hover:scale-105"
              >
                <span>{m.cta.label}</span>
              </a>
            )}
          </div>
        ))}

        {typing && (
          <div className="chat-msg-in flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[var(--border-light)] bg-[var(--bg-elevated)] px-4 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#C9A24D]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#C9A24D]" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#C9A24D]" />
            </div>
          </div>
        )}
      </div>

      {/* Quick replies */}
      <div className="border-t border-[var(--border-light)] bg-[var(--bg)] px-4 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {[
            "Services & Prices",
            "Book an appointment",
            "Store hours",
            "Location",
          ].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => sendMessage(opt)}
              className="rounded-full border border-[#C9A24D]/40 px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#C9A24D] transition-all hover:border-[#C9A24D] hover:bg-[#C9A24D] hover:text-[#0A0A0A]"
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
            placeholder="Type a message..."
            aria-label="Chat message"
            className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-[13px] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[#C9A24D]"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A24D] text-[#0A0A0A] transition-all hover:bg-[#E5C77A]"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-4 text-[10px] tracking-wide text-[var(--text-faint)]">
          <a href="tel:+639123456789" className="flex items-center gap-1 transition-colors hover:text-[#C9A24D]">
            <Phone size={11} /> CALL
          </a>
          <a href="/book" className="flex items-center gap-1 transition-colors hover:text-[#C9A24D]">
            <CalendarCheck size={11} /> BOOK
          </a>
          <a href="https://maps.app.goo.gl/akvLZBQ9r2TTk9148" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-[#C9A24D]">
            <MapPin size={11} /> MAP
          </a>
          <span className="flex items-center gap-1">
            <Clock size={11} /> 9AM–8PM
          </span>
        </div>
      </div>
    </div>

    {/* Launcher */}
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A24D] to-[#8F6B28] text-[#0A0A0A] shadow-[0_8px_30px_rgba(201,162,77,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_40px_rgba(201,162,77,0.5)]"
    >
      {open ? <X size={22} /> : <MessageCircle size={22} strokeWidth={1.8} />}
      {!open && unread > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0A0A0A] px-1 text-[9px] font-bold text-[#E5C77A]">
          {unread}
        </span>
      )}
    </button>
  </>
  );
}
