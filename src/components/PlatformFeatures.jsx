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
  BarChart3,
  TrendingUp,
  Star,
  Rocket,
  Sparkles,
  Cpu,
  Wifi,
  ShieldCheck
} from 'lucide-react'

function PlatformFeatures() {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Revolutionary AI technology adapts to your learning style and pace",
      highlights: ["Smart recommendations", "Personalized paths", "24/7 AI tutor", "Progress analytics"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade security protecting your educational journey",
      highlights: ["256-bit encryption", "Zero-knowledge privacy", "Biometric auth", "Security audits"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Lightning-fast global network with 99.99% uptime guarantee",
      highlights: ["Global CDN", "Auto-scaling", "Instant updates", "Edge computing"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect, share, and grow together in vibrant communities",
      highlights: ["Live classrooms", "Study groups", "Peer reviews", "Mentorship"],
      color: "from-orange-500 to-red-500"
    }
  ]

  const technicalExcellence = [
    {
      icon: Cpu,
      title: "Advanced Processing",
      value: "10x",
      description: "Faster content delivery",
      trend: "+45%"
    },
    {
      icon: Wifi,
      title: "Global Network",
      value: "150+",
      description: "Countries connected",
      trend: "+28%"
    },
    {
      icon: ShieldCheck,
      title: "Security Score",
      value: "A+",
      description: "Industry leading protection",
      trend: "Stable"
    },
    {
      icon: TrendingUp,
      title: "Performance",
      value: "99.99%",
      description: "Uptime reliability",
      trend: "+0.09%"
    }
  ]

  const benefits = [
    {
      icon: Rocket,
      title: "Learn 40% Faster",
      description: "AI-accelerated learning paths help you achieve goals in record time",
      stats: "2.5M+ students",
      color: "bg-gradient-to-r from-violet-600 to-purple-600"
    },
    {
      icon: Award,
      title: "Premium Certificates",
      description: "Industry-recognized credentials valued by top employers worldwide",
      stats: "95% employment rate",
      color: "bg-gradient-to-r from-amber-600 to-orange-600"
    },
    {
      icon: Clock,
      title: "Learn Anytime",
      description: "24/7 access to premium content and expert support",
      stats: "Flexible scheduling",
      color: "bg-gradient-to-r from-blue-600 to-cyan-600"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Detailed insights and personalized recommendations for optimal growth",
      stats: "Real-time tracking",
      color: "bg-gradient-to-r from-green-600 to-emerald-600"
    }
  ]

  const integrations = [
    { name: "Google Workspace", category: "Productivity" },
    { name: "Microsoft 365", category: "Productivity" },
    { name: "Zoom", category: "Communication" },
    { name: "Slack", category: "Communication" },
    { name: "LinkedIn Learning", category: "Education" },
    { name: "Coursera", category: "Education" },
    { name: "edX", category: "Education" },
    { name: "Canvas", category: "LMS" },
    { name: "Blackboard", category: "LMS" },
    { name: "Moodle", category: "LMS" },
    { name: "Teams", category: "Communication" },
    { name: "Webex", category: "Communication" }
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230112F5B%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="relative container-custom py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#011F5B]" />
            <span className="text-sm font-semibold text-[#011F5B]">Advanced Platform Technology</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#011F5B] mb-6 leading-tight">
            Built for the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8C61]">
              Future of Learning
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the next generation of educational technology with AI-powered personalization, 
            enterprise-grade security, and seamless collaboration tools designed for modern learners.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#011F5B] mb-4">Core Platform Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful capabilities that transform how you learn, teach, and grow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <div className="flex items-start gap-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-[#011F5B] mb-3">{feature.title}</h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                        <div className="grid grid-cols-2 gap-3">
                          {feature.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Technical Excellence Dashboard */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#011F5B] mb-4">Technical Excellence</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cutting-edge metrics that power your learning experience
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-6">
              {technicalExcellence.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-white/80 text-sm mb-3">{metric.description}</div>
                    <div className="inline-flex items-center gap-1 text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span>{metric.trend}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#011F5B] mb-4">Why Choose EduConnect?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your educational journey with these powerful advantages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="group">
                  <div className={`h-full p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white`}>
                    <div className={`w-20 h-20 mx-auto mb-6 ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-[#011F5B] mb-3 text-center">{benefit.title}</h4>
                    <p className="text-gray-600 mb-4 text-center leading-relaxed">{benefit.description}</p>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#011F5B]/10 text-[#011F5B] rounded-full text-sm font-medium">
                        <Star className="w-4 h-4" />
                        <span>{benefit.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#011F5B] mb-4">Seamless Integrations</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your favorite tools for a unified learning ecosystem
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="group">
                  <div className="px-6 py-3 bg-gray-50 hover:bg-gradient-to-r hover:from-[#011F5B] hover:to-[#00416A] hover:text-white rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent">
                    <span className="group-hover:text-white">{integration.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-1">{integration.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-gradient-to-r from-[#011F5B] via-[#00416A] to-[#011F5B] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Platform Performance</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Industry-leading metrics you can count on
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">99.99%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{"<"}1s</div>
              <div className="text-white/80">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-white/80">Global Reach</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformFeatures
