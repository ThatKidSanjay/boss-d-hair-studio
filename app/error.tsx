"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-6 text-center text-[var(--text)]">
      <p className="text-[10px] tracking-[0.35em] text-[#E5C77A]">
        SOMETHING WENT WRONG
      </p>
      <h1 className="mt-6 font-serif text-5xl leading-tight text-[var(--text)] sm:text-6xl">
        An unexpected <span className="gold-text">error</span> occurred.
      </h1>
      <p className="mt-8 max-w-[420px] text-sm leading-7 text-[var(--text-secondary)]">
        {error.message || "Please try again."} If the problem persists,
        call us at +63 912 345 6789.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn-gold mt-10"
      >
        <span>TRY AGAIN</span>
      </button>
    </main>
  );
}