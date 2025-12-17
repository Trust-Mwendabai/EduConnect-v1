import React from 'react'
import { 
  Store, 
  Upload, 
  Users, 
  DollarSign, 
  Star, 
  Shield, 
  Globe, 
  TrendingUp,
  Package,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

function VendorPartners() {
  const vendorBenefits = [
    {
      icon: DollarSign,
      title: "Earn Revenue",
      description: "Monetize your educational content and reach thousands of eager learners worldwide."
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Access our diverse student base across 150+ countries and growing markets."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Protected content delivery and secure payment processing with fraud prevention."
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance, student engagement, and revenue with detailed analytics."
    },
    {
      icon: Package,
      title: "Easy Management",
      description: "Simple upload tools, course management, and automated student enrollment."
    },
    {
      icon: Award,
      title: "Quality Recognition",
      description: "Get featured as a top vendor and earn badges for exceptional content."
    }
  ]

  const vendorTypes = [
    {
      type: "Educational Institutions",
      description: "Universities, colleges, and schools offering accredited programs",
      examples: "Online degrees, certificate programs, continuing education"
    },
    {
      type: "Individual Instructors",
      description: "Subject matter experts and professional educators",
      examples: "Specialized courses, workshops, skill development"
    },
    {
      type: "Content Creators",
      description: "Educational content producers and publishers",
      examples: "Video courses, e-books, learning materials"
    },
    {
      type: "Training Companies",
      description: "Corporate training and professional development providers",
      examples: "Business skills, technical training, certification prep"
    }
  ]

  const successStories = [
    {
      name: "Tech Academy",
      type: "Technical Training",
      result: "10,000+ students enrolled",
      revenue: "$250K+ monthly revenue"
    },
    {
      name: "Language School Pro",
      type: "Language Education",
      result: "5,000+ active learners",
      revenue: "$150K+ monthly revenue"
    },
    {
      name: "Business Skills Institute",
      type: "Professional Development",
      result: "8,000+ professionals trained",
      revenue: "$200K+ monthly revenue"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011F5B] mb-6">
            Partner with Us as a Vendor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your expertise, reach thousands of learners, and grow your educational business on the EduConnect platform
          </p>
        </div>

        {/* Vendor Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Who Can Become a Vendor?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorTypes.map((vendor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-[#011F5B]/20 to-[#00416A]/20 rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-[#011F5B]" />
                </div>
                <h4 className="font-semibold text-[#011F5B] mb-2">{vendor.type}</h4>
                <p className="text-sm text-gray-600 mb-3">{vendor.description}</p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> {vendor.examples}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Why Partner with EduConnect?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8C61]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#011F5B] mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-[#011F5B] to-[#00416A] rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-sm text-white/80">{story.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{story.result}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{story.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works for Vendors */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">How Vendor Partnership Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "Apply", description: "Submit your vendor application and get approved within 48 hours" },
              { step: "Upload", description: "Upload your courses, set pricing, and configure your content" },
              { step: "Launch", description: "Go live and start reaching students across our platform" },
              { step: "Earn", description: "Receive monthly payments and track your success metrics" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8C61]/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#FF6B35]">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-[#011F5B] mb-2">{item.step}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {index < 3 && (
                  <ArrowRight className="w-5 h-5 text-gray-300 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Become a Vendor?</h3>
            <p className="text-white/90 mb-6">Join our marketplace and start monetizing your educational content today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Apply as Vendor
              </button>
              <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VendorPartners
