export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <div className="shimmer h-16 w-16 rounded-full border border-[var(--border-light)]" />
      <p className="mt-6 text-[10px] tracking-[0.35em] text-[#E5C77A]">
        BOSS D HAIR STUDIO
      </p>
      <p className="mt-3 text-xs tracking-[0.2em] text-[var(--text-muted)]">
        LOADING YOUR EXPERIENCE
      </p>
    </main>
  );
}