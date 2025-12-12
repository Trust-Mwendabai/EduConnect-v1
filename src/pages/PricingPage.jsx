import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  CheckCircle, 
  X, 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Shield, 
  Headphones, 
  Zap, 
  Clock, 
  Database,
  Globe,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Check,
  DollarSign,
  Building,
  GraduationCap,
  Target,
  MessageSquare
} from 'lucide-react'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for individual students',
      price: billingCycle === 'monthly' ? 9.99 : 99.90,
      yearlyPrice: 99.90,
      monthlyPrice: 9.99,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Access to 50+ courses',
        'Basic video lessons',
        'Course completion certificates',
        'Mobile app access',
        'Email support',
        'Community forum access'
      ],
      limitations: [
        'No live instructor support',
        'Limited course materials',
        'No advanced analytics'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for serious learners',
      price: billingCycle === 'monthly' ? 29.99 : 299.90,
      yearlyPrice: 299.90,
      monthlyPrice: 29.99,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Access to 200+ courses',
        'Premium video lessons',
        'Advanced certificates',
        'Priority support',
        'Downloadable resources',
        'Live Q&A sessions',
        'Progress tracking',
        'Offline access'
      ],
      limitations: [
        'No custom branding',
        'Limited API access'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For institutions and teams',
      price: billingCycle === 'monthly' ? 99.99 : 999.90,
      yearlyPrice: 999.90,
      monthlyPrice: 99.99,
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      features: [
        'Unlimited course access',
        'Custom course creation',
        'White-label platform',
        'Dedicated account manager',
        'Advanced analytics',
        'API access',
        'SSO integration',
        'Custom branding',
        'Priority support 24/7',
        'Training sessions'
      ],
      limitations: [],
      popular: false
    }
  ]

  const additionalFeatures = [
    {
      title: '24/7 Support',
      description: 'Get help whenever you need it from our expert team',
      icon: Headphones,
      included: ['Professional', 'Enterprise']
    },
    {
      title: 'Advanced Analytics',
      description: 'Track progress and get detailed insights',
      icon: TrendingUp,
      included: ['Professional', 'Enterprise']
    },
    {
      title: 'API Access',
      description: 'Integrate with your existing systems',
      icon: Database,
      included: ['Enterprise']
    },
    {
      title: 'Custom Branding',
      description: 'Personalize the platform with your brand',
      icon: Globe,
      included: ['Enterprise']
    }
  ]

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Do you offer discounts for students?',
      answer: 'Yes, we offer a 50% discount for verified students with a valid .edu email address.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'You\'ll be notified when you approach your limits. You can upgrade your plan or purchase add-ons for additional resources.'
    }
  ]

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#011F5B] to-[#00416A] text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Learning Journey
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Flexible pricing plans designed for every learner and organization
            </p>
            <div className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-1 inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#011F5B] shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-[#011F5B] shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Yearly Billing
                <span className="ml-2 text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-[#FF6B35] scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {plan.popular && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-sm font-medium">Popular</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-600 mt-1">
                          Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} per year
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        selectedPlan === plan.id
                          ? 'bg-green-500 text-white'
                          : plan.popular
                          ? 'bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPlan === plan.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Selected
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                    
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-3 opacity-60">
                            <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Additional Features
            </h2>
            <p className="text-lg text-gray-600">
              See what makes each plan unique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-[#011F5B] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {pricingPlans.map((plan) => (
                      <div key={plan.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{plan.name}</span>
                        {feature.included.includes(plan.name) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We've got answers
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their careers with EduConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#FF6B35]/90 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage
