import { useState, useMemo } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { CheckCircle2, Download, FileText } from 'lucide-react'
import { saveApplication } from '../data/applicationsStore.js'
import { downloadApplicationPDF } from '../utils/applicationPdf.js'

const initialForm = {
  // 1. Applicant's Background
  fullName: '',
  dob: '',
  gender: '',
  ethnicity: '',
  religion: '',
  nrcNumber: '',
  primaryPhone: '',
  secondaryPhone: '',
  email: '',
  permanentAddress: '',
  currentAddress: '',

  // Family Background
  fatherName: '',
  motherName: '',
  familyAddress: '',

  // Emergency Contact
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactAddress: '',

  // 2. Education Background & Voluntary Experience
  highestEducation: '',
  institutionName: '',
  completionDate: '',
  highSchoolName: '',
  highSchoolCompletionYear: '',
  volunteerOrg: '',
  volunteerPosition: '',
  volunteerDuration: '',
  volunteerResponsibilities: '',
  trainingsAttended: '',
  appliedBefore: 'No',
  appliedBeforeDetails: '',

  // 3. Application Essays
  essay1: '',
  essay2: '',

  // Declaration
  declarationName: '',
  declarationDate: '',
  agreeDeclaration: false,
}

function Field({ label, children, required, hint }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-900/80">
        {label} {required && <span className="text-academic-600">*</span>}
      </span>
      {hint && <span className="block text-[11.5px] text-ink-900/45 mt-0.5">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-ink-900/15 bg-white px-3.5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-900/35 focus:border-academic-500 focus:ring-1 focus:ring-academic-500 outline-none transition-colors'

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export default function ApplyPage() {
  const [form, setForm] = useState(initialForm)
  const [submittedApp, setSubmittedApp] = useState(null)

  const essay1Words = useMemo(() => wordCount(form.essay1), [form.essay1])
  const essay2Words = useMemo(() => wordCount(form.essay2), [form.essay2])

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const record = saveApplication(form)
    setSubmittedApp(record)
  }

  if (submittedApp) {
    return (
      <div>
        <PageHeader eyebrow="Admissions · Batch 15" title="Application Form" />
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
          <CheckCircle2 className="mx-auto text-academic-600" size={48} strokeWidth={1.5} />
          <h2 className="font-display text-2xl font-semibold text-ink-900 mt-5">Application received</h2>
          <p className="text-ink-900/65 mt-3 text-sm leading-relaxed">
            Thank you, {submittedApp.fullName || 'applicant'}. Your application
            (<span className="font-mono text-[13px]">{submittedApp.id}</span>) has been recorded.
            Download your receipt below for your records — it is not a confirmation of admission.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => downloadApplicationPDF(submittedApp)}
              className="inline-flex items-center gap-2 bg-academic-600 hover:bg-academic-700 text-white font-semibold text-sm px-5 py-3 rounded-md transition-colors"
            >
              <Download size={16} /> Download PDF receipt
            </button>
            <button
              onClick={() => { setForm(initialForm); setSubmittedApp(null) }}
              className="text-academic-600 hover:text-academic-700 text-sm font-medium underline underline-offset-4"
            >
              Submit another application
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Pre-College Program · Phaung Daw Oo International University"
        title="Application Form — Diploma in Social Science"
        subtitle="PIU-PCP Batch 15 (2027–28). Please complete every section accurately — false statements will disqualify your application."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-ink-900/8 shadow-card p-6 sm:p-8 space-y-9">

          {/* 1. Applicant's Background */}
          <div>
            <p className="eyebrow text-academic-600 mb-4">1. Applicant's Background</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <input required className={inputClass} value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
              </Field>
              <Field label="Date of Birth" required>
                <input required type="date" className={inputClass} value={form.dob} onChange={(e) => update('dob', e.target.value)} />
              </Field>
              <Field label="Gender" required>
                <select required className={inputClass} value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                  <option value="">Select…</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </Field>
              <Field label="Ethnicity" required>
                <input required className={inputClass} value={form.ethnicity} onChange={(e) => update('ethnicity', e.target.value)} />
              </Field>
              <Field label="Religion" required>
                <input required className={inputClass} value={form.religion} onChange={(e) => update('religion', e.target.value)} />
              </Field>
              <Field label="NRC Number" required>
                <input required className={inputClass} value={form.nrcNumber} onChange={(e) => update('nrcNumber', e.target.value)} />
              </Field>
              <Field label="Primary Phone Number" required>
                <input required type="tel" className={inputClass} value={form.primaryPhone} onChange={(e) => update('primaryPhone', e.target.value)} />
              </Field>
              <Field label="Secondary Phone Number">
                <input type="tel" className={inputClass} value={form.secondaryPhone} onChange={(e) => update('secondaryPhone', e.target.value)} />
              </Field>
              <Field label="Email" required>
                <input required type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Permanent Address" required>
                  <textarea required rows={2} className={inputClass} value={form.permanentAddress} onChange={(e) => update('permanentAddress', e.target.value)} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Current Address" required>
                  <textarea required rows={2} className={inputClass} value={form.currentAddress} onChange={(e) => update('currentAddress', e.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* Family Background */}
          <div>
            <p className="eyebrow text-academic-600 mb-4">Family Background</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Father's Name" required>
                <input required className={inputClass} value={form.fatherName} onChange={(e) => update('fatherName', e.target.value)} />
              </Field>
              <Field label="Mother's Name" required>
                <input required className={inputClass} value={form.motherName} onChange={(e) => update('motherName', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Family Address" required>
                  <textarea required rows={2} className={inputClass} value={form.familyAddress} onChange={(e) => update('familyAddress', e.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* Emergency Contact */}
          <div>
            <p className="eyebrow text-academic-600 mb-4">Emergency Contact</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Contact Name" required>
                <input required className={inputClass} value={form.emergencyContactName} onChange={(e) => update('emergencyContactName', e.target.value)} />
              </Field>
              <Field label="Phone Number" required>
                <input required type="tel" className={inputClass} value={form.emergencyContactPhone} onChange={(e) => update('emergencyContactPhone', e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address" required>
                  <textarea required rows={2} className={inputClass} value={form.emergencyContactAddress} onChange={(e) => update('emergencyContactAddress', e.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="rule" />

          {/* 2. Education Background & Voluntary Experience */}
          <div>
            <p className="eyebrow text-academic-600 mb-4">2. Education Background & Voluntary Experience</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Highest Education Obtained" required>
                <input required className={inputClass} value={form.highestEducation} onChange={(e) => update('highestEducation', e.target.value)} />
              </Field>
              <Field label="Institution Name" required>
                <input required className={inputClass} value={form.institutionName} onChange={(e) => update('institutionName', e.target.value)} />
              </Field>
              <Field label="Completion Date" required>
                <input required className={inputClass} placeholder="e.g. June 2024" value={form.completionDate} onChange={(e) => update('completionDate', e.target.value)} />
              </Field>
            </div>

            <p className="text-[13px] font-semibold text-ink-900/80 mt-6 mb-3">High School Completion</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name of High School" required>
                <input required className={inputClass} value={form.highSchoolName} onChange={(e) => update('highSchoolName', e.target.value)} />
              </Field>
              <Field label="Completion Year" required>
                <input required className={inputClass} value={form.highSchoolCompletionYear} onChange={(e) => update('highSchoolCompletionYear', e.target.value)} />
              </Field>
            </div>

            <p className="text-[13px] font-semibold text-ink-900/80 mt-6 mb-1">Volunteer Experience (if any)</p>
            <p className="text-[12px] text-ink-900/45 mb-3">
              If you have worked for more than one organization, mention additional roles in "Responsibilities" below.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name of Organization">
                <input className={inputClass} value={form.volunteerOrg} onChange={(e) => update('volunteerOrg', e.target.value)} />
              </Field>
              <Field label="Your Position">
                <input className={inputClass} value={form.volunteerPosition} onChange={(e) => update('volunteerPosition', e.target.value)} />
              </Field>
              <Field label="Duration">
                <input className={inputClass} placeholder="e.g. Jan 2024 – Jun 2024" value={form.volunteerDuration} onChange={(e) => update('volunteerDuration', e.target.value)} />
              </Field>
              <Field label="Your Responsibilities">
                <input className={inputClass} value={form.volunteerResponsibilities} onChange={(e) => update('volunteerResponsibilities', e.target.value)} />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Please list the training(s) or program(s) you have taken">
                <textarea rows={2} className={inputClass} value={form.trainingsAttended} onChange={(e) => update('trainingsAttended', e.target.value)} />
              </Field>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              <Field label="Have you ever applied for PCP before?" required>
                <select required className={inputClass} value={form.appliedBefore} onChange={(e) => update('appliedBefore', e.target.value)}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </Field>
              {form.appliedBefore === 'Yes' && (
                <Field label="Please mention the batch(es)/year(s) you applied for" required>
                  <input required className={inputClass} value={form.appliedBeforeDetails} onChange={(e) => update('appliedBeforeDetails', e.target.value)} />
                </Field>
              )}
            </div>
          </div>

          <div className="rule" />

          {/* 3. Application Essays */}
          <div>
            <p className="eyebrow text-academic-600 mb-2">3. Application Essays</p>
            <p className="text-[12.5px] text-ink-900/55 leading-relaxed mb-5">
              Please write both essays yourself, without help or grammar-checking from others or AI tools.
              AI-generated essays will be automatically rejected — mistakes are okay, clarity is what matters.
            </p>

            <div className="space-y-6">
              <Field
                label="Essay 1: What motivated you to apply for the PCP program, and what do you hope to learn or achieve through it?"
                hint="250–300 words"
                required
              >
                <textarea
                  required
                  rows={7}
                  className={inputClass}
                  value={form.essay1}
                  onChange={(e) => update('essay1', e.target.value)}
                />
                <p className={`text-[11.5px] mt-1 ${essay1Words > 300 || (essay1Words > 0 && essay1Words < 250) ? 'text-amber-600' : 'text-ink-900/40'}`}>
                  {essay1Words} words
                </p>
              </Field>

              <Field
                label="Essay 2: In your opinion, what is one major social issue affecting youth in your community, and how do you think it could be addressed?"
                hint="250–300 words"
                required
              >
                <textarea
                  required
                  rows={7}
                  className={inputClass}
                  value={form.essay2}
                  onChange={(e) => update('essay2', e.target.value)}
                />
                <p className={`text-[11.5px] mt-1 ${essay2Words > 300 || (essay2Words > 0 && essay2Words < 250) ? 'text-amber-600' : 'text-ink-900/40'}`}>
                  {essay2Words} words
                </p>
              </Field>
            </div>
          </div>

          <div className="rule" />

          {/* Declaration */}
          <div>
            <p className="eyebrow text-academic-600 mb-4">Declaration</p>
            <div className="bg-academic-50 border border-academic-100 rounded-md p-4 flex items-start gap-3">
              <FileText size={18} className="text-academic-600 mt-0.5 shrink-0" />
              <p className="text-[13px] text-ink-900/75 leading-relaxed">
                I hereby declare that the information provided is accurate and I am fully aware that any
                false statement provided will disqualify my application.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-5">
              <Field label="Name" required>
                <input required className={inputClass} value={form.declarationName} onChange={(e) => update('declarationName', e.target.value)} />
              </Field>
              <Field label="Date" required>
                <input required type="date" className={inputClass} value={form.declarationDate} onChange={(e) => update('declarationDate', e.target.value)} />
              </Field>
            </div>

            <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
              <input
                required
                type="checkbox"
                checked={form.agreeDeclaration}
                onChange={(e) => update('agreeDeclaration', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-academic-600"
              />
              <span className="text-[13px] text-ink-900/75">
                I confirm the declaration above and certify that both essays are my own original work.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-academic-600 hover:bg-academic-700 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
          >
            Submit application
          </button>
        </form>
      </section>
    </div>
  )
}
