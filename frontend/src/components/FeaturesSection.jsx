import React from 'react';
import {
  Brain,
  HeartCrack,
  Flame,
  Lock,
  Sparkles,
  BarChart3,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';

const FEATURES = [
  {
    icon: HeartCrack,
    title: 'Depression Screening',
    subtitle: 'PHQ-9 Scale',
    desc: 'The Patient Health Questionnaire (PHQ-9) is a gold-standard 9-item tool that screens for depressive disorders used globally by clinicians.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    pill: 'bg-rose-100 text-rose-700',
  },
  {
    icon: Brain,
    title: 'Anxiety Assessment',
    subtitle: 'GAD-7 Scale',
    desc: 'The Generalized Anxiety Disorder 7-item scale (GAD-7) is widely validated for detecting anxiety and monitoring symptom severity over time.',
    color: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    pill: 'bg-indigo-100 text-indigo-700',
  },
  {
    icon: Flame,
    title: 'Stress Measurement',
    subtitle: 'PSS-10 Scale',
    desc: 'The Perceived Stress Scale (PSS-10) measures the degree to which situations in your life are perceived as stressful over the past month.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    pill: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Lock,
    title: 'Private by Design',
    subtitle: 'Zero Data Storage',
    desc: 'Your responses are processed locally and never stored. No account required. Complete anonymity guaranteed by design.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    pill: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Sparkles,
    title: 'ML-Powered Insights',
    subtitle: 'Trained AI Models',
    desc: 'Three independent machine learning classifiers provide risk level predictions for each condition with probability-based confidence scores.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    pill: 'bg-violet-100 text-violet-700',
  },
  {
    icon: BarChart3,
    title: 'Detailed Risk Report',
    subtitle: 'Instant Results',
    desc: 'Receive a comprehensive, beautifully presented report card with risk levels, severity indicators, and actionable next steps — instantly.',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
    pill: 'bg-cyan-100 text-cyan-700',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Clinically Validated Tools</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Three scales. One{' '}
            <span className="gradient-text">comprehensive</span> picture.
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            saathi-wellbeing uses the same evidence-based tools trusted by mental health professionals
            worldwide — now accessible to every Indian student.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, subtitle, desc, color, bg, border, pill }, i) => (
            <div
              key={title}
              className={`group relative ${bg} border ${border} rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Gradient blob */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className="relative">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-5`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Badge */}
                <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${pill}`}>
                  {subtitle}
                </span>

                <h3 className="text-lg font-extrabold text-slate-900 mt-3 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

