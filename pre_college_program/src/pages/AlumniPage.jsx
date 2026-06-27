import { useState, useEffect, useCallback, useRef } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { alumni } from '../data/content.js'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const AUTO_ADVANCE_MS = 3000

export default function AlumniPage() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % alumni.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + alumni.length) % alumni.length)
  }, [])

  // Auto-advance every 3 seconds, no tap needed. Pauses only if the
  // person explicitly hits the pause button (not on hover/focus), so the
  // slideshow keeps running by default as requested.
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timerRef.current)
  }, [next, paused])

  const current = alumni[index]

  return (
    <div>
      <PageHeader
        eyebrow="Where they are now"
        title="Alumni Record"
        subtitle="It has been over a decade that PCP is providing quality education, and PCP has trained over 250 community youths up to today. Upon completing the program, students apply for study abroad opportunities to different countries. Over the past 11 years, students have received full and partially funded scholarships to obtain international education in various countries. Students with an interest in community work engage with community development organizations across education, civic engagement, social work, and local and international institutions."
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative bg-white rounded-2xl border border-ink-900/8 shadow-card p-6 sm:p-10">

          {/* Slide */}
          <div key={current.id} className="grid sm:grid-cols-[280px_1fr] gap-8 sm:gap-10 items-center animate-fadeIn">
            {/* Photo with geometric shape accent behind it */}
            <div className="relative w-full max-w-[280px] mx-auto sm:mx-0 aspect-[4/5]">
              <svg
                viewBox="0 0 280 350"
                className="absolute -right-6 -top-4 w-[110%] h-[110%] text-academic-500/90"
                aria-hidden="true"
              >
                <polygon points="0,0 280,0 190,350 0,300" fill="currentColor" />
              </svg>
              <svg
                viewBox="0 0 280 350"
                className="absolute -right-3 -top-1 w-[104%] h-[104%] text-gold-400"
                aria-hidden="true"
                style={{ mixBlendMode: 'multiply', opacity: 0.35 }}
              >
                <polygon points="0,0 280,0 190,350 0,300" fill="currentColor" />
              </svg>
              <img
                src={current.photo}
                alt={current.name}
                className="relative z-10 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{current.name}</h2>
              <p className="text-academic-600 text-[13px] font-medium mt-1">
                {current.destination} · Cohort {current.cohort}
              </p>
              <p className="text-ink-900/70 text-[15px] leading-relaxed mt-4">{current.bio}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-900/8">
            <div className="flex items-center gap-1.5">
              {alumni.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${a.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-academic-600' : 'w-1.5 bg-ink-900/15'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous alumnus"
                className="p-2 rounded-full border border-ink-900/10 text-ink-900/60 hover:bg-academic-50 hover:text-academic-600 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
                className="p-2 rounded-full border border-ink-900/10 text-ink-900/60 hover:bg-academic-50 hover:text-academic-600 transition-colors"
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
              <button
                onClick={next}
                aria-label="Next alumnus"
                className="p-2 rounded-full border border-ink-900/10 text-ink-900/60 hover:bg-academic-50 hover:text-academic-600 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}