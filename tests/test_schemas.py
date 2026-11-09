"""Tests for Pydantic input/output schemas with Indian academic adaptations."""

import pytest
from pydantic import ValidationError
from backend.schemas import MentalHealthRequest, MentalHealthResponse


def test_valid_request():
    payload = {
        "Age": "18-22",
        "Gender": "Female",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Engineering - CS / CSE / IT / Data Science",
        "Academic_Year": "Second Year (Semester 3 - 4)",
        "Current_CGPA": "8.00 - 8.99 (First Class with Distinction)",
        "waiver_or_scholarship": "Yes",
        **{f"PSS{i}": 2 for i in range(1, 11)},
        **{f"GAD{i}": 1 for i in range(1, 8)},
        **{f"PHQ{i}": 0 for i in range(1, 10)},
    }
    req = MentalHealthRequest(**payload)
    assert req.Age == "18-22"
    assert req.University == "Devi Ahilya Vishwavidyalaya (DAVV, Indore)"
    assert req.waiver_or_scholarship == "Yes"
    assert req.PSS1 == 2
    assert req.GAD1 == 1
    assert req.PHQ9 == 0


def test_numeric_cgpa_10_scale_normalization():
    # Numeric 8.4 on 10-point scale should normalize to First Class with Distinction
    payload = {
        "Age": 21,
        "Gender": "Male",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Business and Management Studies (BBA/MBA)",
        "Academic_Year": "First Year (Semester 1 - 2)",
        "Current_CGPA": 8.4,
        "waiver_or_scholarship": True,
        **{f"PSS{i}": 0 for i in range(1, 11)},
        **{f"GAD{i}": 0 for i in range(1, 8)},
        **{f"PHQ{i}": 0 for i in range(1, 10)},
    }
    req = MentalHealthRequest(**payload)
    assert req.Age == "18-22"
    assert req.Current_CGPA == "8.00 - 8.99 (First Class with Distinction)"
    assert req.waiver_or_scholarship == "Yes"


def test_invalid_likert_rejected():
    payload = {
        "Age": "18-22",
        "Gender": "Female",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Engineering - CS / CSE / IT / Data Science",
        "Academic_Year": "Second Year (Semester 3 - 4)",
        "Current_CGPA": "8.00 - 8.99 (First Class with Distinction)",
        "waiver_or_scholarship": "Yes",
        **{f"PSS{i}": 5 for i in range(1, 11)},  # Invalid: PSS max is 4
        **{f"GAD{i}": 1 for i in range(1, 8)},
        **{f"PHQ{i}": 0 for i in range(1, 10)},
    }
    with pytest.raises(ValidationError):
        MentalHealthRequest(**payload)
