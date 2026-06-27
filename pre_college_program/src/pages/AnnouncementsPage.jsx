import PageHeader from '../components/PageHeader.jsx'
import { announcements } from '../data/content.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader eyebrow="Stay informed" title="Announcements" subtitle="Academic notices and admissions updates from the program office." />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a.id} className="bg-white rounded-xl border border-ink-900/8 shadow-card p-5 sm:p-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[11px] font-medium uppercase tracking-wide bg-academic-50 text-academic-700 px-2.5 py-1 rounded-full">
                  {a.tag}
                </span>
                <span className="text-xs text-ink-900/50">{formatDate(a.date)}</span>
              </div>
              <h3 className="font-display font-semibold text-ink-900 text-lg mt-3">{a.title}</h3>
              <p className="text-ink-900/70 text-sm mt-2 leading-relaxed">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
