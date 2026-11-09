import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Brain,
  HeartHandshake,
  Star,
  ChevronDown,
} from 'lucide-react';

const TRUST_PILLS = [
  { icon: ShieldCheck, text: 'PHQ-9 · GAD-7 · PSS-10 Validated Scales', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { icon: Brain, text: 'ML-Powered Risk Assessment', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { icon: HeartHandshake, text: 'Private & Confidential — No Data Stored', color: 'bg-violet-50 text-violet-700 border-violet-200' },
];

const FLOATING_SHAPES = [
  { size: 'w-72 h-72', pos: 'top-10 -left-16', color: 'bg-indigo-200/30', anim: 'animate-float', delay: '' },
  { size: 'w-48 h-48', pos: 'top-32 right-10', color: 'bg-violet-200/25', anim: 'animate-float-slow', delay: 'delay-300' },
  { size: 'w-32 h-32', pos: 'bottom-24 left-1/4', color: 'bg-cyan-200/20', anim: 'animate-float', delay: 'delay-500' },
  { size: 'w-56 h-56', pos: '-bottom-10 right-1/4', color: 'bg-purple-200/20', anim: 'animate-float-slow', delay: 'delay-200' },
];

const STATS = [
  { number: '150M+', label: 'Indians Affected' },
  { number: '1 in 7', label: 'College Students' },
  { number: '3', label: 'Validated Scales' },
  { number: '100%', label: 'Free & Private' },
];

export default function HeroSection({ onStartAssessment }) {
  const sectionRef = useRef(null);

  const scrollToNext = () => {
    const next = document.getElementById('features-section');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen hero-mesh flex flex-col items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Floating decorative orbs */}
      {FLOATING_SHAPES.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.pos} ${s.size} ${s.color} ${s.anim} ${s.delay} rounded-full blur-3xl pointer-events-none`}
        />
      ))}

      {/* Rotating ring accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[700px] h-[700px] border border-indigo-200/30 rounded-full animate-spin-slow opacity-40" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full animate-fade-in-up shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>India's AI Student Mental Wellness Screener</span>
          <span className="ml-1 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black tracking-wider">Beta</span>
        </div>

        {/* Headline */}
        <div className="space-y-3 animate-fade-in-up delay-100">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Your mental health{' '}
            <span className="relative inline-block">
              <span className="gradient-text">matters.</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8" viewBox="0 0 200 8" preserveAspectRatio="none"
              >
                <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="url(#ul)" strokeWidth="3" fill="none" />
                <defs>
                  <linearGradient id="ul" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Take a clinically-validated mental health screening — private, free, and built specifically
            for <strong className="text-slate-700">Indian university students</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <button
            onClick={onStartAssessment}
            className="group relative flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 text-base animate-pulse-glow"
          >
            <span>Start Free Assessment</span>
            <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex items-center space-x-2 text-slate-600 hover:text-indigo-700 font-semibold text-sm transition-colors px-4 py-4 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100"
          >
            <span>How it works</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-300">
          {TRUST_PILLS.map(({ icon: Icon, text, color }) => (
            <span
              key={text}
              className={`flex items-center space-x-1.5 ${color} border text-xs font-semibold px-3.5 py-2 rounded-full`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{text}</span>
            </span>
          ))}
        </div>

        {/* Floating stats bar */}
        <div className="mt-10 mx-auto max-w-2xl animate-fade-in-up delay-400">
          <div className="glass rounded-3xl shadow-xl shadow-indigo-100/60 px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 border border-white/60">
            {STATS.map(({ number, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-indigo-700 tracking-tight">{number}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rating row */}
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 animate-fade-in-up delay-500">
          <div className="flex -space-x-1">
            {['bg-indigo-400','bg-violet-400','bg-cyan-400','bg-emerald-400','bg-orange-400'].map((c, i) => (
              <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>
            <strong className="text-slate-700">500+ students</strong> screened this month
          </span>
          <div className="flex items-center space-x-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-slate-400 hover:text-indigo-500 transition-colors animate-fade-in-up delay-700"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}

