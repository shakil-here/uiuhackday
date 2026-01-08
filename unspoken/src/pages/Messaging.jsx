import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmotion } from '../context/EmotionContext'
import { useAuth } from '../context/AuthContext'
import './Messaging.css'

function Messaging() {
  const navigate = useNavigate()
  const { emotion, emotions, changeEmotion } = useEmotion()
  const { getCurrentUser, logout } = useAuth()
  const [currentUser, setCurrentUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Get current user from auth context
    const user = getCurrentUser()
    if (!user) {
      navigate('/login')
      return
    }
    setCurrentUser(user)
  }, [navigate, getCurrentUser])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser?.name || 'You',
      timestamp: new Date().toLocaleTimeString(),
      emotion: emotion
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  if (!currentUser) {
    return null // Will redirect
  }

  return (
    <div className={`messaging-page ${emotion}`}>
      {/* Emotion Test Controls */}
      <div className="emotion-controls">
        <div className="emotion-controls-title">Test Emotions</div>
        <div className="emotion-buttons">
          {Object.entries(emotions).map(([key, value]) => (
            <button
              key={key}
              className={`emotion-btn ${key} ${emotion === key ? 'active' : ''}`}
              onClick={() => changeEmotion(key)}
            >
              <span>{value.emoji}</span>
              <span>{value.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="messaging-container">
        {/* Header */}
        <header className="messaging-header">
          <div className="header-content">
            <h1 className="app-title">Unspoken</h1>
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h2>Start Your Conversation</h2>
              <p>Send your first message to begin communicating with emotions</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-emotion">
                    Emotion: {message.emotion}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="message-input-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Messaging
