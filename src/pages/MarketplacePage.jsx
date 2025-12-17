import React, { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, User, Clock, BookOpen, Filter, X, Plus, Minus, CreditCard, Package, History, ChevronRight, Heart, Eye, Download, CheckCircle, Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('browse')
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      price: 450,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&auto=format',
      category: 'development',
      duration: '12 weeks',
      level: 'Advanced',
      students: 1250,
      description: 'Master React with hooks, context, and advanced patterns',
      materials: ['Video lectures', 'Code examples', 'Projects', 'Quizzes'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        bio: 'Senior React developer with 8+ years of experience',
        courses: 12,
        rating: 4.9
      }
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Michael Chen',
      price: 350,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop&auto=format',
      category: 'design',
      duration: '8 weeks',
      level: 'Beginner',
      students: 890,
      description: 'Learn principles of great user interface and experience design',
      materials: ['Design templates', 'Video tutorials', 'Case studies', 'Tools guide'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bio: 'UX designer at Google with 10+ years of industry experience',
        courses: 8,
        rating: 4.7
      }
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Rodriguez',
      price: 450,
      rating: 4.9,
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop&auto=format',
      category: 'data-science',
      duration: '16 weeks',
      level: 'Intermediate',
      students: 2100,
      description: 'Complete data science bootcamp from basics to machine learning',
      materials: ['Jupyter notebooks', 'Datasets', 'Video lectures', 'Assignments'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
        bio: 'PhD in Computer Science, Data Science consultant',
        courses: 15,
        rating: 4.9
      }
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Thompson',
      price: 300,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&auto=format',
      category: 'marketing',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 670,
      description: 'Learn SEO, social media marketing, and growth strategies',
      materials: ['Marketing templates', 'Case studies', 'Tools tutorials', 'Analytics guide'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        bio: 'Marketing expert with Fortune 500 experience',
        courses: 10,
        rating: 4.6
      }
    },
    {
      id: 5,
      title: 'Business Strategy & Leadership',
      instructor: 'Prof. James Mitchell',
      price: 400,
      rating: 4.7,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&auto=format',
      category: 'business',
      duration: '14 weeks',
      level: 'Advanced',
      students: 1850,
      description: 'Strategic business management and leadership principles',
      materials: ['Business frameworks', 'Case studies', 'Leadership guides', 'Templates'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bio: 'Harvard Business School graduate, 20+ years executive experience',
        courses: 18,
        rating: 4.8
      }
    },
    {
      id: 6,
      title: 'Mobile App Development with Flutter',
      instructor: 'David Kim',
      price: 450,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1512941938449-5d1b5f8b8d4c?w=400&h=300&fit=crop&auto=format',
      category: 'development',
      duration: '12 weeks',
      level: 'Intermediate',
      students: 980,
      description: 'Build cross-platform mobile applications with Flutter',
      materials: ['Flutter SDK', 'Mobile UI kits', 'Project templates', 'Deployment guides'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bio: 'Google Developer Expert, Flutter specialist',
        courses: 6,
        rating: 4.9
      }
    },
    {
      id: 7,
      title: 'Photography Masterclass',
      instructor: 'Lisa Anderson',
      price: 250,
      rating: 4.6,
      reviews: 187,
      image: 'https://images.unsplash.com/photo-1542038784456-697184f077e0?w=400&h=300&fit=crop&auto=format',
      category: 'creative',
      duration: '6 weeks',
      level: 'Beginner',
      students: 1450,
      description: 'Professional photography techniques and composition',
      materials: ['Camera guides', 'Editing tutorials', 'Composition rules', 'Portfolio reviews'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        bio: 'National Geographic photographer, 15+ years experience',
        courses: 9,
        rating: 4.7
      }
    },
    {
      id: 8,
      title: 'Financial Accounting Fundamentals',
      instructor: 'Dr. Robert Chen',
      price: 350,
      rating: 4.5,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&auto=format',
      category: 'finance',
      duration: '10 weeks',
      level: 'Beginner',
      students: 2100,
      description: 'Complete accounting principles for business and finance',
      materials: ['Accounting software', 'Financial templates', 'Practice exercises', 'Case studies'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bio: 'CPA with 15+ years in corporate finance',
        courses: 12,
        rating: 4.6
      }
    },
    {
      id: 9,
      title: 'Health & Fitness Coaching',
      instructor: 'Maria Johnson',
      price: 200,
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop&auto=format',
      category: 'health',
      duration: '8 weeks',
      level: 'All Levels',
      students: 3200,
      description: 'Complete fitness and nutrition program',
      materials: ['Workout plans', 'Nutrition guides', 'Progress tracking', 'Community support'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        bio: 'Certified personal trainer, nutrition specialist',
        courses: 14,
        rating: 4.9
      }
    },
    {
      id: 10,
      title: 'Language Learning: Spanish A-Z',
      instructor: 'Carlos Rodriguez',
      price: 300,
      rating: 4.7,
      reviews: 523,
      image: 'https://images.unsplash.com/photo-1517244995887-0b3d3b2e1e1f?w=400&h=300&fit=crop&auto=format',
      category: 'languages',
      duration: '16 weeks',
      level: 'Beginner',
      students: 4800,
      description: 'Learn Spanish from basics to fluency',
      materials: ['Audio lessons', 'Grammar guides', 'Conversation practice', 'Cultural notes'],
      instructorProfile: {
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bio: 'Native Spanish speaker, language teaching expert',
        courses: 8,
        rating: 4.8
      }
    }
  ]

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      item: 'Advanced React Development',
      amount: 8999,
      status: 'completed',
      instructor: 'Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-01-10',
      item: 'UI/UX Design Fundamentals',
      amount: 6999,
      status: 'completed',
      instructor: 'Michael Chen'
    },
    {
      id: 3,
      date: '2024-01-05',
      item: 'JavaScript Basics',
      amount: 4999,
      status: 'refunded',
      instructor: 'John Doe'
    }
  ]

  const categories = ['all', 'development', 'design', 'data-science', 'marketing', 'business', 'creative', 'finance', 'health', 'languages']

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course])
    }
  }

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId))
  }

  const toggleWishlist = (courseId) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <button 
          onClick={() => toggleWishlist(course.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart className={`w-4 h-4 ${wishlist.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <span className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
          {course.level}
        </span>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'var(--font-body)' }}>{course.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <img src={course.instructorProfile.avatar} alt={course.instructor} className="w-7 h-7 rounded-full border-2 border-gray-100" />
          <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>{course.instructor}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
            <span>({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>ZMW {course.price}</span>
          <button 
            onClick={() => addToCart(course)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )

  const CartSidebar = () => (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300">
      <div className="p-6 border-b bg-gradient-to-r from-[#011F5B] to-[#00416A]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Shopping Cart ({cart.length})</h2>
          <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>{item.instructor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>ZMW {item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cart.length > 0 && (
        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700" style={{ fontFamily: 'var(--font-heading)' }}>Total:</span>
            <span className="text-3xl font-bold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>ZMW {getTotalPrice()}</span>
          </div>
          <button className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            <CreditCard className="w-5 h-5" />
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )

  const InstructorProfile = ({ instructor }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start gap-4">
        <img src={instructor.avatar} alt={instructor.name} className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{instructor.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{instructor.bio}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{instructor.courses} courses</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{instructor.rating} rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Course Marketplace
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Discover and purchase premium courses from expert instructors. Expand your skills and advance your career.
            </p>
          </div>
        </div>
      </div>

      {/* Marketplace Introduction */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011F5B] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              What is the EduConnect Marketplace?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              The EduConnect Marketplace is your premier destination for high-quality educational content. 
              Connect with expert instructors, access premium courses, and transform your learning journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Premium Courses
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Access carefully curated courses from industry experts and renowned institutions
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Expert Instructors
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Learn from professionals with real-world experience and proven teaching expertise
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Quality Assurance
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Every course is reviewed for quality, relevance, and learning effectiveness
              </p>
            </div>
          </div>
          
          {/* Marketplace Benefits */}
          <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Why Choose EduConnect Marketplace?
                </h3>
                <ul className="space-y-3" style={{ fontFamily: 'var(--font-body)' }}>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>Lifetime access to purchased courses with free updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>Certificates of completion to boost your resume</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>30-day money-back guarantee on all courses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>Learn at your own pace with flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>Join a community of 50,000+ learners worldwide</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold mb-2">50,000+</div>
                  <div className="text-lg mb-4">Active Learners</div>
                  <div className="text-4xl font-bold mb-2">1,000+</div>
                  <div className="text-lg mb-4">Expert Instructors</div>
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-lg">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8 -mt-8 relative z-10">
          <div className="flex-1 relative bg-white rounded-xl shadow-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 shadow-md transition-all duration-300"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden md:inline">Filters</span>
          </button>
          <button 
            onClick={() => setShowCheckout(true)}
            className="px-6 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 relative shadow-md"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:inline">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-[#FF6B35] rounded-full text-xs flex items-center justify-center font-bold shadow-md">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#011F5B] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              How the Marketplace Works
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              Simple steps to start your learning journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Browse Courses
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Explore our extensive catalog of premium courses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Choose & Purchase
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Select courses that match your goals and budget
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Start Learning
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Get instant access and begin your educational journey
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Get Certified
              </h4>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Complete courses and earn recognized certificates
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white font-medium shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white" style={{ fontFamily: 'var(--font-body)' }}>
                  <option className="text-gray-700">Most Popular</option>
                  <option className="text-gray-700">Price: Low to High</option>
                  <option className="text-gray-700">Price: High to Low</option>
                  <option className="text-gray-700">Highest Rated</option>
                  <option className="text-gray-700">Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

        {showCheckout && <CartSidebar />}
      </div>
      
      <Footer />
    </div>
  )
}
