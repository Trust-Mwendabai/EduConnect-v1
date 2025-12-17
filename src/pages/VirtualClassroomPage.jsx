import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Share, 
  MessageSquare, 
  Users, 
  Settings, 
  ScreenShare, 
  Hand, 
  Download,
  Clock,
  BookOpen,
  FileText,
  Award,
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize2,
  Grid3x3,
  Phone
} from 'lucide-react'
import { NotificationProvider, useNotifications } from '../components/notifications/NotificationSystem'

function VirtualClassroomPage() {
  const { id } = useParams()
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'instructor', isSpeaking: false, videoOn: true },
    { id: 2, name: 'John Doe', role: 'student', isSpeaking: false, videoOn: true },
    { id: 3, name: 'Jane Smith', role: 'student', isSpeaking: true, videoOn: false },
    { id: 4, name: 'Bob Johnson', role: 'student', isSpeaking: false, videoOn: true },
    { id: 5, name: 'Alice Williams', role: 'student', isSpeaking: false, videoOn: false }
  ])
  
  const [messages, setMessages] = useState([
    { id: 1, user: 'Dr. Sarah Johnson', message: 'Welcome to the Advanced React Development class!', time: '10:00 AM', role: 'instructor' },
    { id: 2, user: 'John Doe', message: 'Thank you! Ready to learn', time: '10:01 AM', role: 'student' },
    { id: 3, user: 'Jane Smith', message: 'Looking forward to the session', time: '10:02 AM', role: 'student' }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [showParticipants, setShowParticipants] = useState(false)
  const [showChat, setShowChat] = useState(true)

  const courseInfo = {
    id: id,
    title: 'Advanced React Development',
    instructor: 'Dr. Sarah Johnson',
    time: '10:00 AM - 11:30 AM',
    duration: '1h 30min',
    topic: 'Advanced State Management with Redux',
    room: `Virtual Room ${id}`,
    nextClass: 'Friday, 3:00 PM'
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'John Doe',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: 'student'
      }
      setMessages([...messages, message])
      setNewMessage('')
      showSuccess('Message sent')
    }
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    showInfo(isVideoOn ? 'Video turned off' : 'Video turned on')
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    showInfo(isMicOn ? 'Microphone muted' : 'Microphone unmuted')
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    showWarning(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started')
  }

  const toggleHand = () => {
    setIsHandRaised(!isHandRaised)
    showInfo(isHandRaised ? 'Hand lowered' : 'Hand raised')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/lms" className="text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{courseInfo.title}</h1>
              <p className="text-sm text-gray-400">{courseInfo.topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} />
              <span>{courseInfo.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />
              <span>{participants.length}</span>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 relative bg-black">
            {/* Main Video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {isVideoOn ? (
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Users size={48} className="text-gray-400" />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <VideoOff size={48} className="text-gray-500" />
                  </div>
                )}
                <h3 className="text-lg font-medium">Dr. Sarah Johnson</h3>
                <p className="text-sm text-gray-400">Instructor</p>
              </div>
            </div>

            {/* Participant Videos Grid */}
            <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
              {participants.slice(1, 5).map((participant) => (
                <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center relative">
                  {participant.videoOn ? (
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-gray-400" />
                    </div>
                  ) : (
                    <VideoOff size={24} className="text-gray-500" />
                  )}
                  {participant.isSpeaking && (
                    <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  <div className="absolute bottom-1 left-1 text-xs bg-black/50 px-1 rounded">
                    {participant.name.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Class Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <h3 className="font-medium mb-1">{courseInfo.topic}</h3>
              <p className="text-sm text-gray-300">Room: {courseInfo.room}</p>
              <p className="text-sm text-gray-300">Duration: {courseInfo.duration}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              
              <button
                onClick={toggleMic}
                className={`p-3 rounded-full transition-colors ${
                  isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              
              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full transition-colors ${
                  isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <ScreenShare size={20} />
              </button>
              
              <button
                onClick={toggleHand}
                className={`p-3 rounded-full transition-colors ${
                  isHandRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Hand size={20} />
              </button>
              
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
                <Settings size={20} />
              </button>
              
              <button className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setShowChat(true)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                showChat ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setShowChat(false)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                !showChat ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Participants ({participants.length})
            </button>
          </div>

          {/* Chat */}
          {showChat && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex flex-col ${message.role === 'instructor' ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[80%] ${message.role === 'instructor' ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg p-3`}>
                      <p className="text-xs font-medium mb-1">{message.user}</p>
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Share size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Participants */}
          {!showChat && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-gray-400">{participant.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {participant.isSpeaking && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      {participant.videoOn ? (
                        <Video size={14} className="text-green-500" />
                      ) : (
                        <VideoOff size={14} className="text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Wrapper component with NotificationProvider
const VirtualClassroomPageWrapper = () => (
  <NotificationProvider>
    <VirtualClassroomPage />
  </NotificationProvider>
)

export default VirtualClassroomPageWrapper
