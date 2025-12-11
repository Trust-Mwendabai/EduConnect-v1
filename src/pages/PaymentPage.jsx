import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  CreditCard, 
  Smartphone, 
  Receipt, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  FileText,
  Shield,
  TrendingUp,
  Award,
  Clock,
  User,
  Building,
  Book,
  Home,
  CheckSquare,
  X,
  Send,
  Printer,
  Mail,
  Phone,
  RefreshCw,
  ArrowRight,
  Info,
  Bell,
  AlertTriangle,
  ChevronDown,
  Wallet,
  PiggyBank,
  Target,
  Zap,
  Star,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Archive,
  Trash2,
  Edit3,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  PieChart,
  Activity,
  Users,
  MapPin,
  Globe,
  Lock,
  Unlock,
  Key,
  SmartphoneNfc,
  QrCode,
  Banknote,
  Building2
} from 'lucide-react'

function PaymentPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [showPaymentSettings, setShowPaymentSettings] = useState(false)
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    { id: 1, type: 'mobile_money', provider: 'MTN', number: '0977123456', isDefault: true },
    { id: 2, type: 'mobile_money', provider: 'Airtel', number: '0976987654', isDefault: false },
    { id: 3, type: 'card', last4: '1234', brand: 'Visa', isDefault: false }
  ])
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment_due', message: 'Tuition payment due in 3 days', date: '2024-01-17', read: false },
    { id: 2, type: 'payment_success', message: 'Payment of ZMW 500 received', date: '2024-01-15', read: true }
  ])

  const [paymentHistory] = useState([
    {
      id: 1,
      type: 'tuition',
      description: 'Semester Tuition Fee',
      amount: 2500,
      date: '2024-01-10',
      method: 'mobile_money',
      status: 'completed',
      transactionId: 'TXN001234567',
      receiptUrl: '/receipts/TXN001234567.pdf',
      category: 'academic',
      semester: 'Spring 2024'
    },
    {
      id: 2,
      type: 'library',
      description: 'Library Fine',
      amount: 25,
      date: '2024-01-08',
      method: 'card',
      status: 'completed',
      transactionId: 'TXN001234568',
      receiptUrl: '/receipts/TXN001234568.pdf',
      category: 'fees',
      semester: 'Spring 2024'
    },
    {
      id: 3,
      type: 'hostel',
      description: 'Hostel Accommodation',
      amount: 500,
      date: '2024-01-05',
      method: 'mobile_money',
      status: 'completed',
      transactionId: 'TXN001234569',
      receiptUrl: '/receipts/TXN001234569.pdf',
      category: 'accommodation',
      semester: 'Spring 2024'
    },
    {
      id: 4,
      type: 'exam',
      description: 'Examination Fee',
      amount: 100,
      date: '2024-01-03',
      method: 'mobile_money',
      status: 'completed',
      transactionId: 'TXN001234570',
      receiptUrl: '/receipts/TXN001234570.pdf',
      category: 'fees',
      semester: 'Spring 2024'
    },
    {
      id: 5,
      type: 'course',
      description: 'Advanced React Development',
      amount: 299,
      date: '2024-01-12',
      method: 'card',
      status: 'completed',
      transactionId: 'TXN001234571',
      receiptUrl: '/receipts/TXN001234571.pdf',
      category: 'courses',
      semester: 'Spring 2024'
    }
  ])

  const [pendingPayments] = useState([
    {
      id: 1,
      type: 'tuition',
      description: 'Remaining Tuition Balance',
      amount: 1500,
      dueDate: '2024-01-20',
      priority: 'high',
      installment: '2 of 4',
      category: 'academic',
      lateFee: 50
    },
    {
      id: 2,
      type: 'lab',
      description: 'Laboratory Fees',
      amount: 200,
      dueDate: '2024-01-25',
      priority: 'medium',
      installment: '1 of 2',
      category: 'fees',
      lateFee: 20
    },
    {
      id: 3,
      type: 'sports',
      description: 'Sports & Recreation',
      amount: 50,
      dueDate: '2024-01-30',
      priority: 'low',
      installment: '1 of 1',
      category: 'activities',
      lateFee: 10
    },
    {
      id: 4,
      type: 'course',
      description: 'Database Management Course',
      amount: 199,
      dueDate: '2024-01-22',
      priority: 'medium',
      installment: '1 of 1',
      category: 'courses',
      lateFee: 15
    }
  ])

  const [paymentStats] = useState({
    totalPaid: 3424,
    totalPending: 1949,
    thisMonth: 500,
    lastMonth: 1200,
    averagePayment: 428,
    paymentFrequency: 8,
    nextPaymentDue: 1500,
    clearanceProgress: 75
  })

  const [clearanceStatus] = useState({
    library: {
      name: 'Library',
      status: 'cleared',
      amount: 0,
      lastPayment: '2024-01-08',
      requirements: ['No overdue books', 'No pending fines', 'ID card returned']
    },
    accounts: {
      name: 'Accounts Department',
      status: 'pending',
      amount: 1500,
      dueDate: '2024-01-20',
      requirements: ['Tuition balance cleared', 'No outstanding fees']
    },
    faculty: {
      name: 'Faculty Office',
      status: 'cleared',
      amount: 0,
      lastCleared: '2024-01-12',
      requirements: ['Course registration complete', 'Advisor approval received']
    },
    hostel: {
      name: 'Hostel Management',
      status: 'cleared',
      amount: 0,
      lastPayment: '2024-01-05',
      requirements: ['Rent paid', 'Room inspection passed', 'No damages']
    },
    sports: {
      name: 'Sports Department',
      status: 'pending',
      amount: 50,
      dueDate: '2024-01-30',
      requirements: ['Sports fee payment', 'Equipment returned']
    }
  })

  const [paymentMethods] = useState([
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      providers: ['MTN Mobile Money', 'Airtel Money', 'Tigo Pesa'],
      description: 'Pay using your mobile money account'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      providers: ['Visa', 'Mastercard', 'American Express'],
      description: 'Pay using your credit or debit card'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      providers: ['Bank Transfer', 'Direct Deposit'],
      description: 'Transfer funds directly from your bank account'
    }
  ])

  const financialSummary = {
    totalFees: 5000,
    amountPaid: 3500,
    balance: 1500,
    nextPaymentDue: '2024-01-20',
    clearanceProgress: 60
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getClearanceProgress = () => {
    const cleared = Object.values(clearanceStatus).filter(dept => dept.status === 'cleared').length
    return (cleared / Object.keys(clearanceStatus).length) * 100
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !paymentAmount) return
    if (selectedPaymentMethod === 'mobile_money' && (!selectedProvider || !phoneNumber)) return
    
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
      
      // Reset after showing success
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentSuccess(false)
        setSelectedPaymentMethod('')
        setSelectedProvider('')
        setPhoneNumber('')
        setPaymentAmount('')
      }, 2000)
    }, 3000)
  }

  const handleDownloadReceipt = (transaction) => {
    setSelectedReceipt(transaction)
    setShowReceiptModal(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-12">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Payment & Clearance
              </h1>
              <p className="text-lg text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                Manage payments, view receipts, and track clearance status
              </p>
            </div>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Plus size={20} />
              <span>Make Payment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 -mt-8 relative z-10">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <DollarSign className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Total Fees</p>
                <p className="text-2xl font-bold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>{formatCurrency(financialSummary.totalFees)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Amount Paid</p>
                <p className="text-2xl font-bold text-green-600" style={{ fontFamily: 'var(--font-heading)' }}>{formatCurrency(financialSummary.amountPaid)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <AlertCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Balance</p>
                <p className="text-2xl font-bold text-red-600" style={{ fontFamily: 'var(--font-heading)' }}>{formatCurrency(financialSummary.balance)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Award className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Clearance</p>
                <p className="text-2xl font-bold text-purple-600" style={{ fontFamily: 'var(--font-heading)' }}>{Math.round(getClearanceProgress())}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md mb-8">
          {['overview', 'pending', 'history', 'clearance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'pending' && ` (${pendingPayments.length})`}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Payments */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Clock size={18} />
                  Pending Payments
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {pendingPayments.slice(0, 3).map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#FF6B35] hover:shadow-md transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>{payment.description}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(payment.priority)}`}>
                          {payment.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Due: {payment.dueDate}</span>
                        <span>{payment.installment}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#FF6B35] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{formatCurrency(payment.amount)}</p>
                      <button 
                        onClick={() => {
                          setPaymentAmount(payment.amount.toString())
                          setShowPaymentModal(true)
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-medium rounded-lg hover:shadow-md transition-all text-sm"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
                {pendingPayments.length > 3 && (
                  <button 
                    onClick={() => setActiveTab('pending')}
                    className="w-full py-2 text-center text-[#FF6B35] hover:text-[#E55A2B] transition-colors"
                  >
                    View All ({pendingPayments.length}) →
                  </button>
                )}
              </div>
            </div>

            {/* Clearance Status */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Shield size={18} />
                  Clearance Status
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>Overall Progress</span>
                    <span className="text-lg font-bold text-[#FF6B35]" style={{ fontFamily: 'var(--font-heading)' }}>{Math.round(getClearanceProgress())}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getClearanceProgress()}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(clearanceStatus).slice(0, 4).map(([key, dept]) => (
                    <div key={key} className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#FF6B35] hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                          dept.status === 'cleared' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        }`}>
                          {dept.status === 'cleared' ? (
                            <CheckCircle size={20} className="text-white" />
                          ) : (
                            <AlertCircle size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium" style={{ fontFamily: 'var(--font-heading)' }}>{dept.name}</p>
                          {dept.amount > 0 && (
                            <p className="text-sm text-red-600">{formatCurrency(dept.amount)} due</p>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${
                        dept.status === 'cleared' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {dept.status === 'cleared' ? 'Cleared' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md">
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Receipt size={18} />
                  Recent Transactions
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentHistory.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-5 border-2 rounded-xl hover:border-[#FF6B35] hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                          transaction.method === 'mobile_money' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                          transaction.method === 'card' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}>
                          {transaction.method === 'mobile_money' ? (
                            <Smartphone size={20} className="text-white" />
                          ) : transaction.method === 'card' ? (
                            <CreditCard size={20} className="text-white" />
                          ) : (
                            <Building size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>{transaction.description}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{transaction.date}</span>
                            <span>ID: {transaction.transactionId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                        <p className="font-semibold text-[#FF6B35] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{formatCurrency(transaction.amount)}</p>
                        <button 
                          onClick={() => handleDownloadReceipt(transaction)}
                          className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors"
                          title="Download Receipt"
                        >
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Payments Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                <Clock size={18} />
                All Pending Payments
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {pendingPayments.map(payment => (
                  <div key={payment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-[#011F5B]">{payment.description}</h4>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(payment.priority)}`}>
                            {payment.priority} priority
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <span className="ml-2 font-semibold text-[#FF6B35]">{formatCurrency(payment.amount)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Due Date:</span>
                            <span className="ml-2 font-medium">{payment.dueDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Installment:</span>
                            <span className="ml-2 font-medium">{payment.installment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors">
                          Pay Now
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                <Receipt size={18} />
                Payment History
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {paymentHistory.map(transaction => (
                  <div key={transaction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.method === 'mobile_money' ? 'bg-green-100' :
                          transaction.method === 'card' ? 'bg-blue-100' :
                          'bg-purple-100'
                        }`}>
                          {transaction.method === 'mobile_money' ? (
                            <Smartphone size={24} className="text-green-600" />
                          ) : transaction.method === 'card' ? (
                            <CreditCard size={24} className="text-blue-600" />
                          ) : (
                            <Building size={24} className="text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#011F5B]">{transaction.description}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{transaction.date}</span>
                            <span>Transaction ID: {transaction.transactionId}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-[#FF6B35]">{formatCurrency(transaction.amount)}</p>
                        <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clearance Tab */}
        {activeTab === 'clearance' && (
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#011F5B] text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Clearance Progress Tracker
                </h3>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#FF6B35]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {Math.round(getClearanceProgress())}%
                  </p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C61] to-[#FF6B35] h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${getClearanceProgress()}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Started</span>
                  <span>In Progress</span>
                  <span>Complete</span>
                </div>
              </div>

              {/* Clearance Steps Visualization */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
                <div className="space-y-6">
                  {Object.entries(clearanceStatus).map(([key, dept], index) => (
                    <div key={key} className="relative pl-20">
                      {/* Step Number */}
                      <div className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg ${
                        dept.status === 'cleared' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                          : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                      }`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {dept.status === 'cleared' ? <CheckCircle size={32} /> : index + 1}
                      </div>

                      {/* Department Card */}
                      <div className={`border-2 rounded-2xl p-6 transition-all ${
                        dept.status === 'cleared' 
                          ? 'border-green-300 bg-green-50/50' 
                          : 'border-yellow-300 bg-yellow-50/50 hover:shadow-lg'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-[#011F5B] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                              {dept.name}
                            </h4>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                              dept.status === 'cleared' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {dept.status === 'cleared' ? (
                                <><CheckCircle size={16} /> Cleared</>
                              ) : (
                                <><Clock size={16} /> Pending</>
                              )}
                            </span>
                          </div>
                          {dept.status === 'cleared' && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Cleared on</p>
                              <p className="font-semibold text-green-600">{dept.lastCleared || dept.lastPayment}</p>
                            </div>
                          )}
                        </div>

                        {dept.amount > 0 && (
                          <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-red-700">Outstanding Balance:</span>
                              <span className="text-2xl font-bold text-red-600" style={{ fontFamily: 'var(--font-heading)' }}>
                                {formatCurrency(dept.amount)}
                              </span>
                            </div>
                            {dept.dueDate && (
                              <div className="flex items-center gap-2 text-sm text-red-600">
                                <Calendar size={14} />
                                <span>Due: {dept.dueDate}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Requirements:</p>
                          {dept.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center gap-3 text-sm">
                              <CheckSquare size={16} className={dept.status === 'cleared' ? 'text-green-600' : 'text-gray-400'} />
                              <span className={dept.status === 'cleared' ? 'text-green-700 font-medium' : 'text-gray-600'}>
                                {req}
                              </span>
                            </div>
                          ))}
                        </div>

                        {dept.status === 'pending' && (
                          <button 
                            onClick={() => {
                              if (dept.amount > 0) {
                                setPaymentAmount(dept.amount.toString())
                                setShowPaymentModal(true)
                              }
                            }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {dept.amount > 0 ? (
                              <>
                                <DollarSign size={20} />
                                Pay {formatCurrency(dept.amount)} to Clear
                              </>
                            ) : (
                              <>
                                <CheckCircle size={20} />
                                Complete Clearance
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-[#011F5B] to-[#00416A]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    Make Payment
                  </h3>
                  <p className="text-white/80 text-sm">Secure payment processing</p>
                </div>
                <button
                  onClick={() => {
                    setShowPaymentModal(false)
                    setPaymentSuccess(false)
                    setSelectedPaymentMethod('')
                    setSelectedProvider('')
                    setPhoneNumber('')
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-white" size={24} />
                </button>
              </div>
            </div>
            
            {paymentSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Payment Successful!
                </h3>
                <p className="text-gray-600 mb-6">Your payment has been processed successfully</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Generating receipt...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      Payment Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] text-lg font-semibold"
                        placeholder="0.00"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      Select Payment Method
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map(method => {
                        const IconComponent = method.icon
                        return (
                          <button
                            key={method.id}
                            onClick={() => {
                              setSelectedPaymentMethod(method.id)
                              setSelectedProvider('')
                              setPhoneNumber('')
                            }}
                            className={`w-full p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${
                              selectedPaymentMethod === method.id
                                ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-md'
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              selectedPaymentMethod === method.id ? 'bg-[#FF6B35]' : 'bg-gray-100'
                            }`}>
                              <IconComponent size={24} className={selectedPaymentMethod === method.id ? 'text-white' : 'text-gray-600'} />
                            </div>
                            <div className="text-left flex-1">
                              <p className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{method.name}</p>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                            {selectedPaymentMethod === method.id && (
                              <CheckCircle className="text-[#FF6B35]" size={24} />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Mobile Money Details */}
                  {selectedPaymentMethod === 'mobile_money' && (
                    <div className="space-y-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                          Mobile Money Provider
                        </label>
                        <select 
                          value={selectedProvider}
                          onChange={(e) => setSelectedProvider(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] bg-white"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <option value="">Choose provider...</option>
                          {paymentMethods.find(m => m.id === 'mobile_money').providers.map(provider => (
                            <option key={provider} value={provider}>{provider}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+255 XXX XXX XXX"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">You'll receive a prompt on your phone to complete the payment</p>
                      </div>
                    </div>
                  )}

                  {/* Processing Indicator */}
                  {isProcessing && (
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="text-blue-600 animate-spin" size={24} />
                        <div>
                          <p className="font-semibold text-blue-900">Processing Payment...</p>
                          <p className="text-sm text-blue-700">Please wait while we process your transaction</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Shield className="text-gray-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-gray-700">
                      Your payment is secured with 256-bit SSL encryption. We never store your payment details.
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t bg-gray-50 flex gap-3">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false)
                      setSelectedPaymentMethod('')
                      setSelectedProvider('')
                      setPhoneNumber('')
                    }}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod || !paymentAmount || isProcessing || 
                             (selectedPaymentMethod === 'mobile_money' && (!selectedProvider || !phoneNumber))}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Pay {paymentAmount ? formatCurrency(parseFloat(paymentAmount)) : '$0.00'}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b bg-gradient-to-r from-[#011F5B] to-[#00416A]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    Payment Receipt
                  </h3>
                  <p className="text-white/80 text-sm">Transaction ID: {selectedReceipt.transactionId}</p>
                </div>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-white" size={24} />
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Receipt Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-dashed">
                <div className="w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  EduConnect
                </h4>
                <p className="text-gray-600">Official Payment Receipt</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-semibold text-gray-900">{selectedReceipt.description}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-gray-900 capitalize">{selectedReceipt.method.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedReceipt.status)}`}>
                    {selectedReceipt.status}
                  </span>
                </div>
                <div className="flex justify-between py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl px-4">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-3xl font-bold text-[#FF6B35]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {formatCurrency(selectedReceipt.amount)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Printer size={20} />
                  Print Receipt
                </button>
                <button className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Email Receipt
                </button>
                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default PaymentPage
