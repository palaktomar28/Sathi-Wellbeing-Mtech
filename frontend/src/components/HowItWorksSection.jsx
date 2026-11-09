import React from 'react';
import { UserRound, ClipboardList, Brain, FileBarChart2, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: UserRound,
    title: 'Your Profile',
    subtitle: 'Demographics & Academics',
    desc: 'Tell us basic information — your age, university, department, year of study, and CGPA (Indian 10-point scale).',
    color: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    items: ['Age, Gender', 'University (DAVV & 14 more)', 'Department & Academic Year', 'CGPA (0–10 scale)'],
  },
  {
    num: '02',
    icon: ClipboardList,
    title: 'Stress Survey',
    subtitle: 'PSS-10 (Perceived Stress Scale)',
    desc: '10 questions about your feelings and thoughts over the last month using a simple 0–4 frequency scale.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    items: ['10 validated questions', '0 = Never  →  4 = Very Often', 'Covers perceived control & load', '~2 minutes to complete'],
  },
  {
    num: '03',
    icon: Brain,
    title: 'Anxiety Survey',
    subtitle: 'GAD-7 (Generalized Anxiety Disorder)',
    desc: '7 questions about anxiety symptoms in the past two weeks, scored on a 0–3 frequency scale.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    items: ['7 validated questions', '0 = Not at all  →  3 = Every day', 'Covers worry, restlessness, fear', '~1 minute to complete'],
  },
  {
    num: '04',
    icon: FileBarChart2,
    title: 'Your AI Report',
    subtitle: 'PHQ-9 + Instant Results',
    desc: 'Answer 9 depression questions, then submit — our ML models generate your personalised risk report instantly.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    items: ['PHQ-9 (9 questions, ~1 min)', 'Instant AI risk assessment', 'Severity levels + guidance', 'Indian crisis resources if needed'],
  },
];

export default function HowItWorksSection({ onStartAssessment }) {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center space-x-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
            <ClipboardList className="w-3.5 h-3.5 text-indigo-500" />
            <span>Simple 4-Step Process</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            From start to report in{' '}
            <span className="gradient-text">under 10 minutes.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            No registration. No complexity. Just honest answers and immediate, meaningful insights
            designed for Indian university students.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {STEPS.map(({ num, icon: Icon, title, subtitle, desc, color, bg, border, items }, i) => (
            <div
              key={num}
              className={`group relative ${bg} border-2 ${border} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Step number watermark */}
              <div className="absolute top-4 right-6 text-7xl font-black text-slate-900/[0.04] select-none pointer-events-none">
                {num}
              </div>

              <div className="relative">
                {/* Icon + number row */}
                <div className="flex items-center space-x-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Step {num}</span>
                    <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
                    <p className={`text-xs font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">{desc}</p>

                {/* Checklist */}
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center space-x-2.5 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector arrow (desktop) */}
              {i % 2 === 0 && i < 2 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full border-2 border-slate-200 items-center justify-center shadow-md">
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-200 text-base"
          >
            <span>Start Assessment Now</span>
            <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
          <p className="mt-3 text-xs text-slate-400 font-medium">Free · Anonymous · Takes ~8 minutes</p>
        </div>
      </div>
    </section>
  );
}

