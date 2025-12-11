import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import AssignmentsPage from './pages/AssignmentsPage'
import PaymentPage from './pages/PaymentPage'
import CoursesPage from './pages/CoursesPage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import MarketplacePage from './pages/MarketplacePage'
import GuardianPortalPage from './pages/GuardianPortalPage'
import LMSDashboardPage from './pages/LMSDashboardPage'
import VirtualClassroomPage from './pages/VirtualClassroomPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/guardian" element={<GuardianPortalPage />} />
        <Route path="/lms" element={<LMSDashboardPage />} />
        <Route path="/classroom/:id" element={<VirtualClassroomPage />} />
      </Routes>
    </Router>
  )
}

export default App