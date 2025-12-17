import React, { useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, BookOpen, Clock, Calendar, Filter, Download, RefreshCw } from 'lucide-react'
import { gradients, GradientCard, GradientButton } from '../common/GradientStyles'

const AnalyticsDashboard = ({ userRole = 'student' }) => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('performance')

  // Sample data for charts
  const performanceData = [
    { month: 'Jan', score: 65, assignments: 8, attendance: 92 },
    { month: 'Feb', score: 72, assignments: 10, attendance: 95 },
    { month: 'Mar', score: 78, assignments: 9, attendance: 88 },
    { month: 'Apr', score: 82, assignments: 12, attendance: 94 },
    { month: 'May', score: 85, assignments: 11, attendance: 96 },
    { month: 'Jun', score: 88, assignments: 13, attendance: 98 }
  ]

  const engagementData = [
    { day: 'Mon', hours: 2.5, interactions: 45, resources: 12 },
    { day: 'Tue', hours: 3.2, interactions: 52, resources: 18 },
    { day: 'Wed', hours: 2.8, interactions: 48, resources: 15 },
    { day: 'Thu', hours: 4.1, interactions: 67, resources: 22 },
    { day: 'Fri', hours: 3.5, interactions: 58, resources: 19 },
    { day: 'Sat', hours: 1.8, interactions: 32, resources: 8 },
    { day: 'Sun', hours: 2.2, interactions: 38, resources: 11 }
  ]

  const financialData = [
    { category: 'Tuition', amount: 5000, color: '#011F5B' },
    { category: 'Materials', amount: 800, color: '#FF6B35' },
    { category: 'Services', amount: 1200, color: '#00416A' },
    { category: 'Events', amount: 400, color: '#FF8C61' },
    { category: 'Other', amount: 300, color: '#10B981' }
  ]

  const attendancePatterns = [
    { week: 'Week 1', present: 95, absent: 3, late: 2 },
    { week: 'Week 2', present: 92, absent: 5, late: 3 },
    { week: 'Week 3', present: 94, absent: 4, late: 2 },
    { week: 'Week 4', present: 96, absent: 2, late: 2 },
    { week: 'Week 5', present: 93, absent: 4, late: 3 },
    { week: 'Week 6', present: 97, absent: 2, late: 1 }
  ]

  const courseProgressData = [
    { course: 'Mathematics', progress: 78, grade: 'A-' },
    { course: 'Science', progress: 65, grade: 'B+' },
    { course: 'English', progress: 82, grade: 'A' },
    { course: 'History', progress: 71, grade: 'B+' },
    { course: 'Art', progress: 89, grade: 'A' }
  ]

  const StatCard = ({ title, value, change, icon: Icon, gradient, positive = true }) => (
    <GradientCard gradient={gradient} className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-300' : 'text-red-300'}`}>
          {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/80 text-sm">{title}</p>
    </GradientCard>
  )

  const PerformanceChart = () => (
    <GradientCard gradient={gradients.light} className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="score" stackId="1" stroke="#011F5B" fill="#011F5B" fillOpacity={0.6} />
          <Area type="monotone" dataKey="assignments" stackId="2" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </GradientCard>
  )

  const EngagementChart = () => (
    <GradientCard gradient={gradients.light} className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Engagement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#011F5B" />
          <Bar dataKey="interactions" fill="#FF6B35" />
        </BarChart>
      </ResponsiveContainer>
    </GradientCard>
  )

  const FinancialChart = () => (
    <GradientCard gradient={gradients.light} className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={financialData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, amount }) => `${category}: $${amount}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {financialData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </GradientCard>
  )

  const AttendanceChart = () => (
    <GradientCard gradient={gradients.light} className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Patterns</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendancePatterns}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} />
          <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} />
          <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </GradientCard>
  )

  const CourseProgress = () => (
    <GradientCard gradient={gradients.light} className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h3>
      <div className="space-y-4">
        {courseProgressData.map((course, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{course.course}</span>
              <span className="text-sm text-gray-600">{course.grade}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your learning progress and performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <GradientButton gradient={gradients.primary} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </GradientButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Average Score"
          value="85%"
          change="+5.2%"
          icon={TrendingUp}
          gradient={gradients.success}
          positive={true}
        />
        <StatCard
          title="Study Hours"
          value="156"
          change="+12 hrs"
          icon={Clock}
          gradient={gradients.primary}
          positive={true}
        />
        <StatCard
          title="Assignments"
          value="63"
          change="+8"
          icon={BookOpen}
          gradient={gradients.secondary}
          positive={true}
        />
        <StatCard
          title="Attendance"
          value="94%"
          change="-2%"
          icon={Users}
          gradient={gradients.warning}
          positive={false}
        />
      </div>

      {/* Chart Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['performance', 'engagement', 'financial', 'attendance'].map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedMetric === metric
                  ? 'border-[#011F5B] text-[#011F5B]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedMetric === 'performance' && (
          <>
            <PerformanceChart />
            <CourseProgress />
          </>
        )}
        {selectedMetric === 'engagement' && (
          <>
            <EngagementChart />
            <GradientCard gradient={gradients.light} className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#011F5B] rounded-full"></div>
                  <span className="text-sm text-gray-700">Peak study time: Thursday evenings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                  <span className="text-sm text-gray-700">Most active: 2-4 PM daily</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                  <span className="text-sm text-gray-700">Best engagement: Math courses</span>
                </div>
              </div>
            </GradientCard>
          </>
        )}
        {selectedMetric === 'financial' && (
          <>
            <FinancialChart />
            <GradientCard gradient={gradients.light} className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-semibold">$7,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Payment</span>
                  <span className="font-semibold">$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-semibold">July 15, 2025</span>
                </div>
              </div>
            </GradientCard>
          </>
        )}
        {selectedMetric === 'attendance' && (
          <>
            <AttendanceChart />
            <GradientCard gradient={gradients.light} className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Classes</span>
                  <span className="font-semibold">120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Present</span>
                  <span className="font-semibold text-green-600">113 (94%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Absent</span>
                  <span className="font-semibold text-red-600">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Late</span>
                  <span className="font-semibold text-yellow-600">13</span>
                </div>
              </div>
            </GradientCard>
          </>
        )}
      </div>
    </div>
  )
}

export default AnalyticsDashboard
