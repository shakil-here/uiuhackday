from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from pydantic import BaseModel
from emotion_model import predict_emotion
from text_model import analyze_text_emotion

app = FastAPI(title="Facial Emotion Recognition API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define a schema for text input
class TextRequest(BaseModel):
    text: str

@app.post("/predict-emotion/vision")
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


@app.post("/predict-emotion/text")
async def predict_text(request: TextRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    try:
        result = analyze_text_emotion(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}