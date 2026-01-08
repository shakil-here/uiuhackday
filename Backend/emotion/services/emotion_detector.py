class EmotionDetectionService:
    """
    This service receives processed facial data
    and returns emotion + confidence
    """

    def detect(self, facial_payload: dict) -> dict:
        # Placeholder for ML / external service
        # Example response from ML model
        return {
            "emotion": "happy",
            "confidence": 0.92
        }
