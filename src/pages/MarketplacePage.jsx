import React, { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, User, Clock, BookOpen, Filter, X, Plus, Minus, CreditCard, Package, History, ChevronRight, Heart, Eye, Download, CheckCircle, Bell } from 'lucide-react'

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
      price: 89.99,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
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
      price: 69.99,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1559028006-44a26f562c38?w=400',
      category: 'design',
      duration: '8 weeks',
      level: 'Beginner',
      students: 890,
      description: 'Learn the principles of great user interface and experience design',
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
      price: 129.99,
      rating: 4.9,
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
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
      price: 79.99,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
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
    }
  ]

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      item: 'Advanced React Development',
      amount: 89.99,
      status: 'completed',
      instructor: 'Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-01-10',
      item: 'UI/UX Design Fundamentals',
      amount: 69.99,
      status: 'completed',
      instructor: 'Michael Chen'
    },
    {
      id: 3,
      date: '2024-01-05',
      item: 'JavaScript Basics',
      amount: 49.99,
      status: 'refunded',
      instructor: 'John Doe'
    }
  ]

  const categories = ['all', 'development', 'design', 'data-science', 'marketing', 'business']

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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <img src={course.instructorProfile.avatar} alt={course.instructor} className="w-6 h-6 rounded-full" />
          <span className="text-sm text-gray-700">{course.instructor}</span>
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
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${course.price}</span>
          <button 
            onClick={() => addToCart(course)}
            className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )

  const CartSidebar = () => (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shopping Cart ({cart.length})</h2>
          <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.instructor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">${item.price}</span>
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
        <div className="border-t p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${getTotalPrice()}</span>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#011F5B]">Marketplace</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShoppingCart size={16} />
                <span>Digital Store</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button 
            onClick={() => setShowCheckout(true)}
            className="px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category 
                        ? 'bg-[#011F5B] text-white font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="text-gray-700">Most Popular</option>
                  <option className="text-gray-700">Price: Low to High</option>
                  <option className="text-gray-700">Price: High to Low</option>
                  <option className="text-gray-700">Highest Rated</option>
                  <option className="text-gray-700">Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

        {showCheckout && <CartSidebar />}
      </div>
    </div>
  )
}
