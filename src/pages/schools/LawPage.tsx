import { useRef } from 'react';
import { Scale, ArrowRight, Users, BookOpen, Award, MapPin, Clock, CheckCircle, Gavel, FileText } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const LawPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-LAW-501', title: 'LLB (Hons) Law', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-LAW-502', title: 'LLB (Hons) Law with Criminology', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-LAW-503', title: 'LLB (Hons) Law with International Relations', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-LAW-504', title: 'LLM International Commercial Law', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-LAW-505', title: 'LLM Human Rights Law', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-LAW-506', title: 'Ph.D Law Research', duration: '3-5 Years', mode: 'Full-time' },
  ];

  const facilities = [
    { name: 'Moot Court', icon: Gavel, desc: 'A replica Crown Court chamber for advocacy training, mock trials, and moot competitions with visiting judges.' },
    { name: 'Law Library & Research Centre', icon: FileText, desc: 'Access to Westlaw, LexisNexis, and HeinOnline databases, plus 15,000+ law reports and textbooks.' },
  ];

  const staff = [
    { name: 'Prof. Edward Blackstone QC', role: 'Dean of Law & Policy', speciality: 'Constitutional Law' },
    { name: 'Dr. Olivia Chambers', role: 'Programme Leader — LLB', speciality: 'Criminal Justice' },
    { name: 'Dr. Kwame Asante', role: 'Senior Lecturer', speciality: 'International Human Rights' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, facilities, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-slate-400/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-4 backdrop-blur-md">
            <Scale size={12} /> School of Law & Policy
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Upholding <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-zinc-400">Justice</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Training the next generation of barristers, solicitors, and policy makers in Oxford's distinguished legal tradition.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '6', label: 'Programmes', icon: BookOpen },
            { val: '1', label: 'Moot Court', icon: Gavel },
            { val: '400+', label: 'Students', icon: Users },
            { val: '88%', label: 'Bar/SQE Pass Rate', icon: Award },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
              <s.icon size={20} className="mx-auto mb-2 text-primary" />
              <div className="text-xl font-bold text-foreground">{s.val}</div>
              <div className="text-[11px] text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-3">About the School</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The School of Law & Policy at Oxford Skills Center provides an intellectually rigorous and practice-oriented legal education. Our LLB is a qualifying law degree recognised by the Solicitors Regulation Authority (SRA), preparing students for the Solicitors Qualifying Examination (SQE).
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Located in Oxford — a city synonymous with legal scholarship — our students benefit from guest lectures by practising barristers, visits to the Royal Courts of Justice, and pro bono clinic partnerships with local law firms and Citizens Advice bureaux.
          </p>
          <div className="flex flex-wrap gap-2">
            {['SRA Recognised', 'SQE Preparation', 'Pro Bono Clinic', 'Mooting Champions'].map(tag => (
              <span key={tag} className="text-[11px] font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">{tag}</span>
            ))}
          </div>
        </div>

        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">Programmes Offered</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_2fr_auto_auto] gap-4 px-5 py-3 bg-muted/50 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <span>Code</span><span>Programme Title</span><span>Duration</span><span>Mode</span>
            </div>
            {programmes.map((p, i) => (
              <div key={i} data-searchable className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto_auto] gap-2 md:gap-4 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                <span className="text-xs font-mono text-primary">{p.code}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.title}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                <span className="text-xs text-muted-foreground">{p.mode}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">Facilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {facilities.map((f, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0"><f.icon size={18} /></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{f.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">Key Academic Staff</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {staff.map((s, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center text-primary"><Users size={20} /></div>
                <h3 className="text-sm font-bold text-foreground">{s.name}</h3>
                <p className="text-[11px] text-primary font-medium">{s.role}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{s.speciality}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Entry Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate (LLB)</h3>
              <ul className="space-y-2">
                {['A-Levels: ABB–BBB (or equivalent)', 'GCSE: Grade 4/C in English Language', 'LNAT score considered but not mandatory', 'Access to HE Diploma in Law accepted'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate (LLM/Ph.D)</h3>
              <ul className="space-y-2">
                {['2:1 honours degree in Law (or GDL conversion)', 'Professional legal experience advantageous', 'IELTS 7.0 overall (6.5 in each component)', 'Research proposal required for Ph.D'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Building E, Level 2 — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 305</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawPage;
