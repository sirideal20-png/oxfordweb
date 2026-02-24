import { useParams, useNavigate, Link } from 'react-router-dom';
import { masterProgramsData } from '@/data/constants';
import {
  ArrowLeft, Clock, GraduationCap, PoundSterling, Building2, Download,
  Briefcase, Globe, BookOpen, CheckCircle2, FileText, Award, Calendar,
  Shield, ChevronRight, Sparkles, Target, Users, FileCheck,
  Star, Percent, Heart, DollarSign, MapPin
} from 'lucide-react';

/* ── Helper: find master programme by slug ── */

const generateSlug = (title: string) =>
  title.replace(/^MS in /, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ── Category → School mapping ── */

const schoolMapping: Record<string, { schoolId: string; schoolName: string; schoolBrief: string }> = {
  'Engineering & Technology': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'The School of Engineering & Technology pioneers the future through cutting-edge labs, research facilities, and strong industry ties with firms like Arup, Balfour Beatty, and Atkins.',
  },
  'Computing & AI': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'The School of Computing & AI leads the digital revolution through world-class teaching in software engineering, AI, cybersecurity, and data science. Our AI Research Centre and partnerships with leading tech companies provide students with unrivalled opportunities.',
  },
  'Health Sciences & Medicine': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'The School of Health Sciences is dedicated to advancing healthcare education through simulation labs, teaching hospitals, and interprofessional learning. With partnerships across NHS trusts and private healthcare providers, students gain unparalleled clinical exposure.',
  },
  'Business & Management': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'The School of Business shapes global leaders through innovative teaching, an on-campus incubation hub, and industry partnerships with firms across the Oxford business ecosystem.',
  },
  'Law & Governance': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'The School of Law & Policy upholds justice through rigorous legal education, a dedicated Moot Court, and partnerships with leading law firms and chambers in Oxford and London.',
  },
  'Agriculture & Food Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'The School of Agriculture champions sustainable farming and environmental stewardship with research farms, food technology labs, and partnerships with agricultural organisations across the UK.',
  },
  'Aviation & Aerospace': {
    schoolId: 'avia', schoolName: 'School of Aviation',
    schoolBrief: 'The School of Aviation provides specialized training in aviation management, pilot studies, and aerospace systems with industry-grade flight simulators and partnerships with major airlines.',
  },
  'Arts, Design & Architecture': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'The School of Arts & Design fosters creativity in architecture, fashion, graphic design, and digital media through professional studios, exhibition spaces, and industry collaborations.',
  },
  'Languages, Literature & Linguistics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'The School of Lingual Literacy masters global languages, literature, and cross-cultural communication through dedicated language labs, exchange programmes, and expert faculty from around the world.',
  },
  'Education & Teaching': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Education programmes are housed within the School of Lingual Literacy, fostering excellence in teaching pedagogy, curriculum design, and educational research through partnerships with local schools and education authorities.',
  },
  'Social Sciences': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Social Sciences programmes are offered through the School of Law & Policy, providing rigorous training in research methods, policy analysis, and social impact assessment.',
  },
  'Natural Sciences': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Natural Sciences programmes are hosted within the School of Engineering & Technology, leveraging advanced research laboratories and scientific computing facilities.',
  },
  'Mathematics & Statistics': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'Mathematics & Statistics programmes are offered through the School of Computing & AI, combining pure mathematical theory with computational methods and data analytics.',
  },
  'Psychology & Behavioural Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Psychology programmes are housed within the School of Health Sciences, with dedicated psychology labs, clinical training facilities, and NHS research partnerships.',
  },
  'Media, Communication & Journalism': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Media and Communication programmes are offered through the School of Arts & Design, with professional broadcast studios, newsrooms, and digital content creation facilities.',
  },
  'Environmental & Earth Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Environmental Sciences programmes are hosted within the School of Agriculture, providing access to field stations, GIS laboratories, and environmental monitoring networks.',
  },
  'Economics & Development': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Economics programmes are offered through the School of Business, combining economic theory with practical business analytics and policy evaluation.',
  },
  'Islamic Studies & Theology': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Islamic Studies and Theology programmes are housed within the School of Lingual Literacy, fostering interdisciplinary research in religious texts, philosophy, and cultural heritage.',
  },
  'Philosophy & Ethics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Philosophy programmes are offered through the School of Lingual Literacy, providing rigorous training in critical thinking, ethical reasoning, and philosophical research.',
  },
  'Music & Performing Arts': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Music and Performing Arts programmes are hosted within the School of Arts & Design, with professional performance spaces, recording studios, and partnerships with cultural institutions.',
  },
  'Hospitality, Tourism & Events': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Hospitality and Tourism programmes are offered through the School of Business, combining service industry management with practical placement opportunities across the UK hospitality sector.',
  },
  'Sports Science & Physical Education': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Sports Science programmes are housed within the School of Health Sciences, with biomechanics labs, sports performance centres, and partnerships with professional sports organisations.',
  },
  'Library & Information Science': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'Library and Information Science programmes are offered through the School of Computing & AI, combining traditional information management with digital archival technologies.',
  },
  'Defence & Strategic Studies': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Defence and Strategic Studies programmes are hosted within the School of Law & Policy, providing training in security analysis, geopolitics, and defence policy.',
  },
  'Architecture & Urban Planning': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Architecture and Urban Planning programmes are offered through the School of Arts & Design, with professional design studios, CAD facilities, and partnerships with architectural practices.',
  },
  'Public Health & Epidemiology': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Public Health programmes are housed within the School of Health Sciences, providing training in epidemiological methods, health policy, and community health management.',
  },
  'Veterinary Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Veterinary Sciences programmes are hosted within the School of Agriculture, with clinical facilities, animal research labs, and partnerships with veterinary practices across the region.',
  },
  'Energy & Sustainability': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Energy and Sustainability programmes are offered through the School of Engineering & Technology, with renewable energy test rigs, sustainability research centres, and industry partnerships.',
  },
  'Pharmacy & Pharmaceutical Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Pharmacy programmes are housed within the School of Health Sciences, with pharmaceutical labs, clinical dispensaries, and partnerships with NHS pharmacies and pharmaceutical companies.',
  },
  'Supply Chain, Logistics & Maritime': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Supply Chain and Logistics programmes are offered through the School of Business, combining operations management theory with practical supply chain analytics and maritime trade.',
  },
};

const findMasterProgram = (slug: string) => {
  for (const [category, programs] of Object.entries(masterProgramsData)) {
    const found = programs.find(p => generateSlug(p.title) === slug);
    if (found) {
      const school = schoolMapping[category] || { schoolId: 'eng', schoolName: 'School of Engineering & Technology', schoolBrief: 'A leading academic department at Oxford Skills Center of Technology.' };
      return { ...found, category, ...school };
    }
  }
  return null;
};

/* ── Centralised admissions data (from Admissions menu) ── */

const masterEntryDocs = [
  { label: 'Degree Certificate', detail: "Evidence of your 4-year Bachelor's degree." },
  { label: 'Final Transcripts', detail: 'Year-by-year breakdown of your university grades.' },
  { label: 'Statement of Purpose (SOP)', detail: 'Tailored specifically to the programme and your career goals.' },
  { label: 'Two Letters of Recommendation (LOR)', detail: 'Usually one academic and one professional (if you have work experience).' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your education, internships, and skills.' },
  { label: 'English Proficiency', detail: "You don't need a specific IELTS or PTE score to apply. A simple letter of proficiency is sufficient, as a general English evaluation will be conducted once you arrive on campus." },
];

const centralFees = [
  { item: "Tuition Fee (Master's Degree)", amount: '£9,000 / year' },
  { item: 'Programme Duration', amount: '2 Years' },
];

const centralScholarshipSections = [
  {
    icon: Star, iconColor: 'text-amber-500', title: 'Premier Government & Global Scholarships',
    items: [
      { name: 'Chevening Scholarships', detail: "Covers 100% of tuition, living stipends (~£1,300/month), airfare, and visa fees for one-year Master's degrees." },
      { name: 'Commonwealth Scholarships', detail: 'Includes Shared Scholarships and Split-site PhDs. Provides full funding for students whose work contributes to national development.' },
      { name: 'GREAT Scholarships', detail: "A partnership offering a minimum of £10,000 towards tuition for one-year Master's degrees in specific subjects." },
      { name: 'Marshall Scholarships', detail: 'Highly prestigious; primarily for high-achieving students to pursue postgraduate study at any UK institution.' },
    ],
  },
  {
    icon: Percent, iconColor: 'text-emerald-500', title: 'Financial Concessions & Incentives',
    items: [
      { name: 'Early Payment Discount (EPD)', detail: 'A reduction of £1,000 to £2,000 for students who settle their full annual tuition fee by the specified deadline (usually August).' },
      { name: 'Early Deposit Award', detail: 'A discount (e.g., £500) for paying the seat-confirmation deposit shortly after receiving an admission offer.' },
      { name: 'Full-Fee Payment Discount', detail: 'A standard 3% to 5% reduction for paying the entire course fee upfront in a single installment.' },
    ],
  },
  {
    icon: Heart, iconColor: 'text-rose-500', title: 'Loyalty, Family & Professional Discounts',
    items: [
      { name: 'Sibling/Family Discount', detail: 'A 10% to 20% reduction for students who have a family member currently enrolled or who has previously graduated.' },
      { name: 'Alumni Loyalty Fee Waiver', detail: "A 15% to 20% discount for students progressing from a Bachelor's to a Master's at the same university." },
      { name: 'Partner School Discounts', detail: 'A 10%–15% fee reduction for students applying from recognized partner institutes or affiliated centers.' },
    ],
  },
  {
    icon: Award, iconColor: 'text-purple-500', title: 'Specialized, Talent & Inclusion Grants',
    items: [
      { name: 'Sanctuary Scholarships', detail: 'Full tuition waivers and support for students with refugee or asylum seeker status.' },
      { name: 'Elite Athlete/Sports & Music Awards', detail: 'Awards ranging from £1,000 to £6,000 for students representing the university in national competitions or arts.' },
      { name: 'A.S. Hornby Trust', detail: "Specifically for English Language Teachers to pursue advanced Master's training." },
    ],
  },
];

const centralKeyDates = [
  { label: 'Applications Open', date: 'Ongoing', detail: 'Online portal is open for September 2026 intake.', status: 'open' as const },
  { label: 'Application Deadline', date: 'Mar 30, 2026', detail: 'All applications must be submitted by this date.', status: 'upcoming' as const },
  { label: 'Orientation Week', date: 'Sep 07, 2026', detail: 'Welcome week and registration for all new students.', status: 'upcoming' as const },
  { label: 'Classes Begin', date: 'Sep 14, 2026', detail: 'Fall Semester commences for all programmes.', status: 'upcoming' as const },
];

const generalGuidelines = [
  'Applications are processed through the internal system of Oxford Skills Center of Technology, known as the OSCT-Scrutiny Cell.',
  'All applicants must submit a completed online application form with accurate personal and academic information.',
  'Shortlisted candidates will be invited for a discussion with faculty experts to assess professional aspirations and suitability.',
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

const MasterProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const program = findMasterProgram(slug || '');

  if (!program) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <h2 className="text-2xl font-bold text-foreground mb-2">Programme Not Found</h2>
        <p className="text-muted-foreground mb-4">The programme you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/programs/master-degree')} className="text-primary font-semibold text-sm hover:underline">
          ← Back to Master Programmes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={() => navigate('/programs/master-degree')} className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Master Programmes
        </button>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate">{program.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{program.code}</span>
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">Postgraduate</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{program.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> 2 Years</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-primary" /> Postgraduate</span>
          <span className="flex items-center gap-1.5"><PoundSterling size={14} className="text-primary" /> £9,000/year</span>
          <Link
            to={`/schools/${program.schoolId}`}
            state={{ fromProgram: { path: `/programs/master-degree/${slug}`, title: program.title } }}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Building2 size={14} className="text-primary" /> {program.schoolName}
          </Link>
        </div>
      </div>

      {/* Programme Introduction */}
      <Section icon={BookOpen} title="Programme Introduction" color="text-blue-600">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The {program.title} at Oxford Skills Center of Technology is a 2-year postgraduate programme designed to develop advanced expertise and research skills. Students engage with cutting-edge knowledge, industry-relevant projects, and academic research under the guidance of experienced faculty within the {program.schoolName} department. This programme prepares graduates for leadership roles in their field, equipping them with both theoretical depth and practical competence.
        </p>
      </Section>

      {/* School Brief */}
      <Section icon={Building2} title={`About ${program.schoolName}`} color="text-purple-600">
        <p className="text-sm text-muted-foreground leading-relaxed">{program.schoolBrief}</p>
        <Link
          to={`/schools/${program.schoolId}`}
          state={{ fromProgram: { path: `/programs/master-degree/${slug}`, title: program.title } }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:underline"
        >
          Visit School Page <ChevronRight size={12} />
        </Link>
      </Section>

      {/* Scope & Job Opportunities */}
      <Section icon={Briefcase} title="Scope & Job Opportunities" color="text-emerald-600">
        <ul className="grid sm:grid-cols-2 gap-2">
          {[
            'Senior specialist and expert roles in industry',
            'Academic and research positions at universities',
            'Management and leadership positions in organisations',
            'Consultancy and advisory roles across sectors',
            'Doctoral research pathway (Ph.D) for academic careers',
            'International career opportunities across the UK and globally',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Target size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Internship Offers */}
      <Section icon={Users} title="Internship Offers & Opportunities" color="text-amber-600">
        <ul className="space-y-2">
          {[
            'Industry placement opportunities with leading UK and international organisations',
            'Research assistantship positions within university departments and centres',
            'Professional development workshops and networking events with industry leaders',
            'Collaborative projects with partner institutions and organisations',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Sparkles size={14} className="text-amber-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Benefits & UK Settlement */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section icon={Award} title="Programme Benefits" color="text-rose-600">
          <ul className="space-y-2">
            {[
              'Advanced research methodology and analytical training',
              'Access to state-of-the-art labs, libraries, and resources',
              'Industry collaboration and expert guest lectures',
              'Dissertation project with real-world academic impact',
              'Strong alumni network and dedicated career support',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-rose-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={MapPin} title="Settlement Options in UK" color="text-sky-600">
          <ul className="space-y-2">
            {[
              'Graduate Route visa allows 2 years post-study work in the UK',
              'Strong Tier 2 sponsorship opportunities from major UK employers',
              'Postgraduate qualification significantly enhances visa applications',
              "Higher earning potential with a Master's degree qualification",
              'Pathway to Ph.D and further academic settlement in the UK',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Globe size={14} className="text-sky-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* General Guidelines */}
      <Section icon={Shield} title="General Guidelines" color="text-slate-600">
        <ul className="space-y-2">
          {generalGuidelines.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <FileText size={14} className="text-slate-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Fees & Scholarships */}
      <Section icon={DollarSign} title="Fees & Scholarships" color="text-emerald-600">
        <div className="bg-muted/50 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2.5 text-xs font-bold text-muted-foreground uppercase">Item</th>
                <th className="text-right px-4 py-2.5 text-xs font-bold text-muted-foreground uppercase">Details</th>
              </tr>
            </thead>
            <tbody>
              {centralFees.map((fee, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5 text-muted-foreground">{fee.item}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-foreground">{fee.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex gap-3 items-start mb-6">
          <Award className="text-amber-600 shrink-0 mt-1" size={18} />
          <div>
            <h4 className="font-bold text-foreground text-sm">Merit Scholarships Available</h4>
            <p className="text-xs text-muted-foreground mt-1">Up to 50% tuition waiver for students with outstanding academic records (GPA 3.8+). Apply during your admission process.</p>
          </div>
        </div>

        <div className="space-y-4">
          {centralScholarshipSections.map((section, idx) => (
            <div key={idx} className="bg-muted/50 rounded-lg border border-border/50 p-4 space-y-3">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <section.icon size={16} className={section.iconColor} /> {section.title}
              </h4>
              <div className="space-y-2 pl-6">
                {section.items.map((item, i) => (
                  <div key={i} className="border-l-2 border-border pl-3">
                    <h5 className="text-xs font-semibold text-foreground">{item.name}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Dates */}
      <Section icon={Calendar} title="Key Dates & Deadlines" color="text-rose-600">
        <div className="relative border-l-2 border-border ml-2 space-y-5 py-1">
          {centralKeyDates.map((d, i) => (
            <div key={i} className="relative pl-6">
              <div className={`absolute -left-[7px] top-0.5 w-3 h-3 rounded-full border-2 border-card ${
                d.status === 'open' ? 'bg-primary' : 'bg-muted-foreground/30'
              }`} />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{d.label}</span>
                {d.status === 'open' && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">OPEN</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-semibold">{d.date}</p>
              <p className="text-xs text-muted-foreground">{d.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Entry Requirements */}
      <Section icon={FileCheck} title="Entry Requirements" color="text-indigo-600">
        <p className="text-sm text-muted-foreground mb-4">
          The following documents are required for Master's Degree (Postgraduate Taught) applicants. Applications are usually made directly to the university's website.
        </p>
        <ul className="space-y-3">
          {masterEntryDocs.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 size={14} className="text-indigo-500 shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold text-foreground">{doc.label}:</span> {doc.detail}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 bg-muted/50 rounded-lg p-3 border border-border/50">
          <p className="text-xs text-muted-foreground italic">
            International applicants must apply at least 3 months prior to the start date.
          </p>
        </div>
      </Section>

      {/* Download & Apply */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-foreground">Ready to Advance Your Career?</h3>
        <p className="text-sm text-muted-foreground">
          Download the full prospectus for detailed curriculum information, or apply directly to secure your place for September 2026.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert('Prospectus download will begin shortly.')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border border-border bg-background hover:bg-muted transition-colors"
          >
            <Download size={16} /> Download Prospectus
          </button>
          <button
            onClick={() => window.dispatchEvent(new Event('open-application-modal'))}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <FileText size={16} /> Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterProgramDetailPage;
