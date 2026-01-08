from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from emotion_model import predict_emotion

app = FastAPI(title="Facial Emotion Recognition API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict-emotion")
async def predict(file: UploadFile = File(...)):
    # 1. Validate Image Type
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image type. Use JPG or PNG.")

    try:
        # 2. Process Image
        # Reading file once to avoid EOF issues
        file_data = await file.read()
        result = predict_emotion(io.BytesIO(file_data))
        return result
    except Exception as e:
        # 3. Handle cases where no face is detected
        raise HTTPException(status_code=422, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}