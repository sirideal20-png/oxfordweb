import {
  BookOpen, Award, Users, Wrench, Monitor, Briefcase,
  Zap, Shield, TrendingUp, Clock, Calendar, Home,
  GraduationCap, FileText, Settings, LayoutGrid, LogIn,
  CreditCard, FileCheck, List, Globe, UserCheck,
  Heart, Utensils, Bed, Video, Gamepad2, Bot, Map,
  Instagram, Twitter, Linkedin, Facebook, Youtube, PlayCircle,
  Sun, Moon, PenTool, Sprout, Sparkles, Scale,
  Printer, Cloud, HelpCircle, Database, UserPlus, Headphones, Palette, Laptop,
  Scroll, Compass, ArrowLeftRight, FileQuestion, BarChart, Handshake, Gift,
  Phone, Mail, Search, Coffee, DollarSign, MapPin, Download,
  type LucideIcon
} from 'lucide-react';

// Featured courses built dynamically from programme data (defined after imports below)

// Program data — bachelor programmes imported from dedicated file
import { bachelorProgramsData as _bachelorProgramsData } from './bachelorPrograms';
export const bachelorProgramsData = _bachelorProgramsData;

// Master programmes imported from dedicated file
import { masterProgramsData as _masterProgramsData } from './masterPrograms';
export const masterProgramsData = _masterProgramsData;

// PhD programmes imported from dedicated file
import { phdProgramsData as _phdProgramsData } from './phdPrograms';
export const phdProgramsData = _phdProgramsData;

// Diploma programmes imported from dedicated file
import { diplomaProgramsData as _diplomaProgramsData } from './diplomaPrograms';
export const diplomaProgramsData = _diplomaProgramsData;

// Certificate programmes imported from dedicated file
import { certificateProgramsFullData as _certificateProgramsData } from './certificatePrograms';
export const certificateProgramsData = _certificateProgramsData;

// Training programmes imported from dedicated file
import { trainingProgramsFullData as _trainingProgramsData } from './trainingPrograms';
export const trainingProgramsData = _trainingProgramsData;

export const processedShortCourses: Record<string, { code: string; title: string }[]> = {
  "All Short Courses": [
    { code: "OSCT-SC-3001", title: "Project Management Essentials" },
    { code: "OSCT-SC-3004", title: "Digital Marketing 101" },
    { code: "OSCT-SC-3008", title: "Python for Beginners" },
  ],
};

// Build featured courses dynamically from all programme data
const programIcons: Record<string, LucideIcon> = {
  'Bachelor': GraduationCap, 'Master': Award, 'Ph.D': BookOpen,
  'Diploma': Scroll, 'Certificate': FileText, 'Training': Wrench, 'Short Course': Monitor,
};
const statusOptions = ['Open', 'Most Preferred', 'Closing Soon', 'Coming Soon', 'Waitlist', 'Open'] as const;

const _allProgrammes: { code: string; title: string; category: string; level: string }[] = [];
const addFrom = (data: Record<string, { code: string; title: string }[]>, category: string, level: string) => {
  Object.values(data).flat().forEach(p => _allProgrammes.push({ ...p, category, level }));
};
addFrom(_bachelorProgramsData, 'Degree', 'Bachelor');
addFrom(_masterProgramsData, 'Degree', 'Master');
addFrom(_phdProgramsData, 'Degree', 'Ph.D');
addFrom(_diplomaProgramsData, 'Diploma', 'Diploma');
addFrom(_certificateProgramsData, 'Certificate', 'Certificate');
addFrom(_trainingProgramsData, 'Training', 'Training');
Object.values(processedShortCourses).flat().forEach(p => _allProgrammes.push({ ...p, category: 'Short Course', level: 'Short Course' }));

// Pick 6 evenly spaced featured programmes + 1 manually featured
const step = Math.max(1, Math.floor(_allProgrammes.length / 6));
const _autoFeatured = Array.from({ length: 5 }, (_, i) => {
  const p = _allProgrammes[i * step] || _allProgrammes[i];
  return {
    id: i + 1,
    title: p.title,
    category: p.category,
    level: p.level,
    code: p.code,
    icon: programIcons[p.level] || BookOpen,
    status: statusOptions[i] ?? ('Open' as const),
    students: 30 + i * 15,
  };
});

// Manually add high-demand programme
const customsEntry = _allProgrammes.find(p => p.title === 'Training in Customs Clearance Procedures');
if (customsEntry) {
  _autoFeatured.push({
    id: 6,
    title: customsEntry.title,
    category: customsEntry.category,
    level: customsEntry.level,
    code: customsEntry.code,
    icon: programIcons[customsEntry.level] || BookOpen,
    status: 'Most Preferred' as const,
    students: 120,
  });
}

export const courses = _autoFeatured;

export const programMenuItems = [
  { title: "Degree Programmes", children: ["Bachelor Degree", "Master Degree", "Ph.D Degree"] },
  "Diploma Programmes",
  "Certificates",
  "Trainings",
] as const;

export const sliderImages = [
  "https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/gu-panorama-scaled-1.jpg",
  "https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/Oxford-skills-center-Labs-Square.jpg",
  "https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/buyuk-kutup.-foto-6.jpg",
  "https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/Girne-Universitesi-Buyuk-Kutuphane.jpg",
  "https://oxfordskillscenter.co.uk/wp-content/uploads/2025/10/Ucus-4.jpg",
];

// navItems base (subMenu added after data definitions below)

// resourceItems is defined after studentPortalSubItems below

// Schools of study data
export const schoolsData = [
  {
    id: "eng", name: "School of Engineering & Technology", icon: Wrench,
    color: "text-blue-600", bg: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000",
    desc: "Pioneering the future with cutting-edge engineering solutions.",
    stats: "12 Programmes • 5 Research Labs", tags: ["Robotics", "Civil", "Mechanical"],
  },
  {
    id: "cs", name: "School of Computing & AI", icon: Monitor,
    color: "text-purple-600", bg: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    desc: "Leading the digital revolution through software, AI, and cybersecurity.",
    stats: "8 Programmes • AI Center", tags: ["Data Science", "Cybersecurity", "Software"],
  },
  {
    id: "health", name: "School of Health Sciences", icon: Heart,
    color: "text-rose-600", bg: "bg-rose-50",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    desc: "Dedicated to advancing healthcare through nursing and medical tech.",
    stats: "10 Programmes • Teaching Hospital", tags: ["Nursing", "Pharmacy", "Radiology"],
  },
  {
    id: "bus", name: "School of Business", icon: Briefcase,
    color: "text-amber-600", bg: "bg-amber-50",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    desc: "Shaping global leaders in management and finance.",
    stats: "15 Programmes • Incubation Hub", tags: ["MBA", "Finance", "Marketing"],
  },
  {
    id: "law", name: "School of Law & Policy", icon: Scale,
    color: "text-slate-600", bg: "bg-slate-50",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
    desc: "Upholding justice and shaping policy for a fairer society.",
    stats: "6 Programmes • Moot Court", tags: ["Corporate Law", "Criminal Justice"],
  },
  {
    id: "agri", name: "School of Agriculture", icon: Sprout,
    color: "text-green-600", bg: "bg-green-50",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000",
    desc: "Sustainable farming and environmental stewardship.",
    stats: "9 Programmes • Research Farms", tags: ["Agronomy", "Food Tech"],
  },
  {
    id: "avia", name: "School of Aviation", icon: Globe,
    color: "text-sky-600", bg: "bg-sky-50",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&q=80&w=1000",
    desc: "Soaring high with specialized training in aviation.",
    stats: "5 Programmes • Flight Simulators", tags: ["Pilot Training", "Air Traffic"],
  },
  {
    id: "arts", name: "School of Arts & Design", icon: PenTool,
    color: "text-pink-600", bg: "bg-pink-50",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
    desc: "Fostering creativity in architecture and fashion.",
    stats: "7 Programmes • Design Studios", tags: ["Architecture", "Fashion", "Graphics"],
  },
  {
    id: "lingual", name: "School of Lingual Literacy", icon: BookOpen,
    color: "text-orange-600", bg: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000",
    desc: "Mastering global languages, literature, and cross-cultural communication.",
    stats: "6 Programmes • Language Labs", tags: ["English Lit", "Translation", "Foreign Lang"],
  },
];

// Online transactions data
export const transactionsData = [
  { title: "Online Registration", icon: UserPlus, color: "text-blue-500", bg: "bg-blue-50", desc: "Course enrollment & semester registration" },
  { title: "Online Payment", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50", desc: "Tuition fees & hostel dues" },
  { title: "OBS Portal", icon: Database, color: "text-purple-500", bg: "bg-purple-50", desc: "Outcome Based System & Results" },
  { title: "LMS", icon: Monitor, color: "text-orange-500", bg: "bg-orange-50", desc: "Learning Management System" },
  { title: "Library", icon: BookOpen, color: "text-indigo-500", bg: "bg-indigo-50", desc: "Catalog search & reservations" },
  { title: "Webmail", icon: Mail, color: "text-sky-500", bg: "bg-sky-50", desc: "Student & Faculty Email" },
  { title: "Support Desk", icon: Headphones, color: "text-rose-500", bg: "bg-rose-50", desc: "IT & Admin technical support" },
  { title: "Document App", icon: FileText, color: "text-slate-500", bg: "bg-slate-50", desc: "Transcripts & Degree issuance" },
  { title: "Online Library", icon: Globe, color: "text-cyan-500", bg: "bg-cyan-50", desc: "Digital journals & e-resources" },
  { title: "Online Books", icon: BookOpen, color: "text-teal-500", bg: "bg-teal-50", desc: "Access course eBooks" },
  { title: "Hobby Courses", icon: Palette, color: "text-pink-500", bg: "bg-pink-50", desc: "Register for extra-curriculars" },
  { title: "Cloud System", icon: Cloud, color: "text-blue-400", bg: "bg-blue-50", desc: "Student file storage" },
  { title: "How to Do It?", icon: HelpCircle, color: "text-yellow-500", bg: "bg-yellow-50", desc: "Guides & Tutorials" },
  { title: "Accommodation", icon: Home, color: "text-indigo-400", bg: "bg-indigo-50", desc: "Hostel allotment portal" },
  { title: "Student Printer", icon: Printer, color: "text-gray-600", bg: "bg-gray-100", desc: "Remote printing services" },
];

// Sub-menu items (must come after data arrays)
export const admissionSubItems = [
  { label: 'Application Procedures', id: 'application-procedures', icon: List },
  { label: 'Admission Requirements', id: 'admission-requirements', icon: FileCheck },
  { label: 'Entry Requirements', id: 'entry-requirements', icon: FileCheck, path: '/admissions/entry-requirements' },
  { label: 'Fees & Scholarships', id: 'fees-scholarships', icon: CreditCard, path: '/admissions/fees-scholarships' },
  { label: 'Placement Exam', id: 'scholarship-placement', icon: Award, path: '/admissions/placement-exam' },
  { label: 'Visits', id: 'visits', icon: Map, path: '/admissions/visits' },
  { label: 'Application Form', id: 'application-form', icon: FileText },
  { label: 'Agents & Representatives', id: 'agents-representatives', icon: Handshake, path: '/admissions/agents' },
  { label: 'Visa Applications', id: 'visa-applications', icon: Globe, path: '/admissions/visa-applications' },
  { label: 'Refund Policy', id: 'refund-policy', icon: CreditCard, path: '/admissions/refund-policy' },
  { label: 'Transfer Students', id: 'transfer-students', icon: ArrowLeftRight, path: '/admissions/transfer-students' },
  { label: 'Fee Calculator', id: 'fee-calculator', icon: DollarSign, path: '/admissions/fee-calculator' },
  { label: 'Academic Calendar', id: 'academic-calendar', icon: Calendar, path: '/admissions/academic-calendar' },
  { label: 'Payment Procedures', id: 'payment-procedures', icon: CreditCard },
];

export const schoolSubItems = schoolsData.map(s => ({
  label: s.name.replace('School of ', ''),
  id: s.id,
  icon: s.icon,
  path: `/schools/${s.id}`,
}));

export const transactionSubItems = transactionsData.map(t => ({
  label: t.title,
  id: t.title.toLowerCase().replace(/\s+/g, '-'),
  icon: t.icon,
  path: `/transactions/${t.title.toLowerCase().replace(/[\s?]+/g, '-').replace(/-+$/, '')}`,
}));




export const navItems = [
  { name: 'Overview', icon: Home, path: '/' },
  { name: 'About Us', icon: Users, path: '/about' },
  { name: 'All Programmes', icon: LayoutGrid, path: '/programs', subItems: programMenuItems },
  { name: 'Admissions', icon: FileText, path: '/admissions', subMenu: admissionSubItems },
  { name: 'Campus Life', icon: MapPin, path: '/campus-life' },
  { name: 'Schools of Study', icon: BookOpen, path: '/schools', subMenu: schoolSubItems },
  { name: 'Online Transactions', icon: Laptop, path: '/transactions', subMenu: transactionSubItems },
];

// Student portal sections data
export const studentPortalSections = [
  { title: "Academic Calendar", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", desc: "Semester dates & holidays" },
  { title: "Exam Schedule", icon: Clock, color: "text-red-600", bg: "bg-red-50", desc: "Midterms, finals & retakes" },
  { title: "Student Info System", icon: Database, color: "text-purple-600", bg: "bg-purple-50", desc: "Grades, attendance & profile" },
  { title: "Tuition Fee Inquiry", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Balance & payment history" },
  { title: "Orientation", icon: Compass, color: "text-amber-600", bg: "bg-amber-50", desc: "New student guide & events" },
  { title: "Grading System", icon: BarChart, color: "text-indigo-600", bg: "bg-indigo-50", desc: "GPA calculation policy" },
  { title: "Regulations", icon: Scroll, color: "text-slate-600", bg: "bg-slate-50", desc: "University rules & conduct" },
  { title: "Student Council", icon: Users, color: "text-pink-600", bg: "bg-pink-50", desc: "Elections & student voice" },
  { title: "Make-up Exams", icon: FileQuestion, color: "text-orange-600", bg: "bg-orange-50", desc: "Application & eligibility" },
  { title: "Student Handbook", icon: BookOpen, color: "text-teal-600", bg: "bg-teal-50", desc: "Comprehensive student guide" },
  { title: "Migration", icon: ArrowLeftRight, color: "text-cyan-600", bg: "bg-cyan-50", desc: "Transfer credits & programmes" },
];

export const studentPortalSubItems = studentPortalSections.map(s => ({
  label: s.title,
  id: s.title.toLowerCase().replace(/\s+/g, '-'),
  icon: s.icon,
  path: `/student-portal/${s.title.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-')}`,
}));

export const resourceItems: { name: string; icon: LucideIcon; path: string; subMenu?: { label: string; id: string; icon: LucideIcon }[] }[] = [
  { name: 'Student Portal', icon: Users, path: '/student-portal', subMenu: studentPortalSubItems },
  { name: 'Alumni Network', icon: GraduationCap, path: '/alumni' },
  { name: 'Support', icon: Phone, path: '/support' },
];

// Alumni spotlights
export const alumniSpotlights = [
  { name: "Sarah Jenkins", role: "AI Research Lead at DeepMind", year: "'18", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", quote: "Oxford Skills Center gave me the technical foundation to lead global AI projects." },
  { name: "David Chen", role: "Founder of EcoTech Solutions", year: "'20", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", quote: "The mentorship programme connected me with investors who believed in my vision." },
  { name: "Amara Patel", role: "Chief Nursing Officer", year: "'15", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", quote: "The hands-on training was unparalleled. I felt prepared from day one." },
];

// Campus life day-in-the-life timeline
export const dayInLifeData = [
  { time: "08:00", label: "MORNING RITUAL", location: "Olympic Pool", title: "Wake Up & Workout", desc: "Start the day with yoga at the Green Park or a swim in the Olympic pool.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" },
  { time: "10:00", label: "ACADEMIC FOCUS", location: "Tech Lab 4", title: "Labs & Lectures", desc: "Engage in hands-on learning in our AI Robotics lab or attend a guest lecture.", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000" },
  { time: "13:00", label: "SOCIAL HOUR", location: "Student Hub", title: "Lunch at The Hub", desc: "Grab a healthy bowl, meet friends, and relax in the student lounge.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" },
  { time: "16:00", label: "EXTRA-CURRICULAR", location: "Auditorium", title: "Clubs & Societies", desc: "From Debate Club to Esports, afternoons are for following your passion.", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000" },
  { time: "20:00", label: "EVENING CHILL", location: "Central Library", title: "Study & Unwind", desc: "Late night study session at the 24/7 library or a movie night in the dorms.", img: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000" },
];

// Search categories
export const searchCategories = [
  "All Programmes",
  "Degree Programmes",
  "Diploma Programmes",
  "Short Courses",
  "Certificates",
  "Trainings",
];
