"""Metadata, questions, and descriptions for PSS-10, GAD-7, and PHQ-9 questionnaires,
tailored for Indian universities and academic evaluation systems.
"""

PSS_OPTIONS = [
    {"value": 0, "label": "Never"},
    {"value": 1, "label": "Almost Never"},
    {"value": 2, "label": "Sometimes"},
    {"value": 3, "label": "Fairly Often"},
    {"value": 4, "label": "Very Often"},
]

GAD_OPTIONS = [
    {"value": 0, "label": "Not at all"},
    {"value": 1, "label": "Several days"},
    {"value": 2, "label": "More than half the days"},
    {"value": 3, "label": "Nearly every day"},
]

PHQ_OPTIONS = [
    {"value": 0, "label": "Not at all"},
    {"value": 1, "label": "Several days"},
    {"value": 2, "label": "More than half the days"},
    {"value": 3, "label": "Nearly every day"},
]

PSS_QUESTIONS = [
    {"id": "PSS1", "text": "In the last month, how often have you been upset because of something that happened unexpectedly?"},
    {"id": "PSS2", "text": "In the last month, how often have you felt that you were unable to control the important things in your life?"},
    {"id": "PSS3", "text": "In the last month, how often have you felt nervous and stressed?"},
    {"id": "PSS4", "text": "In the last month, how often have you felt confident about your ability to handle your personal problems?"},
    {"id": "PSS5", "text": "In the last month, how often have you felt that things were going your way?"},
    {"id": "PSS6", "text": "In the last month, how often have you found that you could not cope with all the things that you had to do?"},
    {"id": "PSS7", "text": "In the last month, how often have you been able to control irritations in your life?"},
    {"id": "PSS8", "text": "In the last month, how often have you felt that you were on top of things?"},
    {"id": "PSS9", "text": "In the last month, how often have you been angered because of things that happened that were outside of your control?"},
    {"id": "PSS10", "text": "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"},
]

GAD_QUESTIONS = [
    {"id": "GAD1", "text": "Feeling nervous, anxious, or on edge"},
    {"id": "GAD2", "text": "Not being able to stop or control worrying"},
    {"id": "GAD3", "text": "Worrying too much about different things"},
    {"id": "GAD4", "text": "Trouble relaxing"},
    {"id": "GAD5", "text": "Being so restless that it's hard to sit still"},
    {"id": "GAD6", "text": "Becoming easily annoyed or irritable"},
    {"id": "GAD7", "text": "Feeling afraid, as if something awful might happen"},
]

PHQ_QUESTIONS = [
    {"id": "PHQ1", "text": "Little interest or pleasure in doing things"},
    {"id": "PHQ2", "text": "Feeling down, depressed, or hopeless"},
    {"id": "PHQ3", "text": "Trouble falling or staying asleep, or sleeping too much"},
    {"id": "PHQ4", "text": "Feeling tired or having little energy"},
    {"id": "PHQ5", "text": "Poor appetite or overeating"},
    {"id": "PHQ6", "text": "Feeling bad about yourself — or that you are a failure or have let yourself or your family down"},
    {"id": "PHQ7", "text": "Trouble concentrating on things, such as reading the newspaper or watching television"},
    {"id": "PHQ8", "text": "Moving or speaking so slowly that other people could have noticed, or being so fidgety/restless"},
    {"id": "PHQ9", "text": "Thoughts that you would be better off dead, or of hurting yourself in some way"},
]

DEMOGRAPHIC_CHOICES = {
    "Age": ["18-22", "23-26", "27-30", "Above 30", "Below 18"],
    "Gender": ["Female", "Male", "Prefer not to say"],
    "University": [
        "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
        "Indian Institute of Technology (IIT)",
        "National Institute of Technology (NIT)",
        "University of Delhi (DU)",
        "Banaras Hindu University (BHU)",
        "Jawaharlal Nehru University (JNU)",
        "BITS Pilani",
        "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV, Bhopal)",
        "Savitribai Phule Pune University (SPPU)",
        "University of Mumbai (MU)",
        "Anna University, Chennai",
        "Vellore Institute of Technology (VIT)",
        "Manipal Academy of Higher Education (MAHE)",
        "University of Calcutta",
        "Other Indian University / Autonomous Institute",
    ],
    "Department": [
        "Engineering - CS / CSE / IT / Data Science",
        "Engineering - Civil Engineering",
        "Engineering - EEE / ECE / Electronics",
        "Engineering - Mechanical / Automobile",
        "Engineering - Other",
        "Business and Management Studies (BBA/MBA)",
        "Biological Sciences / Biotechnology",
        "Environmental and Life Sciences",
        "Law and Legal Studies",
        "Liberal Arts, Humanities and Social Sciences",
        "Pharmacy and Public Health",
        "Other",
    ],
    "Academic_Year": [
        "First Year (Semester 1 - 2)",
        "Second Year (Semester 3 - 4)",
        "Third Year (Semester 5 - 6)",
        "Fourth Year (Semester 7 - 8)",
        "Postgraduate / Other",
    ],
    "Current_CGPA": [
        "9.00 - 10.00 (Outstanding / Distinction)",
        "8.00 - 8.99 (First Class with Distinction)",
        "7.00 - 7.99 (First Class)",
        "6.00 - 6.99 (Second Class)",
        "Below 6.00 (Pass Class / Needs Improvement)",
        "Other",
    ],
    "waiver_or_scholarship": ["No", "Yes"],
}
