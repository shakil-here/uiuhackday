from transformers import pipeline

# Load the pipeline globally so it stays in memory
classifier = pipeline(
    task="text-classification",
    model="SamLowe/roberta-base-go_emotions",
    top_k=None
)


def analyze_text_emotion(text: str):
    outputs = classifier([text])
    # The model returns a list of lists. We grab the first sentence's results.
    emotions = outputs[0]

    # Sort by score descending and take the top one
    dominant = max(emotions, key=lambda x: x['score'])

    return {
        "dominant_emotion": dominant['label'],
        "confidence": round(dominant['score'], 3),
        "all_scores": {item['label']: round(item['score'], 3) for item in emotions[:5]}  # Top 5
    }