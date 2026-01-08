# ML-Dev: Mood-Sync (W1 Feature)
This branch contains the core Emotion Inference Engine. Our goal is to transform real-time facial landmarks into a clean, actionable "Mood State" that drives the platform's adaptive UI without compromising user privacy.

# Architecture

    emotion_app/
    │
    ├── backend/
    │   ├── app.py              # FastAPI server
    │   ├── emotion_model.py    # Pretrained model wrapper
    │   ├── requirements.txt
    │
    └── frontend/
        └── index.html          # Simple web UI

