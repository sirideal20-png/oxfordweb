import { useRef } from 'react';
import { UserPlus, CheckCircle, Clock, FileText, ArrowRight, AlertCircle, Calendar, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const steps = [
  { step: 1, title: 'Log In to Your Account', desc: 'Access the student portal using your OSCT credentials. New students should use the temporary ID sent via email.' },
  { step: 2, title: 'Select Academic Term', desc: 'Choose the current semester or upcoming term you wish to register for from the dropdown menu.' },
  { step: 3, title: 'Choose Your Modules', desc: 'Browse available modules by programme. Core modules are pre-selected; choose your electives carefully.' },
  { step: 4, title: 'Review & Confirm', desc: 'Double-check your module selections, timetable conflicts, and credit hours before confirming.' },
  { step: 5, title: 'Payment Confirmation', desc: 'Ensure tuition fees are cleared or a payment plan is in place. Registration locks upon confirmation.' },
];

const quickLinks = [
  { label: 'Module Catalogue 2026', icon: FileText },
  { label: 'Timetable Viewer', icon: Calendar },
  { label: 'Registration FAQ', icon: Info },
  { label: 'Academic Advisor Contact', icon: UserPlus },
];

const OnlineRegistrationPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><UserPlus size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Online Registration</h1>
              <p className="text-blue-100 mt-1">Course Enrolment & Semester Registration Portal</p>
            </div>
          </div>
          <p className="text-blue-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Register for your modules, manage your academic schedule, and confirm your enrolment for the upcoming semester at Oxford Skills Center of Technology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search registration topics…" />

        {/* Registration Status Banner */}
        <div data-searchable className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex items-start gap-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg text-emerald-600 shrink-0"><CheckCircle size={22} /></div>
          <div>
            <h3 className="font-bold text-foreground text-sm">Admissions Open — September 2026 Intake</h3>
            <p className="text-muted-foreground text-xs mt-1">Applications for the September 2026 intake are now open. Application Deadline: <strong>30 March 2026</strong>. Late applications will not be accepted.</p>
          </div>
        </div>

        {/* How to Register */}
        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">How to Register — Step by Step</h2>
          <div className="space-y-3">
            {steps.map((s) => (
              <div key={s.step} data-searchable className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Calendar size={18} className="text-primary" /> Key Registration Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { date: 'Now Open', event: 'September 2026 Applications Open' },
              { date: '30 Mar 2026', event: 'Application Deadline' },
              { date: '07 Sep 2026', event: 'Orientation & Welcome Week' },
              { date: '14 Sep 2026', event: 'Fall Semester Classes Begin' },
              { date: '26 Oct 2026', event: 'Fall Mid-Term Exams Start' },
              { date: '14 Dec 2026', event: 'Fall Final Exams Start' },
            ].map((d) => (
              <div key={d.event} data-searchable className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Clock size={14} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">{d.date}</p>
                  <p className="text-[11px] text-muted-foreground">{d.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">Important Notice</h3>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">Students with outstanding fees from previous semesters will be unable to register until balances are cleared. Contact the Finance Office at <strong>support@oxfordskillscenter.co.uk</strong> for payment plan enquiries.</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <div key={link.label} data-searchable className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer text-center">
                <link.icon size={20} className="mx-auto text-primary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineRegistrationPage;
