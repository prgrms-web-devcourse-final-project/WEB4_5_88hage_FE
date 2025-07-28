'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollSnapWrapper({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  // 2) Intersection Observer 로 현재 페이지 감지
  useEffect(() => {
    const sections = Array.from(containerRef.current!.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement)
            setCurrent(idx)
          }
        })
      },
      { root: containerRef.current, threshold: 0.5 }
    )
    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="
          h-screen 
          overflow-y-auto overflow-x-hidden 
          snap-y snap-mandatory 
          scrollbar-hide
        "
      >
        {children.map((child, i) => (
          <section
            key={i}
            className="h-screen w-full snap-start flex items-center justify-around"
          >
            {child}
          </section>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        {children.map((_, i) => (
          <span
            key={i}
            className={`
              block w-3 h-3 rounded-full transition 
              ${i === current ? 'bg-main scale-110' : 'bg-gray-500/30'}
            `}
          />
        ))}
      </div>
    </div>
  )
}