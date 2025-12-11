import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Users, 
  MessageSquare, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Share2, 
  ScreenShare, 
  Upload,
  Download,
  Send,
  Smile,
  Paperclip,
  Phone,
  Settings,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Clock,
  Calendar,
  BookOpen,
  Target,
  Award,
  ChevronLeft,
  Search,
  Filter,
  Plus,
  UserPlus,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Save,
  FileText,
  Image,
  FileVideo,
  FileAudio,
  FileCode,
  Folder,
  Grid3x3,
  List,
  MoreVertical,
  Star,
  Heart,
  Bookmark,
  Copy,
  ExternalLink
} from 'lucide-react'

function OnlineStudyRoomPage() {
  const { roomId } = useParams()
  const [isInRoom, setIsInRoom] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('connected')
  
  // Chat functionality
  const [messages, setMessages] = useState([
    { id: 1, user: 'John Doe', message: 'Hey everyone! Ready to study React hooks?', time: '10:00 AM', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', message: 'Yes! I have some questions about useEffect', time: '10:01 AM', avatar: 'JS' },
    { id: 3, user: 'Mike Johnson', message: 'I can help with useEffect! What specific issues are you having?', time: '10:02 AM', avatar: 'MJ' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  // Study room info
  const [roomInfo] = useState({
    id: roomId || 'react-study-101',
    title: 'React Hooks Study Session',
    topic: 'Advanced React Hooks and Performance Optimization',
    host: 'Sarah Johnson',
    participants: 12,
    maxParticipants: 20,
    isPrivate: false,
    description: 'Collaborative study session focusing on advanced React hooks, custom hooks, and performance optimization techniques.',
    tags: ['react', 'hooks', 'javascript', 'webdev'],
    resources: [
      { id: 1, title: 'React Hooks Documentation', type: 'link', url: 'https://react.dev/reference/react' },
      { id: 2, title: 'Custom Hooks Examples', type: 'code', size: '2.3 MB' },
      { id: 3, title: 'Performance Optimization Guide', type: 'document', size: '1.5 MB' }
    ]
  })
  
  // Participants
  const [participants, setParticipants] = useState([
    { id: 1, name: 'John Doe', avatar: 'JD', status: 'online', isSpeaking: false, videoOn: true, isHost: false },
    { id: 2, name: 'Jane Smith', avatar: 'JS', status: 'online', isSpeaking: true, videoOn: false, isHost: false },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', status: 'online', isSpeaking: false, videoOn: true, isHost: false },
    { id: 4, name: 'Sarah Johnson', avatar: 'SJ', status: 'online', isSpeaking: false, videoOn: true, isHost: true },
    { id: 5, name: 'Alice Williams', avatar: 'AW', status: 'away', isSpeaking: false, videoOn: false, isHost: false }
  ])
  
  // Whiteboard functionality
  const [whiteboardActive, setWhiteboardActive] = useState(false)
  const [drawingTool, setDrawingTool] = useState('pen')
  const [drawingColor, setDrawingColor] = useState('#000000')
  
  // Shared files
  const [sharedFiles] = useState([
    { id: 1, name: 'react-hooks-notes.pdf', type: 'document', size: '2.5 MB', uploadedBy: 'John Doe', time: '10:15 AM' },
    { id: 2, name: 'useEffect-examples.zip', type: 'archive', size: '1.2 MB', uploadedBy: 'Jane Smith', time: '10:20 AM' }
  ])
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'YU'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const joinRoom = () => {
    setIsInRoom(true)
  }

  const leaveRoom = () => {
    setIsInRoom(false)
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!isInRoom) {
    // Room Lobby/Join View
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/study-rooms" className="text-white/80 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-4xl font-bold">Study Room</h1>
            </div>
            <p className="text-white/80">Join collaborative study sessions with fellow students</p>
          </div>
        </section>

        <div className="container-custom py-8 flex-1">
          <div className="max-w-4xl mx-auto">
            {/* Room Info Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="h-48 bg-gradient-to-br from-[#011F5B] to-[#00416A] flex items-center justify-center">
                <Users className="w-20 h-20 text-white/30" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{roomInfo.title}</h2>
                    <p className="text-gray-600 mb-4">{roomInfo.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Host: {roomInfo.host}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {roomInfo.participants}/{roomInfo.maxParticipants} participants
                      </span>
                      <span className="flex items-center gap-2">
                        {roomInfo.isPrivate ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        {roomInfo.isPrivate ? 'Private' : 'Public'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {roomInfo.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Users className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Active Now</p>
                    </div>
                  </div>
                </div>
                
                {/* Room Resources */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Study Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {roomInfo.resources.map(resource => (
                      <div key={resource.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {resource.type === 'link' ? (
                            <ExternalLink className="w-5 h-5 text-blue-600" />
                          ) : resource.type === 'code' ? (
                            <FileCode className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          <p className="text-sm text-gray-500">
                            {resource.type === 'link' ? resource.url : resource.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Join Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Ready to Join?</h3>
              <p className="text-gray-600 mb-6">
                Join the study room to collaborate with other students in real-time. 
                You'll have access to video chat, screen sharing, and collaborative tools.
              </p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={joinRoom}
                  className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors font-medium flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Join Study Room
                </button>
                
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  // Active Study Room View
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={leaveRoom}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-semibold">{roomInfo.title}</h1>
              <p className="text-sm text-gray-400">{roomInfo.topic}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />
              <span>{participants.length}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'
            }`}>
              {connectionStatus === 'connected' ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>{connectionStatus}</span>
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
              {isVideoOn ? (
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users size={48} className="text-gray-400" />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center">
                  <VideoOff size={48} className="text-gray-500" />
                </div>
              )}
              <h3 className="text-lg font-medium mt-4">You</h3>
            </div>

            {/* Participant Videos */}
            <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
              {participants.slice(0, 4).map((participant) => (
                <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center relative">
                  {participant.videoOn ? (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{participant.avatar}</span>
                    </div>
                  ) : (
                    <VideoOff size={20} className="text-gray-500" />
                  )}
                  {participant.isSpeaking && (
                    <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {participant.isHost && (
                    <div className="absolute top-1 right-1 bg-yellow-500 text-black text-xs px-1 rounded">
                      HOST
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 text-xs bg-black/50 px-1 rounded">
                    {participant.name.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Whiteboard Toggle */}
            <button
              onClick={() => setWhiteboardActive(!whiteboardActive)}
              className={`absolute top-4 left-4 px-3 py-2 rounded-lg transition-colors ${
                whiteboardActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {whiteboardActive ? 'Hide Whiteboard' : 'Show Whiteboard'}
            </button>
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
              
              <button
                onClick={leaveRoom}
                className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
              >
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button className="flex-1 px-4 py-3 text-sm font-medium bg-gray-700 text-white">
              <MessageSquare size={16} className="inline mr-2" />
              Chat
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
              <Users size={16} className="inline mr-2" />
              Participants ({participants.length})
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white">
              <Folder size={16} className="inline mr-2" />
              Files
            </button>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex flex-col ${message.user === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] ${message.user === 'You' ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg p-3`}>
                    <p className="text-xs font-medium mb-1">{message.user}</p>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2 mb-2">
                <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                  <Paperclip size={16} />
                </button>
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <Smile size={16} />
                </button>
              </div>
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
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineStudyRoomPage
