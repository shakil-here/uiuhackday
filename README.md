# ML-Dev: Mood-Sync (W1 Feature)
This branch contains the core Emotion Inference Engine. Our goal is to transform real-time facial landmarks into a clean, actionable "Mood State" that drives the platform's adaptive UI without compromising user privacy.

# Architecture

    emotion_app/
    │
    ├── backend/
    │   ├── __init__.py
    │   ├── app.py              # FastAPI server
    │   ├── emotion_model.py    # Pretrained model wrapper
    │   ├── text_model.py
    │
    └── frontend/
    │   └── index.html          # Simple web UI
    └── requirements.txt
    └── README.md

