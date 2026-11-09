import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import StepProgressBar from './components/StepProgressBar';
import DemographicsStep from './components/DemographicsStep';
import SurveyStep from './components/SurveyStep';
import ResultsDashboard from './components/ResultsDashboard';
import CrisisModal from './components/CrisisModal';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import StatsSection from './components/StatsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

import {
  PSS_QUESTIONS,
  PSS_OPTIONS,
  GAD_QUESTIONS,
  GAD_PHQ_OPTIONS,
  PHQ_QUESTIONS,
  PRESET_PROFILES,
} from './utils/surveyData';
import { submitAssessment, checkServerHealth } from './utils/api';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const INITIAL_FORM_DATA = {
  Age: '',
  Gender: '',
  University: '',
  Department: '',
  Academic_Year: '',
  Current_CGPA: '',
  waiver_or_scholarship: 'No',
};

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'assessment' | 'results'
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('unknown');
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  // Check health of backend on mount
  useEffect(() => {
    async function verifyHealth() {
      const res = await checkServerHealth();
      setServerStatus(res.status === 'healthy' ? 'healthy' : 'degraded');
    }
    verifyHealth();
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const handleSelectPreset = (presetData) => {
    setFormData(presetData);
    setError(null);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setResults(null);
    setStep(1);
    setError(null);
    setView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await submitAssessment(formData);
      setResults(response);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger crisis modal if PHQ9 indicated self-harm or critical risk
      if (response.overall_summary?.crisis_flag) {
        setShowCrisisModal(true);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setError(
        err.message || 'Failed to submit mental health screening. Please check backend connection.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        serverStatus={serverStatus}
        onReset={handleReset}
        currentView={view}
        setView={setView}
      />

      {/* VIEW: HOME LANDING PAGE */}
      {view === 'home' && (
        <div className="flex-1 animate-fade-in">
          <HeroSection
            onStartAssessment={() => {
              setView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <FeaturesSection />
          <HowItWorksSection
            onStartAssessment={() => {
              setView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <StatsSection />
          <FAQSection
            onStartAssessment={() => {
              setView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* VIEW: ASSESSMENT WIZARD */}
      {view === 'assessment' && (
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          {/* Back button */}
          <div className="mb-4">
            <button
              onClick={handleNavigateHome}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Screening Disclaimer Notice */}
          <div className="mb-6">
            <DisclaimerBanner prominent={false} />
          </div>

          {/* Global Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start space-x-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Error:</strong> {error}
              </div>
            </div>
          )}

          {/* Step Navigation Progress */}
          <StepProgressBar
            currentStep={step}
            setStep={setStep}
            totalSteps={4}
          />

          {/* STEP 1: Demographics */}
          {step === 1 && (
            <DemographicsStep
              formData={formData}
              onChange={handleFieldChange}
              onNext={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* STEP 2: Perceived Stress Scale (PSS-10) */}
          {step === 2 && (
            <SurveyStep
              title="Perceived Stress Scale (PSS-10)"
              subtitle="The questions in this scale ask you about your feelings and thoughts during the last month. In each case, indicate how often you felt or thought a certain way."
              badgeText="Scale 1 of 3 • PSS-10"
              scaleInfo="Likert Scale: 0 = Never | 1 = Almost Never | 2 = Sometimes | 3 = Fairly Often | 4 = Very Often"
              questions={PSS_QUESTIONS}
              options={PSS_OPTIONS}
              formData={formData}
              onChange={handleFieldChange}
              onBack={() => {
                setStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNext={() => {
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* STEP 3: Generalized Anxiety Disorder (GAD-7) */}
          {step === 3 && (
            <SurveyStep
              title="Generalized Anxiety Disorder Scale (GAD-7)"
              subtitle="Over the last 2 weeks, how often have you been bothered by the following problems?"
              badgeText="Scale 2 of 3 • GAD-7"
              scaleInfo="Likert Scale: 0 = Not at all | 1 = Several days | 2 = More than half the days | 3 = Nearly every day"
              questions={GAD_QUESTIONS}
              options={GAD_PHQ_OPTIONS}
              formData={formData}
              onChange={handleFieldChange}
              onBack={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNext={() => {
                setStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* STEP 4: Patient Health Questionnaire (PHQ-9) */}
          {step === 4 && (
            <SurveyStep
              title="Patient Health Questionnaire (PHQ-9)"
              subtitle="Over the last 2 weeks, how often have you been bothered by any of the following problems?"
              badgeText="Scale 3 of 3 • PHQ-9"
              scaleInfo="Likert Scale: 0 = Not at all | 1 = Several days | 2 = More than half the days | 3 = Nearly every day"
              questions={PHQ_QUESTIONS}
              options={GAD_PHQ_OPTIONS}
              formData={formData}
              onChange={handleFieldChange}
              onBack={() => {
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNext={handleSubmit}
              isFinalStep={true}
              isLoading={isLoading}
            />
          )}
        </main>
      )}

      {/* VIEW: RESULTS DASHBOARD */}
      {view === 'results' && results && (
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          {/* Back button */}
          <div className="mb-4">
            <button
              onClick={handleNavigateHome}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <ResultsDashboard
            result={results}
            onRetake={handleReset}
          />
        </main>
      )}

      {/* Safety / Crisis Alert Modal */}
      <CrisisModal
        isOpen={showCrisisModal}
        onClose={() => setShowCrisisModal(false)}
        crisisMessage={results?.overall_summary?.crisis_message}
      />

      {/* Footer across all pages */}
      <Footer onNavigate={setView} />
    </div>
  );
}
