import React from 'react'
import { 
  Shield, 
  Lock, 
  Server, 
  Database, 
  Cloud, 
  Smartphone, 
  Monitor, 
  Globe, 
  CheckCircle, 
  Zap, 
  Brain, 
  Target,
  Award,
  Users,
  Clock,
  BarChart3
} from 'lucide-react'

function PlatformFeatures() {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized recommendations, intelligent tutoring, and adaptive learning paths tailored to your needs.",
      highlights: ["Smart course recommendations", "Personalized study plans", "AI tutoring assistance", "Progress prediction"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, secure data storage, and comprehensive privacy protection for all users.",
      highlights: ["256-bit encryption", "GDPR compliance", "Regular security audits", "Data backup & recovery"]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable, reliable cloud platform ensuring 99.9% uptime and fast access from anywhere.",
      highlights: ["99.9% uptime guarantee", "Global CDN", "Auto-scaling", "Instant updates"]
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description: "Real-time collaboration, study groups, discussion forums, and peer learning.",
      highlights: ["Virtual classrooms", "Group projects", "Peer review system", "Live discussions"]
    }
  ]

  const technicalFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized experience across all devices with native mobile apps for iOS and Android."
    },
    {
      icon: Monitor,
      title: "Interactive Dashboard",
      description: "Comprehensive analytics and progress tracking with intuitive visualizations."
    },
    {
      icon: Database,
      title: "Smart Content Management",
      description: "Advanced content delivery system with intelligent caching and personalization."
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in 15+ languages with localized content and regional adaptations."
    }
  ]

  const benefits = [
    {
      icon: Target,
      title: "Achieve Goals Faster",
      description: "Our AI-powered platform helps you reach your learning objectives 40% faster than traditional methods."
    },
    {
      icon: Award,
      title: "Industry-Recognized Certificates",
      description: "Earn certificates valued by top employers and recognized across industries worldwide."
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to course materials and support."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Progress",
      description: "Track your improvement with detailed analytics and personalized insights."
    }
  ]

  const integrations = [
    "Google Workspace", "Microsoft 365", "Zoom", "Slack", "LinkedIn Learning", "Coursera", 
    "edX", "Udemy Business", "Canvas", "Blackboard", "Moodle", "Zoom", "Teams", "Webex"
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011F5B] mb-6">
            Platform Features & Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge technology to provide the best learning experience possible
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Core Platform Features</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8C61]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-[#FF6B35]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#011F5B] mb-3">{feature.title}</h4>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Technical Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Technical Excellence</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#011F5B]/20 to-[#00416A]/20 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#011F5B]" />
                  </div>
                  <h4 className="font-bold text-[#011F5B] mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Why Choose EduConnect?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-[#011F5B] mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Seamless Integrations</h3>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-center text-gray-600 mb-8">
              EduConnect integrates with your favorite tools and platforms for a seamless learning experience
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((integration, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-[#011F5B]/10 hover:text-[#011F5B] transition-colors">
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Platform Performance</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">&lt;1s</div>
              <div className="text-white/80">Average Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformFeatures
