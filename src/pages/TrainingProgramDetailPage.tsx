import { useParams, useNavigate, Link } from 'react-router-dom';
import { trainingProgramsFullData } from '@/data/trainingPrograms';
import {
  ArrowLeft, Clock, GraduationCap, PoundSterling, Building2, Download,
  Briefcase, Globe, BookOpen, CheckCircle2, FileText, Award, Calendar,
  Shield, ChevronRight, Sparkles, Target, Users, FileCheck,
  Star, Percent, Heart, DollarSign, MapPin
} from 'lucide-react';

const generateSlug = (title: string) =>
  title.replace(/^Training in /, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const schoolMapping: Record<string, { schoolId: string; schoolName: string; schoolBrief: string }> = {
  'Engineering & Technology': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'The School of Engineering & Technology pioneers the future through cutting-edge labs, research facilities, and strong industry ties with firms like Arup, Balfour Beatty, and Atkins.',
  },
  'Computing & Information Technology': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'The School of Computing & AI leads the digital revolution through world-class teaching in software engineering, AI, cybersecurity, and data science.',
  },
  'Health Sciences & Nursing': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'The School of Health Sciences is dedicated to advancing healthcare education through simulation labs, teaching hospitals, and interprofessional learning.',
  },
  'Nursing': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'The Nursing division within the School of Health Sciences provides specialist clinical training, simulation-based learning, and placements across NHS and private healthcare settings.',
  },
  'Business & Management': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'The School of Business shapes global leaders through innovative teaching, an on-campus incubation hub, and industry partnerships.',
  },
  'Law & Legal Studies': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'The School of Law & Policy upholds justice through rigorous legal education, a dedicated Moot Court, and partnerships with leading law firms.',
  },
  'Agriculture & Food Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'The School of Agriculture champions sustainable farming and environmental stewardship with research farms and food technology labs.',
  },
  'Aviation & Aerospace': {
    schoolId: 'avia', schoolName: 'School of Aviation',
    schoolBrief: 'The School of Aviation provides specialized training in aviation management, pilot studies, and aerospace systems with industry-grade flight simulators.',
  },
  'Arts, Design & Architecture': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'The School of Arts & Design fosters creativity in architecture, fashion, graphic design, and digital media through professional studios.',
  },
  'Languages & Literature': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'The School of Lingual Literacy masters global languages, literature, and cross-cultural communication through dedicated language labs.',
  },
  'Education & Teaching': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Education programmes are housed within the School of Lingual Literacy, fostering excellence in teaching pedagogy and educational research.',
  },
  'Social Sciences & Humanities': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Social Sciences programmes are offered through the School of Law & Policy, providing rigorous training in research methods and policy analysis.',
  },
  'Natural Sciences': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Natural Sciences programmes are hosted within the School of Engineering & Technology, leveraging advanced research laboratories.',
  },
  'Mathematics & Statistics': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'Mathematics & Statistics programmes are offered through the School of Computing & AI, combining mathematical theory with computational methods.',
  },
  'Psychology & Behavioural Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Psychology programmes are housed within the School of Health Sciences, with dedicated psychology labs and clinical training facilities.',
  },
  'Media, Communication & Journalism': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Media and Communication programmes are offered through the School of Arts & Design, with professional broadcast studios and newsrooms.',
  },
  'Environmental & Earth Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Environmental Sciences programmes are hosted within the School of Agriculture, providing access to field stations and GIS laboratories.',
  },
  'Hospitality, Tourism & Events': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Hospitality and Tourism programmes are offered through the School of Business, combining service industry management with practical placements.',
  },
  'Sports Science & Physical Education': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Sports Science programmes are housed within the School of Health Sciences, with biomechanics labs and sports performance centres.',
  },
  'Beauty, Cosmetology & Wellness': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Beauty and Cosmetology programmes are offered through the School of Health Sciences, with professional salon facilities and spa training suites.',
  },
  'Culinary Arts & Food Service': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Culinary Arts programmes are offered through the School of Business, with professional training kitchens and hospitality partnerships.',
  },
  'Fashion & Textile Design': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Fashion & Textile Design programmes are hosted within the School of Arts & Design, with professional studios and fashion show facilities.',
  },
  'Security & Criminology': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Security and Criminology programmes are offered through the School of Law & Policy, combining practical security training with academic study.',
  },
  'Office Administration & Management': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Office Administration programmes are offered through the School of Business, providing practical training in modern office systems.',
  },
  'Construction & Building Trades': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Construction and Building Trades programmes are hosted within the School of Engineering & Technology, with hands-on workshops and site training.',
  },
  'Automotive & Motor Vehicle Technology': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Automotive programmes are offered through the School of Engineering & Technology, with fully equipped motor vehicle workshops and diagnostic labs.',
  },
  'Electrical & Electronics Technology': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Electrical & Electronics programmes are hosted within the School of Engineering & Technology, with modern electronics labs and workshop facilities.',
  },
  'Islamic Studies & Theology': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Islamic Studies and Theology programmes are housed within the School of Lingual Literacy, fostering interdisciplinary research.',
  },
  'Philosophy & Ethics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Philosophy programmes are offered through the School of Lingual Literacy, providing rigorous training in critical thinking and ethical reasoning.',
  },
  'Music & Performing Arts': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Music and Performing Arts programmes are hosted within the School of Arts & Design, with professional performance spaces and recording studios.',
  },
  'Supply Chain, Logistics & Maritime': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Supply Chain and Logistics programmes are offered through the School of Business, combining operations management with practical analytics.',
  },
  'Energy & Sustainability': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Energy and Sustainability programmes are offered through the School of Engineering & Technology, with renewable energy test rigs.',
  },
  'Marine & Maritime Studies': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Marine and Maritime programmes are hosted within the School of Engineering & Technology, with marine engineering workshops and simulation facilities.',
  },
};

const generateDescription = (title: string, category: string): string => {
  const field = title.replace(/^Training in /, '');
  return `This intensive training programme in ${field} delivers practical, hands-on instruction designed to rapidly build essential competencies in the field of ${category.toLowerCase()}. Through focused workshops, guided exercises, and real-world scenarios, participants will acquire skills that are immediately applicable to industry requirements. Upon completion, graduates receive a professionally recognised training certificate from Oxford Skills Center of Technology, demonstrating verified competence and enhancing career prospects.`;
};

const findTrainingProgram = (slug: string) => {
  for (const [category, programs] of Object.entries(trainingProgramsFullData)) {
    const found = programs.find(p => generateSlug(p.title) === slug);
    if (found) {
      const school = schoolMapping[category] || { schoolId: 'eng', schoolName: 'School of Engineering & Technology', schoolBrief: 'A leading academic department at Oxford Skills Center of Technology.' };
      return { ...found, category, ...school, description: generateDescription(found.title, category) };
    }
  }
  return null;
};

const trnEntryDocs = [
  { label: 'Valid Identification', detail: 'A copy of your passport or national ID card.' },
  { label: 'Educational Background', detail: 'Evidence of basic educational qualifications (secondary school certificate or equivalent).' },
  { label: 'Statement of Purpose', detail: 'A brief statement (100–200 words) outlining why you wish to take this training.' },
  { label: 'English Language Competency', detail: 'Basic English proficiency; IELTS 4.5 or equivalent for international participants.' },
  { label: 'Passport-Sized Photographs', detail: 'Two recent passport-sized photographs for identification purposes.' },
];

const getCentralFees = (duration: string) => [
  { item: "Training Fee", amount: '£1,700 (Total)' },
  { item: 'Programme Duration', amount: `${duration} (Full-Time)` },
];

const centralScholarshipSections = [
  {
    icon: Star, iconColor: 'text-amber-500', title: 'Premier Government & Global Scholarships',
    items: [
      { name: 'Chevening Scholarships', detail: "Covers 100% of tuition, living stipends (~£1,300/month), airfare, and visa fees for postgraduate study." },
      { name: 'Commonwealth Scholarships', detail: 'Provides full funding for students whose studies contribute to national development.' },
      { name: 'GREAT Scholarships', detail: 'Joint scholarships by the British Council offering £10,000 towards tuition for students from select countries.' },
    ],
  },
  {
    icon: Percent, iconColor: 'text-emerald-500', title: 'Financial Concessions & Incentives',
    items: [
      { name: 'Early Payment Discount (EPD)', detail: 'A reduction of £100 to £300 for participants who settle their full fee by the specified deadline.' },
      { name: 'Group Booking Discount', detail: 'A 10% reduction for groups of 3 or more participants enrolling in the same training programme.' },
      { name: 'Full-Fee Payment Discount', detail: 'A standard 3% to 5% reduction for paying the entire course fee upfront.' },
    ],
  },
  {
    icon: Heart, iconColor: 'text-rose-500', title: 'Loyalty, Family & Professional Discounts',
    items: [
      { name: 'Alumni Loyalty Fee Waiver', detail: 'A 10% to 15% discount for participants progressing from one programme to another at the same institution.' },
      { name: 'Corporate Partnership Discount', detail: 'A 15% to 20% reduction for employees of partner organisations.' },
      { name: 'Returning Participant Discount', detail: 'A 10% reduction for participants who have previously completed a training at OSCT.' },
    ],
  },
  {
    icon: Award, iconColor: 'text-purple-500', title: 'Specialized, Talent & Inclusion Grants',
    items: [
      { name: 'Sanctuary Scholarships', detail: 'Full tuition waivers and support for participants with refugee or asylum seeker status.' },
      { name: 'Vocational Excellence Awards', detail: 'Awards of £200 to £500 for participants demonstrating outstanding practical skills.' },
      { name: 'Snowdon Trust Grants', detail: 'Funding to assist participants with physical disabilities in covering additional study costs.' },
    ],
  },
];

const centralKeyDates = [
  { label: 'Applications Open', date: 'Ongoing', detail: 'Online portal is open for September 2026 intake.', status: 'open' as const },
  { label: 'Application Deadline', date: 'Jul 31, 2026', detail: 'All applications must be submitted by this date.', status: 'upcoming' as const },
  { label: 'Orientation', date: 'Sep 07, 2026', detail: 'Welcome session and registration for all new participants.', status: 'upcoming' as const },
  { label: 'Training Begins', date: 'Sep 14, 2026', detail: 'Fall intake commences for all programmes.', status: 'upcoming' as const },
];

const generalGuidelines = [
  'Applications are processed through the internal system of Oxford Skills Center of Technology, known as the OSCT-Scrutiny Cell.',
  'All applicants must submit a completed online application form with accurate personal and academic information.',
  'Shortlisted candidates may be invited for a brief assessment to evaluate suitability for the programme.',
  'Successful candidates receive a Conditional Offer Letter, securing a provisional spot while meeting remaining requirements.',
  'To confirm enrollment, the required deposit must be paid as outlined in the offer letter.',
  'Once all conditions are met and the deposit is verified, an Unconditional Letter is issued as final acceptance.',
  'International participants will receive a CAS (Confirmation of Acceptance for Studies) for UK visa application.',
  'Make sure to have digital copies of your passport, certificates, and a professional photograph ready to speed up the process.',
];

const Section = ({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
      <Icon size={18} className={color} /> {title}
    </h3>
    {children}
  </div>
);

const TrainingProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const program = findTrainingProgram(slug || '');

  if (!program) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <h2 className="text-2xl font-bold text-foreground mb-2">Programme Not Found</h2>
        <p className="text-muted-foreground mb-4">The programme you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/programs/trainings')} className="text-primary font-semibold text-sm hover:underline">
          ← Back to Training Programmes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={() => navigate('/programs/trainings')} className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Trainings
        </button>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate">{program.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{program.code}</span>
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">Training</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{program.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {program.duration} (Full-Time)</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-primary" /> Training</span>
          <span className="flex items-center gap-1.5"><PoundSterling size={14} className="text-primary" /> £1,700 (Total)</span>
          <Link
            to={`/schools/${program.schoolId}`}
            state={{ fromProgram: { path: `/programs/trainings/${slug}`, title: program.title } }}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Building2 size={14} className="text-primary" /> {program.schoolName}
          </Link>
        </div>
      </div>

      {/* Description */}
      <Section icon={BookOpen} title="Programme Overview" color="text-primary">
        <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
      </Section>

      {/* School Info */}
      <Section icon={Building2} title={program.schoolName} color="text-blue-500">
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{program.schoolBrief}</p>
        <Link
          to={`/schools/${program.schoolId}`}
          state={{ fromProgram: { path: `/programs/trainings/${slug}`, title: program.title } }}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          Visit School Page <ChevronRight size={12} />
        </Link>
      </Section>

      {/* Career Scope */}
      <Section icon={Briefcase} title="Career & Professional Scope" color="text-emerald-500">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Target, label: 'Industry-Ready Skills', desc: 'Gain hands-on competencies valued by employers across multiple sectors.' },
            { icon: Globe, label: 'UK Employment Opportunities', desc: 'Enhanced employability with a UK-recognised training qualification.' },
            { icon: Sparkles, label: 'Professional Development', desc: 'Continuous professional development recognised by industry bodies.' },
            { icon: Users, label: 'Networking Opportunities', desc: 'Connect with industry professionals and fellow trainees during the programme.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <item.icon size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* UK Settlement */}
      <Section icon={MapPin} title="UK Settlement & Visa Options" color="text-sky-500">
        <div className="space-y-2">
          {[
            { title: 'Student Visa (Short-Term)', desc: 'Eligible for a Short-Term Study Visa for programmes up to 6 months.' },
            { title: 'Post-Training Opportunities', desc: 'Explore further study options at OSCT to extend your UK stay.' },
            { title: 'Skilled Worker Visa Pathway', desc: 'Certain training qualifications can support Skilled Worker visa applications when combined with employer sponsorship.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle2 size={14} className="text-sky-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{item.title}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Fees */}
      <Section icon={PoundSterling} title="Fees & Funding" color="text-emerald-500">
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <table className="w-full text-xs">
            <thead><tr className="bg-muted"><th className="text-left px-4 py-2.5 font-semibold text-foreground">Item</th><th className="text-right px-4 py-2.5 font-semibold text-foreground">Amount</th></tr></thead>
            <tbody>
              {getCentralFees(program.duration).map((f, i) => (
                <tr key={i} className="border-t border-border/50"><td className="px-4 py-2.5 text-muted-foreground">{f.item}</td><td className="px-4 py-2.5 text-right font-semibold text-foreground">{f.amount}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4">
          {centralScholarshipSections.map((section, i) => (
            <div key={i}>
              <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                <section.icon size={14} className={section.iconColor} /> {section.title}
              </h4>
              <div className="space-y-1.5">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                    <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-semibold text-foreground">{item.name}: </span>
                      <span className="text-[11px] text-muted-foreground">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Application Process */}
      <Section icon={FileText} title="How to Apply" color="text-primary">
        <div className="space-y-2 mb-4">
          {generalGuidelines.map((g, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{g}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Dates */}
      <Section icon={Calendar} title="Key Dates" color="text-indigo-500">
        <div className="grid sm:grid-cols-2 gap-3">
          {centralKeyDates.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar size={14} className={d.status === 'open' ? 'text-emerald-500' : 'text-amber-500'} />
              <div>
                <p className="text-xs font-semibold text-foreground">{d.label}</p>
                <p className="text-[11px] font-mono text-primary">{d.date}</p>
                <p className="text-[10px] text-muted-foreground">{d.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Entry Requirements */}
      <Section icon={FileCheck} title="Entry Requirements" color="text-orange-500">
        <div className="space-y-2">
          {trnEntryDocs.map((doc, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{doc.label}</p>
                <p className="text-[11px] text-muted-foreground">{doc.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-foreground mb-2">Ready to Enrol?</h3>
        <p className="text-xs text-muted-foreground mb-4">Begin your professional training journey at Oxford Skills Center of Technology.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="h-9 px-6 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            <FileText size={14} /> Apply Now
          </button>
          <button className="h-9 px-6 text-xs font-semibold rounded-lg border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Download size={14} /> Download Prospectus
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramDetailPage;
