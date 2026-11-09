# Sathi-Wellbeing- • saathi-wellbeing
### *A LITTLE SPACE FOR YOU*

A production-ready full-stack AI screening system designed for Indian university students, predicting risk levels across **Depression (PHQ-9)**, **Anxiety (GAD-7)**, and **Stress (PSS-10)** using trained Linear SVC machine learning models.

---

## 🇮🇳 Tailored for Indian Academics

1. **Indian Universities & Institutes:**
   - Features **Devi Ahilya Vishwavidyalaya (DAVV, Indore)** prominently, alongside premier central, state, and technological institutes (IITs, NITs, DU, BHU, JNU, BITS Pilani, RGPV Bhopal, SPPU, MU, VIT, MAHE, etc.).
2. **Standard 0 to 10 CGPA Grading Criteria:**
   - Integrates India's 10-point cumulative grade point average (UGC/AICTE format):
     - `9.00 - 10.00` (Outstanding / Distinction)
     - `8.00 - 8.99` (First Class with Distinction)
     - `7.00 - 7.99` (First Class)
     - `6.00 - 6.99` (Second Class)
     - `Below 6.00` (Pass Class / Needs Improvement)
3. **National Indian Mental Health Support & Helplines:**
   - **Tele-MANAS (Govt of India):** `14416` or `1800-891-4416` (24/7 Toll-Free, Multilingual across all Indian States).
   - **KIRAN Mental Health Helpline:** `1800-599-0019` (Ministry of Social Justice & Empowerment).
   - **Vandrevala Foundation:** `9999 666 555` (24/7 Helpline & WhatsApp).
   - **AASRA 24/7:** `+91-9820466726`.
   - **National Emergency Helpline:** `112`.
   - Campus Counseling Support: Devi Ahilya Vishwavidyalaya (DAVV) Student Welfare Center (Indore).

---

## 📂 Directory Structure

```text
HEALTH_PREDICTOR/
│
├── joblib/                                      # Trained joblib artifacts
│   ├── best_anxiety_model.joblib               # Linear SVC (GAD-7 Anxiety)
│   ├── best_depression_model.joblib            # Linear SVC (PHQ-9 Depression)
│   ├── best_stress_model.joblib                # Linear SVC (PSS-10 Stress)
│   └── categorical_encoders.joblib             # LabelEncoders for demographic variables
│
├── backend/                                     # FastAPI backend service
│   ├── __init__.py                             # Backend package descriptor
│   ├── main.py                                 # FastAPI application, CORS, batch & single predict
│   ├── model_service.py                        # Model loader, Indian academic calibration & inference
│   ├── schemas.py                              # Pydantic v2 schemas with 0-10 CGPA normalization
│   ├── questions.py                            # Questionnaire items, scale metadata & Indian choices
│   └── static/                                 # Built-in standalone web dashboard
│       └── index.html                          # Complete React 18 + Tailwind SPA (saathi-wellbeing)
│
├── frontend/                                    # Full-stack React + Vite + Tailwind CSS project
│   ├── package.json                            # Scripts & dependencies
│   ├── vite.config.js                          # Vite dev server with automated backend proxy
│   ├── tailwind.config.js                      # Custom medical & brand theme palette
│   ├── index.html                              # Web app HTML template (saathi-wellbeing)
│   └── src/
│       ├── main.jsx                            # React root mount
│       ├── App.jsx                             # Multi-step stateful assessment controller
│       ├── components/
│       │   ├── Navbar.jsx                      # saathi-wellbeing header with Indian test profiles
│       │   ├── DisclaimerBanner.jsx            # Mandatory clinical screening disclaimer (India)
│       │   ├── StepProgressBar.jsx             # Visual 4-step progress tracker
│       │   ├── DemographicsStep.jsx            # Step 1: DAVV / Indian Universities & 0-10 CGPA
│       │   ├── SurveyQuestionCard.jsx          # Reusable Likert option card
│       │   ├── SurveyStep.jsx                  # Survey container for Steps 2, 3, and 4
│       │   ├── ResultsDashboard.jsx            # Results dashboard, gauges, Indian helplines & PDF export
│       │   ├── RiskCard.jsx                    # Condition risk card with probability bars
│       │   ├── ScoreGauge.jsx                  # 4-stage visual severity gauge
│       │   └── CrisisModal.jsx                 # Critical risk & self-harm crisis support modal
│       └── utils/
│           ├── api.js                          # REST client for backend communication
│           └── surveyData.js                   # Questionnaire datasets, scales & Indian presets
│
├── main.py                                      # Root entrypoint with self-healing dependencies
├── run_app.bat                                  # One-click Windows launcher
├── requirements.txt                             # Python dependencies
├── Dockerfile                                   # Containerization image
├── docker-compose.yml                           # Docker Compose orchestration
└── README.md                                    # Documentation
```

---

## 🚀 How to Run Locally

### Option 1: Double-Click Launcher (Windows)
Simply double-click [`run_app.bat`](file:///c:/Users/dell/Desktop/HEALTH_PREDICTOR/run_app.bat). It will automatically detect Python, start the server, and open `http://127.0.0.1:8000` in your default browser.

### Option 2: Command Line
```powershell
# Run with Python launcher:
py main.py

# Or standard python:
python main.py
```

Open your browser to:
- 🌐 **Web Dashboard:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- 📚 **Interactive Swagger API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- 🩺 **Health Check:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## 📡 Sample API Request (`POST /predict`)

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Age": "18-22",
    "Gender": "Female",
    "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
    "Department": "Engineering - CS / CSE / IT / Data Science",
    "Academic_Year": "Second Year (Semester 3 - 4)",
    "Current_CGPA": "8.00 - 8.99 (First Class with Distinction)",
    "waiver_or_scholarship": "Yes",
    "PSS1": 1, "PSS2": 2, "PSS3": 2, "PSS4": 3, "PSS5": 2, "PSS6": 1, "PSS7": 3, "PSS8": 2, "PSS9": 1, "PSS10": 2,
    "GAD1": 1, "GAD2": 1, "GAD3": 1, "GAD4": 0, "GAD5": 1, "GAD6": 1, "GAD7": 0,
    "PHQ1": 1, "PHQ2": 1, "PHQ3": 1, "PHQ4": 2, "PHQ5": 1, "PHQ6": 0, "PHQ7": 1, "PHQ8": 0, "PHQ9": 0
  }'
```

---

## ⚖️ Clinical Disclaimer

> [!IMPORTANT]
> **saathi-wellbeing (A LITTLE SPACE FOR YOU)** is an educational and academic self-assessment screening instrument. It does not provide medical diagnoses, psychiatric evaluations, or treatment plans. If you or someone you know is in acute distress:
> - **Tele-MANAS (Govt of India):** Call `14416` or `1800-891-4416` (24/7 Toll-Free).
> - **KIRAN Helpline:** Call `1800-599-0019`.
> - **Vandrevala Foundation:** Call / WhatsApp `9999 666 555`.
> - **National Emergency:** Call `112`.
