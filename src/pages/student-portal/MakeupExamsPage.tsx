import { useRef } from 'react';
import { FileQuestion, Calendar, CheckCircle, AlertCircle, FileText, Clock, CreditCard, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const eligibilityCriteria = [
  'Documented medical condition with a certified doctor\'s note dated within the exam period.',
  'Bereavement of an immediate family member (parent, sibling, spouse, or child).',
  'Jury duty or court summons with official documentation.',
  'Representing OSCT or the UK in an official sporting or academic competition.',
  'Visa-related travel requirements for international students (with embassy documentation).',
  'Religious observance conflicts (notify the Registry at least 30 days prior).',
];

const applicationSteps = [
  { step: 'Submit Application', desc: 'Complete the Make-up Exam Application Form online through the Student Portal within 5 working days of the missed exam.', icon: FileText },
  { step: 'Attach Evidence', desc: 'Upload supporting documents (medical certificates, bereavement notice, etc.) in PDF format. Originals may be requested.', icon: FileQuestion },
  { step: 'Pay Admin Fee', desc: 'A non-refundable administrative fee of £35 per examination is required. Fee waiver available for medical cases.', icon: CreditCard },
  { step: 'Receive Confirmation', desc: 'The Examinations Office will review your application within 5 working days and notify you of the decision via OSCT email.', icon: CheckCircle },
  { step: 'Sit the Exam', desc: 'Make-up exams are scheduled during the designated resit period. You will receive venue and time details at least 7 days prior.', icon: Calendar },
];

const makeupPeriods = [
  { period: 'Autumn Make-ups', dates: '13–17 Jan 2026', deadline: '3 Jan 2026' },
  { period: 'Spring Make-ups', dates: '15–19 Jun 2026', deadline: '5 Jun 2026' },
  { period: 'Summer Resits', dates: '14–25 Jul 2026', deadline: '4 Jul 2026' },
];

const faqs = [
  { q: 'Can I take a make-up exam if I failed the original?', a: 'No. Make-up exams are only for students who missed the original exam due to valid extenuating circumstances. Failed exams are addressed through the resit process.' },
  { q: 'Is the make-up exam the same as the original?', a: 'Make-up exams cover the same syllabus but use a different paper. The format (duration, question types) remains identical.' },
  { q: 'Will my make-up exam result be capped?', a: 'No. Unlike resits, make-up exam results are uncapped and treated as first-attempt marks.' },
  { q: 'How many make-up exams can I apply for?', a: 'There is no limit, but each application must have valid, independently documented grounds.' },
];

const MakeupExamsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><FileQuestion size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Make-up Examinations</h1>
              <p className="text-orange-100 mt-1">Application, Eligibility & Scheduling</p>
            </div>
          </div>
          <p className="text-orange-100 max-w-2xl mt-4 text-sm leading-relaxed">
            If you missed an examination due to valid extenuating circumstances, you may be eligible for a make-up exam. Review the eligibility criteria and application process below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search make-up exam info…" />

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Eligibility Criteria</h2>
          <p className="text-muted-foreground text-xs mb-4">You may apply for a make-up examination if you meet one or more of the following conditions:</p>
          <div className="space-y-2">
            {eligibilityCriteria.map((c, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" /> {c}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Application Process</h2>
          <div className="space-y-3">
            {applicationSteps.map((s, i) => (
              <div key={s.step} data-searchable className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{s.step}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Make-up Exam Periods 2025–26</h2>
          <div className="space-y-2">
            {makeupPeriods.map((p) => (
              <div key={p.period} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                <div>
                  <p className="font-bold text-foreground text-xs">{p.period}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{p.dates}</p>
                </div>
                <span className="text-xs font-semibold text-primary flex items-center gap-1"><Clock size={10} /> Apply by: {p.deadline}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground text-sm">{f.q}</h3>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Applications submitted after the deadline will not be accepted except in extraordinary circumstances approved by the Academic Board. Contact the Examinations Office at <strong>support@oxfordskillscenter.co.uk</strong> or call <strong>+44 7782 274482 ext. 205</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default MakeupExamsPage;
