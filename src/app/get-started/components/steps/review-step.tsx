import { OnboardingData } from "../onboarding-wizard";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Building2, Users, BookOpen, CreditCard, ArrowLeft, Rocket, Bell } from "lucide-react";

type Props = { data: OnboardingData; onBack: () => void; onComplete: () => void; submitting: boolean; goToStep: (step: number) => void; error?: string };

function SummaryCard({ icon, title, lines, onEdit }: { icon: React.ReactNode; title: string; lines: string[]; onEdit: () => void }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 relative group">
      <button 
        onClick={onEdit}
        className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        [ Edit ]
      </button>
      <div className="flex items-center gap-2 text-xs font-black text-white/50 uppercase tracking-widest">
        {icon} {title}
      </div>
      <ul className="space-y-1">
        {lines.map((l, i) => (
          <li key={i} className="text-sm text-white/80 flex items-start gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" /> 
            <span dangerouslySetInnerHTML={{ __html: l }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewStep({ data, onBack, onComplete, submitting, goToStep, error }: Props) {
  const activeNotifications = Object.entries(data.notifications || {})
    .filter(([_, active]) => active)
    .map(([key]) => key === 'appPush' ? 'Mobile App' : key.toUpperCase());

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-white space-y-6">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-200 p-4 rounded-xl text-sm font-bold flex items-start gap-3">
          <Rocket className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
          <Rocket className="h-3.5 w-3.5" /> Final Review
        </div>
        <h2 className="text-2xl font-black">Review Your Setup</h2>
        <p className="text-white/50 text-sm">Everything looks good. Review the details below before we generate your school.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar">
        <SummaryCard
          icon={<Building2 className="h-3.5 w-3.5" />}
          title="School"
          onEdit={() => goToStep(1)}
          lines={[
            `<b>${data.school.name || "(Unnamed)"}</b>`,
            `${data.school.schoolType || "Private"} Institution`,
            `${data.school.city}, ${data.school.subcity}`,
            `Admin: ${data.admin?.name} (${data.admin?.email})`,
          ]}
        />
        
        <SummaryCard
          icon={<Building2 className="h-3.5 w-3.5" />}
          title="Campuses"
          onEdit={() => goToStep(2)}
          lines={data.branches.map(b => `<b>${b.name}</b> (${b.subcity}) - ${b.capacity} cap`)}
        />

        <SummaryCard
          icon={<BookOpen className="h-3.5 w-3.5" />}
          title="Grades & Subjects"
          onEdit={() => goToStep(3)}
          lines={[
            `<b>${data.grades.length} Grades</b> offered`,
            `Total of <b>${Object.values(data.sections || {}).flat().length} sections</b>`,
            `<b>${data.subjects.length} Subjects</b> configured`,
          ]}
        />
        
        <SummaryCard
          icon={<Users className="h-3.5 w-3.5" />}
          title="People"
          onEdit={() => goToStep(6)}
          lines={[
            `<b>${data.staff.length} Staff</b> ready for import`,
            `<b>${data.students.length} Students</b> mapped`,
          ]}
        />

        <SummaryCard
          icon={<CreditCard className="h-3.5 w-3.5" />}
          title="Finance"
          onEdit={() => goToStep(7)}
          lines={[
            `Base fees set for <b>${new Set(data.fees.map(f => f.grade)).size} grades</b>`,
            `<b>${data.fees.length} total fee rules</b> created`,
          ]}
        />

        <SummaryCard
          icon={<Bell className="h-3.5 w-3.5" />}
          title="Notifications"
          onEdit={() => goToStep(8)}
          lines={[
            activeNotifications.length > 0 
              ? `Enabled channels: <b>${activeNotifications.join(', ')}</b>`
              : `<b>No automated notifications</b> enabled`
          ]}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/10">
        <Button onClick={onBack} variant="outline" className="border-white/10 text-white/60 hover:text-white bg-transparent rounded-xl h-14 px-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onComplete}
          disabled={submitting}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl h-14 shadow-lg shadow-emerald-500/20 text-lg"
        >
          {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5" />}
          {submitting ? "Provisioning System..." : "🚀 Complete & Go Live"}
        </Button>
      </div>
    </div>
  );
}
