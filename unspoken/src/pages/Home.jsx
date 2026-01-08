import { Link, useNavigate } from 'react-router-dom'
import { useEmotion } from '../context/EmotionContext'
import { useAuth } from '../context/AuthContext'
import './Home.css'

function Home() {
  const { emotion } = useEmotion()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleStartChat = () => {
    if (isAuthenticated) {
      navigate('/messaging')
    } else {
      navigate('/login')
    }
  }

  const getMouthPath = () => {
    switch (emotion) {
      case 'happy':
        return "M 75 130 Q 100 150 125 130" // Smile
      case 'sad':
        return "M 75 135 Q 100 120 125 135" // Frown
      case 'angry':
        return "M 75 140 Q 100 125 125 140" // Angry frown
      case 'fear':
        return "M 85 135 Q 100 145 115 135" // Small worried mouth
      default: // calm
        return "M 80 135 L 120 135" // Neutral line
    }
  }

  return (
    <div className={`home ${emotion}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="facial-visualization">
            <svg viewBox="0 0 200 200" className="face-svg">
              {/* Face outline */}
              <ellipse cx="100" cy="100" rx="70" ry="85" className="face-outline" />
              
              {/* Left eye */}
              <ellipse cx="80" cy="85" rx="8" ry="12" className="eye" />
              <circle cx="80" cy="85" r="4" className="pupil" />
              
              {/* Right eye */}
              <ellipse cx="120" cy="85" rx="8" ry="12" className="eye" />
              <circle cx="120" cy="85" r="4" className="pupil" />
              
              {/* Nose */}
              <path d="M 100 95 L 95 110 L 105 110 Z" className="nose" />
              
              {/* Mouth - changes based on emotion */}
              <path 
                d={getMouthPath()}
                className="mouth"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Facial landmarks */}
              <circle cx="70" cy="75" r="2" className="landmark" />
              <circle cx="130" cy="75" r="2" className="landmark" />
              <circle cx="85" cy="100" r="2" className="landmark" />
              <circle cx="115" cy="100" r="2" className="landmark" />
              <circle cx="100" cy="120" r="2" className="landmark" />
            </svg>
          </div>
          
          <div className="hero-text">
            <h1 className="hero-title">
              Emotion-Aware Communication
            </h1>
            <p className="hero-tagline">
              Privacy-first messaging that understands human emotion, 
              facial expression, and the power of silence.
            </p>
            
            <div className="cta-buttons">
              <button onClick={handleStartChat} className="cta-primary">Start Chat</button>
              <button className="cta-secondary">Experience Emotion-Aware UI</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <h3 className="feature-title">Facial Emotion Detection</h3>
          <p className="feature-description">
            Advanced AI analyzes facial expressions in real-time, 
            understanding subtle emotional cues to enhance communication 
            without words.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5c-1.1 0-2-.9-2-2v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1c0 1.1-.9 2-2 2h-1v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
            </svg>
          </div>
          <h3 className="feature-title">Silent Communication</h3>
          <p className="feature-description">
            Express yourself through emotion and expression. 
            Sometimes the most powerful messages are the ones left unspoken.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 className="feature-title">End-to-End Encrypted Messaging</h3>
          <p className="feature-description">
            Your emotions, your data, your privacy. 
            Military-grade encryption ensures your communications 
            remain truly private and secure.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
