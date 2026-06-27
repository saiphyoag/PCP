import { Menu } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

const primaryLinks = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/history', label: 'History' },
  { to: '/courses', label: 'Courses' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/alumni', label: 'Alumni' },
  { to: '/contact', label: 'Contact' },
]

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] bg-academic-900 text-white border-b border-academic-700/60">
      <div className="h-full max-w-76xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="shrink-0 -ml-1 p-2 rounded-md text-academic-100 hover:bg-academic-800 active:bg-academic-700 transition-colors"
          >
            <Menu size={25} strokeWidth={1.75} />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <span className="shrink-0">
              <img
                src="img/Logo/1.png"
                alt="logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-lg"
              />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="font-display text-[15px] sm:text-[30px] font-semibold tracking-tight truncate">
                Pre-College Program(PIU-PCP)
              </p>
              <p className="hidden sm:block text-[15px] text-academic-200 tracking-wide truncate">
                Diploma in Social Science
              </p>
            </div>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 mx-2">
                  {primaryLinks.map(({ to, label, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? 'text-gold-400'
                            : 'text-academic-100 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>

        <a
          href="/apply"
          className="shrink-0 text-xs sm:text-sm font-medium bg-gold-400 hover:bg-gold-300 text-academic-900 px-3 sm:px-4 py-2 rounded-md transition-colors"
        >
          Apply now
        </a>
      </div>
    </header>
  )
}
