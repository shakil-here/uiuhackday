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
  const [selectedCommunity, setSelectedCommunity] = useState('uiu')
  const [chats, setChats] = useState([])
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const communities = [
    { id: 'uiu', name: 'UIU', icon: '🏛️' },
    { id: 'nsu', name: 'NSU', icon: '🎓' },
  ]

  // Sample users for demo (in production, fetch from backend)
  const sampleUsers = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: '👩' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: '👨' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: '🧑' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', avatar: '👩‍🦰' },
    { id: '5', name: 'Eve Wilson', email: 'eve@example.com', avatar: '👱‍♀️' },
  ]

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      navigate('/login')
      return
    }
    setCurrentUser(user)
    loadChats()
  }, [navigate, getCurrentUser])

  useEffect(() => {
    if (selectedChatId) {
      loadMessages(selectedChatId)
    } else {
      setMessages([])
    }
  }, [selectedChatId])

  const loadChats = () => {
    const storedChats = JSON.parse(localStorage.getItem('chats') || '[]')
    if (storedChats.length === 0) {
      // Initialize with sample chats
      const initialChats = sampleUsers.map((user, index) => ({
        id: `chat-${user.id}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userEmail: user.email,
        community: index % 2 === 0 ? 'uiu' : 'nsu',
        lastMessage: '',
        lastMessageTime: null,
        unreadCount: 0,
      }))
      localStorage.setItem('chats', JSON.stringify(initialChats))
      setChats(initialChats)
    } else {
      setChats(storedChats)
    }
  }

  const loadMessages = (chatId) => {
    const storedMessages = JSON.parse(localStorage.getItem(`messages-${chatId}`) || '[]')
    setMessages(storedMessages)
  }

  const saveMessage = (chatId, message) => {
    const storedMessages = JSON.parse(localStorage.getItem(`messages-${chatId}`) || '[]')
    const updatedMessages = [...storedMessages, message]
    localStorage.setItem(`messages-${chatId}`, JSON.stringify(updatedMessages))
    setMessages(updatedMessages)
  }

  const updateChatLastMessage = (chatId, messageText) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessage: messageText,
          lastMessageTime: new Date().toISOString(),
        }
      }
      return chat
    })
    setChats(updatedChats)
    localStorage.setItem('chats', JSON.stringify(updatedChats))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId)
    // Mark as read
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, unreadCount: 0 }
      }
      return chat
    })
    setChats(updatedChats)
    localStorage.setItem('chats', JSON.stringify(updatedChats))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChatId) return

    const message = {
      id: Date.now(),
      text: newMessage,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date().toISOString(),
      emotion: emotion,
    }

    saveMessage(selectedChatId, message)
    updateChatLastMessage(selectedChatId, newMessage)
    setNewMessage('')
  }

  const handleCreateNewChat = (userId) => {
    const user = sampleUsers.find(u => u.id === userId)
    if (!user) return

    const chatId = `chat-${userId}`
    const existingChat = chats.find(c => c.id === chatId)
    
    if (existingChat) {
      setSelectedChatId(chatId)
    } else {
      const newChat = {
        id: chatId,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userEmail: user.email,
        community: selectedCommunity,
        lastMessage: '',
        lastMessageTime: null,
        unreadCount: 0,
      }
      const updatedChats = [newChat, ...chats]
      setChats(updatedChats)
      localStorage.setItem('chats', JSON.stringify(updatedChats))
      setSelectedChatId(chatId)
    }
  }

  const filteredChats = chats.filter(chat => {
    const matchesCommunity = chat.community === selectedCommunity
    const matchesSearch = chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCommunity && matchesSearch
  })

  const selectedChat = chats.find(c => c.id === selectedChatId)

  if (!currentUser) {
    return null
  }

  return (
    <div className="messaging-page">
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
        {/* Sidebar */}
        <aside className="chat-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Chats</h2>
            <button onClick={handleLogout} className="logout-btn-small">
              Logout
            </button>
          </div>

          {/* Community Selector */}
          <div className="community-selector">
            <label className="community-label">Select Community:</label>
            <div className="community-buttons">
              {communities.map(community => (
                <button
                  key={community.id}
                  className={`community-btn ${selectedCommunity === community.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCommunity(community.id)
                    setSelectedChatId(null)
                  }}
                >
                  <span>{community.icon}</span>
                  <span>{community.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Chat List */}
          <div className="chat-list">
            {filteredChats.length === 0 ? (
              <div className="no-chats">
                <p>No chats found</p>
                <div className="new-chat-users">
                  <p className="new-chat-title">Start a new chat:</p>
                  {sampleUsers
                    .filter(user => !chats.find(c => c.userId === user.id && c.community === selectedCommunity))
                    .slice(0, 3)
                    .map(user => (
                      <button
                        key={user.id}
                        className="new-chat-user-btn"
                        onClick={() => handleCreateNewChat(user.id)}
                      >
                        <span className="user-avatar">{user.avatar}</span>
                        <span>{user.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className={`chat-item ${selectedChatId === chat.id ? 'active' : ''}`}
                  onClick={() => handleSelectChat(chat.id)}
                >
                  <div className="chat-avatar">{chat.userAvatar}</div>
                  <div className="chat-info">
                    <div className="chat-header-row">
                      <span className="chat-name">{chat.userName}</span>
                      {chat.lastMessageTime && (
                        <span className="chat-time">
                          {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <div className="chat-preview-row">
                      <span className="chat-preview">{chat.lastMessage || 'No messages yet'}</span>
                      {chat.unreadCount > 0 && (
                        <span className="unread-badge">{chat.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="chat-main">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <header className="chat-header">
                <div className="chat-header-content">
                  <div className="chat-header-user">
                    <span className="chat-header-avatar">{selectedChat.userAvatar}</span>
                    <div>
                      <h3 className="chat-header-name">{selectedChat.userName}</h3>
                      <span className="chat-header-community">
                        {communities.find(c => c.id === selectedChat.community)?.icon}{' '}
                        {communities.find(c => c.id === selectedChat.community)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Messages Area - Emotion theme applied here */}
              <div className={`messages-area ${emotion}`}>
                {messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <h2>Start Your Conversation</h2>
                    <p>Send your first message to {selectedChat.userName}</p>
                  </div>
                ) : (
                  <div className="messages-list">
                    {messages.map((message) => {
                      const isOwnMessage = message.senderId === currentUser.id
                      return (
                        <div
                          key={message.id}
                          className={`message-item ${isOwnMessage ? 'own-message' : ''}`}
                        >
                          {!isOwnMessage && (
                            <div className="message-avatar">{selectedChat.userAvatar}</div>
                          )}
                          <div className="message-content-wrapper">
                            {!isOwnMessage && (
                              <span className="message-sender">{message.senderName}</span>
                            )}
                            <div className="message-bubble">
                              <div className="message-text">{message.text}</div>
                              <div className="message-footer">
                                <span className="message-time">
                                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="message-emotion">{message.emotion}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
                    placeholder={`Message ${selectedChat.userName}...`}
                    className="message-input"
                  />
                  <button type="submit" className="send-button">
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💭</div>
              <h2>Select a chat to start messaging</h2>
              <p>Choose a conversation from the sidebar or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messaging
