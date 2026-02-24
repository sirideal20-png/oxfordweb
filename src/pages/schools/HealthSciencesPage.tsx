import { useRef } from 'react';
import { Heart, ArrowRight, Users, BookOpen, FlaskConical, Award, MapPin, Clock, CheckCircle, Stethoscope } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const HealthSciencesPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-HS-301', title: 'BSc (Hons) Nursing Science (Adult)', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-HS-302', title: 'BSc (Hons) Nursing Science (Mental Health)', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-HS-303', title: 'BSc (Hons) Pharmacy', duration: '4 Years', mode: 'Full-time' },
    { code: 'OSCT-HS-304', title: 'BSc (Hons) Medical Laboratory Sciences', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-HS-305', title: 'BSc (Hons) Radiography & Medical Imaging', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-HS-306', title: 'MSc Public Health', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-HS-307', title: 'MSc Advanced Clinical Practice', duration: '2 Years', mode: 'Part-time' },
    { code: 'OSCT-HS-308', title: 'Diploma in Health & Social Care', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-HS-309', title: 'Certificate in First Aid & Emergency Care', duration: '3 Months', mode: 'Part-time' },
    { code: 'OSCT-HS-310', title: 'Ph.D Health Sciences Research', duration: '3-5 Years', mode: 'Full-time' },
  ];

  const facilities = [
    { name: 'Clinical Simulation Centre', desc: 'High-fidelity patient simulators, ward environments, and emergency scenarios for safe clinical practice.' },
    { name: 'Anatomy & Physiology Lab', desc: 'Cadaver prosection, virtual anatomy tables, and histology microscopy stations.' },
    { name: 'Pharmacy Practice Lab', desc: 'Dispensing stations, drug interaction databases, and compounding facilities.' },
    { name: 'Medical Imaging Suite', desc: 'Diagnostic X-ray, ultrasound, and CT simulation equipment for radiography training.' },
  ];

  const staff = [
    { name: 'Prof. Catherine Beaumont', role: 'Dean of Health Sciences', speciality: 'Public Health Policy' },
    { name: 'Dr. Abigail Clarke', role: 'Programme Leader — Nursing', speciality: 'Adult Nursing & Palliative Care' },
    { name: 'Dr. Olusegun Adeyemi', role: 'Senior Lecturer', speciality: 'Pharmaceutical Chemistry' },
    { name: 'Dr. Hannah Morrison', role: 'Clinical Skills Lead', speciality: 'Emergency & Critical Care' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, facilities, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 mb-4 backdrop-blur-md">
            <Heart size={12} /> School of Health Sciences
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Advancing <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">Healthcare</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Training compassionate healthcare professionals through clinical excellence and innovation, with NHS placement partnerships across Oxfordshire.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '10', label: 'Programmes', icon: BookOpen },
            { val: '4', label: 'Clinical Facilities', icon: Stethoscope },
            { val: '800+', label: 'Students', icon: Users },
            { val: '98%', label: 'NMC Pass Rate', icon: Award },
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
            The School of Health Sciences prepares the next generation of healthcare leaders through rigorous academic training and extensive clinical placements. Our nursing programmes are approved by the Nursing and Midwifery Council (NMC), and our pharmacy degree is accredited by the General Pharmaceutical Council (GPhC).
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Students undertake clinical placements across NHS trusts in Oxfordshire, including Oxford University Hospitals NHS Foundation Trust, gaining hands-on experience in acute, community, and mental health settings. Our state-of-the-art Clinical Simulation Centre replicates real ward environments for safe, supervised practice.
          </p>
          <div className="flex flex-wrap gap-2">
            {['NMC Approved', 'GPhC Accredited', 'NHS Placement Partners', 'WHO Collaborating'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Clinical Facilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {facilities.map((f, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center shrink-0"><Stethoscope size={18} /></div>
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
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate</h3>
              <ul className="space-y-2">
                {['A-Levels: BBC–BCC including Biology or a health-related subject', 'GCSE: Grade 4/C in English, Mathematics, and Science', 'DBS Enhanced Check required prior to placement', 'Occupational health clearance and immunisation records'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate</h3>
              <ul className="space-y-2">
                {['2:1 honours degree in a health-related discipline', 'Registered healthcare professional status preferred', 'IELTS 7.0 overall (7.0 in each component) for nursing', 'Two academic or professional references'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Building A, Level 1 — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 303</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthSciencesPage;
