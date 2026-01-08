import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosPublic from '../hook/axiosPublic'
import './Login.css'

function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message)
      // Clear the message from location state
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }

      // Check localStorage for user credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === formData.email)

      if (!user) {
        setError('No account found with this email. Please sign up first.')
        setLoading(false)
        return
      }

      if (user.password !== formData.password) {
        setError('Incorrect password. Please try again.')
        setLoading(false)
        return
      }

      // Login successful - save current user session
      const sessionData = {
        id: user.id,
        name: user.name,
        email: user.email,
        loggedInAt: new Date().toISOString()
      }
      
      // Use auth context to update authentication state
      login(sessionData)
      
      console.log('Login successful from localStorage:', sessionData)
      
      // Optionally try backend login
      try {
        const payload = {
          email: formData.email,
          password: formData.password
        }
        const response = await axiosPublic.post('/login/', payload)
        console.log('Backend login successful:', response.data)
        // Store backend token if provided
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token)
        }
      } catch (err) {
        // If backend fails, still proceed since we authenticated from localStorage
        console.warn('Backend login failed, but user authenticated locally:', err)
      }
      
      // Redirect to messaging page after successful login
      navigate('/messaging', { replace: true })
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.response?.data?.detail ||
        'Login failed. Please check your credentials.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue to Unspoken</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </p>
          <Link to="/forgot-password" className="link forgot-link">
            Forgot password?
          </Link>
        </div>

        <div className="back-home">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
