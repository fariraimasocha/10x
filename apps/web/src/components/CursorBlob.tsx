import { useEffect, useRef } from 'react'

export default function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = ref.current
    if (!blob) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let x = mouseX
    let y = mouseY
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      blob.style.opacity = '1'
    }
    const onLeave = () => {
      blob.style.opacity = '0'
    }
    const onEnterInteractive = () => {
      blob.style.background =
        'radial-gradient(circle, rgba(214,92,56,0.25) 0%, rgba(214,92,56,0) 60%)'
    }
    const onLeaveInteractive = () => {
      blob.style.background =
        'radial-gradient(circle, rgba(214,92,56,0.15) 0%, rgba(214,92,56,0) 60%)'
    }

    const tick = () => {
      x += (mouseX - x) * 0.1
      y += (mouseY - y) * 0.1
      blob.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    const interactive = document.querySelectorAll('a, button, .project-card')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return <div ref={ref} className="cursor-blob" aria-hidden />
}
