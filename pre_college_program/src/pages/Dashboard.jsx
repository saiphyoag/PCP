import { Link } from 'react-router-dom'
import { ArrowRight, Megaphone, CalendarDays, FileEdit, MapPin } from 'lucide-react'
import { announcements, events, programUpdates, stats, program, terms } from '../data/content.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function DashboardCard({ to, icon: Icon, title, children, accent = 'academic' }) {
  return (
    <div className="bg-white rounded-xl border border-ink-900/8 shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/6">
        <div className="flex items-center gap-2.5">
          <span className={`grid place-items-center w-8 h-8 rounded-md ${accent === 'gold' ? 'bg-gold-100 text-gold-600' : 'bg-academic-50 text-academic-600'}`}>
            <Icon size={16} strokeWidth={2} />
          </span>
          <h3 className="font-display font-semibold text-ink-900 text-[15px]">{title}</h3>
        </div>
        <Link to={to} className="text-academic-600 hover:text-academic-700 text-xs font-medium flex items-center gap-1">
          View all <ArrowRight size={13} />
        </Link>
      </div>
      <div className="divide-y divide-ink-900/6">{children}</div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-academic-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="eyebrow text-gold-400 mb-3">Diploma Program · Est. {program.founded}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight max-w-11xl leading-[1.1]">
            {program.tagline}
          </h1>
          <p className="mt-5 text-academic-200 max-w-1xl text-sm sm:text-base leading-relaxed">
            Four cohorts. Five core values. One research capstone. Everything you need to start a social science degree a step ahead.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/apply" className="bg-gold-400 hover:bg-gold-300 text-academic-900 font-semibold text-sm px-5 py-3 rounded-md transition-colors">
              Start your application
            </Link>
            <Link to="/courses" className="border border-white/25 hover:bg-white/10 text-white text-sm px-5 py-3 rounded-md transition-colors">
              View course outlines
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-gold-400">{s.value}</dd>
                <dt className="text-academic-300 text-xs mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Dashboard grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative pb-16">
        <div className="grid lg:grid-cols-3 gap-5">
          <DashboardCard to="/announcements" icon={Megaphone} title="Announcements">
            {announcements.slice(0, 3).map((a) => (
              <Link to="/announcements" key={a.id} className="block px-5 py-3.5 hover:bg-academic-50/60 transition-colors">
                <p className="text-[13px] text-academic-600 font-medium">{formatDate(a.date)} · {a.tag}</p>
                <p className="text-[14px] text-ink-900 font-medium mt-0.5 leading-snug">{a.title}</p>
              </Link>
            ))}
          </DashboardCard>

          <DashboardCard to="/events" icon={CalendarDays} title="Upcoming Events" accent="gold">
            {events.slice(0, 3).map((e) => (
              <Link to="/events" key={e.id} className="block px-5 py-3.5 hover:bg-academic-50/60 transition-colors">
                <p className="text-[13px] text-academic-600 font-medium">{formatDate(e.date)} · {e.time}</p>
                <p className="text-[14px] text-ink-900 font-medium mt-0.5 leading-snug">{e.title}</p>
                <p className="text-[12px] text-ink-900/50 mt-0.5 flex items-center gap-1">
                  <MapPin size={11} /> {e.location}
                </p>
              </Link>
            ))}
          </DashboardCard>

          <DashboardCard to="/updates" icon={FileEdit} title="Program Updates">
            {programUpdates.map((u) => (
              <Link to="/updates" key={u.id} className="block px-5 py-3.5 hover:bg-academic-50/60 transition-colors">
                <p className="text-[13px] text-academic-600 font-medium">{formatDate(u.date)}</p>
                <p className="text-[14px] text-ink-900 font-medium mt-0.5 leading-snug">{u.title}</p>
              </Link>
            ))}
          </DashboardCard>
        </div>

        {/* Term snapshot */}
        <div className="mt-10 bg-white rounded-xl border border-ink-900/8 shadow-card p-6 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <h3 className="font-display font-semibold text-ink-900 text-lg">Program at a glance</h3>
            <Link to="/timeline" className="text-academic-600 hover:text-academic-700 text-xs font-medium flex items-center gap-1">
              Full timeline <ArrowRight size={13} />
            </Link>
          </div>
          <div className="term-rail term-rail-h grid sm:grid-cols-4 gap-6">
            {terms.map((t) => (
              <div key={t.id} className="term-node flex sm:flex-col gap-3 sm:gap-0">
                <span className="shrink-0 sm:mb-3 w-10 h-10 rounded-full bg-academic-600 text-white grid place-items-center font-display font-semibold text-sm">
                  {t.id}
                </span>
                <div>
                  <p className="text-[13px] text-academic-600 font-medium">{t.dates}</p>
                  <p className="font-display font-semibold text-ink-900 text-[15px] mt-0.5">{t.name}: {t.title}</p>
                  <p className="text-[13px] text-ink-900/60 mt-1 leading-relaxed">{t.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
