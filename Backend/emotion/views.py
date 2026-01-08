# emotion/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services.external_emotion_api import ExternalEmotionAPI
from .services.emotion_normalizer import normalize_emotion
from .services.emotion_mapper import get_ui

class EmotionDetectAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        facial_payload = request.data

        external_api = ExternalEmotionAPI()
        result = external_api.detect_emotion(facial_payload)

        raw_emotion = result["emotion"]
        confidence = result["confidence"]

        emotion = normalize_emotion(raw_emotion)
        ui = get_ui(emotion)

        return Response({
            "emotion": emotion,
            "confidence": confidence,
            "ui": ui
        })
