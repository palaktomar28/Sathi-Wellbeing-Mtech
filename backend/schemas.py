"""Pydantic schemas for student mental health prediction requests and responses,
calibrated for Indian academic systems and 10-point CGPA criteria.
"""

from typing import Dict, List, Optional, Union
from pydantic import BaseModel, Field, field_validator


class MentalHealthRequest(BaseModel):
    # Demographics
    Age: Union[str, int, float] = Field(..., description="Age bracket (e.g. '18-22') or numeric age")
    Gender: str = Field(..., description="Gender: Female, Male, or Prefer not to say")
    University: str = Field(..., description="Name of Indian University (e.g. 'Devi Ahilya Vishwavidyalaya (DAVV, Indore)')")
    Department: str = Field(..., description="Academic department / discipline")
    Academic_Year: str = Field(..., description="Current year of study")
    Current_CGPA: Union[str, float, int] = Field(..., description="CGPA on 10-point scale (e.g. '8.00 - 8.99' or numeric 8.5)")
    waiver_or_scholarship: Union[str, bool, int] = Field(..., description="'Yes', 'No', boolean or 1/0")

    # Perceived Stress Scale (PSS 1-10, values 0-4)
    PSS1: int = Field(..., ge=0, le=4)
    PSS2: int = Field(..., ge=0, le=4)
    PSS3: int = Field(..., ge=0, le=4)
    PSS4: int = Field(..., ge=0, le=4)
    PSS5: int = Field(..., ge=0, le=4)
    PSS6: int = Field(..., ge=0, le=4)
    PSS7: int = Field(..., ge=0, le=4)
    PSS8: int = Field(..., ge=0, le=4)
    PSS9: int = Field(..., ge=0, le=4)
    PSS10: int = Field(..., ge=0, le=4)

    # Generalized Anxiety Disorder Scale (GAD 1-7, values 0-3)
    GAD1: int = Field(..., ge=0, le=3)
    GAD2: int = Field(..., ge=0, le=3)
    GAD3: int = Field(..., ge=0, le=3)
    GAD4: int = Field(..., ge=0, le=3)
    GAD5: int = Field(..., ge=0, le=3)
    GAD6: int = Field(..., ge=0, le=3)
    GAD7: int = Field(..., ge=0, le=3)

    # Patient Health Questionnaire (PHQ 1-9, values 0-3)
    PHQ1: int = Field(..., ge=0, le=3)
    PHQ2: int = Field(..., ge=0, le=3)
    PHQ3: int = Field(..., ge=0, le=3)
    PHQ4: int = Field(..., ge=0, le=3)
    PHQ5: int = Field(..., ge=0, le=3)
    PHQ6: int = Field(..., ge=0, le=3)
    PHQ7: int = Field(..., ge=0, le=3)
    PHQ8: int = Field(..., ge=0, le=3)
    PHQ9: int = Field(..., ge=0, le=3)

    @field_validator("Age")
    @classmethod
    def normalize_age(cls, v: Union[str, int, float]) -> str:
        if isinstance(v, (int, float)):
            if v < 18:
                return "Below 18"
            elif 18 <= v <= 22:
                return "18-22"
            elif 23 <= v <= 26:
                return "23-26"
            elif 27 <= v <= 30:
                return "27-30"
            else:
                return "Above 30"
        return str(v).strip()

    @field_validator("Current_CGPA")
    @classmethod
    def normalize_cgpa(cls, v: Union[str, float, int]) -> str:
        """Normalizes numeric or string CGPA inputs on the Indian 0-10 CGPA scale."""
        if isinstance(v, (int, float)):
            # If input is on standard 10-point scale:
            if v >= 9.0:
                return "9.00 - 10.00 (Outstanding / Distinction)"
            elif 8.0 <= v < 9.0:
                return "8.00 - 8.99 (First Class with Distinction)"
            elif 7.0 <= v < 8.0:
                return "7.00 - 7.99 (First Class)"
            elif 6.0 <= v < 7.0:
                return "6.00 - 6.99 (Second Class)"
            elif 4.0 < v < 6.0:
                return "Below 6.00 (Pass Class / Needs Improvement)"
            # Handle legacy 4-point numeric scale if entered (< 4.0)
            elif 3.8 <= v <= 4.0:
                return "9.00 - 10.00 (Outstanding / Distinction)"
            elif 3.4 <= v < 3.8:
                return "8.00 - 8.99 (First Class with Distinction)"
            elif 3.0 <= v < 3.4:
                return "7.00 - 7.99 (First Class)"
            elif 2.5 <= v < 3.0:
                return "6.00 - 6.99 (Second Class)"
            else:
                return "Below 6.00 (Pass Class / Needs Improvement)"
        
        # If string provided
        s = str(v).strip()
        if "9." in s or "10." in s or "Outstanding" in s:
            return "9.00 - 10.00 (Outstanding / Distinction)"
        elif "8." in s:
            return "8.00 - 8.99 (First Class with Distinction)"
        elif "7." in s:
            return "7.00 - 7.99 (First Class)"
        elif "6." in s:
            return "6.00 - 6.99 (Second Class)"
        elif "Below 6" in s or "Pass" in s or "Below 2.5" in s:
            return "Below 6.00 (Pass Class / Needs Improvement)"
        return s

    @field_validator("waiver_or_scholarship")
    @classmethod
    def normalize_waiver(cls, v: Union[str, bool, int]) -> str:
        if isinstance(v, bool):
            return "Yes" if v else "No"
        if isinstance(v, (int, float)):
            return "Yes" if v == 1 else "No"
        val = str(v).strip().capitalize()
        return "Yes" if val in ["Yes", "True", "1", "Y"] else "No"


class ConditionPrediction(BaseModel):
    condition: str
    predicted_label: str
    confidence: float
    probabilities: Dict[str, float]
    severity_level: str  # "minimal", "mild", "moderate", "severe"
    color_code: str      # hex color code
    clinical_score: int
    max_clinical_score: int
    clinical_interpretation: str
    coping_strategies: List[str]


class OverallSummary(BaseModel):
    overall_risk: str
    risk_level: str  # "low", "mild", "moderate", "high", "critical"
    primary_concerns: List[str]
    immediate_actions: List[str]
    crisis_flag: bool
    crisis_message: Optional[str] = None


class MentalHealthResponse(BaseModel):
    status: str = "success"
    application_name: str = "saathi-wellbeing"
    tagline: str = "A LITTLE SPACE FOR YOU"
    demographics: Dict[str, str]
    anxiety: ConditionPrediction
    depression: ConditionPrediction
    stress: ConditionPrediction
    overall_summary: OverallSummary
    clinical_disclaimer: str
