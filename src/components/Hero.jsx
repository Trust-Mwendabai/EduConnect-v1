import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Star } from 'lucide-react'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A]"></div>
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 140, 97, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-16">
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Learning Journey with{' '}
              <span className="text-[#FF6B35]">EduConnect</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Join thousands of students and educators on the most comprehensive 
              education platform. Access world-class courses, connect with expert 
              instructors, and achieve your learning goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                Start Learning Free
              </Link>
              <Link to="/courses" className="px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-[#011F5B] transition-all duration-300 text-center">
                Explore Courses
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-1">50K+</div>
                <div className="text-sm text-white/80">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-1">1,000+</div>
                <div className="text-sm text-white/80">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-1">98%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative animate-float">
              <img 
                src="https://picsum.photos/600/500?random=1" 
                alt="Students learning online" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-[10%] -left-4 md:-left-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float-card">
                <BookOpen className="w-8 h-8 text-[#FF6B35]" />
                <span className="font-semibold text-[#011F5B] text-sm">Interactive Learning</span>
              </div>
              
              <div className="absolute top-[50%] -right-4 md:-right-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float-card-delayed">
                <Users className="w-8 h-8 text-[#FF6B35]" />
                <span className="font-semibold text-[#011F5B] text-sm">Expert Instructors</span>
              </div>
              
              <div className="absolute bottom-[10%] -left-2 md:-left-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float-card-delayed-2">
                <Star className="w-8 h-8 text-[#FF6B35]" />
                <span className="font-semibold text-[#011F5B] text-sm">4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero