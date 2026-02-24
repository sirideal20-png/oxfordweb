import { useRef } from 'react';
import { Globe, ArrowRight, Users, BookOpen, Award, MapPin, Clock, CheckCircle, Plane, Navigation } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const AviationPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-AVT-701', title: 'BSc (Hons) Aviation Management', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AVT-702', title: 'BSc (Hons) Airline & Airport Operations', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AVT-703', title: 'BSc (Hons) Air Traffic Management', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AVT-704', title: 'MSc Aviation Safety & Security', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-AVT-705', title: 'Diploma in Commercial Pilot Training (CPL)', duration: '18 Months', mode: 'Full-time' },
  ];

  const facilities = [
    { name: 'Flight Simulation Centre', icon: Plane, desc: 'CAA-approved Boeing 737 and Cessna 172 full-motion flight simulators for realistic pilot training.' },
    { name: 'Air Traffic Control Suite', icon: Navigation, desc: 'Tower and radar simulation systems replicating UK airspace operations for ATC training.' },
  ];

  const staff = [
    { name: 'Capt. James Fitzgerald', role: 'Dean of Aviation', speciality: 'Commercial Flight Operations' },
    { name: 'Dr. Nadia Petrova', role: 'Programme Leader', speciality: 'Aviation Safety Systems' },
    { name: 'Flt Lt. Daniel Cooper (Ret.)', role: 'Senior Instructor', speciality: 'Military & Civil ATC' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, facilities, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-4 backdrop-blur-md">
            <Globe size={12} /> School of Aviation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Soaring to New <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Heights</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            CAA-approved training programmes preparing aviation professionals with full-motion flight simulators and industry-standard ATC systems.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '5', label: 'Programmes', icon: BookOpen },
            { val: '2', label: 'Flight Simulators', icon: Plane },
            { val: '250+', label: 'Students', icon: Users },
            { val: '95%', label: 'Licence Pass Rate', icon: Award },
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
            The School of Aviation offers UK Civil Aviation Authority (CAA) approved training that meets EASA standards. Our Flight Simulation Centre houses full-motion Boeing 737 and Cessna 172 simulators, providing students with realistic cockpit experience before they take to the skies.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            We maintain strong partnerships with British Airways, easyJet, and NATS (National Air Traffic Services), ensuring our graduates are prepared for careers across the aviation industry. Our location near multiple UK airports, including London Oxford Airport, provides excellent access for practical training.
          </p>
          <div className="flex flex-wrap gap-2">
            {['CAA Approved', 'EASA Compliant', 'NATS Partner', 'Airline Sponsorships'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Training Facilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {facilities.map((f, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center shrink-0"><f.icon size={18} /></div>
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
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate</h3>
              <ul className="space-y-2">
                {['A-Levels: BBB–BCC including Mathematics or Physics', 'GCSE: Grade 4/C in English and Mathematics', 'Class 1 Medical Certificate required for pilot programmes', 'Minimum age 17 at entry'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate</h3>
              <ul className="space-y-2">
                {['2:1 honours degree in Aviation, Engineering, or related field', 'Industry experience in aviation sector preferred', 'IELTS 6.5 overall for international students', 'Clean criminal record (DBS check)'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Aviation Centre — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 307</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AviationPage;
