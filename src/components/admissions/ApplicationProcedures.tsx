import {
  Monitor, Search, Users, FileText, CreditCard, Award, FileCheck,
  CheckCircle, Plane, Home, Car, AlertTriangle, Mail, Globe
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const steps = [
  {
    step: 1,
    title: 'Free Online Application',
    icon: Monitor,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-400/30',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Choose your path. Visit our website to submit your details via our free online portal. If you are unsure which academic or vocational programme is right for your career goals, contact our International Office at{' '}
          <a href="mailto:International@oxfordskillscenter.co.uk" className="text-primary font-semibold hover:underline">International@oxfordskillscenter.co.uk</a> for expert guidance.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start mt-3">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800"><span className="font-bold">Note:</span> Have your digital copies of academic transcripts, passport, and photographs ready for upload.</p>
        </div>
      </>
    ),
  },
  {
    step: 2,
    title: 'Academic Review & Screening',
    icon: Search,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-400/30',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Once submitted, our admissions committee performs a thorough <span className="font-semibold text-foreground">Academic Screening</span>. We verify your previous qualifications and ensure you meet the baseline entry requirements for your chosen level of study (Bachelors, Masters, or PhD).
      </p>
    ),
  },
  {
    step: 3,
    title: 'Faculty Interview & Assessment',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    borderColor: 'border-violet-400/30',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Success at our institute is based on more than just grades. You will be invited for an <span className="font-semibold text-foreground">Assessment Interview</span> with a faculty member. This is a friendly conversation to discuss your goals and ensure the programme aligns with your professional aspirations.
      </p>
    ),
  },
  {
    step: 4,
    title: 'Secure Your Conditional Offer',
    icon: FileText,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    borderColor: 'border-amber-400/30',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        If you pass the interview and review, a <span className="font-semibold text-foreground">Conditional Acceptance Letter</span> will be emailed to you. This letter outlines the remaining requirements you need to meet—such as final exam results or English proficiency scores—and provides instructions on your next steps.
      </p>
    ),
  },
  {
    step: 5,
    title: 'Fee Submission & Seat Reservation',
    icon: CreditCard,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    borderColor: 'border-teal-400/30',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        To secure your placement, you must follow the instructions in your Conditional Letter to make your <span className="font-semibold text-foreground">Deposit Payment</span>. This step is vital to reserve your seat in the upcoming intake and signals your formal commitment to the programme.
      </p>
    ),
  },
  {
    step: 6,
    title: 'Receive Your Unconditional Letter',
    icon: Award,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    borderColor: 'border-rose-400/30',
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Once your final documents are verified and your deposit is received, we will issue your <span className="font-semibold text-foreground">Unconditional Letter (Final Acceptance)</span> within 2 working days. At this stage, you are officially a student of the Oxford Skills Center of Technology!
      </p>
    ),
  },
  {
    step: 7,
    title: 'CAS Statement & Visa Support',
    icon: FileCheck,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    borderColor: 'border-indigo-400/30',
    content: (
      <>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Finally, our team will generate your <span className="font-semibold text-foreground">CAS (Confirmation of Acceptance for Studies)</span> statement. This is the essential digital document required for your UK Student Visa application. Our International Office will also provide support regarding:
        </p>
        <div className="mt-3 space-y-2">
          {[
            { icon: Globe, label: 'Transit Visas', detail: 'Checking requirements for your specific nationality.' },
            { icon: Home, label: 'Accommodation', detail: 'Booking your room in our student residence.' },
            { icon: Car, label: 'Airport Transfers', detail: 'Coordinating your arrival at the airport to ensure a smooth transition to your new student life.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-muted/60 rounded-lg p-3 border border-border">
              <item.icon size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-foreground">{item.label}:</span>{' '}
                <span className="text-xs text-muted-foreground">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

const roadmapSteps = [
  { step: 1, title: "Free Online Application", desc: "Submit your details online.", icon: Monitor },
  { step: 2, title: "Review", desc: "Academic screening process.", icon: Search },
  { step: 3, title: "Interview", desc: "Assessment with faculty.", icon: Users },
  { step: 4, title: "Conditional Offer", desc: "Receive provisional acceptance.", icon: FileText },
  { step: 5, title: "Fee Submission", desc: "Secure your study seat.", icon: CreditCard },
  { step: 6, title: "Unconditional Letter", desc: "Final Acceptance Letter.", icon: Award },
  { step: 7, title: "CAS Statement", desc: "Visa support document.", icon: FileCheck },
];

const chunkArray = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const ApplicationProcedures = () => {
  const isMobile = useIsMobile();
  const roadRows = chunkArray(roadmapSteps, 3);

  return (
    <div id="application-procedures" className="space-y-8 animate-fadeIn scroll-mt-4">
      {/* Roadmap */}
      <div className="bg-muted rounded-xl border border-border py-12 px-4 shadow-sm overflow-hidden">
        <h2 className="text-2xl font-bold text-foreground mb-12 text-center">Your Roadmap to Success</h2>
        <div className="max-w-4xl mx-auto relative px-4">
          {/* Mobile */}
          <div className="md:hidden space-y-8 relative">
            <div className="absolute left-6 top-2 bottom-2 w-1 bg-border" />
            {roadmapSteps.map((item) => (
              <div key={item.step} className="flex gap-6 relative">
                <div className="w-12 h-12 shrink-0 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary font-bold shadow-sm z-10 relative">
                  <item.icon size={20} />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-card text-[10px] flex items-center justify-center rounded-full border-2 border-card">{item.step}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border shadow-sm flex-1">
                  <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop */}
          <div className="hidden md:block space-y-16">
            {roadRows.map((row, rowIndex) => {
              const isEvenRow = rowIndex % 2 !== 0;
              return (
                <div key={rowIndex} className="relative">
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-border rounded-full -translate-y-1/2 -z-10">
                    <div className="w-full h-full border-t border-dashed border-border/60 mt-2" />
                  </div>
                  {rowIndex < roadRows.length - 1 && (
                    <div className={`absolute top-1/2 h-20 w-20 border-4 border-border -z-20 ${isEvenRow ? 'left-0 rounded-l-full border-r-0' : 'right-0 rounded-r-full border-l-0'}`} style={{ height: 'calc(100% + 4rem + 10px)' }} />
                  )}
                  <div className={`flex justify-around ${isEvenRow ? 'flex-row-reverse' : 'flex-row'}`}>
                    {row.map((item) => (
                      <div key={item.step} className="group relative w-48 text-center bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10">
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-foreground text-card font-bold rounded-full flex items-center justify-center border-4 border-muted shadow-md z-20">{item.step}</div>
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon size={24} />
                        </div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-[11px] text-muted-foreground leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className={`flex ${roadRows.length % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12'} pt-4`}>
              <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                <CheckCircle size={16} /> Ready to Start?
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="International students"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 mb-3">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            7-Step Process
          </div>
          <h2 className="text-xl md:text-2xl font-bold leading-snug mb-2">
            International Application Procedure at<br />
            <span className="text-emerald-400">Oxford Skills Center of Technology LTD</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Through the streamlined efficiency of global standards with our rigorous academic 7-step process, we have created a clear path for your journey to the United Kingdom. Follow these steps to secure your future.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
          >
            <div className="flex items-stretch">
              {/* Step number sidebar */}
              <div className={`${item.bg} flex flex-col items-center justify-center px-4 md:px-6 border-r ${item.borderColor}`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 ${item.borderColor} flex items-center justify-center shadow-sm`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground mt-1">STEP</span>
                <span className={`text-lg font-black ${item.color}`}>{item.step}</span>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 md:p-5">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{item.title}</h3>
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Arrival Information */}
      <div className="bg-slate-900 rounded-xl p-5 md:p-6 text-white">
        <div className="flex items-start gap-3">
          <Plane size={22} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-base mb-2">Important Arrival Information</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Once your visa is granted, please send a copy of your <span className="text-emerald-400 font-semibold">Flight Ticket</span> to the International Office team at least <span className="text-white font-semibold">2 days before you travel</span>. This allows us to finalize your welcome package and airport pickup services.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Mail size={14} className="text-emerald-400" />
              <span>Send to: <a href="mailto:International@oxfordskillscenter.co.uk" className="text-emerald-400 hover:underline">International@oxfordskillscenter.co.uk</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcedures;
