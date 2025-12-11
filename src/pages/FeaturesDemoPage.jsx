import React, { useState } from 'react'
import { 
  Menu, 
  X, 
  Bell, 
  Settings, 
  User, 
  Bot, 
  Sparkles, 
  Upload, 
  Download, 
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  BarChart3,
  MessageSquare,
  Palette,
  Accessibility,
  Shield
} from 'lucide-react'
import { NotificationProvider, useNotifications } from '../components/notifications/NotificationSystem'
import { ConfirmModal, UploadModal, PaymentModal, SuccessModal } from '../components/modals/ModalComponents'
import { LoginForm, SignupForm, ContactForm, AssignmentForm } from '../components/forms/StyledForms'
import AICompanion from '../components/ai/AICompanion'
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard'
import DocumentGenerator from '../components/documents/DocumentGenerator'
import AccessibilityPanel from '../components/accessibility/AccessibilityPanel'
import RoleBasedNav from '../components/common/RoleBasedNav'
import EnhancedFooter from '../components/common/EnhancedFooter'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'

const FeaturesDemoPage = () => {
  const { showSuccess, showError, showWarning, showInfo, addBanner } = useNotifications()
  const [activeSection, setActiveSection] = useState('navigation')
  const [showAICompanion, setShowAICompanion] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [modals, setModals] = useState({
    confirm: false,
    upload: false,
    payment: false,
    success: false
  })

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }))
  }

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }))
  }

  const handleConfirm = () => {
    closeModal('confirm')
    showSuccess('Action completed successfully!')
  }

  const handleUpload = (files) => {
    console.log('Uploading files:', files)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  const handlePayment = (data, method) => {
    console.log('Processing payment:', data, method)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  const sections = [
    { id: 'navigation', name: 'Navigation', icon: Menu },
    { id: 'ai', name: 'AI Companion', icon: Bot },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'forms', name: 'Forms', icon: FileText },
    { id: 'modals', name: 'Modals', icon: AlertTriangle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'accessibility', name: 'Accessibility', icon: Accessibility }
  ]

  const NavigationDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Role-Based Navigation</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Student View</h3>
          <RoleBasedNav userRole="student" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Guardian View</h3>
          <RoleBasedNav userRole="guardian" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Guest View</h3>
          <RoleBasedNav userRole="guest" />
        </div>
      </div>
    </div>
  )

  const AIDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">AI Learning Companion</h2>
      <div className="flex gap-4">
        <GradientButton
          gradient={gradients.secondary}
          onClick={() => setShowAICompanion(true)}
        >
          <Bot className="w-4 h-4" />
          Open AI Companion
        </GradientButton>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          The AI Companion provides personalized learning support, study recommendations, and instant help with coursework.
        </p>
      </div>
    </div>
  )

  const AnalyticsDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
      <AnalyticsDashboard userRole="student" />
    </div>
  )

  const DocumentsDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Document Generator</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Clearance Form</h3>
          <DocumentGenerator documentType="clearance" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Payment Receipt</h3>
          <DocumentGenerator documentType="receipt" />
        </div>
      </div>
    </div>
  )

  const FormsDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Styled Forms with Validation</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LoginForm onSubmit={(data) => console.log('Login:', data)} />
        <ContactForm onSubmit={(data) => console.log('Contact:', data)} />
      </div>
    </div>
  )

  const ModalsDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Modal Components</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GradientButton
          gradient={gradients.warning}
          onClick={() => openModal('confirm')}
        >
          <AlertTriangle className="w-4 h-4" />
          Confirm Dialog
        </GradientButton>
        <GradientButton
          gradient={gradients.primary}
          onClick={() => openModal('upload')}
        >
          <Upload className="w-4 h-4" />
          Upload Modal
        </GradientButton>
        <GradientButton
          gradient={gradients.success}
          onClick={() => openModal('payment')}
        >
          <CreditCard className="w-4 h-4" />
          Payment Modal
        </GradientButton>
        <GradientButton
          gradient={gradients.secondary}
          onClick={() => openModal('success')}
        >
          <CheckCircle className="w-4 h-4" />
          Success Modal
        </GradientButton>
      </div>
    </div>
  )

  const NotificationsDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Notification System</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => showSuccess('Operation completed successfully!')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Success Toast
        </button>
        <button
          onClick={() => showError('An error occurred. Please try again.')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Error Toast
        </button>
        <button
          onClick={() => showWarning('Please review your input before proceeding.')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Warning Toast
        </button>
        <button
          onClick={() => showInfo('New features are available!')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Info Toast
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => addBanner({
            type: 'info',
            message: 'System maintenance scheduled for tonight',
            description: 'The system will be unavailable from 2 AM to 4 AM EST'
          })}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Add Banner
        </button>
      </div>
    </div>
  )

  const AccessibilityDemo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Accessibility Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GradientButton
          gradient={gradients.primary}
          onClick={() => setShowAccessibility(true)}
        >
          <Accessibility className="w-4 h-4" />
          Open Accessibility Panel
        </GradientButton>
      </div>
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-green-800">
          Accessibility features include screen reader support, keyboard navigation, high contrast mode, and customizable text sizes.
        </p>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'navigation': return <NavigationDemo />
      case 'ai': return <AIDemo />
      case 'analytics': return <AnalyticsDemo />
      case 'documents': return <DocumentsDemo />
      case 'forms': return <FormsDemo />
      case 'modals': return <ModalsDemo />
      case 'notifications': return <NotificationsDemo />
      case 'accessibility': return <AccessibilityDemo />
      default: return <NavigationDemo />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <RoleBasedNav userRole="student" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">EduConnect Features Demo</h1>
            <p className="text-xl text-white/80 mb-8">
              Explore all the advanced features and components available in EduConnect
            </p>
            <div className="flex justify-center gap-4">
              <GradientButton gradient={gradients.secondary}>
                <Sparkles className="w-4 h-4" />
                View All Features
              </GradientButton>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#011F5B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        {renderSection()}
      </div>

      {/* Footer */}
      <EnhancedFooter />

      {/* AI Companion */}
      <AICompanion
        isOpen={showAICompanion}
        onClose={() => setShowAICompanion(false)}
      />

      {/* Accessibility Panel */}
      <AccessibilityPanel
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
      />

      {/* Modals */}
      <ConfirmModal
        isOpen={modals.confirm}
        onClose={() => closeModal('confirm')}
        onConfirm={handleConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        type="danger"
      />

      <UploadModal
        isOpen={modals.upload}
        onClose={() => closeModal('upload')}
        onUpload={handleUpload}
        title="Upload Files"
        multiple={true}
      />

      <PaymentModal
        isOpen={modals.payment}
        onClose={() => closeModal('payment')}
        onPayment={handlePayment}
        amount={99.99}
        description="Premium Subscription"
      />

      <SuccessModal
        isOpen={modals.success}
        onClose={() => closeModal('success')}
        title="Payment Successful!"
        message="Your payment has been processed successfully."
      />
    </div>
  )
}

// Wrapper component with NotificationProvider
const FeaturesDemoPageWrapper = () => (
  <NotificationProvider>
    <FeaturesDemoPage />
  </NotificationProvider>
)

export default FeaturesDemoPageWrapper
