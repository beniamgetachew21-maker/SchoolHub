import OnboardingWizard from "./components/onboarding-wizard";

export const metadata = {
  title: "Get Started — Studio School",
  description: "Set up your school in minutes with our guided onboarding wizard.",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex items-center justify-center p-4">
      <OnboardingWizard />
    </div>
  );
}
