import React from 'react';
import { UserCheck, Flame, HeartCrack, Brain } from 'lucide-react';

export default function StepProgressBar({ currentStep, setStep, totalSteps = 4 }) {
  const steps = [
    { num: 1, label: 'Demographics', sub: 'Academic Profile', icon: UserCheck },
    { num: 2, label: 'Stress Scale', sub: 'PSS-10 (10 items)', icon: Flame },
    { num: 3, label: 'Anxiety Scale', sub: 'GAD-7 (7 items)', icon: Brain },
    { num: 4, label: 'Depression Scale', sub: 'PHQ-9 (9 items)', icon: HeartCrack },
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile step text */}
      <div className="sm:hidden flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-bold text-indigo-700">
          {steps[currentStep - 1]?.label}
        </span>
      </div>

      {/* Desktop Step Items */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;

          return (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                // allow navigating backward or to steps already visited
                if (isDone || isActive) {
                  setStep(s.num);
                }
              }}
              disabled={!isDone && !isActive}
              className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm shadow-indigo-100 ring-2 ring-indigo-500/20'
                  : isDone
                  ? 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 cursor-pointer'
                  : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
            >
              {/* Bottom active line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600" />
              )}
              {isDone && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
              )}

              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block overflow-hidden">
                  <div className={`text-xs font-bold leading-tight ${isActive ? 'text-indigo-900' : isDone ? 'text-slate-800' : 'text-slate-500'}`}>
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {s.sub}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

