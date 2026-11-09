import React from 'react';

export default function ScoreGauge({ severity, confidence, colorCode }) {
  // severity levels: minimal, mild, moderate, severe
  const levels = ['minimal', 'mild', 'moderate', 'severe'];
  const activeIndex = levels.indexOf(severity.toLowerCase());

  return (
    <div className="w-full space-y-2">
      {/* 4-segment colored gauge meter */}
      <div className="grid grid-cols-4 gap-1.5 h-3 w-full bg-slate-100 rounded-full p-0.5">
        <div
          className={`h-full rounded-l-full transition-all duration-500 ${
            activeIndex >= 0 ? 'bg-emerald-500' : 'bg-slate-200'
          }`}
          title="Minimal / Low"
        />
        <div
          className={`h-full transition-all duration-500 ${
            activeIndex >= 1 ? 'bg-amber-400' : 'bg-slate-200'
          }`}
          title="Mild"
        />
        <div
          className={`h-full transition-all duration-500 ${
            activeIndex >= 2 ? 'bg-orange-500' : 'bg-slate-200'
          }`}
          title="Moderate"
        />
        <div
          className={`h-full rounded-r-full transition-all duration-500 ${
            activeIndex >= 3 ? 'bg-red-500' : 'bg-slate-200'
          }`}
          title="Severe / High"
        />
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-600 font-semibold uppercase tracking-wider px-1">
        <span>Low / None</span>
        <span>Mild</span>
        <span>Moderate</span>
        <span>Severe / High</span>
      </div>
    </div>
  );
}

