import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './components/notifications/NotificationContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import AssignmentsPage from './pages/AssignmentsPage'
import PaymentPage from './pages/PaymentPage'
import PricingPage from './pages/PricingPage'
import CoursesPage from './pages/CoursesPage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import MarketplacePage from './pages/MarketplacePage'
import GuardianPortalPage from './pages/GuardianPortalPage'
import LMSDashboardPage from './pages/LMSDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import VendorDashboardPage from './pages/VendorDashboardPage'
import VendorUploadPage from './pages/VendorUploadPage'
import VirtualClassroomPage from './pages/VirtualClassroomPage'
import TimetablePage from './pages/TimetablePage'
import OnlineExamsPage from './pages/OnlineExamsPage'
import CourseOutlinePage from './pages/CourseOutlinePage'
import StudyMaterialsPage from './pages/StudyMaterialsPage'
import OnlineStudyRoomPage from './pages/OnlineStudyRoomPage'
import NotificationsPage from './pages/NotificationsPage'
import MessagesPage from './pages/MessagesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import HelpPage from './pages/HelpPage'
import BlogPage from './pages/BlogPage'
import FAQPage from './pages/FAQPage'
import CareersPage from './pages/CareersPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import FeaturesDemoPage from './pages/FeaturesDemoPage'

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/guardian" element={<GuardianPortalPage />} />
          <Route path="/lms" element={<LMSDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/vendor" element={<VendorDashboardPage />} />
          <Route path="/vendor/upload" element={<VendorUploadPage />} />
          <Route path="/classroom/:id" element={<VirtualClassroomPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/exams" element={<OnlineExamsPage />} />
          <Route path="/exams/:examId" element={<OnlineExamsPage />} />
          <Route path="/course-outline" element={<CourseOutlinePage />} />
          <Route path="/study-materials" element={<StudyMaterialsPage />} />
          <Route path="/study-room/:roomId?" element={<OnlineStudyRoomPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/demo" element={<FeaturesDemoPage />} />
        </Routes>
      </Router>
    </NotificationProvider>
  )
}

export default App