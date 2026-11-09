"""FastAPI Server for Student Mental Health Risk Prediction System.

Loads machine learning classification models on startup and serves prediction,
batch inference, metadata, and frontend dashboard endpoints.
"""

import os
import time
from typing import List, Dict, Any
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from backend.schemas import MentalHealthRequest, MentalHealthResponse
from backend.model_service import service, DISCLAIMER_TEXT
from backend.questions import (
    PSS_QUESTIONS,
    PSS_OPTIONS,
    GAD_QUESTIONS,
    GAD_OPTIONS,
    PHQ_QUESTIONS,
    PHQ_OPTIONS,
    DEMOGRAPHIC_CHOICES,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle."""
    try:
        service.load_artifacts()
    except Exception as e:
        print(f"[ERROR] Failed to load model artifacts on startup: {e}")
    yield


app = FastAPI(
    title="MindPulse • Student Mental Health Risk Prediction API",
    description=(
        "Production-ready multi-condition screening system for student Depression (PHQ-9), "
        "Anxiety (GAD-7), and Stress (PSS-10) using calibrated Machine Learning models."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# Process timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = (time.perf_counter() - start_time) * 1000.0
    response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
    return response

# Configure CORS Middleware for Frontend Access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins including localhost:5173, localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
@app.get("/api/health", tags=["Health"])
async def health_check():
    """Returns server and ML model loading health status."""
    return {
        "status": "healthy" if service.is_loaded else "degraded",
        "models_loaded": service.is_loaded,
        "models_directory": service.models_dir,
        "models": {
            "anxiety": bool(service.anxiety_data),
            "depression": bool(service.depression_data),
            "stress": bool(service.stress_data),
            "encoders": bool(service.encoders),
        },
    }


@app.get("/meta", tags=["Metadata"])
@app.get("/api/meta", tags=["Metadata"])
async def get_metadata():
    """Returns survey schema, questions, options, and categorical choices for frontend forms."""
    return {
        "demographics": DEMOGRAPHIC_CHOICES,
        "scales": {
            "pss": {
                "name": "Perceived Stress Scale (PSS-10)",
                "range": [0, 4],
                "options": PSS_OPTIONS,
                "questions": PSS_QUESTIONS,
            },
            "gad": {
                "name": "Generalized Anxiety Disorder (GAD-7)",
                "range": [0, 3],
                "options": GAD_OPTIONS,
                "questions": GAD_QUESTIONS,
            },
            "phq": {
                "name": "Patient Health Questionnaire (PHQ-9)",
                "range": [0, 3],
                "options": PHQ_OPTIONS,
                "questions": PHQ_QUESTIONS,
            },
        },
        "disclaimer": DISCLAIMER_TEXT,
    }


@app.post("/predict", response_model=MentalHealthResponse, tags=["Prediction"])
@app.post("/api/predict", response_model=MentalHealthResponse, tags=["Prediction"])
async def predict_mental_health(payload: MentalHealthRequest):
    """Predicts student risk levels for Depression, Anxiety, and Stress.

    Accepts demographic inputs and responses to PSS-10, GAD-7, and PHQ-9 questionnaires.
    Returns categorical predictions, probability scores, clinical interpretations, and recommendations.
    """
    try:
        data_dict = payload.model_dump()
        result = service.predict(data_dict)
        return result
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Inference error processing mental health assessment: {str(exc)}",
        )


@app.post("/predict/batch", tags=["Prediction"])
@app.post("/api/predict/batch", tags=["Prediction"])
async def predict_batch(records: List[MentalHealthRequest]):
    """Batch prediction endpoint for institutional screening.

    Processes a list of student survey submissions and computes aggregate cohort metrics.
    """
    if not records:
        raise HTTPException(status_code=400, detail="Batch request payload list cannot be empty.")

    results: List[Dict[str, Any]] = []
    risk_counts = {"low": 0, "mild": 0, "moderate": 0, "high": 0, "critical": 0}
    crisis_count = 0

    for rec in records:
        res = service.predict(rec.model_dump())
        results.append(res)
        lvl = res["overall_summary"]["risk_level"]
        risk_counts[lvl] = risk_counts.get(lvl, 0) + 1
        if res["overall_summary"]["crisis_flag"]:
            crisis_count += 1

    total = len(records)
    elevated_pct = round(((risk_counts.get("high", 0) + risk_counts.get("critical", 0)) / total) * 100, 1)

    return {
        "status": "success",
        "cohort_size": total,
        "cohort_summary": {
            "risk_distribution": risk_counts,
            "crisis_flag_count": crisis_count,
            "elevated_risk_percentage": elevated_pct,
        },
        "individual_results": results,
    }


# Serve Static Frontend Files if available
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

    @app.get("/", include_in_schema=False)
    async def serve_index():
        index_file = os.path.join(static_dir, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return JSONResponse({"message": "Mental Health Predictor API is running. Access /docs for API documentation."})
