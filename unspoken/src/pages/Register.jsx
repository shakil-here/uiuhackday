import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosPublic from '../hook/axiosPublic'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
    password_confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      if (!formData.username || !formData.full_name || !formData.email || !formData.password || !formData.password_confirm) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (formData.password !== formData.password_confirm) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const payload = {
        username: formData.username,
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.password_confirm
      }

      const response = await axiosPublic.post('/users/register/', payload)

      if (response.data.id) {
        const loginResponse = await axiosPublic.post('/users/login/', {
          email: formData.email,
          password: formData.password
        })

        if (loginResponse.data.access && loginResponse.data.refresh) {
          localStorage.setItem('accessToken', loginResponse.data.access)
          localStorage.setItem('refreshToken', loginResponse.data.refresh)

          const profileResponse = await axiosPublic.get('/users/me/', {
            headers: {
              Authorization: `Bearer ${loginResponse.data.access}`
            }
          })

          const sessionData = {
            id: profileResponse.data.id,
            username: profileResponse.data.username,
            full_name: profileResponse.data.full_name,
            email: profileResponse.data.email,
            loggedInAt: new Date().toISOString()
          }

          login(sessionData)
          console.log('Backend registration successful:', sessionData)
          navigate('/account', { replace: true })
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.username?.[0] ||
        err.response?.data?.full_name?.[0] ||
        'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join Unspoken today</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirm">Confirm Password</label>
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
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

export default Register