import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EmotionProvider } from './context/EmotionContext'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <EmotionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </EmotionProvider>
  )
}

export default App
