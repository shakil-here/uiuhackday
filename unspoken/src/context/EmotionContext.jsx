import { createContext, useContext, useState } from 'react'

const EmotionContext = createContext()

export const useEmotion = () => {
  const context = useContext(EmotionContext)
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider')
  }
  return context
}

export const EmotionProvider = ({ children }) => {
  const [emotion, setEmotion] = useState('calm') // Default: calm/neutral

  const emotions = {
    happy: { name: 'Happy / Joy', emoji: '😊', color: 'yellow' },
    sad: { name: 'Sad', emoji: '😢', color: 'blue' },
    angry: { name: 'Angry', emoji: '😠', color: 'red' },
    calm: { name: 'Calm / Neutral', emoji: '😐', color: 'green' },
    fear: { name: 'Fear / Confusion', emoji: '😨', color: 'purple' },
  }

  const changeEmotion = (newEmotion) => {
    if (emotions[newEmotion]) {
      setEmotion(newEmotion)
    }
  }

  return (
    <EmotionContext.Provider value={{ emotion, emotions, changeEmotion }}>
      {children}
    </EmotionContext.Provider>
  )
}
