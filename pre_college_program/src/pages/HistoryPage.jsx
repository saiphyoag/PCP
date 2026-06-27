import PageHeader from '../components/PageHeader.jsx'
import { program, stats, objectives } from '../data/content.js'

export default function HistoryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About the Program"
        title="Program History"
        subtitle="How an eleven-year-old diploma became a launchpad for social science study."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-ink-900/8 shadow-card p-8">
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">
              History
            </h2>

            <p className="text-ink-900/80 leading-[1.9] text-[15px] whitespace-pre-line">
              {program.history}
            </p>

            <div className="mt-10 pt-8 border-t border-ink-900/10">
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">
                Program Objectives
              </h2>

              <ul className="space-y-5">
                {objectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-academic-600 text-white text-sm font-semibold">
                      {index + 1}
                    </span>

                    <p className="text-ink-900/80 leading-7">
                      {objective}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl border border-ink-900/8 shadow-card p-6 self-start sticky top-24">
          <p className="eyebrow text-academic-600 mb-5">
            By the Numbers
          </p>

          <dl className="space-y-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="pb-4 border-b border-ink-900/8 last:border-b-0 last:pb-0"
              >
                <dt className="text-sm text-ink-900/60 mb-1">
                  {s.label}
                </dt>

                <dd className="font-display text-2xl font-semibold text-academic-700">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>
    </div>
  )
}