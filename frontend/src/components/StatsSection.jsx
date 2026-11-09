import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Clock, Stethoscope, AlertCircle, BookOpen } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    number: 150,
    suffix: 'M+',
    label: 'Indians affected by mental health conditions',
    color: 'from-indigo-500 to-violet-600',
    source: 'Lancet, 2017',
  },
  {
    icon: TrendingUp,
    number: 1,
    suffix: ' in 7',
    label: 'College students experience depression annually',
    color: 'from-rose-500 to-pink-600',
    source: 'NIMHANS, 2023',
  },
  {
    icon: Stethoscope,
    number: 1,
    suffix: ' per 1L',
    label: 'Psychiatrist-to-population ratio in India',
    color: 'from-amber-500 to-orange-500',
    source: 'WHO, 2023',
  },
  {
    icon: AlertCircle,
    number: 80,
    suffix: '%',
    label: 'People with mental illness don\'t seek treatment',
    color: 'from-emerald-500 to-teal-600',
    source: 'iCall, 2022',
  },
  {
    icon: Clock,
    number: 11,
    suffix: ' years',
    label: 'Average delay between symptoms & first treatment',
    color: 'from-cyan-500 to-blue-600',
    source: 'WMHD, 2022',
  },
  {
    icon: BookOpen,
    number: 56,
    suffix: '%',
    label: 'Students report academic pressure as top stressor',
    color: 'from-purple-500 to-violet-600',
    source: 'UGC Survey, 2023',
  },
];

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-4xl sm:text-5xl font-black text-white">
      {target === 1 ? '1' : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold px-4 py-2 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Indian Mental Health Statistics</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            The numbers tell a{' '}
            <span className="gradient-text">sobering story.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mental health is a silent crisis in Indian universities. Awareness is the first step.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS.map(({ icon: Icon, number, suffix, label, color, source }, i) => (
            <div
              key={label}
              className={`stat-card bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon with gradient bg */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-5 opacity-90`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <AnimatedCounter target={number} suffix={suffix} inView={inView} />
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{label}</p>
              <p className="text-slate-600 text-[11px] mt-3 font-semibold uppercase tracking-wider">
                Source: {source}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-14 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl p-8 text-center">
          <p className="text-indigo-200 text-sm leading-relaxed max-w-2xl mx-auto">
            <strong className="text-white">You are not alone.</strong> These statistics highlight the
            need for accessible mental health tools. saathi-wellbeing was built to bring evidence-based
            screening to every Indian student — instantly, privately, and freely.
          </p>
        </div>
      </div>
    </section>
  );
}

