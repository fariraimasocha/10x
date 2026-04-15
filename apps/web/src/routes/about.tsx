import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] px-5 py-28 lg:px-10">
      <section className="mx-auto max-w-4xl">
        <img src="/10x/favicon.svg" alt="10x logo" className="mb-8 h-14 w-14 rounded-[8px]" />
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
          About 10x
        </p>
        <h1 className="mb-6 font-serif text-5xl font-light leading-none tracking-tight text-[var(--color-ink)] md:text-7xl">
          UI polish, made reviewable.
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-8 text-[var(--color-muted)]">
          10x gives Claude Code and Codex a shared process for improving
          interfaces without inventing a new design system. The skills inspect
          the existing app, report concrete findings, and apply scoped changes
          when requested.
        </p>
      </section>
    </main>
  )
}
