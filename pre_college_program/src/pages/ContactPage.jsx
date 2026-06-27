import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { contact, location } from '../data/content.js'
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react'

const inputClass =
  'w-full rounded-md border border-ink-900/15 bg-white px-3.5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-900/35 focus:border-academic-500 focus:ring-1 focus:ring-academic-500 outline-none transition-colors'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div>
      <PageHeader eyebrow="Get in touch" title="Contact" subtitle="Questions about admissions, courses, or campus visits — we're glad to help." />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-ink-900/8 shadow-card p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto text-academic-600" size={40} strokeWidth={1.5} />
              <p className="font-display font-semibold text-ink-900 text-lg mt-4">Message sent</p>
              <p className="text-ink-900/60 text-sm mt-2">We'll reply within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-[13px] font-medium text-ink-900/80">Name</span>
                  <input required className={`${inputClass} mt-1.5`} />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium text-ink-900/80">Email</span>
                  <input required type="email" className={`${inputClass} mt-1.5`} />
                </label>
              </div>
              <label className="block">
                <span className="text-[13px] font-medium text-ink-900/80">Subject</span>
                <select className={`${inputClass} mt-1.5`}>
                  <option>Admissions inquiry</option>
                  <option>Course information</option>
                  <option>Campus visit</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-ink-900/80">Message</span>
                <textarea required rows={5} className={`${inputClass} mt-1.5`} />
              </label>
              <button
                type="submit"
                className="bg-academic-600 hover:bg-academic-700 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <aside className="bg-white rounded-xl border border-ink-900/8 shadow-card p-6 self-start space-y-5">
          <p className="eyebrow text-academic-600">Direct contact</p>
          <div className="flex items-start gap-3">
            <Mail size={17} className="text-academic-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] text-ink-900/50">Admissions</p>
              <a href={`mailto:${contact.admissionsEmail}`} className="text-[14px] text-ink-900 hover:text-academic-600 break-all">{contact.admissionsEmail}</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={17} className="text-academic-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] text-ink-900/50">General inquiries</p>
              <a href={`mailto:${contact.generalEmail}`} className="text-[14px] text-ink-900 hover:text-academic-600 break-all">{contact.generalEmail}</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={17} className="text-academic-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] text-ink-900/50">Phone</p>
              <p className="text-[14px] text-ink-900">{contact.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle size={17} className="text-academic-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] text-ink-900/50">WhatsApp</p>
              <p className="text-[14px] text-ink-900">{contact.whatsapp}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={17} className="text-academic-600 mt-0.5 shrink-0" />
            <p className="text-[14px] text-ink-900/75 leading-relaxed">{location.address}</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
