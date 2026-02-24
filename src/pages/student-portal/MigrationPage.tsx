import { useRef } from 'react';
import { ArrowLeftRight, FileText, CheckCircle, Clock, AlertCircle, Globe, BookOpen, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const transferTypes = [
  { title: 'Internal Programme Transfer', desc: 'Switch between programmes within OSCT. Available after completing at least one full semester with a minimum CGPA of 2.0.', icon: ArrowLeftRight, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { title: 'Credit Transfer (Incoming)', desc: 'Transfer credits from a recognised institution to OSCT. Maximum 50% of total programme credits can be transferred.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Credit Transfer (Outgoing)', desc: 'Request a credit evaluation report for transfer to another institution. OSCT provides detailed syllabi and credit hour documentation.', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Study Abroad Exchange', desc: 'Spend one semester at a partner institution. Credits earned abroad are mapped to equivalent OSCT modules upon return.', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const processSteps = [
  { step: 'Submit Application', desc: 'Complete the Transfer/Migration Application Form and submit through the Student Portal with all required documents.' },
  { step: 'Document Review', desc: 'The Academic Registry reviews transcripts, syllabi, and credit hours. Processing takes 10–15 working days.' },
  { step: 'Credit Mapping', desc: 'Each module is evaluated for equivalency. A minimum 70% syllabus match is required for credit recognition.' },
  { step: 'Decision & Enrolment', desc: 'You receive a formal decision letter. If approved, you are enrolled in the new programme with transferred credits reflected.' },
];

const requiredDocuments = [
  'Official transcripts from all previous institutions (certified copies)',
  'Detailed module syllabi/course descriptions for each credit claimed',
  'Letter of good standing from the previous institution',
  'Valid passport copy (international transfers)',
  'Personal statement explaining the reason for transfer (500 words max)',
  'Evidence of English language proficiency (if applicable)',
];

const partnerInstitutions = [
  { name: 'University of Manchester', country: 'United Kingdom', agreement: 'Full credit recognition' },
  { name: 'Technical University of Munich', country: 'Germany', agreement: 'ECTS credit transfer' },
  { name: 'University of Toronto', country: 'Canada', agreement: 'Semester exchange' },
  { name: 'National University of Singapore', country: 'Singapore', agreement: 'Dual pathway' },
  { name: 'Sorbonne University', country: 'France', agreement: 'ECTS credit transfer' },
  { name: 'University of Melbourne', country: 'Australia', agreement: 'Semester exchange' },
];

const MigrationPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><ArrowLeftRight size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Migration & Credit Transfer</h1>
              <p className="text-cyan-100 mt-1">Programme Transfers, Credit Mapping & Exchange Partnerships</p>
            </div>
          </div>
          <p className="text-cyan-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Whether you're transferring programmes internally, bringing credits from another institution, or exploring study abroad options, this guide covers everything you need to know.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search migration info…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transferTypes.map((t) => (
            <div key={t.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`w-10 h-10 ${t.bg} rounded-lg flex items-center justify-center ${t.color} mb-3 group-hover:scale-105 transition-transform`}>
                <t.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{t.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Transfer Process</h2>
          <div className="space-y-3">
            {processSteps.map((s, i) => (
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
          <h2 className="text-lg font-bold text-foreground mb-4">Required Documents</h2>
          <div className="space-y-2">
            {requiredDocuments.map((doc, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" /> {doc}
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Partner Institutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partnerInstitutions.map((p) => (
              <div key={p.name} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground text-xs">{p.name}</h3>
                <p className="text-muted-foreground text-[10px] mt-0.5">{p.country}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 rounded text-[10px] text-primary font-semibold">{p.agreement}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Credit transfer applications must be submitted before the end of the first week of your enrolled semester. Late applications will be deferred to the following term. For queries, contact the Academic Registry at <strong>transfers@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default MigrationPage;
