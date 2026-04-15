const CLIENTS = [
  'typography',
  'color',
  'spacing',
  'depth',
  'motion',
  'responsive',
  'polish',
]

function Row() {
  return (
    <div className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] md:text-sm">
      {CLIENTS.map((c) => (
        <span key={c} className="flex items-center">
          <span className="px-8">{c}</span>
          <span
            aria-hidden
            className="text-[10px] text-[var(--color-accent)]"
          >
            /
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="hairline-y relative z-10 overflow-hidden bg-[var(--color-surface-strong)] py-4">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </section>
  )
}
