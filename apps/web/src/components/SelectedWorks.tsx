const SKILLS = [
  {
    title: 'Typography',
    command: '/typography',
    description: 'Normalize type scale, hierarchy, and text rhythm.',
    checks: 'Scale, hierarchy, line-height, tracking, font discipline',
    output: 'Type tokens and concrete class replacements',
    n: '01',
    tone: 'bg-[var(--color-blue-soft)]',
    accent: 'text-[var(--color-blue)]',
  },
  {
    title: 'Color',
    command: '/color',
    description: 'Audit palettes, contrast, and color tokens.',
    checks: 'Semantic roles, contrast, palette drift, hardcoded values',
    output: 'Brand, neutral, and semantic token mappings',
    n: '02',
    tone: 'bg-[var(--color-red-soft)]',
    accent: 'text-[var(--color-red)]',
  },
  {
    title: 'Spacing',
    command: '/spacing',
    description: 'Find and fix inconsistent UI spacing.',
    checks: 'Padding, margin, gaps, grouping rhythm, token chances',
    output: 'Nearest scale values with layout risk noted',
    n: '03',
    tone: 'bg-[var(--color-green-soft)]',
    accent: 'text-[var(--color-green)]',
  },
  {
    title: 'Hierarchy',
    command: '/hierarchy',
    description: 'Clarify what users should notice first, second, and third.',
    checks: 'Scan path, CTA dominance, grouping, affordance clarity',
    output: 'Priority stacks and risk-rated composition fixes',
    n: '04',
    tone: 'bg-[var(--color-yellow-soft)]',
    accent: 'text-[var(--color-accent)]',
  },
  {
    title: 'Depth',
    command: '/depth',
    description: 'Normalize elevation, surfaces, and shadows.',
    checks: 'Surface layers, shadows, elevation roles, z-index drift',
    output: 'Elevation tokens and surface normalization',
    n: '05',
    tone: 'bg-[var(--color-surface-strong)]',
    accent: 'text-[var(--color-blue)]',
  },
  {
    title: 'Motion',
    command: '/motion',
    description: 'Audit transitions, animation safety, and motion tokens.',
    checks: 'Durations, easing, transition safety, reduced motion',
    output: 'Motion tokens and safe transform or opacity changes',
    n: '06',
    tone: 'bg-[var(--color-blue-soft)]',
    accent: 'text-[var(--color-accent)]',
  },
  {
    title: 'Responsive',
    command: '/responsive',
    description: 'Find rigid layouts and responsive design gaps.',
    checks: 'Widths, stacking, breakpoints, mobile-first spacing',
    output: 'Fluid layout changes with responsive risk ratings',
    n: '07',
    tone: 'bg-[var(--color-green-soft)]',
    accent: 'text-[var(--color-blue)]',
  },
  {
    title: 'Polish',
    command: '/polish',
    description: 'Run the six core implementation skills as one coordinated pass.',
    checks: 'Typography, color, spacing, depth, motion, responsive',
    output: 'One merged report with conflicts resolved before edits',
    n: '08',
    tone: 'bg-[var(--color-ink)]',
    accent: 'text-[var(--color-paper)]',
    featured: true,
  },
]

const POLISH_ORDER = ['type', 'color', 'space', 'depth', 'motion', 'responsive']

export default function SelectedWorks() {
  return (
    <section
      id="skills"
      className="relative z-10 mx-auto max-w-[118rem] bg-[var(--color-paper)] px-5 py-24 md:py-32 lg:px-10"
    >
      <div className="mb-16 flex flex-col items-start justify-between gap-6 px-1 md:flex-row md:items-end">
        <h2 className="max-w-3xl font-serif text-4xl font-light tracking-tight md:text-6xl">
          Focused skills for the parts that make interfaces feel finished.
        </h2>
        <a
          href="#capabilities"
          className="hover-line pb-1 font-mono text-sm uppercase tracking-widest"
        >
          See workflow
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SKILLS.map((skill) => (
          <a
            key={skill.title}
            href="#capabilities"
            className={`skill-card group relative flex min-h-[21rem] flex-col overflow-hidden rounded-[8px] border border-[var(--color-line)] p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)] md:p-6 ${
              skill.featured
                ? 'featured-skill bg-[var(--color-ink)] md:col-span-2 xl:col-span-3 text-[var(--color-paper)]'
                : `${skill.tone} text-[var(--color-ink)]`
            }`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="skill-grid h-full w-full" />
            </div>

            <div className="relative">
              <p
                className={`font-mono text-xs uppercase tracking-[0.16em] ${
                  skill.featured ? 'text-[rgba(247,248,243,0.58)]' : 'text-[var(--color-muted)]'
                }`}
              >
                skill {skill.n}
              </p>
              <h3 className="mt-5 font-serif text-4xl font-light leading-none tracking-tight md:text-5xl">
                {skill.title}
              </h3>
            </div>

            <p
              className={`relative mt-8 max-w-xl font-sans text-xl font-semibold leading-tight md:text-2xl ${
                skill.featured ? 'text-[var(--color-paper)]' : 'text-[var(--color-ink)]'
              }`}
            >
              {skill.description}
            </p>

            <div
              className={`relative mt-auto pt-10 ${
                skill.featured ? 'text-[rgba(247,248,243,0.76)]' : 'text-[var(--color-muted)]'
              }`}
            >
              {skill.featured ? (
                <div className="mb-8 flex flex-wrap gap-2">
                  {POLISH_ORDER.map((item) => (
                    <span
                      key={item}
                      className="rounded-[8px] border border-[rgba(247,248,243,0.18)] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <div
                className={`grid gap-5 border-t pt-5 md:grid-cols-2 ${
                  skill.featured ? 'border-[rgba(247,248,243,0.18)]' : 'border-[var(--color-line)]'
                }`}
              >
                <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em]">
                  <span className={skill.accent}>{skill.command}</span>
                  <span className="mt-2 block font-sans text-sm normal-case leading-relaxed tracking-normal">
                    {skill.checks}
                  </span>
                </p>
                <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em]">
                  Output
                  <span className="mt-2 block font-sans text-sm normal-case leading-relaxed tracking-normal">
                    {skill.output}
                  </span>
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 flex justify-center md:hidden">
        <a href="#contact" className="rounded-[8px] border border-[var(--color-ink)] px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">Install pack</a>
      </div>
    </section>
  )
}
