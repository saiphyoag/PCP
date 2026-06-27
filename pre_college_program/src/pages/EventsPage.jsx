import PageHeader from '../components/PageHeader.jsx'
import { events } from '../data/content.js'
import { MapPin, Clock } from 'lucide-react'

function dateParts(d) {
  const date = new Date(d)

  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    year: date.toLocaleDateString('en-US', { year: 'numeric' }),
  }
}

export default function EventsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="What's Happening"
        title="Events"
        subtitle="Keep in touch with our events across the program calendar."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <ul className="space-y-4">
          {events.map((e) => {
            const { month, day, year } = dateParts(e.date)

            return (
              <li
                key={e.id}
                className="bg-white rounded-xl border border-ink-900/8 shadow-card p-5 sm:p-6 flex gap-5"
              >
                {/* Date Card */}
                <div className="shrink-0 w-20 h-24 rounded-lg bg-academic-900 text-white flex items-center justify-center">
                  <div className="text-center leading-none">
                    <p className="text-[10px] tracking-widest text-gold-400 font-semibold">
                      {month}
                    </p>

                    <p className="font-display text-3xl font-bold mt-1">
                      {day}
                    </p>

                    <p className="text-[11px] text-white/80 mt-1">
                      {year}
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-ink-900 text-lg">
                    {e.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ink-900/60">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {e.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {e.location}
                    </span>
                  </div>

                  <p className="text-ink-900/70 text-sm mt-3 leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}