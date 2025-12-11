import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  Search,
  Bell,
  AlertCircle,
  CheckCircle,
  Video,
  FileText,
  Download,
  Share2
} from 'lucide-react'

function TimetablePage() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const [viewMode, setViewMode] = useState('week') // 'day', 'week', 'month'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const [classes] = useState([
    {
      id: 1,
      course: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      time: '9:00 AM - 10:30 AM',
      day: 'Monday',
      room: 'Virtual Room 101',
      type: 'online',
      duration: '1h 30min',
      color: 'bg-blue-500',
      materials: ['lecture-slides.pdf', 'react-hooks-guide.pdf'],
      nextClass: 'Monday, 9:00 AM'
    },
    {
      id: 2,
      course: 'Database Management',
      instructor: 'Prof. Michael Chen', 
      time: '11:00 AM - 12:30 PM',
      day: 'Monday',
      room: 'Room 205',
      type: 'offline',
      duration: '1h 30min',
      color: 'bg-green-500',
      materials: ['sql-basics.pdf'],
      nextClass: 'Monday, 11:00 AM'
    },
    {
      id: 3,
      course: 'Web Design Fundamentals',
      instructor: 'Ms. Emily Davis',
      time: '2:00 PM - 3:30 PM',
      day: 'Tuesday',
      room: 'Virtual Room 203',
      type: 'online',
      duration: '1h 30min',
      color: 'bg-purple-500',
      materials: ['design-principles.pdf', 'css-grid-tutorial.pdf'],
      nextClass: 'Tuesday, 2:00 PM'
    },
    {
      id: 4,
      course: 'Data Structures & Algorithms',
      instructor: 'Dr. James Wilson',
      time: '10:00 AM - 11:30 AM',
      day: 'Wednesday',
      room: 'Room 301',
      type: 'offline',
      duration: '1h 30min',
      color: 'bg-orange-500',
      materials: ['algorithm-notes.pdf', 'practice-problems.pdf'],
      nextClass: 'Wednesday, 10:00 AM'
    },
    {
      id: 5,
      course: 'Mobile App Development',
      instructor: 'Ms. Lisa Anderson',
      time: '3:00 PM - 4:30 PM',
      day: 'Thursday',
      room: 'Virtual Room 105',
      type: 'online',
      duration: '1h 30min',
      color: 'bg-pink-500',
      materials: ['react-native-setup.pdf'],
      nextClass: 'Thursday, 3:00 PM'
    },
    {
      id: 6,
      course: 'Machine Learning Basics',
      instructor: 'Dr. Robert Taylor',
      time: '1:00 PM - 2:30 PM',
      day: 'Friday',
      room: 'Virtual Room 201',
      type: 'online',
      duration: '1h 30min',
      color: 'bg-indigo-500',
      materials: ['ml-intro.pdf', 'python-basics.pdf'],
      nextClass: 'Friday, 1:00 PM'
    }
  ])

  const [upcomingExams] = useState([
    {
      id: 1,
      course: 'Advanced React Development',
      title: 'Mid-term Examination',
      date: '2024-01-20',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      type: 'online',
      status: 'upcoming',
      totalMarks: 100,
      instructions: 'Cover chapters 1-5. Multiple choice and coding questions.'
    },
    {
      id: 2,
      course: 'Database Management',
      title: 'Quiz 3',
      date: '2024-01-22',
      time: '2:00 PM - 3:00 PM',
      duration: '1 hour',
      type: 'online',
      status: 'upcoming',
      totalMarks: 50,
      instructions: 'SQL queries and database design concepts.'
    },
    {
      id: 3,
      course: 'Web Design Fundamentals',
      title: 'Project Submission',
      date: '2024-01-25',
      time: '11:59 PM',
      duration: 'Deadline',
      type: 'submission',
      status: 'upcoming',
      totalMarks: 100,
      instructions: 'Submit your responsive website project.'
    }
  ])

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || cls.course === selectedCourse
    return matchesSearch && matchesCourse
  })

  const getClassesForDay = (day) => {
    return filteredClasses.filter(cls => cls.day === day)
  }

  const getClassForTimeSlot = (day, time) => {
    const classItem = classes.find(cls => 
      cls.day === day && 
      cls.time.startsWith(time.split(' - ')[0])
    )
    return classItem
  }

  const getExamForTimeSlot = (day, time) => {
    const examItem = upcomingExams.find(exam => {
      const examDate = new Date(exam.date)
      const examDay = weekDays[examDate.getDay()]
      const examTime = exam.time.split(' - ')[0]
      return examDay === day && examTime === time.split(' - ')[0]
    })
    return examItem
  }

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => prev + direction)
  }

  const todayClasses = getClassesForDay(weekDays[new Date().getDay() - 1] || weekDays[0])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Timetable</h1>
              <p className="text-white/80">Manage your class schedule and stay organized</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white/60">Current Week</p>
                <p className="text-lg font-medium">Week {currentWeek + 1}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Classes</p>
                <p className="text-2xl font-bold text-gray-900">{todayClasses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayClasses.reduce((acc, cls) => acc + 1.5, 0)}h
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Online Classes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayClasses.filter(cls => cls.type === 'online').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {['day', 'week', 'month'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode
                        ? 'bg-white text-[#011F5B] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
              
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="all">All Courses</option>
                {Array.from(new Set(classes.map(cls => cls.course))).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
              
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Week View</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium">Week {currentWeek + 1}</span>
                <button
                  onClick={() => navigateWeek(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-8 border-b">
                  <div className="p-3 text-sm font-medium text-gray-600">Time</div>
                  {weekDays.map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-900">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                
                {/* Time Slots */}
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 border-b">
                    <div className="p-3 text-sm text-gray-600">{time}</div>
                    {weekDays.map(day => {
                      const classItem = getClassForTimeSlot(day, time)
                      return (
                        <div key={`${day}-${time}`} className="p-2 border-r min-h-[60px]">
                          {classItem && (
                            <div className={`${classItem.color} text-white p-2 rounded-lg text-xs h-full`}>
                              <p className="font-medium truncate">{classItem.course}</p>
                              <p className="text-white/80 truncate">{classItem.instructor}</p>
                              <p className="text-white/70">{classItem.room}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Today's Classes */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                Today's Classes
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {todayClasses.length > 0 ? (
                todayClasses.map(cls => (
                  <div key={cls.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{cls.course}</h4>
                        <p className="text-sm text-gray-600">{cls.instructor}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {cls.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {cls.room}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cls.type === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {cls.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cls.type === 'online' && (
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Video className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
              )}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#FF6B35]" />
                Upcoming Exams
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exam.title}</h4>
                      <p className="text-sm text-gray-600">{exam.course}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exam.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exam.time}
                        </span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          {exam.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{exam.instructions}</p>
                    </div>
                    <Link 
                      to={`/exams/${exam.id}`}
                      className="px-3 py-1 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF8C61] transition-colors"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TimetablePage
