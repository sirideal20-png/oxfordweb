import { useRef } from 'react';
import { Sprout, ArrowRight, Users, BookOpen, Award, MapPin, Clock, CheckCircle, Leaf, Droplets } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const AgriculturePage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const programmes = [
    { code: 'OSCT-AGR-601', title: 'BSc (Hons) Agriculture (General)', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AGR-602', title: 'BSc (Hons) Agricultural Engineering', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AGR-603', title: 'BSc (Hons) Food Science & Technology', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AGR-604', title: 'BSc (Hons) Environmental Science', duration: '3 Years', mode: 'Full-time' },
    { code: 'OSCT-AGR-605', title: 'MSc Sustainable Agriculture & Food Security', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-AGR-606', title: 'MSc Environmental Management', duration: '1 Year', mode: 'Full-time/Part-time' },
    { code: 'OSCT-AGR-607', title: 'Diploma in Horticulture & Landscape Design', duration: '1 Year', mode: 'Full-time' },
    { code: 'OSCT-AGR-608', title: 'Certificate in Organic Farming Practices', duration: '6 Months', mode: 'Part-time' },
    { code: 'OSCT-AGR-609', title: 'Ph.D Agricultural Sciences Research', duration: '3-5 Years', mode: 'Full-time' },
  ];

  const facilities = [
    { name: 'University Research Farm', icon: Sprout, desc: '50-acre research farm in the Oxfordshire countryside with precision agriculture technology, drone mapping, and soil analysis labs.' },
    { name: 'Food Technology Lab', icon: Leaf, desc: 'Industrial food processing equipment, quality control testing, and product development kitchen.' },
    { name: 'Hydroponics & Aquaponics Centre', icon: Droplets, desc: 'Vertical farming systems, controlled environment agriculture, and sustainable water management research.' },
  ];

  const staff = [
    { name: 'Prof. George Thornton', role: 'Dean of Agriculture', speciality: 'Crop Science & Agronomy' },
    { name: 'Dr. Beatrice Ngozi', role: 'Programme Leader', speciality: 'Food Security & Climate Adaptation' },
    { name: 'Dr. Simon Woodward', role: 'Senior Lecturer', speciality: 'Precision Agriculture & GIS' },
  ];

  return (
    <div ref={searchContainerRef} className="space-y-10 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search programmes, facilities, staff…" />

      <div className="relative overflow-hidden bg-slate-950 py-14 md:py-18 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-green-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-green-400 mb-4 backdrop-blur-md">
            <Sprout size={12} /> School of Agriculture
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Cultivating a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">Sustainable Future</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Pioneering sustainable farming, food science, and environmental stewardship from our research farms in the heart of the Oxfordshire countryside.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div data-searchable className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '9', label: 'Programmes', icon: BookOpen },
            { val: '50', label: 'Acre Research Farm', icon: Sprout },
            { val: '350+', label: 'Students', icon: Users },
            { val: '90%', label: 'Employment Rate', icon: Award },
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
            The School of Agriculture combines traditional agricultural expertise with cutting-edge technology. Our 50-acre research farm, located in the Oxfordshire countryside, provides students with hands-on experience in crop management, livestock husbandry, and precision agriculture.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            We collaborate with DEFRA, the National Farmers' Union (NFU), and leading agri-tech companies to ensure our curriculum addresses the challenges of modern farming, food security, and environmental sustainability. Our graduates are sought after by organisations from farm management to food policy.
          </p>
          <div className="flex flex-wrap gap-2">
            {['DEFRA Partnership', 'NFU Affiliated', 'Precision Ag Tech', 'Organic Certified'].map(tag => (
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
          <h2 className="text-xl font-bold text-foreground mb-4">Research Facilities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <div key={i} data-searchable className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-3"><f.icon size={20} /></div>
                <h3 className="text-sm font-bold text-foreground mb-1">{f.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
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
                {['A-Levels: BCC–CCC including Biology or Geography', 'GCSE: Grade 4/C in English and Mathematics', 'BTEC Level 3: MMM in Agriculture or Applied Science', 'Practical farming experience valued'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Postgraduate</h3>
              <ul className="space-y-2">
                {['2:2 honours degree in Agriculture, Biology, or related discipline', 'Industry experience considered for non-traditional applicants', 'IELTS 6.5 overall for international students', 'Research proposal for Ph.D applicants'].map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">School Office</h3>
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MapPin size={12} /> Farm Campus — Oxford Skills Center, Oxfordshire OX1</a>
            <p className="text-xs text-muted-foreground mt-1">Email: school@oxfordskillscenter.co.uk | Tel: +44 1865 200 306</p>
          </div>
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgriculturePage;
