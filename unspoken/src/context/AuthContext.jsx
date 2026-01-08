import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = checking

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser')
      setIsAuthenticated(!!currentUser)
    }

    // Check on mount
    checkAuth()

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser' || e.key === null) {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Custom event for same-tab updates
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData))
    setIsAuthenticated(true)
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('authChange'))
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    window.dispatchEvent(new Event('authChange'))
  }

  const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
