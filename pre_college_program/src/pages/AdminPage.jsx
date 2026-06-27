import { useState, useMemo, useEffect } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import {
  getApplications, deleteApplication, exportApplicationsCSV, clearAllApplications,
} from '../data/applicationsStore.js'
import { downloadApplicationPDF } from '../utils/applicationPdf.js'
import { Search, Download, Trash2, FileDown, Eye, X } from 'lucide-react'

function formatDateTime(iso) {
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function AdminPage() {
  const [applications, setApplications] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setApplications(getApplications())
  }, [])

  function refresh() {
    setApplications(getApplications())
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return applications
    return applications.filter((a) =>
      [a.fullName, a.email, a.nrcNumber, a.id, a.primaryPhone]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    )
  }, [applications, query])

  function handleDelete(id) {
    if (!confirm('Delete this application? This cannot be undone.')) return
    deleteApplication(id)
    refresh()
    if (selected?.id === id) setSelected(null)
  }

  function handleClearAll() {
    if (!confirm(`Delete all ${applications.length} applications? This cannot be undone.`)) return
    clearAllApplications()
    refresh()
    setSelected(null)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Applications"
        subtitle="Submitted PIU-PCP Batch 15 applications, stored locally in this browser."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-900/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, NRC, ID…"
              className="w-full rounded-md border border-ink-900/15 bg-white pl-9 pr-3 py-2.5 text-[14px] focus:border-academic-500 focus:ring-1 focus:ring-academic-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] text-ink-900/50">{filtered.length} of {applications.length} applications</span>
            <button
              onClick={() => exportApplicationsCSV(applications)}
              disabled={!applications.length}
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-academic-600 hover:bg-academic-700 disabled:bg-ink-900/15 disabled:cursor-not-allowed text-white px-3.5 py-2 rounded-md transition-colors"
            >
              <FileDown size={15} /> Export CSV
            </button>
            <button
              onClick={handleClearAll}
              disabled={!applications.length}
              className="inline-flex items-center gap-1.5 text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed px-3.5 py-2 rounded-md transition-colors"
            >
              <Trash2 size={15} /> Clear all
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-ink-900/8 shadow-card p-12 text-center">
            <p className="text-ink-900/50 text-sm">No applications submitted yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-ink-900/8 shadow-card overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead className="bg-academic-50 text-academic-700 text-[12px] uppercase tracking-wide">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Applicant</th>
                  <th className="text-left font-medium px-5 py-3">Email</th>
                  <th className="text-left font-medium px-5 py-3">Phone</th>
                  <th className="text-left font-medium px-5 py-3">Submitted</th>
                  <th className="text-left font-medium px-5 py-3">ID</th>
                  <th className="text-right font-medium px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/6">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-academic-50/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-ink-900">{a.fullName || '—'}</td>
                    <td className="px-5 py-3.5 text-ink-900/70">{a.email || '—'}</td>
                    <td className="px-5 py-3.5 text-ink-900/70">{a.primaryPhone || '—'}</td>
                    <td className="px-5 py-3.5 text-ink-900/55 whitespace-nowrap">{formatDateTime(a.submittedAt)}</td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-ink-900/45">{a.id}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button onClick={() => setSelected(a)} aria-label="View" className="p-1.5 text-academic-600 hover:bg-academic-50 rounded-md transition-colors">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => downloadApplicationPDF(a)} aria-label="Download PDF" className="p-1.5 text-academic-600 hover:bg-academic-50 rounded-md transition-colors">
                        <Download size={16} />
                      </button>
                      <button onClick={() => handleDelete(a.id)} aria-label="Delete" className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && <ApplicationDetailModal application={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="py-2 border-b border-ink-900/6 last:border-0">
      <p className="text-[11px] text-ink-900/45 uppercase tracking-wide">{label}</p>
      <p className="text-[14px] text-ink-900 mt-0.5 whitespace-pre-wrap">{value || '—'}</p>
    </div>
  )
}

function ApplicationDetailModal({ application: a, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-ink-950/60" />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-ink-900/8 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-ink-900 text-lg">{a.fullName}</h3>
            <p className="text-[12px] text-ink-900/45 font-mono">{a.id}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-ink-900/5 rounded-md transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="eyebrow text-academic-600 mb-1">Applicant's Background</p>
          <DetailRow label="Date of Birth" value={a.dob} />
          <DetailRow label="Gender" value={a.gender} />
          <DetailRow label="Ethnicity" value={a.ethnicity} />
          <DetailRow label="Religion" value={a.religion} />
          <DetailRow label="NRC Number" value={a.nrcNumber} />
          <DetailRow label="Primary Phone" value={a.primaryPhone} />
          <DetailRow label="Secondary Phone" value={a.secondaryPhone} />
          <DetailRow label="Email" value={a.email} />
          <DetailRow label="Permanent Address" value={a.permanentAddress} />
          <DetailRow label="Current Address" value={a.currentAddress} />

          <p className="eyebrow text-academic-600 mb-1 mt-6">Family & Emergency Contact</p>
          <DetailRow label="Father's Name" value={a.fatherName} />
          <DetailRow label="Mother's Name" value={a.motherName} />
          <DetailRow label="Family Address" value={a.familyAddress} />
          <DetailRow label="Emergency Contact" value={`${a.emergencyContactName || ''} — ${a.emergencyContactPhone || ''}`} />
          <DetailRow label="Emergency Address" value={a.emergencyContactAddress} />

          <p className="eyebrow text-academic-600 mb-1 mt-6">Education & Experience</p>
          <DetailRow label="Highest Education" value={a.highestEducation} />
          <DetailRow label="Institution" value={a.institutionName} />
          <DetailRow label="Completion Date" value={a.completionDate} />
          <DetailRow label="High School" value={`${a.highSchoolName || ''} (${a.highSchoolCompletionYear || ''})`} />
          <DetailRow label="Volunteer Org / Role" value={`${a.volunteerOrg || ''} — ${a.volunteerPosition || ''}`} />
          <DetailRow label="Applied Before?" value={a.appliedBefore === 'Yes' ? `Yes (${a.appliedBeforeDetails || ''})` : 'No'} />

          <p className="eyebrow text-academic-600 mb-1 mt-6">Essays</p>
          <DetailRow label="Essay 1" value={a.essay1} />
          <DetailRow label="Essay 2" value={a.essay2} />
        </div>

        <div className="sticky bottom-0 bg-white border-t border-ink-900/8 px-6 py-4 flex justify-end">
          <button
            onClick={() => downloadApplicationPDF(a)}
            className="inline-flex items-center gap-2 bg-academic-600 hover:bg-academic-700 text-white font-medium text-sm px-4 py-2.5 rounded-md transition-colors"
          >
            <Download size={15} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
