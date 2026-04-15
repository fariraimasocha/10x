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

        <div className="flex items-center justify-end gap-2 md:w-1/4">
          <a
            href="https://github.com/fariraimasocha/10x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="10x on GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-[8px] border border-[var(--color-line-strong)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-ink)] sm:flex"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.16.9-.25 1.86-.37 2.82-.37.96 0 1.92.12 2.82.37 2.15-1.46 3.09-1.16 3.09-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.29-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.78.54 4.46-1.49 7.68-5.7 7.68-10.67C23.25 5.48 18.27.5 12 .5z" />
            </svg>
          </a>
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
