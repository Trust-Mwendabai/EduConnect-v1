import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  BookOpen, 
  Clock, 
  Target, 
  Award, 
  Download,
  FileText,
  Video,
  Play,
  CheckCircle,
  Calendar,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Eye,
  Star,
  Lock,
  Unlock,
  ExternalLink,
  Folder,
  File,
  Image,
  FileVideo,
  FileAudio,
  FileCode,
  FileText as FileTextIcon
} from 'lucide-react'

function CourseOutlinePage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [expandedModules, setExpandedModules] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('outline')

  const [courses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      description: 'Master advanced React concepts including hooks, state management, performance optimization, and modern development practices.',
      duration: '12 weeks',
      level: 'Advanced',
      credits: 4,
      enrolled: 245,
      rating: 4.8,
      progress: 65,
      nextClass: 'Monday, 9:00 AM',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      modules: [
        {
          id: 1,
          title: 'React Fundamentals Review',
          description: 'Quick review of core React concepts',
          duration: '1 week',
          lessons: [
            { id: 1, title: 'Component Architecture', type: 'video', duration: '45 min', completed: true },
            { id: 2, title: 'Props and State Deep Dive', type: 'video', duration: '60 min', completed: true },
            { id: 3, title: 'Lifecycle Methods', type: 'reading', duration: '30 min', completed: true },
            { id: 4, title: 'Practice Exercise', type: 'assignment', duration: '2 hours', completed: false }
          ],
          quiz: { id: 1, title: 'Module 1 Quiz', questions: 10, duration: '30 min', completed: true, score: 85 }
        },
        {
          id: 2,
          title: 'Advanced Hooks',
          description: 'Deep dive into custom hooks and advanced patterns',
          duration: '2 weeks',
          lessons: [
            { id: 5, title: 'useState and useEffect Advanced', type: 'video', duration: '75 min', completed: true },
            { id: 6, title: 'Custom Hooks Creation', type: 'video', duration: '90 min', completed: true },
            { id: 7, title: 'useContext and useReducer', type: 'video', duration: '80 min', completed: false },
            { id: 8, title: 'Performance Optimization Hooks', type: 'video', duration: '70 min', completed: false },
            { id: 9, title: 'Hooks Best Practices', type: 'reading', duration: '45 min', completed: false }
          ],
          quiz: { id: 2, title: 'Module 2 Quiz', questions: 15, duration: '45 min', completed: false }
        },
        {
          id: 3,
          title: 'State Management',
          description: 'Redux, MobX, and modern state management',
          duration: '2 weeks',
          lessons: [
            { id: 10, title: 'Redux Fundamentals', type: 'video', duration: '90 min', completed: false },
            { id: 11, title: 'Redux Toolkit', type: 'video', duration: '85 min', completed: false },
            { id: 12, title: 'Context API vs Redux', type: 'video', duration: '60 min', completed: false },
            { id: 13, title: 'State Management Patterns', type: 'reading', duration: '40 min', completed: false }
          ],
          quiz: { id: 3, title: 'Module 3 Quiz', questions: 12, duration: '40 min', completed: false }
        }
      ],
      assessments: [
        { id: 1, title: 'Mid-term Project', type: 'project', weight: '30%', dueDate: '2024-02-15', status: 'upcoming' },
        { id: 2, title: 'Final Examination', type: 'exam', weight: '40%', dueDate: '2024-03-20', status: 'upcoming' },
        { id: 3, title: 'Weekly Assignments', type: 'assignment', weight: '30%', dueDate: 'Ongoing', status: 'active' }
      ],
      resources: [
        { id: 1, title: 'React Documentation', type: 'link', url: 'https://react.dev' },
        { id: 2, title: 'Course GitHub Repository', type: 'link', url: 'https://github.com/course/react-advanced' },
        { id: 3, title: 'Recommended Books', type: 'document', size: '2.5 MB' }
      ]
    },
    {
      id: 2,
      title: 'Database Management',
      instructor: 'Prof. Michael Chen',
      description: 'Comprehensive database design, SQL queries, and modern database management systems.',
      duration: '10 weeks',
      level: 'Intermediate',
      credits: 3,
      enrolled: 189,
      rating: 4.6,
      progress: 40,
      nextClass: 'Monday, 11:00 AM',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Web Design Fundamentals',
      instructor: 'Ms. Emily Davis',
      description: 'Learn modern web design principles, responsive design, and user experience best practices.',
      duration: '8 weeks',
      level: 'Beginner',
      credits: 3,
      enrolled: 312,
      rating: 4.7,
      progress: 80,
      nextClass: 'Tuesday, 2:00 PM',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
    }
  ])

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev)
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId)
      } else {
        newSet.add(moduleId)
      }
      return newSet
    })
  }

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />
      case 'reading': return <FileText className="w-4 h-4" />
      case 'assignment': return <FileTextIcon className="w-4 h-4" />
      case 'quiz': return <CheckCircle className="w-4 h-4" />
      default: return <File className="w-4 h-4" />
    }
  }

  const getLessonTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700'
      case 'reading': return 'bg-green-100 text-green-700'
      case 'assignment': return 'bg-orange-100 text-orange-700'
      case 'quiz': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (!selectedCourse) {
    // Course List View
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-2">Course Outlines</h1>
            <p className="text-white/80">Access detailed course content, schedules, and learning materials</p>
          </div>
        </section>

        <div className="container-custom py-8 flex-1">
          {/* Search and Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35] w-full"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]">
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#011F5B] to-[#00416A] flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Target className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Award className="w-4 h-4" />
                      <span>{course.credits} credits</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Next: {course.nextClass}</span>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors text-sm font-medium"
                    >
                      View Outline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  // Detailed Course View
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Course Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ← Back to Courses
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-2">{selectedCourse.title}</h1>
              <p className="text-white/80 mb-4">{selectedCourse.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {selectedCourse.instructor}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedCourse.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {selectedCourse.level}
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {selectedCourse.credits} credits
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Progress</span>
                  <span className="font-bold">{selectedCourse.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedCourse.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Next Class</span>
                  <span className="font-bold">{selectedCourse.nextClass}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
          {['outline', 'assessments', 'resources'].map((tab) => (
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
            </button>
          ))}
        </div>

        {/* Course Outline Tab */}
        {activeTab === 'outline' && (
          <div className="space-y-6">
            {selectedCourse.modules.map((module) => (
              <div key={module.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div 
                  className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Module {module.id}: {module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {module.lessons.length} lessons
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {module.quiz && (
                        <div className="text-right">
                          <span className={`text-sm font-medium ${
                            module.quiz.completed ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {module.quiz.completed ? `Score: ${module.quiz.score}%` : 'Quiz'}
                          </span>
                        </div>
                      )}
                      {expandedModules.has(module.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedModules.has(module.id) && (
                  <div className="p-4 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getLessonTypeColor(lesson.type)}`}>
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="capitalize">{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <button className="px-3 py-1 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF8C61] transition-colors">
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {module.quiz && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{module.quiz.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span>{module.quiz.questions} questions</span>
                              <span>•</span>
                              <span>{module.quiz.duration}</span>
                            </div>
                          </div>
                          <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            module.quiz.completed 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-[#FF6B35] text-white hover:bg-[#FF8C61]'
                          }`}>
                            {module.quiz.completed ? 'Review' : 'Start Quiz'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="grid md:grid-cols-2 gap-6">
            {selectedCourse.assessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{assessment.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="capitalize">{assessment.type}</span>
                      <span>•</span>
                      <span>Weight: {assessment.weight}</span>
                      <span>•</span>
                      <span>Due: {assessment.dueDate}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assessment.status === 'completed' ? 'bg-green-100 text-green-700' :
                    assessment.status === 'active' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {assessment.status}
                  </span>
                </div>
                
                <button className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  assessment.status === 'completed' 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-[#FF6B35] text-white hover:bg-[#FF8C61]'
                }`}>
                  {assessment.status === 'completed' ? 'View Submission' : 'Start Assignment'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCourse.resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {resource.type === 'link' ? (
                      <ExternalLink className="w-6 h-6 text-blue-600" />
                    ) : (
                      <FileText className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                    <p className="text-sm text-gray-500">
                      {resource.type === 'link' ? resource.url : resource.size}
                    </p>
                  </div>
                </div>
                
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  {resource.type === 'link' ? 'Open Link' : 'Download'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default CourseOutlinePage
