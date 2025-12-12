import React from 'react'
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Target, 
  Award, 
  Clock, 
  MessageCircle, 
  Calendar, 
  CheckCircle,
  Play,
  Download,
  Star,
  TrendingUp,
  User,
  Video,
  FileText,
  Headphones
} from 'lucide-react'

function LearningJourney() {
  const studentJourney = [
    {
      phase: "Discovery",
      title: "Find Your Path",
      description: "Explore courses, read reviews, and discover subjects that match your interests and career goals.",
      icon: Target,
      activities: ["Browse course catalog", "Read instructor profiles", "Check prerequisites", "Compare prices"],
      duration: "1-2 days"
    },
    {
      phase: "Enrollment",
      title: "Get Started",
      description: "Enroll in courses, set up your learning schedule, and access your course materials immediately.",
      icon: Users,
      activities: ["Create learning schedule", "Access course materials", "Join study groups", "Meet instructors"],
      duration: "Same day"
    },
    {
      phase: "Learning",
      title: "Engage & Learn",
      description: "Attend live classes, watch recorded lectures, complete assignments, and interact with peers.",
      icon: BookOpen,
      activities: ["Attend live sessions", "Complete assignments", "Participate in discussions", "Take quizzes"],
      duration: "4-12 weeks"
    },
    {
      phase: "Assessment",
      title: "Test Your Knowledge",
      description: "Take exams, submit projects, and receive feedback to measure your progress.",
      icon: CheckCircle,
      activities: ["Complete exams", "Submit projects", "Receive feedback", "Track progress"],
      duration: "Ongoing"
    },
    {
      phase: "Completion",
      title: "Achieve Success",
      description: "Earn certificates, update your profile, and celebrate your achievements.",
      icon: Award,
      activities: ["Earn certificates", "Update resume", "Join alumni network", "Plan next steps"],
      duration: "Final week"
    }
  ]

  const instructorJourney = [
    {
      phase: "Setup",
      title: "Create Your Courses",
      description: "Design curriculum, upload materials, and set up your instructor profile.",
      icon: Video,
      activities: ["Design curriculum", "Record lectures", "Create assignments", "Set pricing"]
    },
    {
      phase: "Launch",
      title: "Go Live",
      description: "Publish your courses, set schedules, and open enrollment to students.",
      icon: Play,
      activities: ["Publish courses", "Set schedules", "Open enrollment", "Market your courses"]
    },
    {
      phase: "Teaching",
      title: "Engage Students",
      description: "Conduct live sessions, grade assignments, and provide personalized feedback.",
      icon: Users,
      activities: ["Conduct live sessions", "Grade assignments", "Provide feedback", "Host office hours"]
    },
    {
      phase: "Growth",
      title: "Expand & Improve",
      description: "Analyze performance, gather feedback, and continuously improve your courses.",
      icon: TrendingUp,
      activities: ["Review analytics", "Gather student feedback", "Update content", "Create new courses"]
    }
  ]

  const learningFeatures = [
    {
      icon: Video,
      title: "Live-between Learning",
      description: "Attend live virtual classes with real-time interaction and screen sharing."
    },
    {
      icon: Headphones,
      title: "On-Demand Content",
      description: "Access recorded lectures, podcasts, and learning materials anytime."
    },
    {
      icon: FileText,
      title: "Interactive Assignments",
      description: "Complete hands-on projects, quizzes, and practical exercises."
    },
    {
      icon: MessageCircle,
      title: "Peer Collaboration",
      description: "Join study groups, discussion forums, and team projects."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with flexible deadlines and self-paced options."
    },
    {
      icon: Download,
      title: "Offline Access",
      description: "Download course materials for offline learning and reference."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011F5B] mb-6">
            Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovery to achievement, we guide both students and instructors through every step of the educational experience
          </p>
        </div>

        {/* Student Journey */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">For Students</h3>
          <div className="relative">
            {/* Journey Path */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {studentJourney.map((phase, index) => {
                const IconComponent = phase.icon
                return (
                  <div key={phase.phase} className="relative">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#011F5B] to-[#00416A] rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-[#FF6B35] rounded-full px-3 py-1 shadow-md">
                          <span className="text-xs font-semibold text-[#FF6B35]">{phase.duration}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-[#011F5B] mb-2">{phase.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                      
                      <div className="space-y-1">
                        {phase.activities.slice(0, 2).map((activity, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Instructor Journey */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">For Instructors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructorJourney.map((phase, index) => {
              const IconComponent = phase.icon
              return (
                <div key={phase.phase} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8C61]/20 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#FF6B35]" />
                  </div>
                  <h4 className="font-bold text-[#011F5B] mb-2">{phase.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                  <div className="space-y-1">
                    {phase.activities.slice(0, 3).map((activity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Learning Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#011F5B] mb-8 text-center">Learning Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#011F5B]/20 to-[#00416A]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#011F5B]" />
                  </div>
                  <div>
                    <h4 Organic="font-semibold text-[#011F5B] mb-2">{feature.title}</h4>
                    <p className="text text-gray-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-是属于 text-white p-8 md:p-antas">
          <div className="grid md:2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-lg mb-4"> 
                Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-lg mb-4">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg mb-4">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg mb-4">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningJourney
