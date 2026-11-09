import React, { useState } from 'react';
import { HeartPulse, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Menu, X } from 'lucide-react';
import { PRESET_PROFILES } from '../utils/surveyData';

export default function Navbar({ onSelectPreset, serverStatus, onReset, currentView, setView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                saathi<span className="text-indigo-600">-wellbeing</span>
              </span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                India AI
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-indigo-600 tracking-widest uppercase">
              A Little Space For You
            </p>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-indigo-600 ${currentView === 'home' ? 'text-indigo-600 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features-section')}
            className="hover:text-indigo-600 transition-colors"
          >
            Features & Scales
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('stats-section')}
            className="hover:text-indigo-600 transition-colors"
          >
            India Statistics
          </button>
          <button
            onClick={() => handleNavClick('faq-section')}
            className="hover:text-indigo-600 transition-colors"
          >
            FAQs
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Server Status Pill */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 bg-slate-50">
            {serverStatus === 'healthy' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">AI Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-700">Connecting...</span>
              </>
            )}
          </div>

          {/* Preset Demo Profiles Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Presets</span>
            </button>
            <div className="absolute right-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden group-hover:block transition z-50">
              <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Autofill Sample Student Profile
              </div>
              {Object.entries(PRESET_PROFILES).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => {
                    onSelectPreset(profile.data);
                    setView('assessment');
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs hover:bg-indigo-50 hover:text-indigo-700 transition flex flex-col"
                >
                  <span className="font-bold text-slate-800">{profile.title}</span>
                  <span className="text-[11px] text-slate-500">{profile.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          {currentView === 'home' ? (
            <button
              onClick={() => {
                setView('assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
            >
              Back to Home
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setView('home');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features-section')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            Features & Scales
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('stats-section')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            India Statistics
          </button>
          <button
            onClick={() => handleNavClick('faq-section')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
          >
            FAQs
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setView('assessment');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-bold text-sm py-3 rounded-xl shadow-md"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
