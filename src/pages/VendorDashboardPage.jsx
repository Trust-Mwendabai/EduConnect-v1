import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BookOpen, 
  Upload, 
  Download, 
  CreditCard, 
  Calendar, 
  BarChart3, 
  PieChart, 
  Package, 
  ShoppingCart, 
  Star, 
  Eye, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Search,
  Plus,
  MoreVertical,
  FileText,
  Video,
  FileAudio,
  FileCode,
  Image,
  Archive,
  Folder,
  Wallet,
  Send,
  History,
  Settings,
  HelpCircle,
  Award,
  Target,
  Zap
} from 'lucide-react'

function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('month')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Vendor earnings data
  const [earningsData] = useState({
    totalEarnings: 45250,
    monthlyEarnings: 8750,
    pendingWithdrawals: 2500,
    totalSales: 342,
    averageRating: 4.8,
    totalStudents: 1280,
    activeCourses: 12,
    totalMaterials: 45
  })

  // Sales data for charts
  const [salesData] = useState([
    { month: 'Jan', sales: 6500, courses: 45, materials: 120 },
    { month: 'Feb', sales: 7200, courses: 52, materials: 145 },
    { month: 'Mar', sales: 8100, courses: 61, materials: 168 },
    { month: 'Apr', sales: 7800, courses: 58, materials: 155 },
    { month: 'May', sales: 9200, courses: 67, materials: 189 },
    { month: 'Jun', sales: 8750, courses: 62, materials: 178 }
  ])

  // Vendor materials/courses
  const [vendorProducts] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      type: 'course',
      price: 299,
      sales: 156,
      rating: 4.9,
      students: 892,
      revenue: 46644,
      status: 'active',
      category: 'programming',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'React Hooks Video Series',
      type: 'video',
      price: 49,
      sales: 89,
      rating: 4.7,
      students: 234,
      revenue: 4361,
      status: 'active',
      category: 'programming',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Database Design Templates',
      type: 'document',
      price: 19,
      sales: 234,
      rating: 4.6,
      students: 567,
      revenue: 4446,
      status: 'active',
      category: 'database',
      thumbnail: 'https://images.unsplash.com/photo-1554469384-e58e16b32d8d?w=400&h=225&fit=crop',
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      title: 'CSS Grid Masterclass',
      type: 'course',
      price: 199,
      sales: 78,
      rating: 4.8,
      students: 445,
      revenue: 15522,
      status: 'active',
      category: 'design',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      lastUpdated: '2024-01-08'
    }
  ])

  // Withdrawal requests
  const [withdrawalRequests] = useState([
    {
      id: 1,
      amount: 2500,
      date: '2024-01-15',
      status: 'pending',
      method: 'Bank Transfer',
      accountName: 'John Doe',
      accountNumber: '****1234',
      bank: 'Zanaco',
      processingTime: '2-3 business days'
    },
    {
      id: 2,
      amount: 1500,
      date: '2024-01-10',
      status: 'approved',
      method: 'Mobile Money',
      accountName: 'John Doe',
      accountNumber: '0977123456',
      provider: 'MTN Mobile Money',
      processingTime: 'Completed'
    },
    {
      id: 3,
      amount: 3000,
      date: '2024-01-05',
      status: 'completed',
      method: 'Bank Transfer',
      accountName: 'John Doe',
      accountNumber: '****1234',
      bank: 'Zanaco',
      processingTime: 'Completed'
    }
  ])

  const getProductIcon = (type) => {
    switch (type) {
      case 'course': return BookOpen
      case 'video': return Video
      case 'document': return FileText
      case 'audio': return FileAudio
      case 'code': return FileCode
      case 'image': return Image
      default: return Package
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'approved': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredProducts = vendorProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
              <p className="text-white/80">Manage your courses, materials, and earnings</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/vendor/upload"
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Material
              </Link>
              <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Earnings Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                12.5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">ZMW {earningsData.totalEarnings.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Total Earnings</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center text-blue-600 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                8.2%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">ZMW {earningsData.monthlyEarnings.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">This Month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-orange-600 text-sm font-medium">Pending</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">ZMW {earningsData.pendingWithdrawals.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Withdrawals</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                15.3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{earningsData.totalStudents.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'products', label: 'My Products' },
              { id: 'customers', label: 'Customers' },
              { id: 'sales', label: 'Sales Analytics' },
              { id: 'reviews', label: 'Reviews & Feedback' },
              { id: 'marketing', label: 'Marketing' },
              { id: 'withdrawals', label: 'Withdrawals' },
              { id: 'settings', label: 'Settings' },
              { id: 'upload', label: 'Upload New' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#011F5B] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Sales Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sales Chart Visualization</p>
                  <p className="text-sm text-gray-500">Monthly revenue trends and analytics</p>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Recent Sales</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { product: 'Advanced React Development', student: 'Alice Johnson', amount: 299, date: '2 hours ago' },
                    { product: 'React Hooks Video Series', student: 'Bob Smith', amount: 49, date: '5 hours ago' },
                    { product: 'Database Design Templates', student: 'Carol White', amount: 19, date: '1 day ago' }
                  ].map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sale.product}</p>
                        <p className="text-sm text-gray-600">{sale.student}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">ZMW {sale.amount}</p>
                        <p className="text-xs text-gray-500">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Top Performing Products</h3>
                </div>
                <div className="p-4 space-y-3">
                  {vendorProducts.slice(0, 3).map((product, index) => {
                    const IconComponent = getProductIcon(product.type)
                    return (
                      <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{product.title}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales • ZMW {product.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="all">All Categories</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="database">Database</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const IconComponent = getProductIcon(product.type)
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      <div className="absolute top-3 left-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-[#FF6B35]">ZMW {product.price}</span>
                        <span className="text-sm text-gray-500">• {product.sales} sales</span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span>{product.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span>ZMW {product.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors text-sm">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Sales Analytics Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue Chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Category Distribution</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Sales History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Product</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Student</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((sale, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{sale.month}</p>
                            <p className="text-sm text-gray-600">{salesData[index]?.courses || 0} courses, {salesData[index]?.materials || 0} materials</p>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{sale.students || 0} students</td>
                        <td className="p-3 font-medium text-gray-900">ZMW {sale.sales.toLocaleString()}</td>
                        <td className="p-3 text-gray-600">{sale.month}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Withdrawal Requests</h2>
              <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Request Withdrawal
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Withdrawal History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Method</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Account Details</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalRequests.map(request => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-900">ZMW {request.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-gray-900">{request.method}</p>
                            {request.provider && <p className="text-sm text-gray-600">{request.provider}</p>}
                            {request.bank && <p className="text-sm text-gray-600">{request.bank}</p>}
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="text-sm text-gray-900">{request.accountName}</p>
                            <p className="text-sm text-gray-600">{request.accountNumber}</p>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{request.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{request.processingTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Withdrawal Request Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request New Withdrawal</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ZMW)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]">
                    <option value="bank">Bank Transfer</option>
                    <option value="mobile">Mobile Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    placeholder="Account holder name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    placeholder="Account number or phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Material</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]">
                    <option value="course">Course</option>
                    <option value="video">Video Series</option>
                    <option value="document">Document/PDF</option>
                    <option value="audio">Audio</option>
                    <option value="code">Code Examples</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter product title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (ZMW)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]">
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="database">Database</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500">Support for PDF, MP4, MP3, ZIP files</p>
                    <button className="mt-4 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
                      Select Files
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
                    Upload Product
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{earningsData.totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Customers</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                    <p className="text-sm text-gray-600">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">234</p>
                    <p className="text-sm text-gray-600">Repeat Customers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Recent Customers</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Customer</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Products Purchased</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Total Spent</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Join Date</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Alice Johnson', products: 3, spent: 347, date: '2024-01-15', status: 'active' },
                      { name: 'Bob Smith', products: 2, spent: 248, date: '2024-01-10', status: 'active' },
                      { name: 'Carol White', products: 5, spent: 892, date: '2024-01-05', status: 'active' },
                      { name: 'David Brown', products: 1, spent: 49, date: '2024-01-01', status: 'inactive' }
                    ].map((customer, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{customer.name}</p>
                              <p className="text-sm text-gray-600">customer@example.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{customer.products}</td>
                        <td className="p-3 font-medium text-gray-900">ZMW {customer.spent}</td>
                        <td className="p-3 text-gray-600">{customer.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Reviews & Feedback</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">{earningsData.averageRating}</span>
                  <span className="text-gray-600">({earningsData.totalSales} reviews)</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {[
                    { stars: 5, count: 156, percentage: 45.6 },
                    { stars: 4, count: 89, percentage: 26.0 },
                    { stars: 3, count: 67, percentage: 19.6 },
                    { stars: 2, count: 23, percentage: 6.7 },
                    { stars: 1, count: 7, percentage: 2.1 }
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating.stars ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 w-8">{rating.count}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{rating.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Reviews</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {[
                    {
                      product: 'Advanced React Development',
                      customer: 'Alice Johnson',
                      rating: 5,
                      comment: 'Excellent course! Very comprehensive and well-structured.',
                      date: '2 days ago'
                    },
                    {
                      product: 'React Hooks Video Series',
                      customer: 'Bob Smith',
                      rating: 4,
                      comment: 'Great content, but could use more practical examples.',
                      date: '1 week ago'
                    },
                    {
                      product: 'Database Design Templates',
                      customer: 'Carol White',
                      rating: 5,
                      comment: 'Perfect templates for my project. Saved me hours of work!',
                      date: '2 weeks ago'
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{review.customer}</span>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{review.product}</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === 'marketing' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Marketing & Promotion</h2>
              <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
                Create Campaign
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">45.2K</p>
                    <p className="text-sm text-gray-600">Total Impressions</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">8.7%</p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Promotional Tools</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Discount Codes</h4>
                      <button className="text-sm text-[#FF6B35] hover:text-[#FF8C61]">Create New</button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Generate discount codes for your products</p>
                    <div className="space-y-2">
                      {[
                        { code: 'SAVE20', discount: '20%', status: 'active', usage: '45 used' },
                        { code: 'STUDENT10', discount: '10%', status: 'active', usage: '23 used' }
                      ].map((discount, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium text-gray-900">{discount.code}</span>
                            <span className="text-sm text-gray-600 ml-2">{discount.discount}</span>
                          </div>
                          <span className="text-sm text-gray-600">{discount.usage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Bundle Deals</h4>
                      <button className="text-sm text-[#FF6B35] hover:text-[#FF8C61]">Create Bundle</button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Package multiple products for better value</p>
                    <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Create New Bundle
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Social Media Integration</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Connected Platforms</h4>
                    <div className="space-y-2">
                      {[
                        { platform: 'Facebook', status: 'connected', followers: '2.3K' },
                        { platform: 'Twitter', status: 'connected', followers: '856' },
                        { platform: 'LinkedIn', status: 'disconnected', followers: '0' }
                      ].map((social, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              social.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className="font-medium text-gray-900">{social.platform}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{social.followers}</span>
                            <button className="text-sm text-[#FF6B35] hover:text-[#FF8C61]">
                              {social.status === 'connected' ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Recent Posts</h4>
                    <div className="space-y-2">
                      {[
                        { content: 'New React course available!', date: '2 hours ago', engagement: '234 likes' },
                        { content: 'Database design tips and tricks', date: '1 day ago', engagement: '156 likes' }
                      ].map((post, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-900 mb-1">{post.content}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.engagement}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Vendor Settings</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Profile Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        defaultValue="EduConnect Vendor"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="vendor@educonnect.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+260 777 342 846"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        defaultValue="Lusaka, Zambia"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Payment Settings</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]">
                        <option value="ZMW">ZMW - Zambian Kwacha</option>
                        <option value="USD">USD - US Dollar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
                      <div className="space-y-2">
                        {['Bank Transfer', 'Mobile Money', 'Credit Card'].map(method => (
                          <label key={method} className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'New sale notifications', description: 'Get notified when someone purchases your products' },
                      { label: 'Customer reviews', description: 'Receive alerts for new customer feedback' },
                      { label: 'Payment updates', description: 'Notifications for withdrawal and payment status' },
                      { label: 'Marketing tips', description: 'Receive marketing and promotion suggestions' }
                    ].map((pref, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{pref.label}</p>
                          <p className="text-sm text-gray-600">{pref.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B35]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default VendorDashboardPage
