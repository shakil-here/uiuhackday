import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import io
from PIL import Image

app = FastAPI(title="Emotion Recognition API")

# Allow CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict-emotion")
async def predict_emotion(file: UploadFile = File(...)):
    # 1. Read the uploaded image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_array = np.array(image)

    # 2. Convert RGB to BGR (DeepFace/OpenCV standard)
    img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)

    try:
        # 3. Analyze emotion using DeepFace
        # actions=['emotion'] only focuses on expressions
        # enforce_detection=False prevents errors if a face isn't perfectly clear
        results = DeepFace.analyze(img_bgr, actions=['emotion'], enforce_detection=False)

        # DeepFace returns a list (for multiple faces)
        main_result = results[0]

        return {
            "success": True,
            "dominant_emotion": main_result["dominant_emotion"],
            "all_emotions": main_result["emotion"],  # Probabilities for all 7 emotions
            "face_location": main_result["region"]  # Bounding box [x, y, w, h]
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)