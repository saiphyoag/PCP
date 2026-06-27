// jsPDF is loaded dynamically so it doesn't bloat the main app bundle —
// it's only needed when an applicant or admin actually generates a PDF.

const PAGE_W = 210 // A4 mm
const MARGIN = 18
const CONTENT_W = PAGE_W - MARGIN * 2

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Generates a PDF receipt for a submitted PIU-PCP application.
 * Layout mirrors the section order of the original Word application form:
 * Applicant's Background → Family Background → Emergency Contact →
 * Education Background & Voluntary Experience → Application Essays → Declaration.
 */
export async function generateApplicationPDF(app) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = MARGIN

  const lineGap = 6
  const sectionGap = 9

  function ensureSpace(needed) {
    if (y + needed > 297 - MARGIN) {
      doc.addPage()
      y = MARGIN
    }
  }

  function heading(text) {
    ensureSpace(10)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(30, 58, 138) // academic blue
    doc.text(text, MARGIN, y)
    doc.setDrawColor(30, 58, 138)
    doc.setLineWidth(0.4)
    doc.line(MARGIN, y + 1.6, PAGE_W - MARGIN, y + 1.6)
    y += 8
    doc.setTextColor(15, 23, 42)
  }

  function field(label, value) {
    ensureSpace(lineGap + 2)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.text(`${label}:`, MARGIN, y)
    doc.setFont('helvetica', 'normal')
    const labelWidth = doc.getTextWidth(`${label}: `) + 1
    const text = (value && String(value).trim()) || '—'
    const wrapped = doc.splitTextToSize(text, CONTENT_W - labelWidth)
    doc.text(wrapped, MARGIN + labelWidth, y)
    y += lineGap * Math.max(1, wrapped.length)
  }

  function paragraphBlock(label, text) {
    ensureSpace(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.text(label, MARGIN, y)
    y += 5.5
    doc.setFont('helvetica', 'normal')
    const wrapped = doc.splitTextToSize((text && text.trim()) || '—', CONTENT_W)
    wrapped.forEach((line) => {
      ensureSpace(5.2)
      doc.text(line, MARGIN, y)
      y += 5.2
    })
    y += 3
  }

  // ---------- Letterhead ----------
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(30, 58, 138)
  doc.text('Phaung Daw Oo International University', MARGIN, y)
  y += 7
  doc.setFontSize(12)
  doc.text('Pre-College Program (PIU-PCP)', MARGIN, y)
  y += 6.5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(80, 90, 110)
  doc.text('Diploma in Social Science — Batch 14 (2026–27) — Application Receipt', MARGIN, y)
  y += 4
  doc.setDrawColor(201, 154, 34) // gold
  doc.setLineWidth(0.8)
  doc.line(MARGIN, y, PAGE_W - MARGIN, y)
  y += 8
  doc.setTextColor(15, 23, 42)

  // ---------- Receipt meta ----------
  field('Application ID', app.id)
  field('Submitted at', new Date(app.submittedAt).toLocaleString())
  y += sectionGap - 6

  // ---------- Applicant's Background ----------
  heading("1. Applicant's Background")
  field('Full Name', app.fullName)
  field('Date of Birth', formatDate(app.dob))
  field('Gender', app.gender)
  field('Ethnicity', app.ethnicity)
  field('Religion', app.religion)
  field('NRC Number', app.nrcNumber)
  field('Primary Phone Number', app.primaryPhone)
  field('Secondary Phone Number', app.secondaryPhone)
  field('Email', app.email)
  field('Permanent Address', app.permanentAddress)
  field('Current Address', app.currentAddress)
  y += sectionGap - 6

  // ---------- Family Background ----------
  heading('Family Background')
  field("Father's Name", app.fatherName)
  field("Mother's Name", app.motherName)
  field('Family Address', app.familyAddress)
  y += sectionGap - 6

  // ---------- Emergency Contact ----------
  heading('Emergency Contact')
  field('Contact Name', app.emergencyContactName)
  field('Phone Number', app.emergencyContactPhone)
  field('Address', app.emergencyContactAddress)
  y += sectionGap - 6

  // ---------- Education Background & Voluntary Experience ----------
  heading('2. Education Background & Voluntary Experience')
  field('Highest Education Obtained', app.highestEducation)
  field('Institution Name', app.institutionName)
  field('Completion Date', app.completionDate)
  y += 2
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  ensureSpace(6)
  doc.text('High School Completion', MARGIN, y)
  y += 6
  field('Name of High School', app.highSchoolName)
  field('Completion Year', app.highSchoolCompletionYear)
  y += 2
  doc.setFont('helvetica', 'bold')
  ensureSpace(6)
  doc.text('Volunteer Experience (if any)', MARGIN, y)
  y += 6
  field('Name of Organization', app.volunteerOrg)
  field('Position', app.volunteerPosition)
  field('Duration', app.volunteerDuration)
  field('Responsibilities', app.volunteerResponsibilities)
  field('Trainings / Programs Attended', app.trainingsAttended)
  field('Applied for PCP Before?', app.appliedBefore)
  if (app.appliedBefore === 'Yes') {
    field('Batch(es) / Year(s) Applied', app.appliedBeforeDetails)
  }
  y += sectionGap - 6

  // ---------- Essays ----------
  heading('3. Application Essays')
  paragraphBlock(
    'Essay 1 — What motivated you to apply for the PCP program, and what do you hope to learn or achieve through it?',
    app.essay1
  )
  paragraphBlock(
    'Essay 2 — In your opinion, what is one major social issue affecting youth in your community, and how do you think it could be addressed?',
    app.essay2
  )
  y += sectionGap - 6

  // ---------- Declaration ----------
  heading('Declaration')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  const declarationText = doc.splitTextToSize(
    'I hereby declare that the information provided is accurate and I am fully aware that any false statement provided will disqualify my application.',
    CONTENT_W
  )
  ensureSpace(declarationText.length * 5)
  declarationText.forEach((line) => {
    doc.text(line, MARGIN, y)
    y += 5
  })
  y += 4
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  field('Name', app.declarationName)
  field('Date', formatDate(app.declarationDate))

  // ---------- Footer note ----------
  ensureSpace(14)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(110, 120, 140)
  doc.text(
    'This receipt confirms your application was recorded by the system. It is not a confirmation of admission.',
    MARGIN, y
  )

  return doc
}

export async function downloadApplicationPDF(app) {
  const doc = await generateApplicationPDF(app)
  doc.save(`PIUPCP-Application-${app.id}.pdf`)
}
