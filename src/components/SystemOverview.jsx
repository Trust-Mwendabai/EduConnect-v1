import React from 'react'
import { 
  BookOpen, 
  Users, 
  Target, 
  Award, 
  Clock, 
  Globe, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

function SystemOverview() {
  const steps = [
    {
      step: 1,
      title: "Sign Up & Create Profile",
      description: "Register as a student, instructor, or vendor. Create your personalized profile with your learning goals and preferences.",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      title: "Explore & Discover",
      description: "Browse our extensive course catalog, find expert instructors, or discover educational resources from our vendor partners.",
      icon: BookOpen,
      color: "from-green-500 to-green-600"
    },
    {
      step: 3,
      title: "Enroll & Learn",
      description: "Enroll in courses, attend virtual classes, access study materials, and learn at your own pace with our flexible scheduling.",
      icon: Target,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: 4,
      title: "Connect & Collaborate",
      description: "Join study groups, participate in discussions, get personalized feedback, and connect with the EduConnect community.",
      icon: Globe,
      color: "from-orange-500 to-orange-600"
    },
    {
      step: 5,
      title: "Achieve & Grow",
      description: "Complete courses, earn certificates, track your progress, and advance your career with recognized qualifications.",
      icon: Award,
      color: "from-red-500 to-red-600"
    }
  ]

  const features = [
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Learn anytime, anywhere with our always-available platform and mobile-friendly interface."
    },
    {
      icon: Shield,
      title: "Secure Learning",
      description: "Your data and privacy are protected with enterprise-grade security and encryption."
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Get personalized recommendations and intelligent learning assistance powered by AI."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified educators with real-world experience."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011F5B] mb-6">
            How EduConnect Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your complete learning journey in 5 simple steps. From signup to success, we guide you every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.step} className="text-center group">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-[#011F5B]">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#011F5B] mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">
            Why Choose EduConnect?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8C61]/20 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[#FF6B35]" />
                  </div>
                  <h4 className="font-semibold text-[#011F5B] mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/90 mb-6">Join thousands of learners already transforming their education with EduConnect.</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SystemOverview
