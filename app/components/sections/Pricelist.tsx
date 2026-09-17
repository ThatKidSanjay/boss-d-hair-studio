import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

export default function Pricelist() {
  return (
    <section id="pricelist" className="bg-[var(--bg)]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal>
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A24D]" />
                <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]">
                  FULL PRICE LIST
                </span>
              </div>
              <h2 className="font-serif text-5xl text-[var(--text)] sm:text-6xl">
                Transparent{" "}
                <span className="gold-text">pricing,</span>{" "}
                always.
              </h2>
            </div>
            <p className="max-w-[400px] text-sm leading-7 text-[var(--text-secondary)]">
              View our complete menu of services with clear, upfront pricing.
              No hidden charges — just honest, premium service.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto max-w-[860px]">
            <div className="group relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
              <div className="relative overflow-hidden">
                <Image
                  src="/image/pricelist.jpg"
                  alt="Boss D Hair Studio full price list"
                  width={1200}
                  height={1500}
                  className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 900px) 100vw, 860px"
                />
              </div>
            </div>
            <p className="mt-6 text-center text-[11px] tracking-[0.12em] text-[var(--text-faint)]">
              PRICES MAY VARY WITH ADD-ON SERVICES · © BOSS D HAIR STUDIO
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}