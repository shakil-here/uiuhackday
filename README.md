# ML-Dev: Mood-Sync (W1 Feature)
This branch contains the core Emotion Inference Engine. Our goal is to transform real-time facial landmarks into a clean, actionable "Mood State" that drives the platform's adaptive UI without compromising user privacy.

# Facial & Text Emotion Recognition API

A multi-modal FastAPI application that detects emotions from both uploaded images (using DeepFace) and text snippets (using RoBERTa).

## 🚀 Features
- **Vision API**: Detects facial expressions from JPG/PNG images.
- **Text API**: Analyzes sentiment/emotions from text strings.
- **CORS Enabled**: Ready to be consumed by frontend applications.
- **Dockerized**: Easy deployment with all dependencies bundled.

## 🛠️ Installation & Setup

### Using Docker (Recommended)
1. **Build the image:**
   ```bash
   docker build -t emotion-app .
   ```
   
# Architecture

    emotion_app/
    ├── backend/
    │   ├── __init__.py
    │   ├── app.py
    │   ├── emotion_model.py
    │   └── text_model.py
    ├── frontend/
    │   └── index.html
    ├── Dockerfile
    ├── requirements.txt
    └── README.md

