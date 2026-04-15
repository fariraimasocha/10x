export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative z-10 bg-[var(--color-paper)] px-5 py-28 md:py-44 lg:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.36fr_0.64fr]">
        <div className="flex items-start gap-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          Design contract
        </div>

        <div className="drop-cap font-sans text-xl font-medium leading-[1.55] text-[var(--color-ink)] md:text-2xl lg:text-[1.7rem]">
          10x makes UI improvement systematic. Each skill starts by reading the
          project, identifying the smallest useful scope, then turning subjective
          polish into concrete edits an engineer can review. The goal is not a
          new aesthetic every time. The goal is a stronger version of the product
          already in front of the agent.
        </div>
      </div>
    </section>
  )
}
