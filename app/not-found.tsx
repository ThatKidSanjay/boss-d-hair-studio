import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-6 text-center text-[var(--text)]">
      <p className="text-[10px] tracking-[0.35em] text-[#E5C77A]">
        ERROR 404
      </p>
      <h1 className="mt-6 font-serif text-7xl leading-none text-[var(--text)] sm:text-9xl">
        <span className="gold-text">Lost</span> your style?
      </h1>
      <p className="mt-8 max-w-[420px] text-sm leading-7 text-[var(--text-secondary)]">
        The page you are looking for doesn&apos;t exist. But your next great
        look is only a click away.
      </p>
      <Link
        href="/"
        className="btn-gold mt-10"
      >
        <span>BACK TO HOME</span>
      </Link>
    </main>
  );
}