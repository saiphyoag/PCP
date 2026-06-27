import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { courseOutlines } from '../data/content.js'

const termFilters = ['All', 1, 2, 3, 4]

export default function CoursesPage() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? courseOutlines : courseOutlines.filter((c) => c.term === filter)

  return (
    <div>
      <PageHeader eyebrow="Curriculum" title="Course Outlines" subtitle="15 core and elective courses across four terms." />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {termFilters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                filter === t
                  ? 'bg-academic-600 text-white border-academic-600'
                  : 'bg-white text-ink-900/70 border-ink-900/15 hover:border-academic-400'
              }`}
            >
              {t === 'All' ? 'All terms' : `Term ${t}`}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {visible.map((c) => (
            <details key={c.id} className="group bg-white rounded-xl border border-ink-900/8 shadow-card overflow-hidden">
              <summary className="cursor-pointer list-none px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-mono text-[11px] tracking-wide text-academic-600 bg-academic-50 px-2 py-1 rounded shrink-0">
                    {c.code}
                  </span>
                  <span className="font-display font-semibold text-ink-900 truncate">{c.title}</span>
                </div>
                <span className="shrink-0 text-xs text-ink-900/45">Term {c.term} · {c.credits} credits</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 -mt-1">
                <p className="text-ink-900/70 text-sm leading-relaxed">{c.summary}</p>
                <ul className="mt-3 grid sm:grid-cols-2 gap-1.5">
                  {c.topics.map((topic) => (
                    <li key={topic} className="text-[13px] text-ink-900/65 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-academic-500 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
