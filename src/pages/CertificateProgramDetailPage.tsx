import { useParams, useNavigate, Link } from 'react-router-dom';
import { certificateProgramsFullData } from '@/data/certificatePrograms';
import {
  ArrowLeft, Clock, GraduationCap, PoundSterling, Building2, Download,
  Briefcase, Globe, BookOpen, CheckCircle2, FileText, Award, Calendar,
  Shield, ChevronRight, Sparkles, Target, Users, FileCheck,
  Star, Percent, Heart, DollarSign, MapPin
} from 'lucide-react';

/* ── Helper: find Certificate programme by slug ── */

const generateSlug = (title: string) =>
  title.replace(/^Certificate in /, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ── Category → School mapping ── */

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

/* ── Description generator ── */
const generateDescription = (title: string, category: string): string => {
  const field = title.replace(/^Certificate in /, '');
  return `This certificate programme in ${field} provides focused, practical training designed to equip learners with essential skills and knowledge in the field of ${category.toLowerCase()}. Through a combination of guided instruction, hands-on exercises, and real-world case studies, students will develop competencies that are directly applicable to industry requirements. Upon completion, graduates will hold a professionally recognised qualification from Oxford Skills Center of Technology, enhancing their employability and providing a solid foundation for further study.`;
};

const findCertificateProgram = (slug: string) => {
  for (const [category, programs] of Object.entries(certificateProgramsFullData)) {
    const found = programs.find(p => generateSlug(p.title) === slug);
    if (found) {
      const school = schoolMapping[category] || { schoolId: 'eng', schoolName: 'School of Engineering & Technology', schoolBrief: 'A leading academic department at Oxford Skills Center of Technology.' };
      return { ...found, category, ...school, description: generateDescription(found.title, category) };
    }
  }
  return null;
};

/* ── Centralised admissions data (Certificate specific) ── */

const certEntryDocs = [
  { label: 'Secondary School Certificate', detail: 'Proof of completion of secondary education (e.g., GCSE, O-Levels, or equivalent).' },
  { label: 'Academic Transcripts', detail: 'Official transcripts from your most recent educational institution.' },
  { label: 'Personal Statement', detail: 'A brief statement (200–400 words) outlining your interest in the programme and career goals.' },
  { label: 'English Language Proficiency', detail: 'IELTS 5.0 or equivalent for international applicants whose first language is not English.' },
  { label: 'Valid Identification', detail: 'A copy of your passport or national ID card.' },
  { label: 'Passport-Sized Photographs', detail: 'Two recent passport-sized photographs for identification purposes.' },
];

const getCentralFees = (duration: string) => [
  { item: "Tuition Fee (Certificate)", amount: '£6,000 (Total)' },
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
      { name: 'Early Payment Discount (EPD)', detail: 'A reduction of £500 to £1,000 for students who settle their full tuition fee by the specified deadline.' },
      { name: 'Early Deposit Award', detail: 'A discount (e.g., £250) for paying the seat-confirmation deposit shortly after receiving an admission offer.' },
      { name: 'Full-Fee Payment Discount', detail: 'A standard 3% to 5% reduction for paying the entire course fee upfront in a single installment.' },
    ],
  },
  {
    icon: Heart, iconColor: 'text-rose-500', title: 'Loyalty, Family & Professional Discounts',
    items: [
      { name: 'Alumni Loyalty Fee Waiver', detail: 'A 10% to 15% discount for students progressing from one programme to another at the same institution.' },
      { name: 'Sibling/Family Discount', detail: 'A 10% to 20% reduction for students who have a family member currently enrolled or previously graduated.' },
      { name: 'Partner School Discounts', detail: 'A 10%–15% fee reduction for students applying from recognized partner institutes or affiliated centers.' },
    ],
  },
  {
    icon: Award, iconColor: 'text-purple-500', title: 'Specialized, Talent & Inclusion Grants',
    items: [
      { name: 'Sanctuary Scholarships', detail: 'Full tuition waivers and support for students with refugee or asylum seeker status.' },
      { name: 'Vocational Excellence Awards', detail: 'Awards of £500 to £2,000 for students demonstrating outstanding practical skills and dedication.' },
      { name: 'Snowdon Trust Grants', detail: 'Funding to assist students with physical disabilities in covering additional study costs.' },
    ],
  },
];

const centralKeyDates = [
  { label: 'Applications Open', date: 'Ongoing', detail: 'Online portal is open for September 2026 intake.', status: 'open' as const },
  { label: 'Application Deadline', date: 'Jul 31, 2026', detail: 'All applications must be submitted by this date.', status: 'upcoming' as const },
  { label: 'Orientation Week', date: 'Sep 07, 2026', detail: 'Welcome week and registration for all new students.', status: 'upcoming' as const },
  { label: 'Classes Begin', date: 'Sep 14, 2026', detail: 'Fall Semester commences for all programmes.', status: 'upcoming' as const },
];

const generalGuidelines = [
  'Applications are processed through the internal system of Oxford Skills Center of Technology, known as the OSCT-Scrutiny Cell.',
  'All applicants must submit a completed online application form with accurate personal and academic information.',
  'Shortlisted candidates may be invited for an interview or skills assessment to evaluate suitability for the programme.',
  'Successful candidates receive a Conditional Offer Letter, securing a provisional spot while meeting remaining requirements.',
  'To confirm enrollment, the required deposit must be paid as outlined in the offer letter.',
  'Once all conditions are met and the deposit is verified, an Unconditional Letter is issued as final acceptance.',
  'International students will receive a CAS (Confirmation of Acceptance for Studies) for UK visa application.',
  'Make sure to have digital copies of your passport, certificates, and a professional photograph ready to speed up the process.',
];

/* ── Section wrapper ── */

const Section = ({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
      <Icon size={18} className={color} /> {title}
    </h3>
    {children}
  </div>
);

/* ── Component ── */

const CertificateProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const program = findCertificateProgram(slug || '');

  if (!program) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <h2 className="text-2xl font-bold text-foreground mb-2">Programme Not Found</h2>
        <p className="text-muted-foreground mb-4">The programme you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/programs/certificates')} className="text-primary font-semibold text-sm hover:underline">
          ← Back to Certificate Programmes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={() => navigate('/programs/certificates')} className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Certificates
        </button>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate">{program.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{program.code}</span>
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">Certificate</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{program.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {program.duration} (Full-Time)</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-primary" /> Certificate</span>
          <span className="flex items-center gap-1.5"><PoundSterling size={14} className="text-primary" /> £6,000 (Total)</span>
          <Link
            to={`/schools/${program.schoolId}`}
            state={{ fromProgram: { path: `/programs/certificates/${slug}`, title: program.title } }}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Building2 size={14} className="text-primary" /> {program.schoolName}
          </Link>
        </div>
      </div>

      {/* Programme Description */}
      <Section icon={BookOpen} title="Programme Overview" color="text-primary">
        <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
      </Section>

      {/* School Brief */}
      <Section icon={Building2} title={program.schoolName} color="text-primary">
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{program.schoolBrief}</p>
        <Link
          to={`/schools/${program.schoolId}`}
          state={{ fromProgram: { path: `/programs/certificates/${slug}`, title: program.title } }}
          className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
        >
          Visit School Page <ChevronRight size={12} />
        </Link>
      </Section>

      {/* Fees */}
      <Section icon={PoundSterling} title="Tuition Fees & Structure" color="text-emerald-500">
        <div className="grid gap-2">
          {getCentralFees(program.duration).map((fee, i) => (
            <div key={i} className="flex justify-between items-center bg-muted/50 rounded-xl px-4 py-3">
              <span className="text-xs text-muted-foreground">{fee.item}</span>
              <span className="text-xs font-bold text-foreground">{fee.amount}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Scholarships */}
      <Section icon={Award} title="Scholarships & Financial Aid" color="text-purple-500">
        <div className="grid gap-4">
          {centralScholarshipSections.map((section, i) => (
            <div key={i} className="border border-border/50 rounded-xl p-4">
              <h4 className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
                <section.icon size={14} className={section.iconColor} /> {section.title}
              </h4>
              <div className="grid gap-2">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
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

      {/* Key Dates */}
      <Section icon={Calendar} title="Key Dates & Deadlines" color="text-blue-500">
        <div className="grid gap-2">
          {centralKeyDates.map((date, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
              <div className={`w-2 h-2 rounded-full shrink-0 ${date.status === 'open' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{date.label}</p>
                <p className="text-[10px] text-muted-foreground">{date.detail}</p>
              </div>
              <span className="text-[11px] font-bold text-primary shrink-0">{date.date}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Entry Requirements */}
      <Section icon={FileCheck} title="Entry Requirements" color="text-amber-500">
        <div className="grid gap-3">
          {certEntryDocs.map((doc, i) => (
            <div key={i} className="flex items-start gap-3 bg-muted/50 rounded-xl p-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</div>
              <div>
                <p className="text-xs font-semibold text-foreground">{doc.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{doc.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Scope & Job Opportunities */}
      <Section icon={Briefcase} title="Scope & Job Opportunities" color="text-indigo-500">
        <div className="grid gap-2">
          {[
            'Gain focused, practical skills and an industry-recognized qualification for immediate career entry.',
            'Graduates are equipped for entry-level and assistant roles in their chosen field.',
            'Pathway to further study — certificate holders can progress to diploma and degree programmes.',
            'Strong industry partnerships provide placement opportunities and employer connections.',
            'International recognition allows graduates to pursue careers globally.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Target size={12} className="text-indigo-500 mt-0.5 shrink-0" />
              <span className="text-[11px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Internship Offers */}
      <Section icon={Sparkles} title="Internship & Placement Offers" color="text-pink-500">
        <div className="grid gap-2">
          {[
            'Work placement opportunities with partner organisations across the UK.',
            'Industry mentorship programme pairing students with professionals in their chosen field.',
            'Hands-on training in our on-campus workshops, labs, and simulation centres.',
            'Career services support including CV building, interview preparation, and job matching.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Sparkles size={12} className="text-pink-500 mt-0.5 shrink-0" />
              <span className="text-[11px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Programme Benefits */}
      <Section icon={Shield} title="Programme Benefits" color="text-teal-500">
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            'Practical, hands-on curriculum designed by industry experts',
            'Small class sizes for personalised attention',
            'State-of-the-art facilities and equipment',
            'Pathway to advanced qualifications',
            'Professional certification preparation',
            'Dedicated career support services',
            'Student support & wellbeing services',
            'Alumni network and lifelong learning access',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <CheckCircle2 size={12} className="text-teal-500 shrink-0" />
              <span className="text-[11px] text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* UK Settlement Options */}
      <Section icon={Globe} title="UK Settlement Options" color="text-sky-500">
        <div className="grid gap-2">
          {[
            'Graduate Route Visa — 2-year post-study work visa allowing employment in the UK after completing a UK qualification.',
            'Skilled Worker Visa — Employer-sponsored visa enabling graduates to work in skilled roles across the UK.',
            'Innovator Founder Visa — For entrepreneurial graduates looking to establish a business in the UK.',
            'Student Visa Extensions — Options to extend stay for further study towards a diploma or degree.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <MapPin size={12} className="text-sky-500 mt-0.5 shrink-0" />
              <span className="text-[11px] text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* General Guidelines */}
      <Section icon={FileText} title="Application Guidelines" color="text-orange-500">
        <div className="grid gap-2">
          {generalGuidelines.map((g, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="shrink-0 w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-[9px] font-bold mt-0.5">{i + 1}</div>
              <span className="text-[11px] text-muted-foreground">{g}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Download / Apply CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm rounded-xl py-3 hover:bg-primary/90 transition-colors">
          <FileText size={16} /> Apply Now
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground font-bold text-sm rounded-xl py-3 hover:bg-muted transition-colors">
          <Download size={16} /> Download Prospectus
        </button>
      </div>
    </div>
  );
};

export default CertificateProgramDetailPage;
