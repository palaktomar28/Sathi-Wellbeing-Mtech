import React, { useState } from 'react';
import ScoreGauge from './ScoreGauge';
import { ChevronDown, ChevronUp, Check, Info, Sparkles } from 'lucide-react';

export default function RiskCard({
  conditionTitle,
  icon: Icon,
  data,
}) {
  const [showProbs, setShowProbs] = useState(false);

  // Determine badge styling based on severity
  const severityBadgeStyles = {
    minimal: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    mild: 'bg-amber-100 text-amber-800 border-amber-300',
    moderate: 'bg-orange-100 text-orange-800 border-orange-300',
    severe: 'bg-red-100 text-red-800 border-red-300',
  }[data.severity_level] || 'bg-slate-100 text-slate-800 border-slate-300';

  const confidencePercent = Math.round(data.confidence * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 space-y-5 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {conditionTitle}
              </h3>
              <p className="text-xs text-slate-500">
                Clinical Scale Score: <strong className="text-slate-800">{data.clinical_score} / {data.max_clinical_score}</strong>
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider ${severityBadgeStyles}`}
          >
            {data.severity_level}
          </span>
        </div>

        {/* Prediction Headline */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-4">
          <div className="text-xs font-semibold text-slate-500 mb-0.5">
            Model Classification
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between">
            <span>{data.predicted_label}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
              {confidencePercent}% conf.
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Clinical standard: {data.clinical_interpretation}
          </p>
        </div>

        {/* Visual Severity Meter */}
        <div className="mb-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Severity Meter
          </div>
          <ScoreGauge
            severity={data.severity_level}
            confidence={data.confidence}
            colorCode={data.color_code}
          />
        </div>

        {/* Actionable Coping Strategies */}
        <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Recommended Strategies</span>
          </div>
          <ul className="space-y-1.5">
            {data.coping_strategies.map((strategy, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Probability Breakdown Toggle */}
      <div className="pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowProbs(!showProbs)}
          className="w-full py-2 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition flex items-center justify-between"
        >
          <span>View Probability Distribution</span>
          {showProbs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showProbs && (
          <div className="mt-3 space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {Object.entries(data.probabilities).map(([clsName, prob]) => {
              const pct = Math.round(prob * 100);
              const isSelected = clsName === data.predicted_label;
              return (
                <div key={clsName} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className={isSelected ? 'font-bold text-indigo-700' : 'text-slate-600'}>
                      {clsName}
                    </span>
                    <span className="font-mono text-slate-700">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

