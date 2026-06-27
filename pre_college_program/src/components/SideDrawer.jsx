import { NavLink } from 'react-router-dom'
import {
  X,
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  History,
  FileEdit,
  Users,
  BookOpen,
  ListChecks,
  GraduationCap as AlumniIcon,
  MapPin,
  Images,
  Mail,
  ShieldCheck,
} from 'lucide-react'

const mainLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/history', label: 'Program History', icon: History },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/updates', label: 'Program Updates', icon: FileEdit },
  { to: '/apply', label: 'Online Application', icon: ListChecks },
  { to: '/instructors', label: 'Instructors', icon: Users },
  { to: '/courses', label: 'Course Outlines', icon: BookOpen },
  { to: '/timeline', label: 'Program Timeline', icon: CalendarDays },
  { to: '/alumni', label: 'Alumni', icon: AlumniIcon },
  { to: '/gallery', label: 'Activities Gallery', icon: Images },
  { to: '/location', label: 'Location', icon: MapPin },
  { to: '/contact', label: 'Contact', icon: Mail },
]

const adminLinks = [
  {
    to: '/admin',
    label: 'Admin Dashboard',
    icon: ShieldCheck,
  },
]

export default function SideDrawer({ open, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 my-0.5 rounded-md text-[14px] transition-colors ${
      isActive
        ? 'bg-gold-400 text-academic-900 font-semibold'
        : 'text-academic-100 hover:bg-white/10'
    }`

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink-950/50 transition-opacity duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 z-50 h-full w-[280px] max-w-[82vw]
        bg-academic-900 text-academic-50 shadow-2xl
        transform transition-transform duration-300 ease-out
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[var(--header-h)] px-5 border-b border-white/10">
          <span className="font-display text-lg font-semibold">Menu</span>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-white/10 active:bg-white/15 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-scroll overflow-y-auto h-[calc(100%-var(--header-h))]">

          {/* Main Navigation */}
          <div className="py-3">
            <h3 className="px-5 mb-2 text-xs uppercase tracking-widest text-academic-300 font-semibold">
              Navigation
            </h3>

            <ul className="px-2">
              {mainLinks.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={linkClass}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin Section */}
          <div className="mx-4 mt-3 pt-4 border-t border-white/10">
            <h3 className="mb-2 px-1 text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Administration
            </h3>

            <ul>
              {adminLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={onClose}
                    className={linkClass}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mx-4 mt-6 pt-4 border-t border-white/10 pb-6">
            <p className="text-[11px] text-academic-300 leading-relaxed px-1">
              Diploma in Social Science
              <br />
              Phaung Daw Oo International University
            </p>
          </div>
        </div>
      </nav>
    </>
  )
}