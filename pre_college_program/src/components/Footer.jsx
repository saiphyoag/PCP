import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { contact, location } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-academic-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-white text-lg font-semibold">Pre-College Program</p>
          <p className="text-sm text-academic-300 mt-1">Diploma in Social Science</p>
          <p className="text-sm mt-4 leading-relaxed text-academic-300 max-w-xs">
            The PDO Pre-College Program provides quality education and facilitates the growth of confident leaders who are committed to serving their communities.
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold-400 mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-white transition-colors">Course outlines</Link></li>
            <li><Link to="/timeline" className="hover:text-white transition-colors">Program timeline</Link></li>
            <li><Link to="/instructors" className="hover:text-white transition-colors">Instructors</Link></li>
            <li><Link to="/alumni" className="hover:text-white transition-colors">Alumni</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">Apply now</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-400 mb-3">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-academic-400" />
              <a href={`mailto:${contact.admissionsEmail}`} className="hover:text-white transition-colors break-all">
                {contact.admissionsEmail}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-academic-400" />
              <span>{contact.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-academic-400" />
              <span>{location.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-400 mb-3">Follow</p>
          <div className="flex items-center gap-3">
            <a href={contact.social.instagram} aria-label="Instagram" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
              <Instagram size={16} />
            </a>
            <a href={contact.social.facebook} aria-label="Facebook" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
              <Facebook size={16} />
            </a>
            <a href={contact.social.linkedin} aria-label="LinkedIn" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-academic-400">
          © {new Date().getFullYear()} Pre-College Program(PCP). All rights reserved.
        </p>
      </div>
    </footer>
  )
}
