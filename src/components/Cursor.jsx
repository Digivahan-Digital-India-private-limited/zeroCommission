import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(tick)
    }
    tick()

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.4, duration: 0.3 })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-3 h-3 bg-[#0197E0] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-9 h-9 border-2 border-[#0197E0]/70 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
