"""Tests for model loading, encoding, and inference pipelines with Indian academic adaptations."""

import pytest
from backend.model_service import ModelService


@pytest.fixture(scope="module")
def model_service():
    svc = ModelService()
    svc.load_artifacts()
    return svc


def test_artifacts_loaded(model_service):
    assert model_service.is_loaded is True
    assert len(model_service.encoders) == 7
    assert "model" in model_service.anxiety_data
    assert "model" in model_service.depression_data
    assert "model" in model_service.stress_data


def test_davv_student_predictions(model_service):
    base_demo = {
        "Age": "18-22",
        "Gender": "Female",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Engineering - CS / CSE / IT / Data Science",
        "Academic_Year": "Second Year (Semester 3 - 4)",
        "Current_CGPA": "9.00 - 10.00 (Outstanding / Distinction)",
        "waiver_or_scholarship": "Yes",
    }
    sample_req = {
        **base_demo,
        **{f"PSS{i}": 0 for i in range(1, 11)},
        **{f"GAD{i}": 0 for i in range(1, 8)},
        **{f"PHQ{i}": 0 for i in range(1, 10)},
    }
    result = model_service.predict(sample_req)
    assert result["status"] == "success"
    assert result["application_name"] == "saathi-wellbeing"
    assert result["tagline"] == "A LITTLE SPACE FOR YOU"
    assert result["anxiety"]["predicted_label"] == "Minimal Anxiety"
    assert result["depression"]["predicted_label"] == "No Depression"
    assert result["anxiety"]["clinical_score"] == 0
    assert result["depression"]["clinical_score"] == 0
    assert result["stress"]["clinical_score"] == 0
    assert result["overall_summary"]["crisis_flag"] is False


def test_crisis_flag_triggered_on_phq9(model_service):
    base_demo = {
        "Age": "18-22",
        "Gender": "Male",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Business and Management Studies (BBA/MBA)",
        "Academic_Year": "Third Year (Semester 5 - 6)",
        "Current_CGPA": "6.00 - 6.99 (Second Class)",
        "waiver_or_scholarship": "No",
    }
    sample_req = {
        **base_demo,
        **{f"PSS{i}": 2 for i in range(1, 11)},
        **{f"GAD{i}": 2 for i in range(1, 8)},
        **{f"PHQ{i}": 1 for i in range(1, 9)},
        "PHQ9": 2,  # Self-harm ideation reported
    }
    result = model_service.predict(sample_req)
    assert result["overall_summary"]["crisis_flag"] is True
    assert "Tele-MANAS" in result["overall_summary"]["crisis_message"]
