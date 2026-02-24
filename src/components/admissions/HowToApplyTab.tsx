import {
  Globe, MousePointerClick, FileText, Search, Users,
  FileCheck, CreditCard, Award, FileCheck2, Plane,
  AlertTriangle, List
} from 'lucide-react';

const phases = [
  {
    title: 'Phase 1: The Application',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-400/30',
    bg: 'bg-emerald-50',
    steps: [
      {
        step: 1,
        title: 'Visit Our Portal',
        icon: Globe,
        content: 'Go to our official website to explore our programs and find the course that matches your career goals.',
      },
      {
        step: 2,
        title: 'Start Your Journey',
        icon: MousePointerClick,
        content: 'Look for the "Apply Now" button located prominently on the homepage or under the admissions tab.',
      },
      {
        step: 3,
        title: 'Submit Your Details',
        icon: FileText,
        content: 'Fill out the online application form with your personal and academic information. Ensure all contact details are accurate, then click Submit.',
      },
    ],
  },
  {
    title: 'Phase 2: Evaluation & Selection',
    color: 'text-blue-600',
    borderColor: 'border-blue-400/30',
    bg: 'bg-blue-50',
    steps: [
      {
        step: 4,
        title: 'Academic Review',
        icon: Search,
        content: 'Once your form is received, our admissions team performs an eligibility check. We review your transcripts and qualifications to ensure you meet the standards for your chosen level of study.',
      },
      {
        step: 5,
        title: 'Interview & Assessment',
        icon: Users,
        content: 'Shortlisted candidates will be invited for a discussion with our faculty experts. This assessment helps us understand your professional aspirations and suitability for the program.',
      },
    ],
  },
  {
    title: 'Phase 3: Acceptance & Enrollment',
    color: 'text-violet-600',
    borderColor: 'border-violet-400/30',
    bg: 'bg-violet-50',
    steps: [
      {
        step: 6,
        title: 'Conditional Offer',
        icon: FileCheck,
        content: 'If successful, you will receive a Conditional Offer Letter. This secures your provisional spot while you work on meeting any remaining requirements (such as final grades or English proficiency).',
      },
      {
        step: 7,
        title: 'Fee Submission',
        icon: CreditCard,
        content: 'To confirm your intention to study and officially secure your seat, you must pay the required deposit as outlined in your offer letter.',
      },
      {
        step: 8,
        title: 'Unconditional Letter',
        icon: Award,
        content: 'Once all conditions are met and your deposit is verified, we will issue your Unconditional Letter. This is your final, formal acceptance into the institute.',
      },
    ],
  },
  {
    title: 'Phase 4: Visa & Arrival',
    color: 'text-amber-600',
    borderColor: 'border-amber-400/30',
    bg: 'bg-amber-50',
    steps: [
      {
        step: 9,
        title: 'CAS & Visa Support',
        icon: FileCheck2,
        content: 'With your final acceptance in hand, we will issue your CAS (Confirmation of Acceptance for Studies). Our team will provide the necessary support as you begin your UK visa application and travel preparations.',
      },
      {
        step: 10,
        title: 'Fly and Admit',
        icon: Plane,
        content: 'Once your visa is granted, book your flight! Upon arrival, complete your final registration at the institute and start your journey toward global success.',
      },
    ],
  },
];

const HowToApplyTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          <List size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">How to Apply</h3>
          <p className="text-sm text-muted-foreground mt-0.5">10 clear steps to secure your future</p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Joining the Oxford Skills Center of Technology is a straightforward process designed to guide you from your initial interest to your first day on campus. Follow these 10 clear steps to secure your future.
      </p>

      {/* Phases */}
      <div className="space-y-6">
        {phases.map((phase, phaseIdx) => (
          <div key={phaseIdx} className="space-y-3">
            {/* Phase header */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${phase.bg} border ${phase.borderColor}`}>
              <span className={`text-sm font-bold ${phase.color}`}>{phase.title}</span>
            </div>

            {/* Steps within phase */}
            <div className="space-y-3 pl-2">
              {phase.steps.map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Step number + icon */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className={`w-10 h-10 rounded-full ${phase.bg} border ${phase.borderColor} flex items-center justify-center`}>
                      <item.icon size={18} className={phase.color} />
                    </div>
                    <span className={`text-xs font-black ${phase.color}`}>{item.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tip box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start">
        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-foreground text-sm">Tip for Applicants</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Make sure to have digital copies of your passport, intermediate/degree certificates, and a professional photograph ready before you reach Step 3 to speed up the process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToApplyTab;
