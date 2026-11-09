import React from 'react';
import { HeartPulse, Phone, ExternalLink, Heart, Shield, Lock } from 'lucide-react';

const HELPLINES = [
  { name: 'Tele-MANAS', number: '14416', desc: '24/7 Govt. Helpline', color: 'emerald' },
  { name: 'KIRAN', number: '1800-599-0019', desc: 'Free Mental Health', color: 'blue' },
  { name: 'Vandrevala', number: '9999 666 555', desc: 'Crisis Support', color: 'purple' },
  { name: 'Emergency', number: '112', desc: 'National Emergency', color: 'red' },
];

const LINKS = {
  Platform: ['About saathi-wellbeing', 'How It Works', 'Take Assessment', 'Privacy Policy'],
  'Mental Health': ['Depression Resources', 'Anxiety Support', 'Stress Management', 'Crisis Help'],
  Universities: ['DAVV Indore', 'Campus Counseling', 'Student Welfare', 'Academic Support'],
};

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Crisis strip */}
      <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-extrabold text-sm">In Crisis? Help is one call away.</p>
                <p className="text-indigo-200 text-xs">Free, confidential, 24/7 support across India</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {HELPLINES.map((h) => (
                <div key={h.name} className="glass text-center px-4 py-2 rounded-xl min-w-[110px]">
                  <p className="text-white font-black text-sm">{h.number}</p>
                  <p className="text-indigo-200 text-[10px] font-semibold uppercase tracking-wider">{h.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                <HeartPulse className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <p className="font-extrabold text-xl text-white tracking-tight">
                  saathi<span className="text-indigo-400">-wellbeing</span>
                </p>
                <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">
                  A Little Space For You
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An AI-powered student mental health screening platform built for Indian universities.
              Clinically validated scales, private by design, and always free.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Shield, label: 'PHQ-9 Validated' },
                { icon: Lock, label: 'No Data Stored' },
                { icon: Heart, label: 'Made with Care' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center space-x-1.5 bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-700"
                >
                  <Icon className="w-3 h-3 text-indigo-400" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2024 saathi-wellbeing. Built for Indian students with ❤️ — Devi Ahilya Vishwavidyalaya, Indore.
          </p>
          <p className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-slate-600" />
            <span>For educational screening only. Not a clinical diagnosis tool.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

