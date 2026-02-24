import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProgramBySlug, ProgramMeta } from '@/data/programDetails';
import { bachelorProgramsData } from '@/data/bachelorPrograms';
import {
  ArrowLeft, Clock, GraduationCap, PoundSterling, Building2, Download,
  Briefcase, Globe, BookOpen, CheckCircle2, FileText, Award, Calendar,
  Shield, MapPin, ChevronRight, Sparkles, Target, Users, FileCheck,
  Star, Percent, Heart, DollarSign
} from 'lucide-react';

/* ── Helper: generate slug from title ── */

const generateSlug = (title: string) =>
  title.replace(/^BS\(Hons\) in /, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ── Category → School mapping (same as other detail pages) ── */

const schoolMapping: Record<string, { schoolId: string; schoolName: string; schoolBrief: string }> = {
  'Engineering & Technology': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'The School of Engineering & Technology pioneers the future through cutting-edge labs, research facilities, and strong industry ties with firms like Arup, Balfour Beatty, and Atkins.',
  },
  'Computing & Information Technology': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'The School of Computing & AI leads the digital revolution through world-class teaching in software engineering, AI, cybersecurity, and data science. Our AI Research Centre and partnerships with leading tech companies provide students with unrivalled opportunities.',
  },
  'Health Sciences & Nursing': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'The School of Health Sciences is dedicated to advancing healthcare education through simulation labs, teaching hospitals, and interprofessional learning. With partnerships across NHS trusts and private healthcare providers, students gain unparalleled clinical exposure.',
  },
  'Business & Management': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'The School of Business equips future leaders with strategic thinking, financial acumen, and entrepreneurial skills. Triple-accredited (AACSB, EQUIS, AMBA) with strong ties to the City of London.',
  },
  'Law & Legal Studies': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'The School of Law & Policy offers rigorous legal education with moot courts, law clinics, and placements across barristers\' chambers and solicitors\' firms in London and Oxford.',
  },
  'Agriculture & Environmental Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'The School of Agriculture combines traditional agricultural expertise with cutting-edge technology on our 50-acre research farm in the Oxfordshire countryside.',
  },
  'Aviation & Aerospace': {
    schoolId: 'aviation', schoolName: 'School of Aviation',
    schoolBrief: 'The School of Aviation provides world-class training in flight operations, aviation management, and aerospace engineering with EASA-approved facilities.',
  },
  'Arts, Humanities & Social Sciences': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'The School of Arts & Design nurtures creativity through professional studios, galleries, and partnerships with cultural institutions across the UK.',
  },
  'Languages & Linguistics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'The School of Lingual Literacy builds on Oxford\'s unparalleled literary heritage, spanning English literature, modern foreign languages, translation studies, and applied linguistics.',
  },
  'Education & Teaching': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Education programmes are offered through the School of Lingual Literacy, combining pedagogical theory with practical classroom experience and school placements.',
  },
  'Media, Journalism & Communication': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Media and Communication programmes are offered through the School of Arts & Design, with professional newsrooms, broadcast studios, and digital media labs.',
  },
  'Social Sciences & Psychology': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Psychology and Social Sciences programmes are hosted within the School of Health Sciences, combining clinical research with community-based practice.',
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
  'Economics & Development': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Economics programmes are offered through the School of Business, combining economic theory with practical business analytics and policy evaluation.',
  },
  'Environmental Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Environmental Sciences programmes are hosted within the School of Agriculture, providing access to field stations, GIS laboratories, and environmental monitoring networks.',
  },
  'Mathematics & Statistics': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'Mathematics and Statistics programmes are offered through the School of Computing & AI, combining pure mathematical theory with applied computational methods and data analytics.',
  },
  'Pure & Applied Sciences': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Pure and Applied Sciences programmes are hosted within the School of Engineering & Technology, with specialist laboratories and research centres for physics, chemistry, and interdisciplinary sciences.',
  },
  // Bachelor-specific category names
  'Health Sciences & Medicine': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'The School of Health Sciences is dedicated to advancing healthcare education through simulation labs, teaching hospitals, and interprofessional learning.',
  },
  'Law & Governance': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'The School of Law & Policy offers rigorous legal education with moot courts, law clinics, and placements across barristers\' chambers and solicitors\' firms in London and Oxford.',
  },
  'Agriculture & Food Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'The School of Agriculture combines traditional agricultural expertise with cutting-edge technology on our 50-acre research farm in the Oxfordshire countryside.',
  },
  'Arts, Design & Architecture': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'The School of Arts & Design nurtures creativity through professional studios, galleries, and partnerships with cultural institutions across the UK.',
  },
  'Languages, Literature & Linguistics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'The School of Lingual Literacy builds on Oxford\'s unparalleled literary heritage, spanning English literature, modern foreign languages, translation studies, and applied linguistics.',
  },
  'Social Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Social Sciences programmes are hosted within the School of Health Sciences, combining research with community-based practice and social policy development.',
  },
  'Natural Sciences': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Natural Sciences programmes are hosted within the School of Engineering & Technology, with specialist laboratories for physics, chemistry, biology, and interdisciplinary research.',
  },
  'Media, Communication & Journalism': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Media and Communication programmes are offered through the School of Arts & Design, with professional newsrooms, broadcast studios, and digital media labs.',
  },
  'Psychology & Behavioural Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Psychology and Behavioural Sciences programmes are hosted within the School of Health Sciences, combining clinical research with applied psychological practice.',
  },
  'Economics & Finance': {
    schoolId: 'bus', schoolName: 'School of Business',
    schoolBrief: 'Economics and Finance programmes are offered through the School of Business, combining economic theory with practical financial analytics and policy evaluation.',
  },
  'Environmental & Earth Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Environmental and Earth Sciences programmes are hosted within the School of Agriculture, providing access to field stations, GIS laboratories, and environmental monitoring networks.',
  },
  'Sports, Fitness & Recreation': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Sports, Fitness and Recreation programmes are housed within the School of Health Sciences, with biomechanics labs, sports performance centres, and professional sports partnerships.',
  },
  'Pharmacy & Biomedical Sciences': {
    schoolId: 'health', schoolName: 'School of Health Sciences',
    schoolBrief: 'Pharmacy and Biomedical Sciences programmes are housed within the School of Health Sciences, with pharmaceutical labs, clinical dispensaries, and NHS partnerships.',
  },
  'Philosophy, Theology & Ethics': {
    schoolId: 'lingual', schoolName: 'School of Lingual Literacy',
    schoolBrief: 'Philosophy, Theology and Ethics programmes are housed within the School of Lingual Literacy, fostering interdisciplinary research in philosophical thought, religious texts, and ethical reasoning.',
  },
  'Veterinary & Animal Sciences': {
    schoolId: 'agri', schoolName: 'School of Agriculture',
    schoolBrief: 'Veterinary and Animal Sciences programmes are hosted within the School of Agriculture, with clinical facilities, animal research labs, and partnerships with veterinary practices.',
  },
  'Fashion, Textiles & Beauty': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Fashion, Textiles and Beauty programmes are offered through the School of Arts & Design, with professional design studios, trend labs, and industry partnerships.',
  },
  'Film, Animation & Creative Media': {
    schoolId: 'arts', schoolName: 'School of Arts & Design',
    schoolBrief: 'Film, Animation and Creative Media programmes are hosted within the School of Arts & Design, with professional production suites, editing labs, and animation studios.',
  },
  'Forensic & Criminal Justice': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Forensic and Criminal Justice programmes are hosted within the School of Law & Policy, combining forensic science with legal studies and criminal investigation techniques.',
  },
  'Public Administration & Development': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Public Administration and Development programmes are offered through the School of Law & Policy, providing training in governance, public policy, and international development.',
  },
  'Maritime & Ocean Sciences': {
    schoolId: 'eng', schoolName: 'School of Engineering & Technology',
    schoolBrief: 'Maritime and Ocean Sciences programmes are offered through the School of Engineering & Technology, with specialist naval architecture facilities and maritime simulation centres.',
  },
  'Military & Defence Studies': {
    schoolId: 'law', schoolName: 'School of Law & Policy',
    schoolBrief: 'Military and Defence Studies programmes are hosted within the School of Law & Policy, providing training in security analysis, geopolitics, and defence policy.',
  },
  'Emerging & Interdisciplinary Fields': {
    schoolId: 'cs', schoolName: 'School of Computing & AI',
    schoolBrief: 'Emerging and Interdisciplinary programmes are offered through the School of Computing & AI, combining cutting-edge technology with cross-disciplinary innovation and research.',
  },
};

/* ── Dynamic lookup from full bachelor data ── */

const findBachelorProgram = (slug: string) => {
  for (const [category, programs] of Object.entries(bachelorProgramsData)) {
    const found = programs.find(p => generateSlug(p.title) === slug);
    if (found) {
      const school = schoolMapping[category] || { schoolId: 'eng', schoolName: 'School of Engineering & Technology', schoolBrief: 'A leading academic department at Oxford Skills Center of Technology.' };
      return { ...found, category, ...school };
    }
  }
  return null;
};

/* ── Generate dynamic ProgramMeta for programmes without pre-defined data ── */

const buildDynamicProgram = (slug: string): ProgramMeta | null => {
  const found = findBachelorProgram(slug);
  if (!found) return null;
  const subjectName = found.title.replace(/^BS\(Hons\) in /, '');
  return {
    code: found.code,
    title: found.title,
    slug,
    duration: '4 Years',
    level: 'Undergraduate',
    annualFees: '£14,000',
    school: found.schoolName,
    schoolId: found.schoolId,
    introduction: `The ${found.title} at Oxford Skills Center of Technology provides a comprehensive education in ${subjectName}. This four-year programme combines rigorous academic study with practical experience, preparing graduates for professional careers and further postgraduate study. Students benefit from expert faculty, modern facilities, and strong industry connections within the ${found.schoolName}.`,
    schoolBrief: found.schoolBrief,
    scopeAndJobs: [
      `Professional roles in ${subjectName} across the UK and internationally`,
      `Graduate schemes with leading employers in the ${found.category} sector`,
      `Further study at Master's or Ph.D level in ${subjectName} or related fields`,
      `Research and development positions in industry and academia`,
      `Consultancy and advisory roles in specialist ${subjectName} firms`,
      `Public sector and government positions related to ${subjectName}`,
    ],
    internships: [
      `Structured placement year (optional) with industry partners in the ${found.category} sector`,
      `Summer internship opportunities with leading UK and international organisations`,
      `Research assistantships within the ${found.schoolName}`,
      `Community and voluntary sector placements for applied experience`,
    ],
    benefits: [
      'Accredited programme recognised by UK professional bodies',
      'Access to state-of-the-art facilities and specialist laboratories',
      'Small class sizes ensuring personalised academic support',
      'Strong alumni network providing mentorship and career opportunities',
      'Located in the historic city of Oxford with unrivalled academic heritage',
    ],
    settlementUK: [
      'Graduate Route Visa: 2-year post-study work visa for international graduates',
      'Skilled Worker Visa sponsorship through employer partnerships',
      'Career support services to help secure UK-based employment',
      'Strong employer connections in the Oxford and London corridors',
    ],
    guidelines: [],
    entryRequirements: [],
    feesBreakdown: [
      { item: "Tuition Fee (Bachelor's Degree)", amount: '£14,000 / year' },
      { item: 'Programme Duration', amount: '4 Years' },
    ],
    scholarships: [],
    deadlines: [
      { label: 'Applications Open', date: 'Ongoing', status: 'open' },
      { label: 'Application Deadline', date: 'Mar 30, 2026', status: 'upcoming' },
      { label: 'Semester Start', date: 'September 2026', status: 'upcoming' },
    ],
  };
};

/* ── Centralised admissions data (matching Admissions menu tabs) ── */

const bachelorEntryDocs = [
  { label: 'Academic Transcripts', detail: 'High School/Intermediate (HSSC) certificates and mark sheets.' },
  { label: 'English Proficiency', detail: "You don't need a specific IELTS or PTE score to apply. A simple letter of proficiency is sufficient, as a general English evaluation will be conducted once you arrive on campus." },
  { label: 'Personal Statement', detail: 'A 4,000-character essay focusing on your interest in the subject.' },
  { label: 'Reference Letter', detail: 'One academic reference from a teacher or principal.' },
  { label: 'Passport', detail: 'Copy of the photo page.' },
  { label: 'Financial Declaration', detail: 'Initial proof that you can cover tuition and living costs.' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your education, achievements, and extracurricular activities.' },
];

const centralFees = [
  { item: "Tuition Fee (Bachelor's Degree)", amount: '£14,000 / year' },
  { item: 'Programme Duration', amount: '4 Years' },
];

const centralScholarshipSections = [
  {
    icon: Star, iconColor: 'text-amber-500', title: 'Premier Government & Global Scholarships',
    items: [
      { name: 'Chevening Scholarships', detail: "Covers 100% of tuition, living stipends (~£1,300/month), airfare, and visa fees for one-year Master's degrees." },
      { name: 'Commonwealth Scholarships', detail: 'Includes Shared Scholarships and Split-site PhDs. Provides full funding for students whose work contributes to national development.' },
      { name: 'GREAT Scholarships', detail: "A partnership offering a minimum of £10,000 towards tuition for one-year Master's degrees in specific subjects." },
    ],
  },
  {
    icon: Percent, iconColor: 'text-emerald-500', title: 'Financial Concessions & Incentives',
    items: [
      { name: 'Early Payment Discount (EPD)', detail: 'A reduction of £1,000 to £2,000 for students who settle their full annual tuition fee by the specified deadline (usually August).' },
      { name: 'Full-Fee Payment Discount', detail: 'A standard 3% to 5% reduction for paying the entire course fee upfront in a single installment.' },
    ],
  },
  {
    icon: Heart, iconColor: 'text-rose-500', title: 'Loyalty, Family & Professional Discounts',
    items: [
      { name: 'Sibling/Family Discount', detail: 'A 10% to 20% reduction for students who have a family member currently enrolled or who has previously graduated.' },
      { name: 'Alumni Loyalty Fee Waiver', detail: "A 15% to 20% discount for students progressing from a Bachelor's to a Master's at the same university." },
    ],
  },
  {
    icon: DollarSign, iconColor: 'text-blue-500', title: 'Partner & Institutional Discounts',
    items: [
      { name: 'Partner School Discounts', detail: 'A 10%–15% fee reduction for students applying from recognized partner institutes or affiliated centres.' },
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

/* ── Component ── */

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const program = getProgramBySlug(slug || '') || buildDynamicProgram(slug || '');

  if (!program) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <h2 className="text-2xl font-bold text-foreground mb-2">Programme Not Found</h2>
        <p className="text-muted-foreground mb-4">The programme you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/programs/bachelor-degree')} className="text-primary font-semibold text-sm hover:underline">
          ← Back to Bachelor Programmes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Back & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button onClick={() => navigate('/programs/bachelor-degree')} className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Bachelor Programmes
        </button>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate">{program.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{program.code}</span>
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">{program.level}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{program.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {program.duration}</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-primary" /> {program.level}</span>
          <span className="flex items-center gap-1.5"><PoundSterling size={14} className="text-primary" /> {program.annualFees}/year</span>
          <Link to={`/schools/${program.schoolId}`} state={{ fromProgram: { path: `/programs/bachelor-degree/${slug}`, title: program.title } }} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Building2 size={14} className="text-primary" /> {program.school}
          </Link>
        </div>
      </div>

      {/* Introduction */}
      <Section icon={BookOpen} title="Programme Introduction" color="text-blue-600">
        <p className="text-sm text-muted-foreground leading-relaxed">{program.introduction}</p>
      </Section>

      {/* School Brief */}
      <Section icon={Building2} title={`About ${program.school}`} color="text-purple-600">
        <p className="text-sm text-muted-foreground leading-relaxed">{program.schoolBrief}</p>
        <Link to={`/schools/${program.schoolId}`} state={{ fromProgram: { path: `/programs/bachelor-degree/${slug}`, title: program.title } }} className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:underline">
          Visit School Page <ChevronRight size={12} />
        </Link>
      </Section>

      {/* Scope & Job Opportunities */}
      <Section icon={Briefcase} title="Scope & Job Opportunities" color="text-emerald-600">
        <ul className="grid sm:grid-cols-2 gap-2">
          {program.scopeAndJobs.map((item, i) => (
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
          {program.internships.map((item, i) => (
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
            {program.benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-rose-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={MapPin} title="Settlement Options in UK" color="text-sky-600">
          <ul className="space-y-2">
            {program.settlementUK.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Globe size={14} className="text-sky-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* General Guidelines — from Admissions > How to Apply */}
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

      {/* Fees & Scholarships — from Admissions > Fees & Scholarships */}
      <Section icon={DollarSign} title="Fees & Scholarships" color="text-emerald-600">
        {/* Fee Table */}
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

        {/* Scholarship Categories */}
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

      {/* Key Dates — from Admissions > Key Dates */}
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

      {/* Entry Requirements — from Admissions > Entry Requirements (Bachelor) */}
      <Section icon={FileCheck} title="Entry Requirements" color="text-indigo-600">
        <p className="text-sm text-muted-foreground mb-4">
          Applying to Oxford Skills Center is a straightforward process. The following documents are required for Bachelor's Degree applicants:
        </p>
        <ul className="space-y-3">
          {bachelorEntryDocs.map((doc, i) => (
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

      {/* Download Prospectus & Apply */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-foreground">Ready to Begin Your Journey?</h3>
        <p className="text-sm text-muted-foreground">
          Download the full prospectus for detailed curriculum information, or apply directly to secure your place for September 2027.
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

// Reusable section wrapper
const Section = ({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <h3 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
      <Icon size={18} className={color} /> {title}
    </h3>
    {children}
  </div>
);

export default ProgramDetailPage;