export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 overflow-hidden px-5 pb-20 pt-32 md:pb-24 md:pt-40 lg:px-10"
    >
      <div className="mx-auto grid min-h-[76vh] w-full max-w-[118rem] items-end gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.58fr)]">
        <div>
          <div className="mb-8 flex w-fit items-center rounded-[8px] border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Claude Code + Codex
          </div>

          <h1 className="max-w-6xl font-serif text-[clamp(4.4rem,13vw,13.5rem)] leading-[0.78] tracking-tight text-[var(--color-ink)]">
            <span className="block">UI polish</span>
            <span className="ml-[8vw] block italic text-[var(--color-accent)] md:ml-[14vw]">
              skills
            </span>
            <span className="block">that compound.</span>
          </h1>

          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
            <p className="max-w-xl font-sans text-lg font-medium leading-relaxed text-[var(--color-muted)] md:col-span-6 md:text-xl">
              Seven focused UI quality skills plus one orchestrator for hierarchy,
              typography, color, spacing, depth, motion, and responsive design.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
              <a
                href="#contact"
                className="rounded-[8px] bg-[var(--color-ink)] px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-paper)] transition-transform hover:-translate-y-0.5"
              >
                Install 10x
              </a>
              <a
                href="#skills"
                className="rounded-[8px] border border-[var(--color-line-strong)] px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-[var(--color-ink)]"
              >
                View skills
              </a>
            </div>
          </div>
        </div>

        <aside className="hero-panel relative overflow-hidden rounded-[8px] border border-[var(--color-line-strong)] bg-[var(--color-ink)] p-5 text-[var(--color-paper)] shadow-[var(--shadow-lift)]">
          <div className="mb-16 flex items-center justify-end">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[rgba(247,248,243,0.58)]">
              apply mode
            </span>
          </div>

          <div className="space-y-3 font-mono text-sm leading-7 text-[rgba(247,248,243,0.78)]">
            <p><span className="text-[var(--color-green)]">$</span> /polish --scope src/components</p>
            <p><span className="text-[var(--color-accent)]">hierarchy</span> - priority clarified</p>
            <p><span className="text-[var(--color-blue)]">typography</span> - hierarchy aligned</p>
            <p><span className="text-[var(--color-red)]">color</span> - contrast checked</p>
            <p><span className="text-[var(--color-green)]">responsive</span> - mobile-first fixes</p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-2">
            {['analyse', 'plan', 'apply'].map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[rgba(247,248,243,0.16)] px-3 py-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[rgba(247,248,243,0.65)]"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
