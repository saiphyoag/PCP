import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import SideDrawer from './components/SideDrawer.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import AnnouncementsPage from './pages/AnnouncementsPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import UpdatesPage from './pages/UpdatesPage.jsx'
import ApplyPage from './pages/ApplyPage.jsx'
import InstructorsPage from './pages/InstructorsPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import AlumniPage from './pages/AlumniPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  // Close drawer and scroll to top on every route change
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="font-display text-4xl font-semibold text-ink-900">404</p>
      <p className="text-ink-900/60 mt-2">Page not found.</p>
    </div>
  )
}
