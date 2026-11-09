import React from 'react';
import SurveyQuestionCard from './SurveyQuestionCard';
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function SurveyStep({
  title,
  subtitle,
  badgeText,
  scaleInfo,
  questions,
  options,
  formData,
  onChange,
  onBack,
  onNext,
  isFinalStep = false,
  isLoading = false,
}) {
  const answeredCount = questions.filter(
    (q) => formData[q.id] !== undefined && formData[q.id] !== null
  ).length;
  const isComplete = answeredCount === questions.length;
  const percentComplete = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-extrabold px-2.5 py-1 rounded-lg">
              {badgeText}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <span>
              {answeredCount} of {questions.length} completed
            </span>
            <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
        {scaleInfo && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
            {scaleInfo}
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <SurveyQuestionCard
            key={q.id}
            index={idx}
            question={q}
            options={options}
            value={formData[q.id]}
            onChange={onChange}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition flex items-center space-x-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete || isLoading}
          className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center space-x-2 ${
            isComplete && !isLoading
              ? isFinalStep
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Risk Profile...</span>
            </>
          ) : isFinalStep ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Calculate Mental Health Screening</span>
            </>
          ) : (
            <>
              <span>Next Questionnaire</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

