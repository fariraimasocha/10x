import { Toaster as Sonner, type ToasterProps } from "sonner"

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-ink)] group-[.toaster]:text-[var(--color-paper)] group-[.toaster]:border-[rgba(247,248,243,0.16)] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[rgba(247,248,243,0.62)]",
        },
      }}
      {...props}
    />
  )
}
