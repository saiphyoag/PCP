import PageHeader from '../components/PageHeader.jsx'
import { instructors } from '../data/content.js'

export default function InstructorsPage() {
  return (
    <div>
      <PageHeader eyebrow="Instructor's List" title="Instructors" subtitle="Program teaching across the program's four terms." />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-ink-900/8 shadow-card overflow-hidden">
              <img src={p.photo} alt={p.name} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-display font-semibold text-ink-900 text-[16px]">{p.name}</h3>
                <p className="text-academic-600 text-[13px] font-medium mt-0.5">{p.title}</p>
                <p className="text-ink-900/65 text-[13px] mt-3 leading-relaxed">{p.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.courses.map((c) => (
                    <span key={c} className="text-[11px] bg-academic-50 text-academic-700 px-2 py-1 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
