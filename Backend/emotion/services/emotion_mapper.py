# emotion/services/emotion_mapper.py

EMOTION_UI_MAP = {
    "happy": {"emoji": "😊", "color": "#FFD93D"},
    "sad": {"emoji": "😢", "color": "#4A90E2"},
    "angry": {"emoji": "😠", "color": "#E74C3C"},
    "calm": {"emoji": "😐", "color": "#2ECC71"},
    "fear": {"emoji": "😨", "color": "#8E44AD"},
}

def get_ui(emotion: str) -> dict:
    return EMOTION_UI_MAP[emotion]
