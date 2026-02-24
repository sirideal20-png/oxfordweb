import { Building2, Globe, MapPin, Phone, Mail, Plane, Factory, Leaf, Zap, TrendingUp, Shield, GraduationCap, ArrowRight, Briefcase, Wrench, Monitor, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const socCodeCatalog = [
  {
    soc: '2121',
    title: 'Civil Engineers',
    industry: 'Global Infrastructure & Urban Development',
    icon: Building2,
    programs: [
      { title: 'BS(Hons) in Civil Engineering', route: '/programs/bachelor-degree/civil-engineering' },
      { title: 'MS in Civil Engineering', route: '/programs/master-degree/civil-engineering' },
      { title: 'Diploma in Civil Engineering', route: '/programs/diploma-programs/civil-engineering' },
      { title: 'Certificate in Civil Engineering Fundamentals', route: '/programs/certificates/civil-engineering-fundamentals' },
      { title: 'Training in Civil Structural Analysis', route: '/programs/trainings/civil-structural-analysis' },
    ],
  },
  {
    soc: '2122',
    title: 'Mechanical Engineers',
    industry: 'Steel Manufacturing & Heavy Industry',
    icon: Wrench,
    programs: [
      { title: 'BS(Hons) in Mechanical Engineering', route: '/programs/bachelor-degree/mechanical-engineering' },
      { title: 'MS in Mechanical Engineering', route: '/programs/master-degree/mechanical-engineering' },
      { title: 'Diploma in Mechanical Engineering', route: '/programs/diploma-programs/mechanical-engineering' },
      { title: 'Certificate in Mechanical Engineering Basics', route: '/programs/certificates/mechanical-engineering-basics' },
      { title: 'Training in Mechanical Vibration Testing', route: '/programs/trainings/mechanical-vibration-testing' },
    ],
  },
  {
    soc: '2134',
    title: 'Software Developers',
    industry: 'Global FinTech & Digital Innovation',
    icon: Monitor,
    programs: [
      { title: 'BS(Hons) in Software Engineering', route: '/programs/bachelor-degree/software-engineering' },
      { title: 'MS in Software Engineering', route: '/programs/master-degree/software-engineering' },
      { title: 'Diploma in Software Engineering', route: '/programs/diploma-programs/software-engineering' },
      { title: 'Certificate in Web Development Fundamentals', route: '/programs/certificates/web-development-fundamentals' },
      { title: 'Training in React.js Development', route: '/programs/trainings/react.js-development' },
    ],
  },
  {
    soc: '2135',
    title: 'Cyber Security Analysts',
    industry: 'International Banking & Data Security',
    icon: Shield,
    programs: [
      { title: 'BS(Hons) in Cybersecurity', route: '/programs/bachelor-degree/cybersecurity' },
      { title: 'MS in Cybersecurity', route: '/programs/master-degree/cybersecurity' },
      { title: 'Diploma in Cybersecurity', route: '/programs/diploma-programs/cybersecurity' },
      { title: 'Certificate in Cybersecurity Fundamentals', route: '/programs/certificates/cybersecurity-fundamentals' },
      { title: 'Training in Ethical Hacking Basics', route: '/programs/trainings/ethical-hacking-basics' },
    ],
  },
  {
    soc: '1131',
    title: 'Financial Managers',
    industry: 'Global Investment & Capital Markets',
    icon: TrendingUp,
    programs: [
      { title: 'BS(Hons) in Accounting & Finance', route: '/programs/bachelor-degree/accounting-&-finance' },
      { title: 'MS in Accounting & Finance', route: '/programs/master-degree/accounting-&-finance' },
      { title: 'Diploma in Accounting & Finance', route: '/programs/diploma-programs/accounting-&-finance' },
      { title: 'Certificate in Financial Literacy', route: '/programs/certificates/financial-literacy' },
      { title: 'Training in Financial Literacy Basics', route: '/programs/trainings/financial-literacy-basics' },
    ],
  },
  {
    soc: '2421',
    title: 'Chartered Accountants',
    industry: 'International Audit & Corporate Finance',
    icon: Briefcase,
    programs: [
      { title: 'BS(Hons) in Accounting & Finance', route: '/programs/bachelor-degree/accounting-&-finance' },
      { title: 'MS in Accounting & Finance', route: '/programs/master-degree/accounting-&-finance' },
      { title: 'Certificate in Accounting Fundamentals', route: '/programs/certificates/accounting-fundamentals' },
      { title: 'Diploma in Auditing & Assurance', route: '/programs/diploma-programs/auditing-&-assurance' },
      { title: 'Training in Bookkeeping & Accounts', route: '/programs/trainings/bookkeeping-&-accounts' },
    ],
  },
  {
    soc: '3113',
    title: 'Engineering Technicians',
    industry: 'Advanced Manufacturing & Quality Systems',
    icon: Factory,
    programs: [
      { title: 'BS(Hons) in Industrial Engineering', route: '/programs/bachelor-degree/industrial-engineering' },
      { title: 'MS in Industrial Engineering', route: '/programs/master-degree/industrial-engineering' },
      { title: 'Diploma in Maintenance Engineering', route: '/programs/diploma-programs/maintenance-engineering' },
      { title: 'Certificate in Quality Control Inspection', route: '/programs/certificates/quality-control-inspection' },
      { title: 'Training in Six Sigma Yellow Belt', route: '/programs/trainings/six-sigma-yellow-belt' },
    ],
  },
  {
    soc: '8133',
    title: 'Energy Plant Operatives',
    industry: 'Renewable Energy & Sustainability',
    icon: Zap,
    programs: [
      { title: 'BS(Hons) in Renewable Energy Engineering', route: '/programs/bachelor-degree/renewable-energy-engineering' },
      { title: 'MS in Renewable Energy Engineering', route: '/programs/master-degree/renewable-energy-engineering' },
      { title: 'Diploma in Renewable Energy Systems', route: '/programs/diploma-programs/renewable-energy-systems' },
      { title: 'Certificate in Renewable Energy Systems', route: '/programs/certificates/renewable-energy-systems' },
      { title: 'Training in Renewable Energy Auditing', route: '/programs/trainings/renewable-energy-auditing' },
    ],
  },
];

const arifHabibSectors = [
  { icon: Building2, title: 'Real Estate & Urban Development', desc: 'Large-scale master-planned communities and infrastructure projects setting new benchmarks in modern urban living.' },
  { icon: Plane, title: 'Aviation & Logistics', desc: 'Strategic investments in commercial aviation and global logistics networks across emerging and developed markets.' },
  { icon: Factory, title: 'Heavy Industry & Manufacturing', desc: 'Steel production (international JVs) and cement manufacturing — the building blocks of global infrastructure.' },
  { icon: Leaf, title: 'Agriculture & Food Security', desc: 'Leading fertilizer and agri-business operations supporting sustainable food production worldwide.' },
  { icon: Zap, title: 'Energy & Renewables', desc: 'Pioneering wind and solar energy ventures driving the transition to clean, sustainable power generation.' },
  { icon: TrendingUp, title: 'Finance & Capital Markets', desc: 'Award-winning brokerage, investment banking, and asset management serving global institutional and retail investors.' },
];

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Award size={14} /> Company No. 16784866
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          About <span className="text-primary">Oxford Skills Center</span> of Technology Ltd
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
          The premier international technical offset for high-tier industrial and academic excellence. Headquartered in London, OSCT is the global technical gateway for the Arif Habib Group.
        </p>
      </section>

      {/* Global Mission */}
      <section className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe size={20} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Our Global Mission</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In an era of rapid technological displacement, OSCT serves as a <strong className="text-foreground">"Knowledge Corridor."</strong> We bridge the gap between theoretical research and industrial application, providing students worldwide with the practical technical information required to excel in the UK and global markets.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We transform the academic rigor of the Oxford ecosystem into practical, industry-leading skills — ensuring graduates are not just educated, but <strong className="text-foreground">employment-ready from day one</strong>.
        </p>
      </section>

      {/* Arif Habib Group */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">The Powerhouse Behind Us</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            OSCT is a flagship international project of the <strong className="text-foreground">Arif Habib Group</strong>, one of the most powerful and diversified industrial conglomerates with a heritage spanning over five decades and operations across multiple continents.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arifHabibSectors.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-lg p-5 space-y-2 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-2">
                <s.icon size={18} className="text-primary shrink-0" />
                <h3 className="font-bold text-sm text-foreground">{s.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground italic">
          OSCT represents the Group's commitment to bringing this world-class industrial expertise to students from every corner of the globe.
        </p>
      </section>

      {/* UK Career Pathway */}
      <section className="bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield size={20} className="text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">🛂 Your UK Career & Settlement Pathway</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          OSCT is more than an institute; we are a <strong className="text-foreground">global gateway for international students</strong> seeking careers in the UK. We specialize in preparing students from all nationalities for the <strong className="text-foreground">Skilled Worker Visa (Tier 2)</strong> and the long-term journey to <strong className="text-foreground">Indefinite Leave to Remain (ILR)</strong>.
        </p>
        <div className="bg-card/80 border border-border rounded-lg p-4">
          <h4 className="font-bold text-xs text-foreground uppercase tracking-wide mb-2">Our Guarantee of Excellence</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            While final visa decisions rest with the Home Office, our programs are specifically mapped to the UK's <strong className="text-foreground">Standard Occupational Classification (SOC) codes</strong>. We provide the technical certification and the mandatory <strong className="text-foreground">English Proficiency (B2 Level)</strong> coaching to ensure your application meets 100% of the technical sponsorship requirements.
          </p>
        </div>
      </section>

      {/* SOC Code Course Catalog */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">🛠️ High-Priority Skilled Worker Codes We Support (2026)</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We align our training with the most secure "Shortage" and "Higher Skilled" codes to maximize your chances of UK settlement.
          </p>
        </div>

        {/* SOC Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">SOC Code</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Occupational Category</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Industry Synergy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {socCodeCatalog.map((item) => (
                <tr key={item.soc} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{item.soc}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{item.title}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{item.industry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Course Catalog per SOC Code */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground text-center">Course Catalog by SOC Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socCodeCatalog.map((item) => (
              <div key={item.soc} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors">
                <div className="bg-muted px-4 py-3 border-b border-border flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{item.soc}</span>
                      <span className="text-xs font-bold text-foreground truncate">{item.title}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.industry}</p>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  {item.programs.map((prog) => (
                    <button
                      key={prog.title}
                      onClick={() => navigate(prog.route)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left rounded-md hover:bg-muted/60 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <GraduationCap size={12} className="text-primary/70 shrink-0" />
                        <span className="text-[11px] text-foreground truncate">{prog.title}</span>
                      </div>
                      <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose OSCT */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center">Why Choose OSCT?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: GraduationCap, title: 'Oxford Technical Offset', desc: 'Access to practical technical modules inspired by the world\'s leading academic environment.' },
            { icon: Factory, title: 'Direct Industrial Linkage', desc: 'Our curriculum is battle-tested in the factories and boardrooms of the Arif Habib Group.' },
            { icon: Shield, title: 'End-to-End Visa Support', desc: 'We help you navigate the Certificate of Sponsorship (CoS) process and the 5-year route to British citizenship.' },
            { icon: Globe, title: 'Global Recognition', desc: 'Earn UK-standard certifications that are recognized by top employers in London, Dubai, and Singapore.' },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-lg p-5 space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <item.icon size={18} className="text-primary" />
                <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-card border border-border rounded-xl p-6 md:p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Contact Our Global Headquarters</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-foreground font-semibold">
            <Building2 size={16} className="text-primary" />
            Oxford Skills Center of Technology Ltd
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin size={14} className="text-primary/70" />
            20 Bardwell Rd, Oxford OX2 6SR, United Kingdom
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <GraduationCap size={14} /> Browse All Programmes
          </button>
          <button
            onClick={() => navigate('/admissions')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
          >
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
