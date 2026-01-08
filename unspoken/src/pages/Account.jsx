import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Account.css'

function Account() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = () => {
    // TODO: Add API call to update profile
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Sidebar */}
        <div className="account-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.full_name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">{user?.full_name}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-badge">
              <span className="badge-online">●</span>
              Online
            </div>
          </div>

          <nav className="account-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              My Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="nav-icon">⚙️</span>
              Settings
            </button>
            <button
              className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <span className="nav-icon">🔒</span>
              Privacy
            </button>
            <button
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <span className="nav-icon">🔔</span>
              Notifications
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="account-main">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="content-header">
                <h1>My Profile</h1>
                <p>Manage your account information</p>
              </div>

              <div className="profile-section">
                {!isEditing ? (
                  <div className="profile-info">
                    <div className="info-group">
                      <label>Full Name</label>
                      <p>{user?.full_name}</p>
                    </div>
                    <div className="info-group">
                      <label>Email Address</label>
                      <p>{user?.email}</p>
                    </div>
                    <div className="info-group">
                      <label>Username</label>
                      <p>{user?.username || 'Not set'}</p>
                    </div>
                    <div className="info-group">
                      <label>Member Since</label>
                      <p>{new Date(user?.loggedInAt).toLocaleDateString()}</p>
                    </div>
                    <button 
                      className="edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️ Edit Profile
                    </button>
                  </div>
                ) : (
                  <div className="profile-edit">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={editData.full_name}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="button-group">
                      <button 
                        className="save-btn"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                      <button 
                        className="cancel-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <div className="content-header">
                <h1>Settings</h1>
                <p>Customize your experience</p>
              </div>

              <div className="settings-section">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Theme</h3>
                    <p>Choose your preferred theme</p>
                  </div>
                  <select className="setting-select">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Language</h3>
                    <p>Select your language</p>
                  </div>
                  <select className="setting-select">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security</p>
                  </div>
                  <button className="enable-btn">Enable</button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="tab-content">
              <div className="content-header">
                <h1>Privacy</h1>
                <p>Control your privacy settings</p>
              </div>

              <div className="privacy-section">
                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3>Show Online Status</h3>
                    <p>Let others see when you're online</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div className="privacy-info">
                    <h3>Allow Messages</h3>
                    <p>Allow everyone to message you</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="tab-content">
              <div className="content-header">
                <h1>Notifications</h1>
                <p>Manage your notification preferences</p>
              </div>

              <div className="notification-section">
                <div className="notif-item">
                  <div className="notif-info">
                    <h3>Messages</h3>
                    <p>Notifications for new messages</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notif-item">
                  <div className="notif-info">
                    <h3>Friend Requests</h3>
                    <p>Notifications for friend requests</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notif-item">
                  <div className="notif-info">
                    <h3>Email Notifications</h3>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account