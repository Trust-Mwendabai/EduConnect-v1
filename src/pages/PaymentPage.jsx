import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  CheckSquare
} from 'lucide-react'

function PaymentPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

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
      receiptUrl: '/receipts/TXN001234567.pdf'
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
      receiptUrl: '/receipts/TXN001234568.pdf'
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
      receiptUrl: '/receipts/TXN001234569.pdf'
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
      receiptUrl: '/receipts/TXN001234570.pdf'
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
      installment: '2 of 4'
    },
    {
      id: 2,
      type: 'lab',
      description: 'Laboratory Fees',
      amount: 200,
      dueDate: '2024-01-25',
      priority: 'medium',
      installment: '1 of 2'
    },
    {
      id: 3,
      type: 'sports',
      description: 'Sports & Recreation',
      amount: 50,
      dueDate: '2024-01-30',
      priority: 'low',
      installment: '1 of 1'
    }
  ])

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
    
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowPaymentModal(false)
      setSelectedPaymentMethod('')
      setPaymentAmount('')
      // Show success message
    }, 3000)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#011F5B]">Payment & Clearance</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
              >
                <Plus size={20} />
                <span>Make Payment</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Fees</p>
                <p className="text-xl font-bold text-[#011F5B]">{formatCurrency(financialSummary.totalFees)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(financialSummary.amountPaid)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(financialSummary.balance)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clearance</p>
                <p className="text-xl font-bold text-purple-600">{Math.round(getClearanceProgress())}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
          {['overview', 'pending', 'history', 'clearance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#011F5B] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
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
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Clock size={18} />
                  Pending Payments
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {pendingPayments.slice(0, 3).map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[#011F5B]">{payment.description}</h4>
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
                      <p className="font-semibold text-[#FF6B35]">{formatCurrency(payment.amount)}</p>
                      <button className="text-sm text-[#011F5B] hover:text-[#003262] transition-colors">
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
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Shield size={18} />
                  Clearance Status
                </h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium">{Math.round(getClearanceProgress())}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full transition-all"
                      style={{ width: `${getClearanceProgress()}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(clearanceStatus).slice(0, 4).map(([key, dept]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          dept.status === 'cleared' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {dept.status === 'cleared' ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <AlertCircle size={16} className="text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{dept.name}</p>
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
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Receipt size={18} />
                  Recent Transactions
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {paymentHistory.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.method === 'mobile_money' ? 'bg-green-100' :
                          transaction.method === 'card' ? 'bg-blue-100' :
                          'bg-purple-100'
                        }`}>
                          {transaction.method === 'mobile_money' ? (
                            <Smartphone size={20} className="text-green-600" />
                          ) : transaction.method === 'card' ? (
                            <CreditCard size={20} className="text-blue-600" />
                          ) : (
                            <Building size={20} className="text-purple-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#011F5B]">{transaction.description}</p>
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
                        <p className="font-semibold text-[#FF6B35]">{formatCurrency(transaction.amount)}</p>
                        <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors">
                          <Download size={16} />
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Clearance Progress</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-[#011F5B]">Overall Clearance Status</span>
                  <span className="text-lg font-semibold text-[#FF6B35]">{Math.round(getClearanceProgress())}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-3 rounded-full transition-all"
                    style={{ width: `${getClearanceProgress()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(clearanceStatus).map(([key, dept]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          dept.status === 'cleared' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {dept.status === 'cleared' ? (
                            <CheckCircle size={20} className="text-green-600" />
                          ) : (
                            <AlertCircle size={20} className="text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#011F5B]">{dept.name}</h4>
                          <span className={`text-sm font-medium ${
                            dept.status === 'cleared' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {dept.status === 'cleared' ? 'Cleared' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {dept.amount > 0 && (
                      <div className="mb-3 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-600">Amount Due:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(dept.amount)}</span>
                        </div>
                        {dept.dueDate && (
                          <div className="text-xs text-red-500 mt-1">Due: {dept.dueDate}</div>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      {dept.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckSquare size={14} className="text-gray-400" />
                          <span className="text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                    
                    {dept.status === 'pending' && (
                      <button className="w-full mt-3 py-2 px-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors text-sm">
                        Complete Clearance
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-[#011F5B]">Make Payment</h3>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map(method => {
                    const IconComponent = method.icon
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                          selectedPaymentMethod === method.id
                            ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent size={20} className="text-[#011F5B]" />
                        <div className="text-left">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Money Providers (conditional) */}
              {selectedPaymentMethod === 'mobile_money' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Provider
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent">
                    {paymentMethods.find(m => m.id === 'mobile_money').providers.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="p-6 border-t flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || !paymentAmount || isProcessing}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentPage
