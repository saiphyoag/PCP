import PageHeader from '../components/PageHeader.jsx'
import { location } from '../data/content.js'
import { MapPin, Clock, Navigation } from 'lucide-react'

export default function LocationPage() {
  return (
    <div>
      <PageHeader eyebrow="Find us" title="Location" subtitle="visit our monastery school and program or get directions for open house and orientation day." />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-card border border-ink-900/8">
          <iframe
            title="Campus location map"
            src={location.mapEmbed}
            className="w-full h-[360px] sm:h-[460px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <aside className="bg-white rounded-xl border border-ink-900/8 shadow-card p-6 self-start">
          <h3 className="font-display font-semibold text-ink-900 text-lg">{location.name}</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={17} className="text-academic-600 mt-0.5 shrink-0" />
              <p className="text-[14px] text-ink-900/75 leading-relaxed">{location.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={17} className="text-academic-600 mt-0.5 shrink-0" />
              <p className="text-[14px] text-ink-900/75">{location.hours}</p>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-academic-600 hover:bg-academic-700 text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors"
          >
            <Navigation size={15} /> Get directions
          </a>
        </aside>
      </section>
    </div>
  )
}
