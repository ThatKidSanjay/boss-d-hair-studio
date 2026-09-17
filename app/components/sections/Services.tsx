"use client";

import ScrollReveal from "../ScrollReveal";

const services = [
  {
    number: "01",
    title: "BOTOX",
    description:
      "Precision cutting tailored to your face shape, lifestyle, and personal style.",
    price: "\u20B11,499",
    duration: "45 MIN",
  },
  {
    number: "02",
    title: "COLLAGEN",
    description:
      "Professional styling designed to create a polished and effortless finish.",
    price: "\u20B11,999",
    duration: "60 MIN",
  },
  {
    number: "03",
    title: "CYSTEIN",
    description:
      "Restorative treatments created to improve the health, texture, and shine of your hair.",
    price: "\u20B12,499",
    duration: "75 MIN",
  },
  {
    number: "04",
    title: "PROTEIN",
    description:
      "A complete salon experience combining styling, care, and personalized attention.",
    price: "\u20B13,499",
    duration: "90 MIN",
  },
  {
    number: "05",
    title: "REBOND WITH BRAZILIAN",
    description:
      "A complete salon experience combining styling, care, and personalized attention.",
    price: "\u20B12,499",
    duration: "90 MIN",
  },
  {
    number: "06",
    title: "BALAYAGE WITH BRAZILIAN",
    description:
      "A complete salon experience combining styling, care, and personalized attention.",
    price: "\u20B13,499",
    duration: "90 MIN",
  },
  {
    number: "07",
    title: "COLOR",
    description:
      "A complete salon experience combining styling, care, and personalized attention.",
    price: "\u20B12,499",
    duration: "90 MIN",
  },
  {
    number: "08",
    title: "5&1 TREATMENT",
    description:
      "A complete salon experience combining styling, care, and personalized attention.",
    price: "\u20B13,999",
    duration: "90 MIN",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[var(--bg)]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <ScrollReveal>
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A24D]" />
                <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]">
                  OUR SERVICES
                </span>
              </div>
              <h2 className="font-serif text-5xl text-[var(--text)] sm:text-6xl">
                Crafted for{" "}
                <span className="gold-text">you.</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="max-w-[400px] text-sm leading-7 text-[var(--text-secondary)]">
              Professional salon services with attention to detail,
              quality, and your individual style.
            </p>
          </ScrollReveal>
        </div>

        <div className="border-t border-[var(--border)]">
          {services.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 100}>
              <div className="group grid gap-6 border-b border-[var(--border)] py-9 transition-colors hover:bg-[var(--bg-hover)] lg:grid-cols-[80px_1fr_240px_120px]">
                <span className="font-serif text-lg text-[#C9A24D]">
                  {service.number}
                </span>
                <div>
                  <h3 className="font-serif text-3xl text-[var(--text)] transition-colors group-hover:text-[#C9A24D]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[620px] text-sm leading-7 text-[var(--text-secondary)]">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center text-xs tracking-[0.15em] text-[var(--text-muted)]">
                  {service.duration}
                </div>
                <div className="flex items-center font-serif text-xl text-[#C9A24D]">
                  {service.price}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
