import { useRef } from 'react';
import { Wrench, ArrowRight, Users, BookOpen, FlaskConical, Award, MapPin, Clock, CheckCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const EngineeringPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-ENG-101', title: 'BEng (Hons) Civil Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-102', title: 'BEng (Hons) Mechanical Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-103', title: 'BEng (Hons) Electrical & Electronic Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-104', title: 'MEng Robotics & Autonomous Systems', duration: '4 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-105', title: 'MSc Structural Engineering', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-ENG-106', title: 'MSc Renewable Energy Engineering', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-ENG-107', title: 'HND Mechanical Engineering', duration: '2 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-108', title: 'Diploma in Welding & Fabrication', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-ENG-109', title: 'Certificate in CAD/CAM Design', duration: '6 Months', mode: 'Part-time' },
    { code: 'OSCT-ENG-110', title: 'MSc Environmental Engineering', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-ENG-111', title: 'BEng (Hons) Aerospace Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ENG-112', title: 'Ph.D Engineering Research', duration: '3-5 Years', mode: 'Full-time' },
  ];

  const labs = [
    { name: 'Structures & Materials Lab', desc: 'Concrete testing, tensile strength analysis, and composite material research with Instron universal testing machines.' },
    { name: 'Robotics & Mechatronics Lab', desc: 'Industrial robot arms, PLC controllers, and Arduino/Raspberry Pi prototyping stations for automation projects.' },
    { name: 'Thermodynamics & Fluid Mechanics Lab', desc: 'Wind tunnels, hydraulic benches, and calorimetry equipment for thermal systems research.' },
    { name: 'CAD/CAM & 3D Printing Studio', desc: 'SolidWorks, AutoCAD workstations, and industrial-grade 3D printers including SLS and FDM technologies.' },
    { name: 'Electrical Machines Lab', desc: 'Power electronics, motor drive systems, and renewable energy test rigs including solar panel arrays.' },
  ];

  const staff = [
    { name: 'Prof. Richard Hargreaves', role: 'Dean of Engineering', speciality: 'Structural Dynamics' },
    { name: 'Dr. Fatima Al-Rashid', role: 'Programme Leader — Civil', speciality: 'Geotechnical Engineering' },
    { name: 'Dr. James Whitfield', role: 'Senior Lecturer', speciality: 'Renewable Energy Systems' },
    { name: 'Dr. Priya Sharma', role: 'Research Fellow', speciality: 'Robotics & AI' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, labs, staff…" />

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 backdrop-blur-md">
            <Wrench size={12} /> School of Engineering & Technology
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Future</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            From civil infrastructure to cutting-edge robotics, our engineering programmes combine rigorous theory with hands-on practice in Oxford's premier technical facilities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Key Stats */}
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '12', label: 'Programmes', icon: BookOpen },
            { val: '5', label: 'Research Labs', icon: FlaskConical },
            { val: '1,200+', label: 'Students', icon: Users },
            { val: '94%', label: 'Employment Rate', icon: Award },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
              <s.icon size={20} className="mx-auto mb-2 text-primary" />
              <div className="text-xl font-bold text-foreground">{s.val}</div>
              <div className="text-[11px] text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <div data-searchable className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-3">About the School</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The School of Engineering & Technology at Oxford Skills Center of Technology LTD is one of the largest and most diverse engineering faculties in the UK. Located in the heart of Oxford, our students benefit from proximity to major engineering firms, research institutions, and the historic academic tradition of the city.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Our programmes are accredited by the Institution of Engineering and Technology (IET) and the Institution of Civil Engineers (ICE), ensuring graduates meet the highest professional standards. We maintain strong industry partnerships with Rolls-Royce, Siemens, and Arup, providing students with placement opportunities and real-world project experience.
          </p>
          <div className="flex flex-wrap gap-2">
            {['IET Accredited', 'ICE Accredited', 'Industry Placements', 'UKRI Funded Research'].map(tag => (
              <span key={tag} className="text-[11px] font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">{tag}</span>
            ))}
          </div>
        </div>

        {/* Programmes */}
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

        {/* Research Labs */}
        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">Research Laboratories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {labs.map((lab, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0"><FlaskConical size={18} /></div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{lab.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{lab.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Staff */}
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

        {/* Entry Requirements */}
        <div data-searchable className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Entry Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate (BEng/HND)</h3>
              <ul className="space-y-2">
                {['A-Levels: ABB–BBB including Mathematics and Physics (or equivalent)', 'GCSE: Grade 4/C in English Language and Mathematics', 'BTEC Level 3 Extended Diploma: DMM in Engineering', 'International: Equivalent qualifications assessed individually'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate (MSc/MEng/Ph.D)</h3>
              <ul className="space-y-2">
                {['A 2:1 honours degree in a relevant engineering discipline', 'Professional experience considered for mature applicants', 'IELTS 6.5 overall (6.0 in each component) for international students', 'Research proposal required for Ph.D applications'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Building C, Level 2 — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 301</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngineeringPage;
