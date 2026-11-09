import React from 'react';
import RiskCard from './RiskCard';
import DisclaimerBanner from './DisclaimerBanner';
import {
  HeartCrack,
  Brain,
  Flame,
  RotateCcw,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Phone,
} from 'lucide-react';

export default function ResultsDashboard({ result, onRetake }) {
  const summary = result.overall_summary;
  const anxiety = result.anxiety;
  const depression = result.depression;
  const stress = result.stress;
  const demo = result.demographics;

  const riskTheme = {
    critical: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-900',
      badge: 'bg-red-600 text-white',
      icon: AlertTriangle,
    },
    high: {
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-900',
      badge: 'bg-orange-600 text-white',
      icon: AlertTriangle,
    },
    moderate: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-900',
      badge: 'bg-amber-500 text-white',
      icon: AlertTriangle,
    },
    mild: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-600 text-white',
      icon: ShieldCheck,
    },
    low: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-900',
      badge: 'bg-emerald-600 text-white',
      icon: ShieldCheck,
    },
  }[summary.risk_level] || {
    bg: 'bg-slate-50 border-slate-200',
    text: 'text-slate-900',
    badge: 'bg-slate-700 text-white',
    icon: ShieldCheck,
  };

  const RiskIcon = riskTheme.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Controls & Print */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              saathi-wellbeing Screening Complete
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Student Mental Health Assessment Report
          </h2>
          <p className="text-xs font-bold text-indigo-500 tracking-widest uppercase mt-0.5">
            A Little Space For You
          </p>
        </div>

        <div className="flex items-center space-x-3 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onRetake}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition flex items-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Demographics Pill Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center gap-2 text-xs text-slate-600">
        <span className="font-bold text-slate-800">Student Profile:</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Age: {demo.Age}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Gender: {demo.Gender}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-semibold text-indigo-900">University: {demo.University}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Dept: {demo.Department}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Year: {demo.Academic_Year}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-semibold text-slate-800">CGPA (0-10): {demo.Current_CGPA}</span>
        <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Scholarship: {demo.waiver_or_scholarship}</span>
      </div>

      {/* Overall Assessment Banner */}
      <div className={`rounded-3xl border-2 p-6 sm:p-8 ${riskTheme.bg} shadow-sm space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${riskTheme.badge}`}>
              <RiskIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Consolidated AI Risk Assessment
              </span>
              <h3 className={`text-2xl font-black ${riskTheme.text}`}>
                {summary.overall_risk}
              </h3>
            </div>
          </div>
          <span className={`self-start sm:self-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${riskTheme.badge}`}>
            {summary.risk_level} severity
          </span>
        </div>

        {/* Primary Concerns & Immediate Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Primary Findings</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {summary.primary_concerns.map((c, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Suggested Next Steps</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {summary.immediate_actions.map((act, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3 Model Condition Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RiskCard
          conditionTitle="Depression (PHQ-9)"
          icon={HeartCrack}
          data={depression}
        />
        <RiskCard
          conditionTitle="Anxiety (GAD-7)"
          icon={Brain}
          data={anxiety}
        />
        <RiskCard
          conditionTitle="Perceived Stress (PSS-10)"
          icon={Flame}
          data={stress}
        />
      </div>

      {/* Mandatory Clinical Disclaimer (Prominent) */}
      <DisclaimerBanner prominent={true} />

      {/* Indian Campus & National Mental Health Resources */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <span>Indian Student Mental Health & Counseling Resources</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          University life in India presents unique academic and social pressures. Reaching out for professional guidance is a sign of strength and emotional intelligence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* DAVV & Campus Support */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-between space-y-2">
            <div>
              <h4 className="font-bold text-xs text-indigo-950 uppercase tracking-wide">
                University Counseling Cell
              </h4>
              <p className="text-xs text-indigo-900 mt-1">
                Devi Ahilya Vishwavidyalaya (DAVV) Student Welfare Center, Department Advisors & University Health Center (Indore).
              </p>
            </div>
            <span className="text-[11px] text-indigo-700 font-semibold flex items-center space-x-1">
              <span>On-Campus Student Support</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          {/* Tele-MANAS */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between space-y-2">
            <div>
              <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wide">
                Tele-MANAS (Govt. of India)
              </h4>
              <p className="text-xs text-emerald-900 mt-1">
                Call <strong>14416</strong> or <strong>1800-891-4416</strong> toll-free 24/7. Multilingual support across India.
              </p>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
              <span>National 24/7 Helpline</span>
              <Phone className="w-3 h-3" />
            </span>
          </div>

          {/* Vandrevala Foundation & KIRAN */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col justify-between space-y-2">
            <div>
              <h4 className="font-bold text-xs text-purple-950 uppercase tracking-wide">
                KIRAN & Vandrevala Foundation
              </h4>
              <p className="text-xs text-purple-900 mt-1">
                KIRAN: <strong>1800-599-0019</strong> | Vandrevala Foundation WhatsApp / Call: <strong>9999 666 555</strong>
              </p>
            </div>
            <span className="text-[11px] text-purple-700 font-semibold flex items-center space-x-1">
              <span>Free Confidential Counseling</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
