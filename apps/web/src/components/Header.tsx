export default function Header() {
  return (
    <nav className="nav-glass hairline-b fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[118rem] items-center justify-between px-5 py-4 lg:px-10">
        <div className="min-w-0 md:w-1/4">
          <a
            href="/"
            className="flex w-fit items-center gap-3 font-sans text-lg font-bold tracking-tight transition-opacity hover:opacity-75"
            aria-label="10x home"
          >
            <img
              src="/10x/favicon.svg"
              alt=""
              className="h-9 w-9 rounded-[8px]"
            />
            <span>10x</span>
          </a>
        </div>

        <div className="hidden flex-1 justify-center gap-8 font-sans text-sm font-semibold tracking-wide text-[var(--color-muted)] md:flex">
          <a href="#skills" className="hover-line text-[var(--color-ink)]">
            Skills
          </a>
          <a href="#capabilities" className="hover-line">
            Workflow
          </a>
          <a href="#manifesto" className="hover-line">
            Principles
          </a>
          <a href="#contact" className="hover-line">
            Install
          </a>
        </div>

        <div className="flex justify-end md:w-1/4">
          <a
            href="#contact"
            className="flex items-center gap-3 rounded-[8px] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-3 py-2 transition-colors hover:border-[var(--color-ink)] md:px-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-green)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-green)]" />
            </span>
            <span className="pt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] md:text-[0.68rem]">
              Install pack
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}
