import React from 'react';
import { AlertTriangle, Phone, LifeBuoy, X } from 'lucide-react';

export default function CrisisModal({ isOpen, onClose, crisisMessage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-red-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Support Is Available Right Now In India
            </h3>
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider">
              saathi-wellbeing • Immediate Care
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {crisisMessage ||
            'Your responses indicate high psychological distress or thoughts of self-harm. Please remember that you do not have to carry this alone. Free, confidential support is available 24/7 across India in Hindi, English, and regional languages.'}
        </p>

        {/* Indian Helplines */}
        <div className="space-y-2.5 bg-red-50/70 border border-red-100 rounded-2xl p-4 text-xs font-bold text-slate-800">
          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span>Tele-MANAS (Govt of India, 24/7):</span>
            </span>
            <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-md font-mono">14416 / 1800-891-4416</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <LifeBuoy className="w-4 h-4 text-red-600" />
              <span>KIRAN Mental Health Helpline:</span>
            </span>
            <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-md font-mono">1800-599-0019</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span>Vandrevala Foundation (WhatsApp / Call):</span>
            </span>
            <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-md font-mono">9999 666 555</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span>AASRA 24/7 Suicide Prevention:</span>
            </span>
            <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-md font-mono">+91-9820466726</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="tel:14416"
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs text-center shadow-md shadow-red-200 transition"
          >
            Call Tele-MANAS (14416)
          </a>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
          >
            Review Assessment Report
          </button>
        </div>
      </div>
    </div>
  );
}
