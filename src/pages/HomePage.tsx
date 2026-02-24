import { useState, useMemo, useCallback, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, Briefcase, Award, Calendar, Phone, Mail,
  ChevronRight, ArrowRight, Download, ChevronDown, Search, X
} from 'lucide-react';
import ImageSlider from '@/components/shared/ImageSlider';
import StatusBadge from '@/components/shared/StatusBadge';
import {
  courses, sliderImages, programMenuItems,
  schoolsData, transactionsData, studentPortalSections, admissionSubItems, alumniSpotlights
} from '@/data/constants';
import { allCalendarEvents, eventTypeColors, getUpcomingEvents } from '@/data/calendarEvents';
import { bachelorProgramDetails } from '@/data/programDetails';
import HomeOverviewSections from '@/components/home/HomeOverviewSections';

const programTypeRouteMap: Record<string, string> = {
  'Bachelor': '/programs/bachelor-degree', 'Master': '/programs/master-degree',
  'Ph.D': '/programs/ph.d-degree', 'Diploma': '/programs/diploma-programs',
  'Certificate': '/programs/certificates', 'Training': '/programs/trainings',
  'Short Course': '/programs/short-courses',
};
const levelRouteMap = programTypeRouteMap;

const generateSlugForType = (title: string, programType: string): string => {
  const prefixMap: Record<string, RegExp> = {
    'Bachelor': /^BS\(Hons\) in /, 'Master': /^MS in /, 'Ph.D': /^Ph\.D in /,
    'Diploma': /^Diploma in /, 'Certificate': /^Certificate in /, 'Training': /^Training in /,
  };
  const prefix = prefixMap[programType];
  const stripped = prefix ? title.replace(prefix, '') : title;
  return stripped.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const bachelorCodeToSlug: Record<string, string> = {};
bachelorProgramDetails.forEach(p => { bachelorCodeToSlug[p.code] = p.slug; });

const getCoursePath = (course: typeof courses[0]): string => {
  const base = levelRouteMap[course.level] || '/programs/bachelor-degree';
  if (course.level === 'Bachelor') {
    const slug = bachelorCodeToSlug[course.code];
    if (slug) return `${base}/${slug}`;
  }
  if (['Master', 'Ph.D', 'Diploma', 'Certificate', 'Training'].includes(course.level)) {
    const slug = generateSlugForType(course.title, course.level);
    if (slug) return `${base}/${slug}`;
  }
  return base;
};


// --- Universal search item ---
interface UniversalSearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string; // e.g. "Programme", "Admissions", "School", "Event", etc.
  tag: string; // e.g. "Bachelor", "Holiday", "Transaction"
  path: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [isBannerMenuOpen, setIsBannerMenuOpen] = useState(false);
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [, startTransition] = useTransition();

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    startTransition(() => setDebouncedQuery(value));
  }, []);

  // Build comprehensive search index

  // Build comprehensive search index
  const searchIndex = useMemo(() => {
    const items: UniversalSearchItem[] = [];

    // 1. Admissions pages
    admissionSubItems.forEach(a => {
      items.push({ id: `adm-${a.id}`, title: a.label, subtitle: 'Admissions & UK Settlement', category: 'Admissions', tag: 'Page', path: a.path || '/admissions' });
    });

    // 2. Schools of Study
    schoolsData.forEach(s => {
      items.push({ id: `sch-${s.id}`, title: s.name, subtitle: `${s.stats} — ${s.tags.join(', ')}`, category: 'School', tag: 'School', path: `/schools/${s.id}` });
    });

    // 3. Online Transactions
    transactionsData.forEach(t => {
      const slug = t.title.toLowerCase().replace(/[\s?]+/g, '-').replace(/-+$/, '');
      items.push({ id: `txn-${slug}`, title: t.title, subtitle: t.desc, category: 'Transaction', tag: 'Service', path: `/transactions/${slug}` });
    });

    // 4. Student Portal sections
    studentPortalSections.forEach(s => {
      const slug = s.title.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-');
      items.push({ id: `sp-${slug}`, title: s.title, subtitle: s.desc, category: 'Student Portal', tag: 'Portal', path: `/student-portal/${slug}` });
    });

    // 5. Calendar Events
    allCalendarEvents.forEach((e, i) => {
      items.push({ id: `evt-${i}`, title: e.title, subtitle: `${e.date} — ${e.description}`, category: 'Event', tag: e.type.charAt(0).toUpperCase() + e.type.slice(1), path: '/admissions/academic-calendar' });
    });

    // 6. Static pages
    items.push({ id: 'page-campus', title: 'Campus Life', subtitle: 'Accommodation, sports, dining & student activities', category: 'Page', tag: 'Page', path: '/campus-life' });
    items.push({ id: 'page-alumni', title: 'Alumni Network', subtitle: 'Connect with 18,000+ graduates worldwide', category: 'Page', tag: 'Page', path: '/alumni' });
    items.push({ id: 'page-support', title: 'Support & Contact', subtitle: 'Phone, email, and live chat assistance', category: 'Page', tag: 'Page', path: '/support' });
    items.push({ id: 'page-allprog', title: 'All Programmes', subtitle: 'Browse our complete range of programmes', category: 'Page', tag: 'Page', path: '/programs' });

    // 7. Deep content — scholarships, financial aid, key topics across the site
    const deepContent: { id: string; title: string; subtitle: string; category: string; tag: string; path: string }[] = [
      // Scholarships & Financial Aid
      { id: 'dc-merit', title: 'Merit Scholarship (GPA 3.8+)', subtitle: 'Up to 50% tuition waiver for outstanding academic records', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-early-bird', title: 'Early-Bird Discount', subtitle: 'Reduced tuition for early applicants', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-sibling', title: 'Sibling Discount', subtitle: 'Family discount for multiple enrolled siblings', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-snowdon', title: 'Snowdon Trust Grant (Disabilities)', subtitle: 'Financial support for students with disabilities', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-athlete', title: 'Elite Athlete / Sports & Music Award', subtitle: 'Recognition for sporting and musical talent', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-alumni-disc', title: 'Alumni Loyalty Discount', subtitle: 'Returning graduate tuition reduction', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-need-based', title: 'Need-Based Financial Aid', subtitle: 'Means-tested support for eligible students', category: 'Financial Aid', tag: 'Scholarship', path: '/admissions/fees-scholarships' },
      { id: 'dc-scholarship-placement', title: 'Scholarship & Placement Exam', subtitle: 'Sit the exam to qualify for merit-based awards', category: 'Financial Aid', tag: 'Exam', path: '/admissions/placement-exam' },
      // Fees & Payments
      { id: 'dc-tuition', title: 'Tuition Fees', subtitle: 'Annual tuition rates for all programme levels', category: 'Fees', tag: 'Finance', path: '/admissions/fees-scholarships' },
      { id: 'dc-fee-calc', title: 'Fee Calculator', subtitle: 'Calculate your total cost including discounts and scholarships', category: 'Fees', tag: 'Finance', path: '/admissions/fee-calculator' },
      { id: 'dc-refund', title: 'Refund Policy', subtitle: 'Withdrawal and refund terms for tuition payments', category: 'Fees', tag: 'Finance', path: '/admissions/refund-policy' },
      { id: 'dc-payment', title: 'Payment Procedures', subtitle: 'Bank transfer, online payment, and instalment plans', category: 'Fees', tag: 'Finance', path: '/admissions' },
      { id: 'dc-instalment', title: 'Instalment Payment Plan', subtitle: 'Pay tuition in monthly instalments', category: 'Fees', tag: 'Finance', path: '/admissions/fees-scholarships' },
      // Admissions & Requirements
      { id: 'dc-apply', title: 'How to Apply', subtitle: 'Step-by-step online application process', category: 'Admissions', tag: 'Guide', path: '/admissions' },
      { id: 'dc-entry-req', title: 'Entry Requirements', subtitle: 'A-Levels, BTEC, Access to HE Diploma, IELTS & international qualifications', category: 'Admissions', tag: 'Guide', path: '/admissions/entry-requirements' },
      { id: 'dc-ielts', title: 'IELTS / English Language Requirements', subtitle: 'Minimum English proficiency for international applicants', category: 'Admissions', tag: 'Guide', path: '/admissions/entry-requirements' },
      { id: 'dc-visa', title: 'Student Visa Application', subtitle: 'Tier 4 / Student Route visa guidance for international students', category: 'Admissions', tag: 'Guide', path: '/admissions/visa-applications' },
      { id: 'dc-transfer', title: 'Transfer Students', subtitle: 'Credit transfer and programme migration policy', category: 'Admissions', tag: 'Guide', path: '/admissions/transfer-students' },
      { id: 'dc-agents', title: 'Agents & Representatives', subtitle: 'Authorised recruitment agents worldwide', category: 'Admissions', tag: 'Guide', path: '/admissions/agents' },
      // Campus Life Topics
      { id: 'dc-accommodation', title: 'Student Accommodation', subtitle: 'On-campus halls, off-campus options, and hostel booking', category: 'Campus', tag: 'Facility', path: '/campus-life' },
      { id: 'dc-sports', title: 'Sports & Recreation', subtitle: 'Olympic pool, gym, football, basketball, and fitness centre', category: 'Campus', tag: 'Facility', path: '/campus-life' },
      { id: 'dc-dining', title: 'Dining & Cafeteria', subtitle: 'Cafeterias, meal plans, and food courts on campus', category: 'Campus', tag: 'Facility', path: '/campus-life' },
      { id: 'dc-library', title: 'Campus Library', subtitle: '24/7 library, study rooms, and digital resources', category: 'Campus', tag: 'Facility', path: '/campus-life' },
      { id: 'dc-clubs', title: 'Clubs & Societies', subtitle: 'Debate, Esports, Music, Art, and 30+ student organisations', category: 'Campus', tag: 'Activity', path: '/campus-life' },
      // Student Services
      { id: 'dc-gpa', title: 'GPA & Grading System', subtitle: 'Grade point average calculation and grading scale', category: 'Student Portal', tag: 'Academic', path: '/student-portal/grading-system' },
      { id: 'dc-transcript', title: 'Transcripts & Documents', subtitle: 'Request official transcripts and degree certificates', category: 'Transaction', tag: 'Service', path: '/transactions/document-app' },
      { id: 'dc-counseling', title: 'Student Counselling & Support', subtitle: 'Academic advising, mental health, and career counselling', category: 'Support', tag: 'Service', path: '/support' },
      { id: 'dc-orientation', title: 'New Student Orientation', subtitle: 'Welcome week events and campus tour guide', category: 'Student Portal', tag: 'Academic', path: '/student-portal/orientation' },
      { id: 'dc-makeup', title: 'Make-up Exam Application', subtitle: 'Apply for retake and make-up examination', category: 'Student Portal', tag: 'Academic', path: '/student-portal/make-up-exams' },
      { id: 'dc-handbook', title: 'Student Handbook', subtitle: 'University rules, code of conduct, and academic policies', category: 'Student Portal', tag: 'Academic', path: '/student-portal/student-handbook' },
      { id: 'dc-council', title: 'Student Council & Elections', subtitle: 'Student government, elections, and representation', category: 'Student Portal', tag: 'Academic', path: '/student-portal/student-council' },
      { id: 'dc-calendar', title: 'Academic Calendar & Important Dates', subtitle: 'Semester start, exam periods, holidays, and deadlines', category: 'Event', tag: 'Calendar', path: '/admissions/academic-calendar' },
    ];
    items.push(...deepContent);

    return items;
  }, []);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const lower = debouncedQuery.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.subtitle.toLowerCase().includes(lower) ||
      item.tag.toLowerCase().includes(lower) ||
      item.category.toLowerCase().includes(lower)
    );
  }, [debouncedQuery, searchIndex]);

  const handleResultNavigation = useCallback((path: string) => {
    handleSearchChange('');
    navigate(path);
  }, [navigate, handleSearchChange]);

  const handleNavigation = (name: string) => {
    const path = `/programs/${name.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path);
    setIsBannerMenuOpen(false);
  };

  const isSearching = !!debouncedQuery;

  // Category colors for tags
  const tagColor = (category: string, tag: string) => {
    if (category === 'Programme') {
      const m: Record<string, string> = {
        'Bachelor': 'bg-blue-50 text-blue-600 border-blue-100',
        'Master': 'bg-purple-50 text-purple-600 border-purple-100',
        'Ph.D': 'bg-rose-50 text-rose-600 border-rose-100',
        'Diploma': 'bg-amber-50 text-amber-600 border-amber-100',
        'Certificate': 'bg-indigo-50 text-indigo-600 border-indigo-100',
        'Training': 'bg-orange-50 text-orange-600 border-orange-100',
        'Short Course': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      };
      return m[tag] || 'bg-muted text-muted-foreground border-border';
    }
    const m: Record<string, string> = {
      'Admissions': 'bg-sky-50 text-sky-600 border-sky-100',
      'School': 'bg-teal-50 text-teal-600 border-teal-100',
      'Transaction': 'bg-violet-50 text-violet-600 border-violet-100',
      'Student Portal': 'bg-cyan-50 text-cyan-600 border-cyan-100',
      'Event': 'bg-green-50 text-green-600 border-green-100',
      'Page': 'bg-slate-50 text-slate-600 border-slate-100',
      'Financial Aid': 'bg-amber-50 text-amber-600 border-amber-100',
      'Fees': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'Campus': 'bg-rose-50 text-rose-600 border-rose-100',
      'Support': 'bg-pink-50 text-pink-600 border-pink-100',
    };
    return m[category] || 'bg-muted text-muted-foreground border-border';
  };

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, UniversalSearchItem[]> = {};
    searchResults.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [searchResults]);

  return (
    <div className="space-y-6">
      {/* Universal Search */}
      <div className="relative flex items-center gap-3 w-full">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search scholarships, admissions, schools, events, services…"
            className="w-full h-9 pl-9 pr-20 text-xs rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {searchQuery && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                {searchResults.length} found
              </span>
              <button onClick={() => handleSearchChange('')} className="p-0.5 hover:bg-muted rounded transition-colors" title="Clear">
                <X size={12} className="text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Results for "{debouncedQuery}"</h3>
            <span className="text-xs text-muted-foreground font-medium">{searchResults.length} found</span>
          </div>
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{category} ({items.length})</h4>
                  <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm divide-y divide-border/50">
                    {items.map((item) => (
                      <div key={item.id} className="px-4 sm:px-5 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${tagColor(item.category, item.tag)}`}>
                            {item.category === 'Programme' ? item.tag : item.category}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{item.subtitle}</p>
                          </div>
                        </div>
                        <button onClick={() => handleResultNavigation(item.path)} className="h-6 text-[10px] text-primary hover:text-primary/80 hover:bg-primary/5 font-semibold rounded px-2 shrink-0">View</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Search size={32} className="mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-muted-foreground text-sm">No results found matching "{debouncedQuery}".</p>
              <button onClick={() => handleSearchChange('')} className="text-primary text-xs font-bold mt-2 hover:underline">Clear Search</button>
            </div>
          )}
        </div>
      )}

      {/* Main content hidden when searching */}
      <div className={isSearching ? 'hidden' : 'space-y-6'}>
        {/* Hero Banner */}
        <div className="rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-border relative group overflow-hidden">
          <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
            <img src="https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/Oxford-skills-center-Entrance.jpg" alt="Oxford Skills Center Entrance" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 md:to-white/70 to-white/80" />
          </div>
          {/* Desktop logo — top right corner */}
          <img
            src="https://oxfordskillscenter.co.uk/wp-content/uploads/2025/12/Logo-Oxford-Skills-Center.png"
            alt="Oxford Skills Center Logo"
            className="hidden md:block absolute top-4 right-4 md:top-6 md:right-6 z-10 h-14 lg:h-16 w-auto bg-white/90 backdrop-blur-sm rounded-lg p-1.5 object-contain shadow-sm border border-border/30"
          />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-100/90 backdrop-blur-sm text-emerald-900 rounded-md text-[10px] font-bold uppercase mb-3 md:mb-4 border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
              Admissions Open — September 2026 Intake
            </div>
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-1 sm:mb-2 tracking-tight leading-[1.1]">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Oxford Skills Center</span>
             </h1>
             <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed max-w-xl font-medium">Your gateway to advanced technical education. We provide industry-accredited vocational training designed to launch your career.</p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsBannerMenuOpen(!isBannerMenuOpen)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ArrowRight size={14} /> Browse Programmes
                </button>
                {isBannerMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsBannerMenuOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-md shadow-xl border border-border overflow-hidden z-30 animate-fadeIn">
                      {programMenuItems.map((item, idx) => {
                        if (typeof item === 'string') {
                          return <button key={idx} onClick={() => handleNavigation(item)} className="block w-full text-left px-4 py-2 text-xs text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors border-b border-border/50 last:border-0">{item}</button>;
                        } else {
                          return (
                            <div key={idx} className="border-b border-border/50 last:border-0">
                              <button onClick={() => setIsDegreeOpen(!isDegreeOpen)} className="flex items-center justify-between w-full text-left px-4 py-2 text-xs text-foreground font-medium hover:bg-primary/5 transition-colors">
                                {item.title}
                                <ChevronDown size={12} className={`transition-transform duration-200 ${isDegreeOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isDegreeOpen && (
                                <div className="bg-muted border-y border-border">
                                  {item.children.map(child => (
                                    <button key={child} onClick={() => handleNavigation(child)} className="block w-full text-left pl-8 pr-4 py-2 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                                      {child}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </>
                )}
              </div>
              <button className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-md bg-background/80 backdrop-blur-sm text-foreground border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 active:scale-95">
                <Download size={14} /> Download Prospectus
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: 'Total Students', value: '18,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Courses', value: '7,000+', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Industry Partners', value: '120+', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Job Placement', value: '98%', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-3 sm:p-4 rounded-lg border border-border shadow-sm flex items-center gap-2 sm:gap-4 min-w-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-foreground truncate">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-muted-foreground truncate">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Picture Gallery */}
        <ImageSlider images={sliderImages} />

        {/* Upcoming Events */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-primary" /> Upcoming Events
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {getUpcomingEvents(3).map((event, i) => {
              const colors = eventTypeColors[event.type];
              const [month, day] = event.date.split(' ');
              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded bg-muted border border-border flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[10px] font-bold text-primary leading-none">{month}</span>
                    <span className="text-xs font-bold text-foreground leading-none mt-0.5">{day}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground leading-snug">{event.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-snug">{event.description}</p>
                    <span className={`inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>{colors.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigate('/admissions/academic-calendar')} className="w-full mt-4 py-2 text-xs font-semibold text-muted-foreground bg-muted rounded hover:bg-muted/80 transition-colors">
            View Full Calendar →
          </button>
        </div>

        {/* Featured Programmes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Featured Programmes</h3>
            <button onClick={() => navigate('/programs')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">View All <ChevronRight size={14} /></button>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block bg-card rounded-lg border border-border shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider">Programme Name</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground uppercase tracking-wider">Level</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                          <course.icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-foreground truncate">{course.title}</div>
                          <div className="text-muted-foreground text-[10px] truncate">{course.code} • {course.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3"><span className="font-medium text-muted-foreground">{course.level}</span></td>
                    <td className="px-3 py-3"><StatusBadge status={course.status} /></td>
                    <td className="px-3 py-3 text-right">
                      <button onClick={() => navigate(getCoursePath(course))} className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted rounded whitespace-nowrap">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="bg-card rounded-lg border border-border shadow-sm p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <course.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground leading-snug">{course.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{course.code} • {course.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground">
                      Level: <span className="font-medium bg-muted px-1.5 py-0.5 rounded">{course.level}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      Status: <StatusBadge status={course.status} />
                    </span>
                  </div>
                  <button onClick={() => navigate(getCoursePath(course))} className="text-[10px] font-semibold text-primary hover:text-primary/80">Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Sections */}
        <HomeOverviewSections />

        {/* Need Assistance */}
        <div className="bg-sidebar rounded-lg shadow-sm p-5 text-sidebar-accent-foreground">
          <h3 className="text-sm font-bold mb-3">Need Assistance?</h3>
          <p className="text-xs text-sidebar-foreground mb-4">Our admission counselors are online.</p>
          <ul className="space-y-2 text-xs mb-4">
            <li className="flex items-center gap-2"><Phone size={14} className="text-sidebar-primary" /> +44 7782 274482</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-sidebar-primary" /> support@oxfordskillscenter.co.uk</li>
          </ul>
          <button className="w-full px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">Chat Now</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
