export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      id="contact"
      className="relative z-20 overflow-hidden bg-[var(--color-ink)] px-5 pb-8 pt-24 text-[var(--color-paper)] lg:px-10"
    >
      <div className="mx-auto max-w-[118rem]">
        <div className="mb-16 flex w-full flex-col gap-8 md:mb-24">
          <img src="/10x/favicon.svg" alt="10x logo" className="h-16 w-16 rounded-[8px] ring-1 ring-[rgba(247,248,243,0.18)]" />
          <h2 className="max-w-6xl font-serif text-[clamp(4rem,13vw,12rem)] font-light leading-[0.82] tracking-tight text-[rgba(247,248,243,0.95)]">
            Install the skill pack.
          </h2>
        </div>

        <div className="mb-16 overflow-x-auto rounded-[8px] border border-[rgba(247,248,243,0.16)] bg-[rgba(247,248,243,0.06)] p-5">
          <code className="whitespace-nowrap font-mono text-sm text-[rgba(247,248,243,0.86)]">
            git clone https://github.com/fariraimasocha/10x.git && cd 10x && ./scripts/install.sh
          </code>
        </div>
      </div>

      <div className="hairline-t mx-auto grid max-w-[118rem] grid-cols-1 gap-12 border-[rgba(247,248,243,0.15)] pt-8 font-mono text-xs uppercase tracking-widest text-[rgba(247,248,243,0.62)] md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <span className="mb-2 text-[rgba(247,248,243,0.42)]">Agents</span>
          <p>Claude Code</p>
          <p>OpenAI Codex</p>
          <p>Local skills</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="mb-2 text-[rgba(247,248,243,0.42)]">Commands</span>
          <a
            href="#skills"
            className="w-fit text-[var(--color-paper)] transition-colors hover:text-[var(--color-accent)]"
          >
            /typography
          </a>
          <p>/responsive</p>
          <p>/polish</p>
        </div>

        <div className="flex flex-col gap-2 md:col-start-4">
          <span className="mb-2 text-[rgba(247,248,243,0.42)]">Project</span>
          <div className="flex flex-col items-start gap-3">
            <a
              href="https://github.com/fariraimasocha/10x"
              className="hover-line pb-1 text-[var(--color-paper)]"
            >
              GitHub
            </a>
            <p>MIT license</p>
            <p>Dependency-free</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[118rem] flex-col items-center justify-between font-mono text-[10px] tracking-widest text-[rgba(247,248,243,0.34)] md:mt-28 md:flex-row">
        <p>&copy; {year} 10x.</p>
        <p className="mt-2 md:mt-0">ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}
