import PageHeader from '../components/PageHeader.jsx'
import { terms, courseOutlines } from '../data/content.js'

export default function TimelinePage() {
  return (
    <div>
      <PageHeader eyebrow="Academic calendar" title="Program Timeline" subtitle="Four terms, each building toward the Term 4 research capstone." />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="term-rail term-rail-h grid lg:grid-cols-4 gap-8">
          {terms.map((t) => {
            const courses = courseOutlines.filter((c) => c.term === t.id)
            return (
              <div key={t.id} className="term-node">
                <span className="lg:mb-4 mb-3 inline-flex w-10 h-10 rounded-full bg-academic-600 text-white items-center justify-center font-display font-semibold">
                  {t.id}
                </span>
                <div className="bg-white rounded-xl border border-ink-900/8 shadow-card p-5 mt-0 lg:mt-0">
                  <p className="text-xs text-academic-600 font-medium">{t.dates}</p>
                  <h3 className="font-display font-semibold text-ink-900 text-lg mt-1">{t.name}</h3>
                  <p className="text-sm text-ink-900/70 font-medium mt-0.5">{t.title}</p>
                  <p className="text-[13px] text-ink-900/60 mt-3 leading-relaxed">{t.focus}</p>

                  <div className="mt-4 pt-4 border-t border-ink-900/8 space-y-2">
                    {courses.map((c) => (
                      <div key={c.id} className="text-[13px] text-ink-900/75 flex items-center justify-between gap-2">
                        <span className="truncate">{c.title}</span>
                        <span className="font-mono text-[11px] text-ink-900/40 shrink-0">{c.credits} cr</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
