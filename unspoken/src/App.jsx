import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { EmotionProvider } from './context/EmotionContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Messaging from './pages/Messaging'
import './App.css'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/messaging" replace /> : <Home />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/messaging" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/messaging" replace /> : <Register />} 
      />
      <Route 
        path="/messaging" 
        element={isAuthenticated ? <Messaging /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <EmotionProvider>
        <Router>
          <AppRoutes />
        </Router>
      </EmotionProvider>
    </AuthProvider>
  )
}

export default App
