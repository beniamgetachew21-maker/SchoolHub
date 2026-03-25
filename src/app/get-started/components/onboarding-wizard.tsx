"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeStep } from "./steps/welcome-step";
import { SchoolSetupStep } from "./steps/school-setup-step";
import { BranchSetupStep } from "./steps/branch-setup-step";
import { AcademicSetupStep } from "./steps/academic-setup-step";
import { SubjectsStep } from "./steps/subjects-step";
import { StaffSetupStep } from "./steps/staff-setup-step";
import { StudentImportStep } from "./steps/student-import-step";
import { FeesSetupStep } from "./steps/fees-setup-step";
import { ReviewStep } from "./steps/review-step";
import { GradesStep } from "./steps/grades-step";
import { NotificationsStep } from "./steps/notifications-step";
import { SuccessStep } from "./steps/success-step";
import { completeOnboardingAction } from "@/lib/onboarding-actions";
import { useRouter } from "next/navigation";

export type OnboardingData = {
  school: {
    name: string;
    address: string;
    contactEmail: string;
    contactPhone: string;
    schoolType: "Private" | "Public";
    city: string;
    subcity: string;
    language: string;
    logoUrl: string;
  };
  admin: {
    name: string;
    email: string;
    password: string;
  };
  branches: Array<{ name: string; subcity: string; capacity: number }>;
  academic: {
    yearName: string;
    startDate: string;
    endDate: string;
    terms: Array<{ name: string; startDate: string; endDate: string }>;
  };
  grades: string[];
  sections: Record<string, string[]>;
  subjects: string[];
  staff: Array<{ name: string; email: string; role: string; department: string }>;
  students: Array<{ name: string; email: string; className: string }>;
  fees: Array<{ grade: string; name: string; amount: number; type: string }>;
  notifications: { sms: boolean; appPush: boolean; email: boolean };
};

const INITIAL_DATA: OnboardingData = {
  school: { name: "", address: "", contactEmail: "", contactPhone: "", schoolType: "Private", city: "Addis Ababa", subcity: "", language: "English", logoUrl: "" },
  admin: { name: "", email: "", password: "" },
  branches: [{ name: "Main Campus", subcity: "", capacity: 500 }],
  academic: {
    yearName: "2025/2026",
    startDate: "2025-09-01",
    endDate: "2026-06-30",
    terms: [
      { name: "Term 1", startDate: "2025-09-01", endDate: "2025-12-20" },
      { name: "Term 2", startDate: "2026-01-06", endDate: "2026-06-30" },
    ],
  },
  grades: [],
  sections: {},
  subjects: [],
  staff: [],
  students: [],
  fees: [],
  notifications: { sms: true, appPush: false, email: true },
};

const STEPS = [
  "Welcome", "School Setup", "Branch Setup", "Academic Setup", "Grades",
  "Subjects", "Staff Setup", "Student Import", "Fees Setup", "Notifications", "Review"
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.data || INITIAL_DATA);
        setStep(parsed.step || 0);
      } catch (e) {
        console.error("Failed to load onboarding progress", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized && step < 11) { // Don't save on success step
      localStorage.setItem("onboarding_progress", JSON.stringify({ data, step }));
    }
  }, [data, step, isInitialized]);

  const clearProgress = () => {
    localStorage.removeItem("onboarding_progress");
    setData(INITIAL_DATA);
    setStep(0);
  };

  const updateData = (partial: Partial<OnboardingData>) => setData(prev => ({ ...prev, ...partial }));

  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const goPrev = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  const handleComplete = async () => {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await completeOnboardingAction(data as any); 
      if (res.success) { 
        goNext(); // Move to Step 12 (Success)
      } else {
        setErrorMsg(res.error || "Something went wrong during setup.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepProps = { data, updateData, onNext: goNext, onBack: goPrev };

  const stepComponents = [
    <WelcomeStep key="welcome" onNext={goNext} onReset={clearProgress} hasSavedProgress={step > 0} />, // 0
    <SchoolSetupStep key="school" {...stepProps} />, // 1
    <BranchSetupStep key="branches" {...stepProps} />, // 2
    <AcademicSetupStep key="academic" {...stepProps} />, // 3
    <GradesStep key="grades" {...stepProps} />, // 4
    <SubjectsStep key="subjects" {...stepProps} />, // 5
    <StaffSetupStep key="staff" {...stepProps} />, // 6
    <StudentImportStep key="students" {...stepProps} />, // 7
    <FeesSetupStep key="fees" {...stepProps} />, // 8
    <NotificationsStep key="notifications" {...stepProps} />, // 9
    <ReviewStep key="review" data={data} onBack={goPrev} onComplete={handleComplete} submitting={submitting} goToStep={setStep} error={errorMsg} />, // 10
    <SuccessStep key="success" /> // 11
  ];

  const progressPct = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl">
      {/* Progress Header - Hide on Success step */}
      {step < 11 && (
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white/50 uppercase tracking-widest">
            <span>Step {step + 1} of {STEPS.length}</span>
            <span className="text-emerald-400">{STEPS[step]}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${i <= step ? "bg-emerald-400" : "bg-white/10"} transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {stepComponents[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
