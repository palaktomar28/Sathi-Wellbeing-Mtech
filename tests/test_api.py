"""Integration tests for saathi-wellbeing FastAPI endpoints."""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.model_service import service


@pytest.fixture(scope="module")
def client():
    service.load_artifacts()
    with TestClient(app) as test_client:
        yield test_client


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["models_loaded"] is True
    assert data["models"]["anxiety"] is True
    assert data["models"]["depression"] is True
    assert data["models"]["stress"] is True


def test_metadata_endpoint(client):
    response = client.get("/meta")
    assert response.status_code == 200
    data = response.json()
    assert "demographics" in data
    assert "Devi Ahilya Vishwavidyalaya (DAVV, Indore)" in data["demographics"]["University"]
    assert "9.00 - 10.00 (Outstanding / Distinction)" in data["demographics"]["Current_CGPA"]
    assert "Tele-MANAS" in data["disclaimer"]


def test_predict_endpoint_success(client):
    payload = {
        "Age": "18-22",
        "Gender": "Female",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Engineering - CS / CSE / IT / Data Science",
        "Academic_Year": "Second Year (Semester 3 - 4)",
        "Current_CGPA": "8.00 - 8.99 (First Class with Distinction)",
        "waiver_or_scholarship": "Yes",
        **{f"PSS{i}": 1 for i in range(1, 11)},
        **{f"GAD{i}": 1 for i in range(1, 8)},
        **{f"PHQ{i}": 1 for i in range(1, 10)},
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["application_name"] == "saathi-wellbeing"
    assert data["tagline"] == "A LITTLE SPACE FOR YOU"
    assert "anxiety" in data
    assert "depression" in data
    assert "stress" in data
    assert "Tele-MANAS" in data["clinical_disclaimer"]


def test_batch_predict_endpoint(client):
    record1 = {
        "Age": "18-22",
        "Gender": "Female",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Engineering - CS / CSE / IT / Data Science",
        "Academic_Year": "Second Year (Semester 3 - 4)",
        "Current_CGPA": "9.00 - 10.00 (Outstanding / Distinction)",
        "waiver_or_scholarship": "Yes",
        **{f"PSS{i}": 0 for i in range(1, 11)},
        **{f"GAD{i}": 0 for i in range(1, 8)},
        **{f"PHQ{i}": 0 for i in range(1, 10)},
    }
    record2 = {
        "Age": "23-26",
        "Gender": "Male",
        "University": "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Department": "Business and Management Studies (BBA/MBA)",
        "Academic_Year": "Third Year (Semester 5 - 6)",
        "Current_CGPA": "7.00 - 7.99 (First Class)",
        "waiver_or_scholarship": "No",
        **{f"PSS{i}": 3 for i in range(1, 11)},
        **{f"GAD{i}": 2 for i in range(1, 8)},
        **{f"PHQ{i}": 1 for i in range(1, 10)},
    }
    response = client.post("/predict/batch", json=[record1, record2])
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["cohort_size"] == 2
    assert "cohort_summary" in data
    assert len(data["individual_results"]) == 2


def test_static_index_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    assert "saathi-wellbeing" in response.text
    assert "A LITTLE SPACE FOR YOU" in response.text
    assert "Devi Ahilya Vishwavidyalaya" in response.text
