const ROWS = [
  {
    n: '01',
    title: 'Analyse',
    body: 'Find concrete UI issues with line-referenced findings across type, color, spacing, elevation, motion, and responsive behavior.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'Turn findings into reviewable edits with risk levels, token suggestions, and scoped implementation notes.',
  },
  {
    n: '03',
    title: 'Apply',
    body: 'Make focused changes only when asked, using the existing framework, component patterns, and styling conventions.',
  },
  {
    n: '04',
    title: 'Orchestrate',
    body: 'Run /polish for one merged pass that resolves conflicts across the six core implementation skills before code changes.',
  },
]

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="hairline-y relative z-10 bg-[var(--color-surface-strong)] px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 px-1 font-serif text-3xl font-light tracking-tight md:text-5xl">
          A workflow agents can follow without guessing.
        </h2>

        <div className="flex flex-col">
          {ROWS.map((row, i) => (
            <div
              key={row.n}
              className={`group flex flex-col items-start px-1 py-8 transition-colors hover:bg-[rgba(23,25,20,0.03)] md:flex-row md:items-center ${
                i === 0 ? 'hairline-t' : 'hairline-t'
              } ${i === ROWS.length - 1 ? 'hairline-b' : ''}`}
            >
              <div className="mb-2 w-full font-mono text-xs text-[var(--color-muted)] md:mb-0 md:w-[15%]">
                {row.n}
              </div>
              <h3 className="mb-4 w-full font-serif text-3xl font-light transition-all duration-300 group-hover:italic md:mb-0 md:w-[45%] md:text-4xl">
                {row.title}
              </h3>
              <p className="w-full font-sans text-sm font-medium leading-relaxed text-[var(--color-muted)] md:w-[40%] md:text-base">
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
