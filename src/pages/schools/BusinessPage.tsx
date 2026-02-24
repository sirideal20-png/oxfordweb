import { useRef } from 'react';
import { Briefcase, ArrowRight, Users, BookOpen, Award, MapPin, Clock, CheckCircle, TrendingUp, Building } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const BusinessPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-BUS-401', title: 'BSc (Hons) Business Administration', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-402', title: 'BSc (Hons) Accounting & Finance', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-403', title: 'BSc (Hons) Marketing Management', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-404', title: 'BSc (Hons) International Business', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-405', title: 'BSc (Hons) Human Resource Management', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-406', title: 'MBA (Master of Business Administration)', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-BUS-407', title: 'MSc Finance & Investment', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-BUS-408', title: 'MSc Digital Marketing & Analytics', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-BUS-409', title: 'MSc Project Management', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-BUS-410', title: 'MSc Entrepreneurship & Innovation', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-BUS-411', title: 'Diploma in Business Management', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-BUS-412', title: 'Certificate in Leadership & Management (CMI)', duration: '6 Months', mode: 'Part-time' },
    { code: 'OSCT-BUS-413', title: 'DBA (Doctor of Business Administration)', duration: '3-5 Years', mode: 'Part-time' },
    { code: 'OSCT-BUS-414', title: 'BSc (Hons) Supply Chain & Logistics', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-BUS-415', title: 'MSc Strategic Management', duration: '1 Year', mode: 'Full-time' },
  ];

  const centres = [
    { name: 'Business Incubation Hub', icon: Building, desc: 'Start-up workspace, mentoring from Oxford entrepreneurs, and access to angel investor networks.' },
    { name: 'Bloomberg Trading Room', icon: TrendingUp, desc: '12 Bloomberg terminals for real-time financial data analysis, trading simulations, and portfolio management.' },
    { name: 'Executive Education Centre', icon: Briefcase, desc: 'Dedicated space for MBA seminars, corporate training, and industry masterclasses.' },
  ];

  const staff = [
    { name: 'Prof. William Lancaster', role: 'Dean of Business', speciality: 'Strategic Management' },
    { name: 'Dr. Aisha Khan', role: 'MBA Programme Director', speciality: 'Innovation & Entrepreneurship' },
    { name: 'Dr. Thomas Green', role: 'Senior Lecturer', speciality: 'Financial Economics' },
    { name: 'Dr. Maria Santos', role: 'Programme Leader — Marketing', speciality: 'Consumer Behaviour & Analytics' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, centres, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-4 backdrop-blur-md">
            <Briefcase size={12} /> School of Business
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Shaping Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Leaders</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            CMI and ACCA-accredited programmes delivering world-class business education from Oxford, one of the world's premier centres of commerce and innovation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '15', label: 'Programmes', icon: BookOpen },
            { val: '3', label: 'Specialist Centres', icon: Building },
            { val: '1,500+', label: 'Students', icon: Users },
            { val: '92%', label: 'Employment Rate', icon: Award },
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
            The School of Business is the largest faculty at Oxford Skills Center, offering programmes from diplomas through to doctoral level. Our MBA programme is one of the most sought-after in the South East, attracting students from over 40 countries.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Programmes are accredited by the Chartered Management Institute (CMI), ACCA, and CIMA, ensuring graduates gain professional recognition alongside their academic qualifications. Our Business Incubation Hub has helped launch over 30 start-ups since 2020, with access to Oxford's vibrant entrepreneurial ecosystem.
          </p>
          <div className="flex flex-wrap gap-2">
            {['CMI Accredited', 'ACCA Approved', 'CIMA Partner', 'Bloomberg Lab', 'Start-up Incubator'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Specialist Centres</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {centres.map((c, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-3"><c.icon size={20} /></div>
                <h3 className="text-sm font-bold text-foreground mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">Key Academic Staff</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate (BSc)</h3>
              <ul className="space-y-2">
                {['A-Levels: BBC–BCC (or equivalent)', 'GCSE: Grade 4/C in English and Mathematics', 'BTEC Level 3 Extended Diploma: DMM in Business', 'Access to HE Diploma in Business accepted'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate (MBA/MSc/DBA)</h3>
              <ul className="space-y-2">
                {['2:1 honours degree (MBA requires 2+ years professional experience)', 'GMAT 550+ recommended for MBA applicants', 'IELTS 6.5 overall (6.0 per component) for international students', 'Two professional references and personal statement'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Building B, Level 1 — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 304</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
