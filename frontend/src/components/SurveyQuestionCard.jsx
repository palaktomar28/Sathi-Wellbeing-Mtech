import React from 'react';

export default function SurveyQuestionCard({
  index,
  question,
  options,
  value,
  onChange,
}) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        value !== undefined && value !== null
          ? 'bg-white border-indigo-200 shadow-sm'
          : 'bg-white/80 border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start space-x-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center mt-0.5">
            {index + 1}
          </span>
          <p className="text-sm font-semibold text-slate-900 leading-snug">
            {question.text}
          </p>
        </div>
        {question.critical && (
          <span className="shrink-0 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Sensitive Item
          </span>
        )}
      </div>

      {/* Likert Options */}
      <div className={`grid grid-cols-2 sm:grid-cols-${options.length} gap-2 pt-1`}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(question.id, opt.value)}
              className={`p-2.5 rounded-xl border text-left sm:text-center transition flex flex-col items-center justify-center ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mb-1 ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {opt.badge}
              </span>
              <span className="text-xs leading-tight font-medium line-clamp-2">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

