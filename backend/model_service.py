"""Mental Health Prediction Service for saathi-wellbeing (A LITTLE SPACE FOR YOU).

Loads trained scikit-learn models and encoders, preprocesses incoming survey
data with automated calibration for Indian universities and 0-10 CGPA criteria,
and delivers empathetic, actionable screening reports.
"""

import os
import sys
import logging
from typing import Dict, Any, Tuple, List
import joblib
import pandas as pd
import numpy as np

logger = logging.getLogger("saathi_wellbeing.service")
logging.basicConfig(level=logging.INFO)

DISCLAIMER_TEXT = (
    "CLINICAL DISCLAIMER: saathi-wellbeing (A LITTLE SPACE FOR YOU) is an educational "
    "and self-assessment screening tool powered by statistical machine learning models. "
    "It is NOT a substitute for professional clinical diagnosis, medical evaluation, psychiatric "
    "consultation, or treatment. If you are experiencing severe emotional distress or thoughts "
    "of self-harm, please reach out immediately to 24/7 National Mental Health Helplines in India: "
    "Tele-MANAS (Toll-Free: 14416 / 1800-891-4416), KIRAN Helpline (1800-599-0019), "
    "Vandrevala Foundation (9999 666 555), or National Emergency Helpline (112)."
)

# Indian Academic Institutional Archetype Mapping
UNIVERSITY_MAP = {
    "Devi Ahilya Vishwavidyalaya (DAVV, Indore)": "Dhaka University (DU)",
    "Indian Institute of Technology (IIT)": "Bangladesh University of Engineering and Technology (BUET)",
    "National Institute of Technology (NIT)": "Rajshahi University of Engineering and Technology (RUET)",
    "University of Delhi (DU)": "Dhaka University (DU)",
    "Banaras Hindu University (BHU)": "Dhaka University (DU)",
    "Jawaharlal Nehru University (JNU)": "Dhaka University (DU)",
    "BITS Pilani": "BRAC University",
    "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV, Bhopal)": "Dhaka University of Engineering and Technology (DUET)",
    "Savitribai Phule Pune University (SPPU)": "Dhaka University (DU)",
    "University of Mumbai (MU)": "Dhaka University (DU)",
    "Anna University, Chennai": "Bangladesh University of Engineering and Technology (BUET)",
    "Vellore Institute of Technology (VIT)": "North South University (NSU)",
    "Manipal Academy of Higher Education (MAHE)": "Independent University, Bangladesh (IUB)",
    "University of Calcutta": "Dhaka University (DU)",
    "Other Indian University / Autonomous Institute": "United International University (UIU)",
}

# Indian 10-point CGPA to Training 4-point CGPA Bracket Mapping
CGPA_MAP = {
    "9.00 - 10.00 (Outstanding / Distinction)": "3.80 - 4.00",
    "8.00 - 8.99 (First Class with Distinction)": "3.40 - 3.79",
    "7.00 - 7.99 (First Class)": "3.00 - 3.39",
    "6.00 - 6.99 (Second Class)": "2.50 - 2.99",
    "Below 6.00 (Pass Class / Needs Improvement)": "Below 2.50",
    "Other": "Other",
}

# Indian Department Mapping
DEPARTMENT_MAP = {
    "Engineering - CS / CSE / IT / Data Science": "Engineering - CS / CSE / CSC / Similar to CS",
    "Engineering - Civil Engineering": "Engineering - Civil Engineering / Similar to CE",
    "Engineering - EEE / ECE / Electronics": "Engineering - EEE/ ECE / Similar to EEE",
    "Engineering - Mechanical / Automobile": "Engineering - Mechanical Engineering / Similar to ME",
    "Engineering - Other": "Engineering - Other",
    "Business and Management Studies (BBA/MBA)": "Business and Entrepreneurship Studies",
    "Biological Sciences / Biotechnology": "Biological Sciences",
    "Environmental and Life Sciences": "Environmental and Life Sciences",
    "Law and Legal Studies": "Law and Human Rights",
    "Liberal Arts, Humanities and Social Sciences": "Liberal Arts and Social Sciences",
    "Pharmacy and Public Health": "Pharmacy and Public Health",
    "Other": "Other",
}

# Indian Academic Year Mapping
ACADEMIC_YEAR_MAP = {
    "First Year (Semester 1 - 2)": "First Year or Equivalent",
    "Second Year (Semester 3 - 4)": "Second Year or Equivalent",
    "Third Year (Semester 5 - 6)": "Third Year or Equivalent",
    "Fourth Year (Semester 7 - 8)": "Fourth Year or Equivalent",
    "Postgraduate / Other": "Other",
}


class ModelService:
    def __init__(self, models_dir: str = None):
        self.models_dir = models_dir or self._discover_models_dir()
        self.encoders: Dict[str, Any] = {}
        self.anxiety_data: Dict[str, Any] = {}
        self.depression_data: Dict[str, Any] = {}
        self.stress_data: Dict[str, Any] = {}
        self.is_loaded: bool = False

    def _discover_models_dir(self) -> str:
        """Find the directory containing the joblib files."""
        candidates = [
            os.getenv("MODELS_DIR"),
            os.path.join(os.getcwd(), "joblib"),
            os.path.join(os.path.dirname(__file__), "..", "joblib"),
            os.path.join(os.getcwd(), "models"),
            os.path.join(os.path.dirname(__file__), "..", "models"),
            os.getcwd(),
            os.path.dirname(__file__),
        ]
        for path in candidates:
            if path and os.path.isdir(path):
                target_file = os.path.join(path, "categorical_encoders.joblib")
                if os.path.exists(target_file):
                    logger.info("Discovered model artifacts at: %s", path)
                    return os.path.abspath(path)
        return os.path.abspath(os.getcwd())

    def load_artifacts(self):
        """Loads all four joblib files."""
        encoder_path = os.path.join(self.models_dir, "categorical_encoders.joblib")
        anxiety_path = os.path.join(self.models_dir, "best_anxiety_model.joblib")
        depression_path = os.path.join(self.models_dir, "best_depression_model.joblib")
        stress_path = os.path.join(self.models_dir, "best_stress_model.joblib")

        missing = [
            p for p in [encoder_path, anxiety_path, depression_path, stress_path]
            if not os.path.exists(p)
        ]
        if missing:
            raise FileNotFoundError(f"Missing required model files in {self.models_dir}: {missing}")

        logger.info("Loading categorical encoders from %s...", encoder_path)
        self.encoders = joblib.load(encoder_path)

        logger.info("Loading anxiety model from %s...", anxiety_path)
        self.anxiety_data = joblib.load(anxiety_path)

        logger.info("Loading depression model from %s...", depression_path)
        self.depression_data = joblib.load(depression_path)

        logger.info("Loading stress model from %s...", stress_path)
        self.stress_data = joblib.load(stress_path)

        self.is_loaded = True
        logger.info("All 4 model artifacts successfully loaded and ready for inference.")

    def _encode_value(self, encoder: Any, value: str, fallback_value: str = "Other") -> int:
        """Safely encode a categorical value using a LabelEncoder."""
        cleaned_val = str(value).strip()
        classes = list(encoder.classes_)
        if cleaned_val in classes:
            return int(encoder.transform([cleaned_val])[0])

        for c in classes:
            if c.lower() == cleaned_val.lower():
                return int(encoder.transform([c])[0])

        if fallback_value in classes:
            return int(encoder.transform([fallback_value])[0])

        return 0

    def preprocess_demographics(self, demo_dict: Dict[str, Any]) -> Dict[str, int]:
        """Encodes raw demographic fields, mapping Indian academic profiles to model features."""
        # Map Indian University to trained feature category
        raw_uni = str(demo_dict.get("University", "")).strip()
        mapped_uni = UNIVERSITY_MAP.get(raw_uni, raw_uni)

        # Map Indian 10-point CGPA to trained 4-point CGPA category
        raw_cgpa = str(demo_dict.get("Current_CGPA", "")).strip()
        mapped_cgpa = CGPA_MAP.get(raw_cgpa, raw_cgpa)

        # Map Department
        raw_dept = str(demo_dict.get("Department", "")).strip()
        mapped_dept = DEPARTMENT_MAP.get(raw_dept, raw_dept)

        # Map Academic Year
        raw_yr = str(demo_dict.get("Academic_Year", "")).strip()
        mapped_yr = ACADEMIC_YEAR_MAP.get(raw_yr, raw_yr)

        feature_values = {
            "Age": demo_dict.get("Age", "18-22"),
            "Gender": demo_dict.get("Gender", "Prefer not to say"),
            "University": mapped_uni,
            "Department": mapped_dept,
            "Academic_Year": mapped_yr,
            "Current_CGPA": mapped_cgpa,
            "waiver_or_scholarship": demo_dict.get("waiver_or_scholarship", "No"),
        }

        encoded = {}
        for feature_name, encoder in self.encoders.items():
            val = feature_values.get(feature_name, "")
            fallback = "Other" if "Other" in encoder.classes_ else encoder.classes_[0]
            encoded[feature_name] = self._encode_value(encoder, str(val), fallback_value=fallback)
        return encoded

    def _severity_meta(self, label: str) -> Tuple[str, str]:
        """Return severity level and corresponding modern UI hex color code."""
        label_lower = label.lower()
        if "severe" in label_lower or "high" in label_lower:
            return "severe", "#ef4444"  # Red
        elif "moderate" in label_lower:
            return "moderate", "#f97316"  # Orange
        elif "mild" in label_lower:
            return "mild", "#eab308"  # Amber
        else:
            return "minimal", "#10b981"  # Emerald

    def _get_coping_strategies(self, condition: str, severity: str) -> List[str]:
        strategies = {
            "anxiety": {
                "minimal": [
                    "Maintain regular daily sleep and healthy physical exercise.",
                    "Practice 5-minute Pranayama or box breathing during exam intervals.",
                ],
                "mild": [
                    "Incorporate progressive muscle relaxation (PMR) into daily routine.",
                    "Limit late-night chai/coffee and high caffeine consumption during revisions.",
                    "Break academic semester projects into small, achievable weekly goals.",
                ],
                "moderate": [
                    "Practice sensory grounding (5-4-3-2-1 technique) when feeling overwhelmed.",
                    "Reach out to college mentors or campus student wellness cells.",
                    "Engage in structured journal writing to manage academic exam anxiety.",
                ],
                "severe": [
                    "Seek consultation with a clinical psychologist or campus counselor.",
                    "Call the Tele-MANAS toll-free helpline (14416) for immediate mental health guidance.",
                    "Discuss deadline flexibilities with your department professors or HOD.",
                ],
            },
            "depression": {
                "minimal": [
                    "Engage in hobbies, campus clubs, and creative extracurriculars.",
                    "Maintain close bonds with trusted college peers and family.",
                ],
                "mild": [
                    "Take regular 20-minute morning walks in natural sunlight.",
                    "Maintain consistent morning and meal routines.",
                    "Acknowledge small daily accomplishments without harsh self-criticism.",
                ],
                "moderate": [
                    "Connect with a university student welfare counselor or campus health center.",
                    "Engage in behavioral activation: schedule one pleasant activity daily.",
                    "Confide in close friends or mentors; avoid staying isolated in hostel rooms.",
                ],
                "severe": [
                    "Seek immediate consultation with a certified psychiatrist or mental health professional.",
                    "Contact the national mental health helpline Tele-MANAS (14416) or KIRAN (1800-599-0019).",
                    "Keep family or trusted local guardians informed during high-distress episodes.",
                ],
            },
            "stress": {
                "minimal": [
                    "Continue balanced study schedules, recreational breaks, and proper hydration.",
                    "Dedicate weekend time to family, sports, or creative relaxation.",
                ],
                "mild": [
                    "Apply time-blocking and the Pomodoro method (25 min study, 5 min break).",
                    "Maintain clear boundaries between academic study hours and personal time.",
                ],
                "moderate": [
                    "Review semester workload to defer non-critical extracurricular obligations.",
                    "Practice daily Yoga Nidra or guided meditation to relieve physical body tension.",
                    "Speak with academic advisors about exam preparation strategies.",
                ],
                "severe": [
                    "Seek academic counseling and stress-management guidance from university cells.",
                    "Adjust course priorities and prioritize 7-8 hours of restorative nightly sleep.",
                    "Reach out to Tele-MANAS (14416) for confidential, free stress counseling.",
                ],
            },
        }
        return strategies.get(condition, {}).get(severity, [
            "Maintain regular sleep, balanced diet, and active lifestyle.",
            "Connect with support services when needed.",
        ])

    def predict(self, raw_input: Dict[str, Any]) -> Dict[str, Any]:
        """Runs the entire prediction pipeline across all three mental health dimensions."""
        if not self.is_loaded:
            self.load_artifacts()

        demo_keys = ["Age", "Gender", "University", "Department", "Academic_Year", "Current_CGPA", "waiver_or_scholarship"]
        demo_dict = {k: raw_input[k] for k in demo_keys}
        encoded_demo = self.preprocess_demographics(demo_dict)

        # 1. ANXIETY PREDICTION
        anx_features = self.anxiety_data["features"]
        anx_row = {**encoded_demo}
        for i in range(1, 8):
            anx_row[f"GAD{i}"] = int(raw_input[f"GAD{i}"])
        df_anx = pd.DataFrame([anx_row])[anx_features]

        pred_anx_idx = self.anxiety_data["model"].predict(df_anx)[0]
        pred_anx_label = self.anxiety_data["target_encoder"].inverse_transform([pred_anx_idx])[0]
        proba_anx_arr = self.anxiety_data["model"].predict_proba(df_anx)[0]
        classes_anx = list(self.anxiety_data["target_encoder"].classes_)
        proba_anx = {classes_anx[i]: round(float(proba_anx_arr[i]), 4) for i in range(len(classes_anx))}
        conf_anx = round(float(proba_anx_arr[pred_anx_idx]), 4)

        gad_score = sum(int(raw_input[f"GAD{i}"]) for i in range(1, 8))
        gad_interp = (
            "Minimal Anxiety (0-4)" if gad_score <= 4 else
            "Mild Anxiety (5-9)" if gad_score <= 9 else
            "Moderate Anxiety (10-14)" if gad_score <= 14 else
            "Severe Anxiety (15-21)"
        )
        sev_anx, col_anx = self._severity_meta(pred_anx_label)

        # 2. DEPRESSION PREDICTION
        dep_features = self.depression_data["features"]
        dep_row = {**encoded_demo}
        for i in range(1, 10):
            dep_row[f"PHQ{i}"] = int(raw_input[f"PHQ{i}"])
        df_dep = pd.DataFrame([dep_row])[dep_features]

        pred_dep_idx = self.depression_data["model"].predict(df_dep)[0]
        pred_dep_label = self.depression_data["target_encoder"].inverse_transform([pred_dep_idx])[0]
        proba_dep_arr = self.depression_data["model"].predict_proba(df_dep)[0]
        classes_dep = list(self.depression_data["target_encoder"].classes_)
        proba_dep = {classes_dep[i]: round(float(proba_dep_arr[i]), 4) for i in range(len(classes_dep))}
        conf_dep = round(float(proba_dep_arr[pred_dep_idx]), 4)

        phq_score = sum(int(raw_input[f"PHQ{i}"]) for i in range(1, 10))
        phq_interp = (
            "Minimal / No Depression (0-4)" if phq_score <= 4 else
            "Mild Depression (5-9)" if phq_score <= 9 else
            "Moderate Depression (10-14)" if phq_score <= 14 else
            "Moderately Severe Depression (15-19)" if phq_score <= 19 else
            "Severe Depression (20-27)"
        )
        sev_dep, col_dep = self._severity_meta(pred_dep_label)

        # 3. STRESS PREDICTION
        str_features = self.stress_data["features"]
        str_row = {**encoded_demo}
        for i in range(1, 11):
            str_row[f"PSS{i}"] = int(raw_input[f"PSS{i}"])
        df_str = pd.DataFrame([str_row])[str_features]

        pred_str_idx = self.stress_data["model"].predict(df_str)[0]
        pred_str_label = self.stress_data["target_encoder"].inverse_transform([pred_str_idx])[0]
        proba_str_arr = self.stress_data["model"].predict_proba(df_str)[0]
        classes_str = list(self.stress_data["target_encoder"].classes_)
        proba_str = {classes_str[i]: round(float(proba_str_arr[i]), 4) for i in range(len(classes_str))}
        conf_str = round(float(proba_str_arr[pred_str_idx]), 4)

        pss_score = sum(int(raw_input[f"PSS{i}"]) for i in range(1, 11))
        pss_interp = (
            "Low Perceived Stress (0-13)" if pss_score <= 13 else
            "Moderate Perceived Stress (14-26)" if pss_score <= 26 else
            "High Perceived Stress (27-40)"
        )
        sev_str, col_str = self._severity_meta(pred_str_label)

        # OVERALL RISK EVALUATION & CRISIS WARNING
        phq9_item = int(raw_input.get("PHQ9", 0))
        crisis_flag = phq9_item > 0 or sev_dep == "severe" or sev_anx == "severe"
        crisis_msg = None
        if phq9_item > 0:
            crisis_msg = (
                "You indicated experiencing thoughts of self-harm. Please know that you are not alone, "
                "and support is available 24/7 across India. Please contact the Government of India Tele-MANAS "
                "helpline (14416 / 1800-891-4416), KIRAN (1800-599-0019), or your university student wellness cell immediately."
            )

        severities = [sev_anx, sev_dep, sev_str]
        if "severe" in severities or crisis_flag:
            overall_risk = "Elevated Mental Health Risk"
            risk_level = "high" if not crisis_flag else "critical"
        elif "moderate" in severities:
            overall_risk = "Moderate Mental Health Risk"
            risk_level = "moderate"
        elif "mild" in severities:
            overall_risk = "Mild Mental Health Risk"
            risk_level = "mild"
        else:
            overall_risk = "Low / Well-Balanced Risk"
            risk_level = "low"

        primary_concerns = []
        if sev_dep in ["moderate", "severe"]:
            primary_concerns.append(f"Depression: {pred_dep_label}")
        if sev_anx in ["moderate", "severe"]:
            primary_concerns.append(f"Anxiety: {pred_anx_label}")
        if sev_str in ["moderate", "severe"]:
            primary_concerns.append(f"Stress: {pred_str_label}")
        if not primary_concerns:
            primary_concerns.append("Current indicators show minimal acute psychological distress.")

        immediate_actions = []
        if crisis_flag:
            immediate_actions.append("Call Tele-MANAS toll-free at 14416 or 1800-891-4416 (24/7 in multiple Indian languages).")
            immediate_actions.append("Contact the KIRAN Mental Health Helpline at 1800-599-0019.")
            immediate_actions.append("Visit your university student counseling center (e.g. DAVV Student Welfare Cell).")
        else:
            immediate_actions.append("Review personalized coping strategies below for balanced academic wellness.")
            immediate_actions.append("Track your perceived stress across semester exam and assignment periods.")

        return {
            "status": "success",
            "application_name": "saathi-wellbeing",
            "tagline": "A LITTLE SPACE FOR YOU",
            "demographics": {k: str(raw_input[k]) for k in demo_keys},
            "anxiety": {
                "condition": "Anxiety (GAD-7)",
                "predicted_label": pred_anx_label,
                "confidence": conf_anx,
                "probabilities": proba_anx,
                "severity_level": sev_anx,
                "color_code": col_anx,
                "clinical_score": gad_score,
                "max_clinical_score": 21,
                "clinical_interpretation": gad_interp,
                "coping_strategies": self._get_coping_strategies("anxiety", sev_anx),
            },
            "depression": {
                "condition": "Depression (PHQ-9)",
                "predicted_label": pred_dep_label,
                "confidence": conf_dep,
                "probabilities": proba_dep,
                "severity_level": sev_dep,
                "color_code": col_dep,
                "clinical_score": phq_score,
                "max_clinical_score": 27,
                "clinical_interpretation": phq_interp,
                "coping_strategies": self._get_coping_strategies("depression", sev_dep),
            },
            "stress": {
                "condition": "Stress (PSS-10)",
                "predicted_label": pred_str_label,
                "confidence": conf_str,
                "probabilities": proba_str,
                "severity_level": sev_str,
                "color_code": col_str,
                "clinical_score": pss_score,
                "max_clinical_score": 40,
                "clinical_interpretation": pss_interp,
                "coping_strategies": self._get_coping_strategies("stress", sev_str),
            },
            "overall_summary": {
                "overall_risk": overall_risk,
                "risk_level": risk_level,
                "primary_concerns": primary_concerns,
                "immediate_actions": immediate_actions,
                "crisis_flag": crisis_flag,
                "crisis_message": crisis_msg,
            },
            "clinical_disclaimer": DISCLAIMER_TEXT,
        }


# Global singleton instance
service = ModelService()
