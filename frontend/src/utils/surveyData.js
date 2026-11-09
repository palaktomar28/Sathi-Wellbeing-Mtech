export const DEMOGRAPHIC_OPTIONS = {
  Age: ["18-22", "23-26", "27-30", "Above 30", "Below 18"],
  Gender: ["Female", "Male", "Prefer not to say"],
  University: [
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
  Department: [
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
  Academic_Year: [
    "First Year (Semester 1 - 2)",
    "Second Year (Semester 3 - 4)",
    "Third Year (Semester 5 - 6)",
    "Fourth Year (Semester 7 - 8)",
    "Postgraduate / Other",
  ],
  Current_CGPA: [
    "9.00 - 10.00 (Outstanding / Distinction)",
    "8.00 - 8.99 (First Class with Distinction)",
    "7.00 - 7.99 (First Class)",
    "6.00 - 6.99 (Second Class)",
    "Below 6.00 (Pass Class / Needs Improvement)",
    "Other",
  ],
  waiver_or_scholarship: ["No", "Yes"],
};

export const PSS_OPTIONS = [
  { value: 0, label: "Never", badge: "0" },
  { value: 1, label: "Almost Never", badge: "1" },
  { value: 2, label: "Sometimes", badge: "2" },
  { value: 3, label: "Fairly Often", badge: "3" },
  { value: 4, label: "Very Often", badge: "4" },
];

export const GAD_PHQ_OPTIONS = [
  { value: 0, label: "Not at all", badge: "0" },
  { value: 1, label: "Several days", badge: "1" },
  { value: 2, label: "More than half the days", badge: "2" },
  { value: 3, label: "Nearly every day", badge: "3" },
];

export const PSS_QUESTIONS = [
  { id: "PSS1", text: "In the last month, how often have you been upset because of something that happened unexpectedly?" },
  { id: "PSS2", text: "In the last month, how often have you felt that you were unable to control the important things in your life?" },
  { id: "PSS3", text: "In the last month, how often have you felt nervous and stressed?" },
  { id: "PSS4", text: "In the last month, how often have you felt confident about your ability to handle your personal problems?" },
  { id: "PSS5", text: "In the last month, how often have you felt that things were going your way?" },
  { id: "PSS6", text: "In the last month, how often have you found that you could not cope with all the things that you had to do?" },
  { id: "PSS7", text: "In the last month, how often have you been able to control irritations in your life?" },
  { id: "PSS8", text: "In the last month, how often have you felt that you were on top of things?" },
  { id: "PSS9", text: "In the last month, how often have you been angered because of things that happened that were outside of your control?" },
  { id: "PSS10", text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" },
];

export const GAD_QUESTIONS = [
  { id: "GAD1", text: "Feeling nervous, anxious, or on edge" },
  { id: "GAD2", text: "Not being able to stop or control worrying" },
  { id: "GAD3", text: "Worrying too much about different things" },
  { id: "GAD4", text: "Trouble relaxing" },
  { id: "GAD5", text: "Being so restless that it's hard to sit still" },
  { id: "GAD6", text: "Becoming easily annoyed or irritable" },
  { id: "GAD7", text: "Feeling afraid, as if something awful might happen" },
];

export const PHQ_QUESTIONS = [
  { id: "PHQ1", text: "Little interest or pleasure in doing things" },
  { id: "PHQ2", text: "Feeling down, depressed, or hopeless" },
  { id: "PHQ3", text: "Trouble falling or staying asleep, or sleeping too much" },
  { id: "PHQ4", text: "Feeling tired or having little energy" },
  { id: "PHQ5", text: "Poor appetite or overeating" },
  { id: "PHQ6", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
  { id: "PHQ7", text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
  { id: "PHQ8", text: "Moving or speaking so slowly that other people could have noticed, or being unusually fidgety" },
  { id: "PHQ9", text: "Thoughts that you would be better off dead, or of hurting yourself in some way", critical: true },
];

export const PRESET_PROFILES = {
  davvStudent: {
    title: "DAVV Indore Student (Well-Balanced)",
    description: "Devi Ahilya Vishwavidyalaya student, healthy routine, minimal distress.",
    data: {
      Age: "18-22",
      Gender: "Female",
      University: "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
      Department: "Engineering - CS / CSE / IT / Data Science",
      Academic_Year: "Second Year (Semester 3 - 4)",
      Current_CGPA: "8.00 - 8.99 (First Class with Distinction)",
      waiver_or_scholarship: "Yes",
      PSS1: 1, PSS2: 0, PSS3: 1, PSS4: 3, PSS5: 3, PSS6: 0, PSS7: 3, PSS8: 3, PSS9: 1, PSS10: 0,
      GAD1: 0, GAD2: 0, GAD3: 1, GAD4: 0, GAD5: 0, GAD6: 0, GAD7: 0,
      PHQ1: 0, PHQ2: 0, PHQ3: 0, PHQ4: 1, PHQ5: 0, PHQ6: 0, PHQ7: 0, PHQ8: 0, PHQ9: 0,
    },
  },
  examStress: {
    title: "Semester Exam Stress (Moderate)",
    description: "Engineering student facing end-semester pressure, elevated stress.",
    data: {
      Age: "23-26",
      Gender: "Male",
      University: "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
      Department: "Engineering - CS / CSE / IT / Data Science",
      Academic_Year: "Third Year (Semester 5 - 6)",
      Current_CGPA: "7.00 - 7.99 (First Class)",
      waiver_or_scholarship: "No",
      PSS1: 3, PSS2: 3, PSS3: 4, PSS4: 1, PSS5: 1, PSS6: 3, PSS7: 2, PSS8: 1, PSS9: 3, PSS10: 3,
      GAD1: 2, GAD2: 2, GAD3: 2, GAD4: 2, GAD5: 1, GAD6: 2, GAD7: 1,
      PHQ1: 1, PHQ2: 1, PHQ3: 2, PHQ4: 2, PHQ5: 1, PHQ6: 1, PHQ7: 1, PHQ8: 0, PHQ9: 0,
    },
  },
  highDistress: {
    title: "High Distress / Crisis Scenario",
    description: "Student experiencing acute distress requiring immediate helpline contact.",
    data: {
      Age: "18-22",
      Gender: "Prefer not to say",
      University: "Devi Ahilya Vishwavidyalaya (DAVV, Indore)",
      Department: "Business and Management Studies (BBA/MBA)",
      Academic_Year: "Fourth Year (Semester 7 - 8)",
      Current_CGPA: "6.00 - 6.99 (Second Class)",
      waiver_or_scholarship: "No",
      PSS1: 4, PSS2: 4, PSS3: 4, PSS4: 0, PSS5: 0, PSS6: 4, PSS7: 0, PSS8: 0, PSS9: 4, PSS10: 4,
      GAD1: 3, GAD2: 3, GAD3: 3, GAD4: 3, GAD5: 2, GAD6: 3, GAD7: 2,
      PHQ1: 3, PHQ2: 3, PHQ3: 3, PHQ4: 3, PHQ5: 2, PHQ6: 3, PHQ7: 2, PHQ8: 2, PHQ9: 1,
    },
  },
};
