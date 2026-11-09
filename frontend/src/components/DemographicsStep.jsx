import React from 'react';
import { User, School, BookOpen, Calendar, Award, GraduationCap, Users } from 'lucide-react';
import { DEMOGRAPHIC_OPTIONS } from '../utils/surveyData';

export default function DemographicsStep({ formData, onChange, onNext }) {
  const isComplete =
    formData.Age &&
    formData.Gender &&
    formData.University &&
    formData.Department &&
    formData.Academic_Year &&
    formData.Current_CGPA &&
    formData.waiver_or_scholarship !== undefined;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <span>Step 1: Student Demographics & Academic Profile</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Calibrated for Indian university systems, grading patterns (0 to 10 CGPA), and academic disciplines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Age */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span>Age Bracket</span>
          </label>
          <select
            value={formData.Age || ''}
            onChange={(e) => onChange('Age', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          >
            <option value="">Select your age range</option>
            {DEMOGRAPHIC_OPTIONS.Age.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Gender Identity</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DEMOGRAPHIC_OPTIONS.Gender.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange('Gender', g)}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                  formData.Gender === g
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* University (Indian Universities) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <School className="w-3.5 h-3.5 text-indigo-600" />
            <span>University / Institute (Indian Academics)</span>
          </label>
          <select
            value={formData.University || ''}
            onChange={(e) => onChange('University', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition font-medium"
          >
            <option value="">Select your university / institute</option>
            {DEMOGRAPHIC_OPTIONS.University.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Department / Discipline</span>
          </label>
          <select
            value={formData.Department || ''}
            onChange={(e) => onChange('Department', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          >
            <option value="">Select your department / discipline</option>
            {DEMOGRAPHIC_OPTIONS.Department.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academic Year & Semester</span>
          </label>
          <select
            value={formData.Academic_Year || ''}
            onChange={(e) => onChange('Academic_Year', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          >
            <option value="">Select year of study</option>
            {DEMOGRAPHIC_OPTIONS.Academic_Year.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Current CGPA (0 to 10 Scale) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Current CGPA (0 to 10 Grading Scale)</span>
          </label>
          <select
            value={formData.Current_CGPA || ''}
            onChange={(e) => onChange('Current_CGPA', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          >
            <option value="">Select CGPA range (0 - 10 scale)</option>
            {DEMOGRAPHIC_OPTIONS.Current_CGPA.map((cg) => (
              <option key={cg} value={cg}>
                {cg}
              </option>
            ))}
          </select>
        </div>

        {/* Waiver or Scholarship */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Do you receive a Fee Waiver / Merit Scholarship?</span>
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {['No', 'Yes'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange('waiver_or_scholarship', val)}
                className={`py-2.5 px-4 text-sm font-bold rounded-xl border transition flex items-center justify-center space-x-2 ${
                  formData.waiver_or_scholarship === val
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{val}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center space-x-2 ${
            isComplete
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Continue to Stress Assessment (PSS)</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
