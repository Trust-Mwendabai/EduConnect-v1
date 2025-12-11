import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Target, Users, Smartphone, Award, MessageCircle, TrendingUp, Video, FileText, Globe, Shield, Zap, Heart } from 'lucide-react'

const mainFeatures = [
  {
    id: 1,
    icon: Target,
    title: 'Personalized Learning Paths',
    description: 'AI-powered recommendations that adapt to your learning style, pace, and goals. Get a customized curriculum designed just for you.',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry leaders and certified educators with proven track records. Access to mentors who care about your success.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: Video,
    title: 'Interactive Video Lessons',
    description: 'High-quality video content with interactive elements, quizzes, and hands-on projects to reinforce your learning.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'Learn Anywhere, Anytime',
    description: 'Access courses on desktop, tablet, or mobile. Download lessons for offline learning and never miss a beat.',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 5,
    icon: Award,
    title: 'Industry-Recognized Certificates',
    description: 'Earn certificates that matter. Showcase your achievements to employers and advance your career prospects.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    icon: MessageCircle,
    title: 'Community & Support',
    description: 'Join a vibrant community of learners. Get help from peers, participate in discussions, and network with professionals.',
    color: 'from-indigo-500 to-purple-500'
  }
]

const additionalFeatures = [
  { icon: TrendingUp, title: 'Progress Tracking', description: 'Monitor your learning journey with detailed analytics' },
  { icon: FileText, title: 'Rich Resources', description: 'Access downloadable materials, cheat sheets, and guides' },
  { icon: Globe, title: 'Global Community', description: 'Connect with learners from 150+ countries' },
  { icon: Shield, title: 'Secure Platform', description: 'Your data is protected with enterprise-grade security' },
  { icon: Zap, title: 'Fast Loading', description: 'Optimized platform for smooth, lag-free experience' },
  { icon: Heart, title: 'Lifetime Access', description: 'Once enrolled, access your courses forever' }
]

function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[--color-navy-blue] via-[--color-navy-blue-light] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Powerful <span className="text-[--color-warm-orange]">Features</span> for Better Learning
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Everything you need to succeed in your educational journey, all in one platform
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={feature.id}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[--color-navy-blue] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="section-padding bg-[--color-light-blue]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-navy-blue] mb-4">
              And Much More...
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover additional features that make EduConnect the best choice for online learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-[--color-warm-orange]/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6 text-[--color-warm-orange]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[--color-navy-blue] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[--color-navy-blue] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of learners who are already transforming their careers with EduConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/signup" className="px-8 py-4 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Start Learning Free
              </a>
              <a href="/courses" className="px-8 py-4 bg-white text-[--color-navy-blue] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300">
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FeaturesPage