import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const INSTALL_COMMAND =
  "git clone https://github.com/fariraimasocha/10x.git && cd 10x && ./scripts/install.sh"

export default function Footer() {
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Copy failed")
    }
  }

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

        <div className="mb-16 flex items-center gap-4 rounded-[8px] border border-[rgba(247,248,243,0.16)] bg-[rgba(247,248,243,0.06)] p-5">
          <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[rgba(247,248,243,0.86)]">
            {INSTALL_COMMAND}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy install command"
            className="shrink-0 rounded-md p-2 text-[rgba(247,248,243,0.62)] transition-colors hover:bg-[rgba(247,248,243,0.08)] hover:text-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(247,248,243,0.4)]"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
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
          <p>/color</p>
          <p>/spacing</p>
          <p>/depth</p>
          <p>/motion</p>
          <p>/responsive</p>
          <p>/polish</p>
        </div>

        <div className="flex flex-col gap-2 md:col-start-4">
          <span className="mb-2 text-[rgba(247,248,243,0.42)]">Project</span>
          <div className="flex flex-col items-start gap-3">
            <a
              href="https://github.com/fariraimasocha/10x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line inline-flex items-center gap-2 pb-1 text-[var(--color-paper)]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.16.9-.25 1.86-.37 2.82-.37.96 0 1.92.12 2.82.37 2.15-1.46 3.09-1.16 3.09-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.29-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.78.54 4.46-1.49 7.68-5.7 7.68-10.67C23.25 5.48 18.27.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/fariraijames"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line inline-flex items-center gap-2 pb-1 text-[var(--color-paper)]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </a>
            <a
              href="https://www.linkedin.com/in/fariraimasocha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line inline-flex items-center gap-2 pb-1 text-[var(--color-paper)]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.fariraimasocha.co.zw/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-line inline-flex items-center gap-2 pb-1 text-[var(--color-paper)]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3c2.5 2.7 3.9 6 3.9 9s-1.4 6.3-3.9 9c-2.5-2.7-3.9-6-3.9-9S9.5 5.7 12 3z" />
              </svg>
              Website
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
