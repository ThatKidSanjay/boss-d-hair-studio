"use client";

import ScrollReveal from "../ScrollReveal";

export default function About() {
  return (
    <section id="about" className="border-y border-[var(--border-light)] bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal direction="left">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A24D]" />
                <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]">
                  ABOUT BOSS D
                </span>
              </div>
              <h2 className="font-serif text-5xl leading-tight text-[var(--text)] sm:text-6xl">
                Beauty with{" "}
                <span className="gold-text">precision.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div>
              <p className="font-serif text-2xl leading-relaxed text-[var(--text)]">
                &ldquo;Your style is a statement. We make sure it speaks
                beautifully.&rdquo;
              </p>
              <p className="mt-8 max-w-[650px] text-sm leading-8 text-[var(--text-secondary)]">
                From the first consultation to the final finish,
                Boss D Hair Studio focuses on creating an experience
                where craftsmanship and beauty come together. We believe
                every client deserves a look that reflects their personality
                and elevates their confidence.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
                <div>
                  <p className="font-serif text-3xl text-[#C9A24D]">01</p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-[var(--text-body)]">
                    CONSULTATION
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                    Personalized style assessment
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#C9A24D]">02</p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-[var(--text-body)]">
                    CRAFTSMANSHIP
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                    Precision techniques & detail
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#C9A24D]">03</p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-[var(--text-body)]">
                    ELEVATED FINISH
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                    Polished results, every time
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
