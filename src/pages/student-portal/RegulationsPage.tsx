import { useRef } from 'react';
import { Scroll, Shield, AlertTriangle, BookOpen, Scale, Users, CheckCircle, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const regulations = [
  { title: 'Academic Integrity', desc: 'All submitted work must be original. Plagiarism, collusion, and contract cheating are serious offences resulting in penalties ranging from mark deductions to expulsion.', icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'Attendance Policy', desc: 'Students must maintain a minimum 80% attendance rate per module. Three consecutive unexplained absences trigger a formal review with the Programme Director.', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Code of Conduct', desc: 'All members of the OSCT community are expected to treat others with dignity and respect. Bullying, harassment, and discrimination are strictly prohibited.', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Assessment Regulations', desc: 'Assessment criteria and marking rubrics are published at the start of each module. Late submissions incur a 5% per day penalty up to a maximum of 5 days.', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Disciplinary Procedures', desc: 'Breaches of regulations are investigated through a fair and transparent process. Students have the right to representation and appeal at all stages.', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Health & Safety', desc: 'Students must comply with all safety protocols, especially in laboratories, workshops, and clinical settings. Report hazards immediately to Estates.', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const keyPolicies = [
  { policy: 'Extenuating Circumstances', summary: 'Request deadline extensions or exam deferrals due to serious illness, bereavement, or other unforeseen events. Apply within 5 working days with evidence.' },
  { policy: 'Academic Appeals', summary: 'Challenge an academic decision on grounds of procedural irregularity or new evidence. Submit within 10 working days of the decision.' },
  { policy: 'Fitness to Study', summary: 'If health or personal issues significantly affect your ability to study, the university may initiate a supportive fitness-to-study review.' },
  { policy: 'Intellectual Property', summary: 'Students retain copyright of their original work. Research outputs created using OSCT resources may be subject to shared IP agreements.' },
  { policy: 'Data Protection (GDPR)', summary: 'Personal data is processed lawfully under GDPR. Students can request access to their data, rectification, or erasure through the DPO.' },
  { policy: 'Social Media Policy', summary: 'Online conduct that brings the institution into disrepute may be subject to disciplinary action. Respect confidentiality and others\' privacy online.' },
];

const RegulationsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Scroll size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">University Regulations</h1>
              <p className="text-slate-200 mt-1">Academic Rules, Policies & Code of Conduct</p>
            </div>
          </div>
          <p className="text-slate-200 max-w-2xl mt-4 text-sm leading-relaxed">
            Familiarise yourself with the rules and regulations that govern academic life, student conduct, and institutional procedures at Oxford Skills Center.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search regulations…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regulations.map((r) => (
            <div key={r.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`w-10 h-10 ${r.bg} rounded-lg flex items-center justify-center ${r.color} mb-3 group-hover:scale-105 transition-transform`}>
                <r.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{r.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Key Policies & Procedures</h2>
          <div className="space-y-3">
            {keyPolicies.map((p) => (
              <div key={p.policy} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground text-sm">{p.policy}</h3>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Ignorance of regulations is not accepted as a defence in disciplinary proceedings. All students are expected to read the Student Handbook and sign the Student Agreement at enrolment. Full regulatory documents are available from <strong>support@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default RegulationsPage;
