import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Lock, Stethoscope, RefreshCw, Users, Lightbulb } from 'lucide-react';

const FAQS = [
  {
    icon: Stethoscope,
    q: 'Is saathi-wellbeing a medical diagnosis tool?',
    a: 'No. saathi-wellbeing is strictly an educational screening and awareness tool. It uses clinically validated questionnaires (PHQ-9, GAD-7, PSS-10) to give you a general sense of your mental wellbeing. The results are NOT a clinical diagnosis. Only a qualified mental health professional (psychiatrist, clinical psychologist) can diagnose a mental health condition. If your results indicate moderate or high risk, please consult a healthcare professional.',
  },
  {
    icon: Lock,
    q: 'Is my data private? What happens to my answers?',
    a: 'Absolutely private. Your survey responses are sent to the AI model on your local device or server for processing and are NEVER stored in any database. We do not collect, save, or transmit your personal information. No account or registration is required. Once you close your browser session, your data is gone. Privacy is a core design principle of saathi-wellbeing.',
  },
  {
    icon: Shield,
    q: 'How accurate is the AI assessment?',
    a: 'The AI models are trained on validated dataset using the same PHQ-9, GAD-7, and PSS-10 scales used by healthcare professionals. However, accuracy depends on the honesty of your responses and the quality of training data. The tool should be treated as a screening guide, not a definitive measure. It is most useful as a first step to understand if you might benefit from professional support — not as a replacement for clinical evaluation.',
  },
  {
    icon: Users,
    q: 'Who is this platform designed for?',
    a: 'saathi-wellbeing is built specifically for Indian university students. It supports 15 major Indian universities including DAVV (Indore), IITs, NITs, Delhi University, BHU, JNU, BITS Pilani, and more. The CGPA scale uses the standard Indian 10-point system. All crisis resources are Indian helplines (Tele-MANAS, KIRAN, Vandrevala Foundation). Anyone can use it, but the design and context are tailored for the Indian student experience.',
  },
  {
    icon: RefreshCw,
    q: 'Can I retake the assessment multiple times?',
    a: 'Yes! You can take the assessment as many times as you like. Mental health is dynamic — it changes with stress, seasons, relationships, and academic pressures. We recommend retaking it whenever you feel your mental state has changed significantly, or at the start and end of each semester as a periodic check-in. There are no limits and no charge.',
  },
  {
    icon: Lightbulb,
    q: 'What should I do with my results?',
    a: 'If your results show Minimal or Low risk: Great! Maintain healthy habits, stay connected with friends, exercise, and sleep well. If results show Mild or Moderate risk: Consider speaking to a trusted friend, faculty counselor, or university wellness center. If results show High or Severe risk: Please reach out to a professional immediately. Contact Tele-MANAS (14416), KIRAN (1800-599-0019), or Vandrevala Foundation (9999 666 555) — all free, confidential, and 24/7.',
  },
  {
    icon: HelpCircle,
    q: 'Why do Indian students face mental health challenges?',
    a: 'Indian university students face a unique combination of pressures: intense academic competition (JEE, NEET, GATE, placements), family expectations, financial stress, hostel life away from home, language and cultural transitions, lack of mental health awareness, and social stigma around seeking help. saathi-wellbeing was created with the Indian student context in mind to provide a judgment-free, anonymous first step toward awareness and support.',
  },
  {
    icon: Shield,
    q: 'Is saathi-wellbeing affiliated with any university?',
    a: 'saathi-wellbeing is an independent educational platform. It is not officially affiliated with or endorsed by any Indian university, government body, or healthcare institution. It is a student-focused initiative built to democratize access to mental health screening tools. For official mental health support, please use your university\'s counseling center or the government Tele-MANAS helpline.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  const Icon = faq.icon;
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-indigo-200 bg-indigo-50/40 shadow-md shadow-indigo-100/50'
          : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
      }`}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        onClick={() => onToggle(index)}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`font-bold text-sm leading-snug ${isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
            {faq.q}
          </span>
        </div>
        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div
        className="faq-answer px-6"
        style={{
          maxHeight: isOpen ? '400px' : '0',
          paddingBottom: isOpen ? '20px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, padding 0.25s ease',
        }}
      >
        <p className="text-slate-600 text-sm leading-relaxed border-t border-indigo-100 pt-4">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ onStartAssessment }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq-section" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Got questions?{' '}
            <span className="gradient-text">We have answers.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about saathi-wellbeing, your privacy, and how to use your results.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-center shadow-2xl shadow-indigo-200">
          <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-3">Still have questions?</p>
          <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
            The best way to understand is to try it.
          </h3>
          <p className="text-indigo-200 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Take the free, anonymous assessment in under 10 minutes. No registration needed.
          </p>
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center space-x-3 bg-white hover:bg-indigo-50 text-indigo-700 font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 text-base"
          >
            <span>Start Assessment</span>
            <span className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

