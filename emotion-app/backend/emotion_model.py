from deepface import DeepFace
import cv2
import numpy as np
from PIL import Image


def predict_emotion(image_bytes):
    # Load image
    image = Image.open(image_bytes).convert("RGB")
    img = np.array(image)

    # DeepFace handles detection, alignment, and classification
    result = DeepFace.analyze(
        img,
        actions=["emotion"],
        enforce_detection=True
    )

    if isinstance(result, list):
        result = result[0]

    emotion = result["dominant_emotion"]

    # FIX: Cast the numpy.float32 to a native Python float
    # result["emotion"][emotion] is a numpy type; float() converts it
    confidence = float(result["emotion"][emotion]) / 100.0

    return {
        "emotion": str(emotion),  # Ensure string
        "confidence": round(confidence, 3)  # round returns native float
    }