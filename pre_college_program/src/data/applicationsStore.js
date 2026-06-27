// Storage layer for submitted applications.
//
// Currently backed by localStorage since there's no backend yet.
// To move to a real backend later, replace the bodies of these functions
// with fetch() calls to your API — the function signatures (and what
// pages call) do not need to change.

const STORAGE_KEY = 'piupcp_applications_v1'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function saveApplication(application) {
  const list = readAll()
  const record = {
    ...application,
    id: application.id || `APP-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: application.submittedAt || new Date().toISOString(),
  }
  list.unshift(record) // newest first
  writeAll(list)
  return record
}

export function getApplications() {
  return readAll()
}

export function getApplicationById(id) {
  return readAll().find((a) => a.id === id) || null
}

export function deleteApplication(id) {
  const list = readAll().filter((a) => a.id !== id)
  writeAll(list)
}

export function clearAllApplications() {
  writeAll([])
}

// Exports the full application list as a CSV file download.
export function exportApplicationsCSV(applications) {
  if (!applications.length) return

  const columns = [
    'id', 'submittedAt', 'fullName', 'dob', 'gender', 'ethnicity', 'religion',
    'nrcNumber', 'primaryPhone', 'secondaryPhone', 'email', 'permanentAddress',
    'currentAddress', 'fatherName', 'motherName', 'familyAddress',
    'emergencyContactName', 'emergencyContactPhone', 'emergencyContactAddress',
    'highestEducation', 'institutionName', 'completionDate',
    'highSchoolName', 'highSchoolCompletionYear',
    'volunteerOrg', 'volunteerPosition', 'volunteerDuration', 'volunteerResponsibilities',
    'trainingsAttended', 'appliedBefore', 'appliedBeforeDetails',
    'essay1', 'essay2', 'declarationName', 'declarationDate',
  ]

  const escape = (val) => {
    const s = (val ?? '').toString().replace(/"/g, '""')
    return `"${s}"`
  }

  const header = columns.join(',')
  const rows = applications.map((a) => columns.map((c) => escape(a[c])).join(','))
  const csv = [header, ...rows].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `piupcp-applications-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
