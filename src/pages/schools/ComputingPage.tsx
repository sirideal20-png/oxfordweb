import { useRef } from 'react';
import { Monitor, ArrowRight, Users, BookOpen, FlaskConical, Award, MapPin, Clock, CheckCircle, Shield, Database, Code } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const ComputingPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-CS-201', title: 'BSc (Hons) Computer Science', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-CS-202', title: 'BSc (Hons) Artificial Intelligence', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-CS-203', title: 'BSc (Hons) Cybersecurity & Digital Forensics', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-CS-204', title: 'BSc (Hons) Software Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-CS-205', title: 'MSc Data Science & Machine Learning', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-CS-206', title: 'MSc Cybersecurity', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-CS-207', title: 'MSc Cloud Computing & DevOps', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-CS-208', title: 'Ph.D Computer Science Research', duration: '3-5 Years', mode: 'Full-time' },
  ];

  const centres = [
    { name: 'AI & Machine Learning Centre', icon: Database, desc: 'GPU clusters with NVIDIA A100 accelerators, TensorFlow/PyTorch workstations, and neural network visualisation tools.' },
    { name: 'Cybersecurity Operations Centre', icon: Shield, desc: 'Penetration testing labs, network forensics equipment, and SIEM platforms for real-world threat simulation.' },
    { name: 'Software Engineering Lab', icon: Code, desc: 'Agile development environments, CI/CD pipelines, and cloud infrastructure for full-stack project deployment.' },
  ];

  const staff = [
    { name: 'Prof. Eleanor Wu', role: 'Dean of Computing & AI', speciality: 'Neural Networks & NLP' },
    { name: 'Dr. Marcus Okonkwo', role: 'Programme Leader — AI', speciality: 'Reinforcement Learning' },
    { name: 'Dr. Sophie Hartley', role: 'Senior Lecturer', speciality: 'Cybersecurity & Cryptography' },
    { name: 'Dr. Raj Patel', role: 'Research Fellow', speciality: 'Distributed Systems' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, centres, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-4 backdrop-blur-md">
            <Monitor size={12} /> School of Computing & AI
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Leading the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Digital Revolution</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            From artificial intelligence to cybersecurity, we equip students with the skills to shape the digital world from our state-of-the-art Oxford campus.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '8', label: 'Programmes', icon: BookOpen },
            { val: '3', label: 'Research Centres', icon: FlaskConical },
            { val: '950+', label: 'Students', icon: Users },
            { val: '97%', label: 'Employment Rate', icon: Award },
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
            The School of Computing & AI at Oxford Skills Center is at the forefront of technological innovation. Our curriculum is designed in collaboration with industry leaders including Microsoft, Google DeepMind, and BT, ensuring our graduates are equipped with industry-relevant skills.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Our programmes are accredited by BCS, The Chartered Institute for IT, and we are recognised as a GCHQ-certified Academic Centre of Excellence in Cyber Security Research. Students benefit from dedicated GPU computing clusters, a professional-grade cybersecurity operations centre, and partnerships with Oxford's thriving tech ecosystem.
          </p>
          <div className="flex flex-wrap gap-2">
            {['BCS Accredited', 'GCHQ Certified', 'NVIDIA Academic Partner', 'AWS Academy'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Research & Innovation Centres</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {centres.map((c, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-3"><c.icon size={20} /></div>
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
                {['A-Levels: ABB–BBB including Mathematics (or equivalent)', 'GCSE: Grade 4/C in English Language and Mathematics', 'BTEC Level 3: DMM in Computing or IT', 'T-Level in Digital accepted'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate (MSc/Ph.D)</h3>
              <ul className="space-y-2">
                {['2:1 honours degree in Computer Science or related discipline', 'Industry experience considered for non-traditional applicants', 'IELTS 6.5 overall (6.0 per component) for international students', 'Portfolio or research proposal may be required'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Building D, Level 3 — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 302</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComputingPage;
