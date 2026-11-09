import React from 'react';
import { ShieldAlert, PhoneCall, Info } from 'lucide-react';

export default function DisclaimerBanner({ prominent = false }) {
  if (prominent) {
    return (
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 my-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 rounded-2xl bg-amber-200/80 text-amber-950 shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-sm">
            <h4 className="font-extrabold text-amber-950 uppercase tracking-wider text-xs">
              saathi-wellbeing • Official Clinical & Ethical Screening Disclaimer
            </h4>
            <p className="text-amber-900 leading-relaxed text-xs sm:text-sm">
              <strong>saathi-wellbeing (A LITTLE SPACE FOR YOU)</strong> is an academic self-assessment screening tool powered by statistical machine learning models. 
              It is <strong>not</strong> a medical device and does <strong>not</strong> provide psychiatric diagnosis, clinical evaluation, or prescription.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-950 font-semibold">
              <span className="flex items-center space-x-1.5 bg-amber-100/90 px-3 py-1 rounded-lg">
                <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
                <span>Tele-MANAS (Govt of India): <strong>14416 / 1800-891-4416 (24/7 Toll-Free)</strong></span>
              </span>
              <span className="bg-amber-100/90 px-3 py-1 rounded-lg">
                KIRAN Mental Health: <strong>1800-599-0019</strong>
              </span>
              <span className="bg-amber-100/90 px-3 py-1 rounded-lg">
                Vandrevala Foundation: <strong>9999 666 555</strong>
              </span>
              <span className="bg-amber-100/90 px-3 py-1 rounded-lg">
                Emergency: <strong>112</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start space-x-3">
      <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        <strong>Screening Notice:</strong> saathi-wellbeing provides confidential educational screening for Indian university students. It does not replace clinical healthcare consultations. For immediate assistance across India, contact Tele-MANAS at <strong>14416</strong>.
      </p>
    </div>
  );
}
