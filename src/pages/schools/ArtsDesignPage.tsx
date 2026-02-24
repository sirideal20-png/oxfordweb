import { useRef } from 'react';
import { PenTool, ArrowRight, Users, BookOpen, Award, MapPin, Clock, CheckCircle, Palette, Camera } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const ArtsDesignPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-ART-801', title: 'BA (Hons) Architecture', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-802', title: 'BA (Hons) Fashion Design', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-803', title: 'BA (Hons) Graphic Design & Visual Communication', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-804', title: 'BA (Hons) Interior Design', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-805', title: 'BA (Hons) Fine Art', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-806', title: 'MA Architecture (RIBA Part 2)', duration: '2 Years', mode: 'Full-time' },
    { code: 'OSCT-ART-807', title: 'MA Fashion & Textile Innovation', duration: '1 Year', mode: 'Full-time' },
  ];

  const studios = [
    { name: 'Design Studios', icon: PenTool, desc: 'Open-plan studios with drafting tables, Mac Pro workstations, Wacom tablets, and Adobe Creative Cloud suites.' },
    { name: 'Fashion Workshop', icon: Palette, desc: 'Industrial sewing machines, pattern-cutting tables, textile printing, and a dedicated photoshoot studio.' },
    { name: 'Photography & Media Lab', icon: Camera, desc: 'Professional darkroom, digital editing suites, green screen studio, and large-format printing.' },
  ];

  const staff = [
    { name: 'Prof. Isabella Fontaine', role: 'Dean of Arts & Design', speciality: 'Contemporary Architecture' },
    { name: 'Dr. Marcus Webb', role: 'Programme Leader — Graphic Design', speciality: 'Typography & Brand Identity' },
    { name: 'Sarah Livingstone FRSA', role: 'Senior Lecturer', speciality: 'Fashion Sustainability' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, studios, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-pink-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400 mb-4 backdrop-blur-md">
            <PenTool size={12} /> School of Arts & Design
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Fostering <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-300">Creativity</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            RIBA and UAL-validated programmes nurturing the next generation of architects, designers, and creative innovators in Oxford.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '7', label: 'Programmes', icon: BookOpen },
            { val: '3', label: 'Design Studios', icon: PenTool },
            { val: '500+', label: 'Students', icon: Users },
            { val: '91%', label: 'Employment Rate', icon: Award },
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
            The School of Arts & Design celebrates creativity, craftsmanship, and innovation. Our architecture programme is validated by the Royal Institute of British Architects (RIBA Part 1 & 2), and our design programmes draw inspiration from Oxford's rich artistic and architectural heritage.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Students exhibit at London Fashion Week, the Serpentine Pavilion Project, and D&AD New Blood, gaining national exposure. Our alumni work at practices including Foster + Partners, Zaha Hadid Architects, Burberry, and Pentagram.
          </p>
          <div className="flex flex-wrap gap-2">
            {['RIBA Validated', 'D&AD Partner', 'London Fashion Week', 'Adobe Creative Campus'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Studios & Workshops</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {studios.map((s, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center mb-3"><s.icon size={20} /></div>
                <h3 className="text-sm font-bold text-foreground mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
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
              <h3 className="text-sm font-bold text-foreground mb-2">Undergraduate (BA)</h3>
              <ul className="space-y-2">
                {['A-Levels: BBB–BCC including Art, Design, or related subject', 'Strong portfolio of creative work (12–20 pieces)', 'Foundation Diploma in Art & Design highly valued', 'Interview and portfolio review required'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate (MA)</h3>
              <ul className="space-y-2">
                {['2:1 honours degree in a relevant creative discipline', 'Professional portfolio demonstrating design thinking', 'IELTS 6.5 overall for international students', 'Statement of creative intent'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Creative Arts Building — Oxford Skills Center Campus, Oxford OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 308</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtsDesignPage;
