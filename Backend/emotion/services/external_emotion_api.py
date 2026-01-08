# emotion/services/external_emotion_api.py
import requests

class ExternalEmotionAPI:
    BASE_URL = "https://external-emotion-api.com/detect"

    def detect_emotion(self, payload: dict) -> dict:
        response = requests.post(self.BASE_URL, json=payload, timeout=5)
        response.raise_for_status()
        return response.json()
