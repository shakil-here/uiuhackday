# emotion/services/emotion_normalizer.py

SUPPORTED_EMOTIONS = {
    "happy": "happy",
    "sad": "sad",
    "angry": "angry",
    "neutral": "calm",
    "fear": "fear"
}

def normalize_emotion(emotion: str) -> str:
    return SUPPORTED_EMOTIONS.get(emotion.lower(), "calm")
