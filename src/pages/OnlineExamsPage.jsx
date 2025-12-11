import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  Upload, 
  Download,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  Timer,
  Users,
  BookOpen,
  Award,
  Settings,
  RefreshCw,
  LogOut,
  HelpCircle,
  Maximize2,
  Minimize2,
  Copy,
  Trash2,
  Edit3,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Image,
  Paperclip,
  Calendar
} from 'lucide-react'

function OnlineExamsPage() {
  const { examId } = useParams()
  const [currentExam, setCurrentExam] = useState(null)
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(7200) // 2 hours in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)
  const [examResults, setExamResults] = useState(null)

  const [exams] = useState([
    {
      id: 1,
      course: 'Advanced React Development',
      title: 'Mid-term Examination',
      description: 'Comprehensive assessment covering React fundamentals, hooks, state management, and advanced concepts',
      duration: 120, // minutes
      totalQuestions: 30,
      totalMarks: 100,
      passingMarks: 60,
      instructions: [
        'Read each question carefully before answering',
        'Multiple choice questions have only one correct answer',
        'Coding questions must be written in JavaScript/React',
        'You can flag questions to review later',
        'The exam will auto-submit when time expires',
        'No negative marking for wrong answers'
      ],
      status: 'available',
      scheduledDate: '2024-01-20',
      scheduledTime: '10:00 AM',
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: 2,
      course: 'Database Management',
      title: 'Quiz 3 - SQL Queries',
      description: 'Test your knowledge of SQL queries, joins, and database operations',
      duration: 60,
      totalQuestions: 20,
      totalMarks: 50,
      passingMarks: 30,
      instructions: [
        'Write SQL queries for the given scenarios',
        'Ensure syntax is correct',
        'Consider edge cases in your solutions',
        'Time limit is strict - manage your time wisely'
      ],
      status: 'available',
      scheduledDate: '2024-01-22',
      scheduledTime: '2:00 PM',
      attempts: 0,
      maxAttempts: 2
    },
    {
      id: 3,
      course: 'Web Design Fundamentals',
      title: 'Project Submission - Responsive Website',
      description: 'Submit your final responsive website project with all required features',
      duration: 0, // No time limit for submission
      totalQuestions: 1,
      totalMarks: 100,
      passingMarks: 70,
      instructions: [
        'Submit a fully functional responsive website',
        'Include at least 5 different pages',
        'Must work on mobile, tablet, and desktop',
        'Include source code and documentation',
        'Upload as ZIP file'
      ],
      status: 'submission',
      scheduledDate: '2024-01-25',
      scheduledTime: '11:59 PM',
      attempts: 0,
      maxAttempts: 3
    }
  ])

  const [questions] = useState([
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the primary purpose of React Hooks?',
      options: [
        'To style components',
        'To manage state and side effects in functional components',
        'To handle routing',
        'To make API calls'
      ],
      correctAnswer: 1,
      marks: 2
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'Which hook is used to perform side effects in functional components?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 1,
      marks: 2
    },
    {
      id: 3,
      type: 'coding',
      question: 'Write a React component that implements a simple counter with increment and decrement buttons using useState hook.',
      marks: 10,
      starterCode: `import React, { useState } from 'react';

function Counter() {
  // Your code here
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default Counter;`
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'What is the purpose of the dependency array in useEffect?',
      options: [
        'To style the effect',
        'To control when the effect runs',
        'To pass props to the effect',
        'To handle errors'
      ],
      correctAnswer: 1,
      marks: 2
    }
  ])

  useEffect(() => {
    if (examId) {
      const exam = exams.find(e => e.id === parseInt(examId))
      setCurrentExam(exam)
    }
  }, [examId])

  useEffect(() => {
    let timer
    if (isExamStarted && timeRemaining > 0 && !examCompleted) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isExamStarted, timeRemaining, examCompleted])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startExam = () => {
    setIsExamStarted(true)
    setTimeRemaining(currentExam.duration * 60)
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const toggleFlagQuestion = (questionId) => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev)
      if (newFlags.has(questionId)) {
        newFlags.delete(questionId)
      } else {
        newFlags.add(questionId)
      }
      return newFlags
    })
  }

  const navigateQuestion = (direction) => {
    if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    let correctAnswers = 0

    questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (question.type === 'multiple-choice' && userAnswer === question.correctAnswer) {
        totalScore += question.marks
        correctAnswers++
      }
      // For coding questions, you'd need evaluation logic
    })

    const percentage = (totalScore / questions.reduce((sum, q) => sum + q.marks, 0)) * 100
    const passed = percentage >= (currentExam.passingMarks / currentExam.totalMarks) * 100

    return {
      totalScore,
      correctAnswers,
      totalQuestions: questions.length,
      percentage,
      passed,
      timeTaken: currentExam.duration * 60 - timeRemaining
    }
  }

  const handleSubmitExam = () => {
    const results = calculateResults()
    setExamResults(results)
    setExamCompleted(true)
    setIsExamStarted(false)
  }

  const goToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  if (!currentExam && !examId) {
    // List all available exams
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-2">Online Exams</h1>
            <p className="text-white/80">Take your exams and track your progress</p>
          </div>
        </section>

        <div className="container-custom py-8 flex-1">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map(exam => (
              <div key={exam.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-600">{exam.course}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exam.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration > 0 ? `${exam.duration} minutes` : 'No time limit'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{exam.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{exam.totalMarks} marks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exam.scheduledDate} at {exam.scheduledTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Attempts: {exam.attempts}/{exam.maxAttempts}
                    </span>
                    <Link
                      to={`/exams/${exam.id}`}
                      className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors text-sm font-medium"
                    >
                      {exam.attempts >= exam.maxAttempts ? 'View Results' : 'Start Exam'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  if (!currentExam) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Exam Not Found</h2>
            <p className="text-gray-600 mb-4">The exam you're looking for doesn't exist or is not available.</p>
            <Link to="/exams" className="text-[#FF6B35] hover:text-[#FF8C61] font-medium">
              Back to Exams
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (examCompleted && examResults) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
          <div className="container-custom text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Exam Completed!</h1>
            <p className="text-white/80">Here are your results</p>
          </div>
        </section>

        <div className="container-custom py-8 flex-1">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentExam.title}</h2>
                <p className="text-gray-600">{currentExam.course}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">{examResults.totalScore}</p>
                  <p className="text-sm text-gray-600">Total Score</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">{examResults.percentage.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Percentage</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Correct Answers:</span>
                  <span className="font-medium">{examResults.correctAnswers}/{examResults.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Taken:</span>
                  <span className="font-medium">{formatTime(examResults.timeTaken)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${examResults.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {examResults.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/exams" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium">
                  Back to Exams
                </Link>
                <button className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors font-medium">
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  if (!isExamStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-2">{currentExam.title}</h1>
            <p className="text-white/80">{currentExam.course}</p>
          </div>
        </section>

        <div className="container-custom py-8 flex-1">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Instructions</h2>
                <p className="text-gray-600 mb-6">{currentExam.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Exam Details:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Duration: {currentExam.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span>Questions: {currentExam.totalQuestions}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span>Total Marks: {currentExam.totalMarks}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span>Passing Marks: {currentExam.passingMarks}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Important:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {currentExam.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#FF6B35] mt-1">•</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Important Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Once you start the exam, the timer will begin immediately. Make sure you're ready before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={startExam}
                  className="flex-1 px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors font-medium"
                >
                  Start Exam
                </button>
                <Link to="/exams" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  // Exam in progress
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Exam Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">{currentExam.title}</h1>
              <span className="text-sm text-gray-600">{currentExam.course}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-red-500" />
                <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-600">Question </span>
                <span className="font-bold">{currentQuestion + 1}</span>
                <span className="text-gray-600">/{questions.length}</span>
              </div>
              
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Question {currentQuestion + 1}
                    </span>
                    <span className="text-sm text-gray-600">({question.marks} marks)</span>
                    {flaggedQuestions.has(question.id) && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                        Flagged
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-6">{question.question}</h3>
                </div>
                
                <button
                  onClick={() => toggleFlagQuestion(question.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedQuestions.has(question.id) 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Flag for review"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Answer Options */}
              {question.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        answers[question.id] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={index}
                        checked={answers[question.id] === index}
                        onChange={() => handleAnswerChange(question.id, index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Coding Question */}
              {question.type === 'coding' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Code className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <textarea
                    value={answers[question.id] || question.starterCode}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Write your code here..."
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <button
                  onClick={() => navigateQuestion('prev')}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Progress
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Clear Answer
                  </button>
                </div>
                
                <button
                  onClick={() => navigateQuestion('next')}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`p-2 text-sm font-medium rounded-lg transition-colors ${
                      currentQuestion === index
                        ? 'bg-blue-600 text-white'
                        : answers[q.id]
                        ? 'bg-green-100 text-green-700'
                        : flaggedQuestions.has(q.id)
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>Not Answered</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {Object.keys(answers).length}/{questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Exam?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit your exam? You cannot change your answers after submission.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OnlineExamsPage
