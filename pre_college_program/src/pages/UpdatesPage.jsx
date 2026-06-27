import PageHeader from '../components/PageHeader.jsx'
import { programUpdates } from '../data/content.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function UpdatesPage() {
  return (
    <div>
      <PageHeader eyebrow="Curriculum & policy" title="Program Updates" subtitle="Changes to courses, rubrics, partnerships, and academic calendars." />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <ol className="term-rail space-y-8">
          {programUpdates.map((u) => (
            <li key={u.id} className="term-node pl-10 relative">
              <span className="absolute left-0 top-1 w-5 h-5 rounded-full bg-academic-600 border-4 border-paper" />
              <p className="text-xs text-ink-900/50">{formatDate(u.date)}</p>
              <h3 className="font-display font-semibold text-ink-900 text-lg mt-1">{u.title}</h3>
              <p className="text-ink-900/70 text-sm mt-2 leading-relaxed max-w-2xl">{u.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
