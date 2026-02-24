import { useNavigate } from 'react-router-dom';
import {
  FileText, BookOpen, MapPin, Laptop, Users, GraduationCap, Phone,
  ChevronRight, Globe, CreditCard, Award, ArrowLeftRight, FileCheck,
  Calendar, DollarSign, Handshake, Map, List, Heart, Briefcase,
  Wrench, Monitor, Scale, Sprout, PenTool
} from 'lucide-react';
import { schoolsData, admissionSubItems } from '@/data/constants';

const HomeOverviewSections = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Admissions & UK Settlement */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Admissions & UK Settlement
          </h3>
          <button onClick={() => navigate('/admissions')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: 'Application Procedures', desc: 'Step-by-step guide to applying for your chosen programme.', icon: List, path: '/admissions', color: 'text-blue-700', bg: 'bg-blue-100', border: 'border-blue-200' },
            { label: 'Entry Requirements', desc: 'Academic qualifications & English proficiency needed.', icon: FileCheck, path: '/admissions/entry-requirements', color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-200' },
            { label: 'Fees & Scholarships', desc: 'Tuition fees, payment plans, and scholarship opportunities.', icon: CreditCard, path: '/admissions/fees-scholarships', color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-200' },
            { label: 'Visa Applications', desc: 'UK student visa guidance, CAS letters, and immigration support.', icon: Globe, path: '/admissions/visa-applications', color: 'text-violet-700', bg: 'bg-violet-100', border: 'border-violet-200' },
            { label: 'Fee Calculator', desc: 'Estimate your total cost including tuition and accommodation.', icon: DollarSign, path: '/admissions/fee-calculator', color: 'text-lime-700', bg: 'bg-lime-100', border: 'border-lime-200' },
            { label: 'Placement Exam', desc: 'Assessment tests to determine your programme eligibility.', icon: Award, path: '/admissions/placement-exam', color: 'text-pink-700', bg: 'bg-pink-100', border: 'border-pink-200' },
            { label: 'Transfer Students', desc: 'Credit transfer policies and application process for transfers.', icon: ArrowLeftRight, path: '/admissions/transfer-students', color: 'text-teal-700', bg: 'bg-teal-100', border: 'border-teal-200' },
            { label: 'Agents & Representatives', desc: 'Find authorised agents in your country for application support.', icon: Handshake, path: '/admissions/agents', color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-200' },
            { label: 'Academic Calendar', desc: 'Key dates, term schedules, and important deadlines.', icon: Calendar, path: '/admissions/academic-calendar', color: 'text-rose-700', bg: 'bg-rose-100', border: 'border-rose-200' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`${item.bg} rounded-xl border-2 ${item.border} p-3 sm:p-5 text-left group transition-all duration-200 hover:-translate-y-1`}
              style={{
                boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/80 flex items-center justify-center ${item.color} shrink-0 shadow-sm`}>
                  <item.icon size={15} className="sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <h4 className="text-[10px] sm:text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{item.label}</h4>
                  <p className="hidden sm:block text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Schools of Study */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BookOpen size={18} className="text-primary" /> Schools of Study
          </h3>
          <button onClick={() => navigate('/schools')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {schoolsData.slice(0, 3).map((school) => (
            <button
              key={school.id}
              onClick={() => navigate(`/schools/${school.id}`)}
              className={`${school.bg} rounded-lg border border-border overflow-hidden text-left card-3d group`}
            >
              <div className="h-24 overflow-hidden">
                <img src={school.image} alt={school.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <school.icon size={14} className={school.color} />
                  <h4 className="text-xs font-bold text-foreground truncate">{school.name.replace('School of ', '')}</h4>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{school.desc}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {school.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/60 text-muted-foreground font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
          {/* Show remaining schools only on sm+ */}
          <div className="hidden sm:contents">
            {schoolsData.slice(3).map((school) => (
              <button
                key={school.id}
                onClick={() => navigate(`/schools/${school.id}`)}
                className={`${school.bg} rounded-lg border border-border overflow-hidden text-left card-3d group`}
              >
                <div className="h-24 overflow-hidden">
                  <img src={school.image} alt={school.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <school.icon size={14} className={school.color} />
                    <h4 className="text-xs font-bold text-foreground truncate">{school.name.replace('School of ', '')}</h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{school.desc}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {school.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/60 text-muted-foreground font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin size={18} className="text-primary" /> Campus Life
          </h3>
          <button onClick={() => navigate('/campus-life')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            Explore <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { title: 'Student Accommodation', desc: 'Modern dormitories with en-suite facilities, 24/7 security, and campus-wide WiFi.', icon: '🏠', bg: 'bg-indigo-50', border: 'border-indigo-100' },
            { title: 'Sports & Recreation', desc: 'Olympic pool, gym, football pitch, and over 30 student clubs and societies.', icon: '⚽', bg: 'bg-teal-50', border: 'border-teal-100' },
            { title: 'Dining & Social', desc: 'Multiple cafeterias, international cuisine, and vibrant social hubs on campus.', icon: '🍽️', bg: 'bg-pink-50', border: 'border-pink-100' },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate('/campus-life')} className={`${item.bg} rounded-lg border ${item.border} p-5 text-left card-3d group`}>
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Online Transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Laptop size={18} className="text-primary" /> Online Transactions
          </h3>
          <button onClick={() => navigate('/transactions')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: 'Online Registration', path: '/transactions/online-registration', icon: '📝', bg: 'bg-blue-100', border: 'border-blue-200' },
            { label: 'Online Payment', path: '/transactions/online-payment', icon: '💳', bg: 'bg-emerald-100', border: 'border-emerald-200' },
            { label: 'LMS', path: '/transactions/lms', icon: '📚', bg: 'bg-orange-100', border: 'border-orange-200' },
            { label: 'Library', path: '/transactions/library', icon: '📖', bg: 'bg-indigo-100', border: 'border-indigo-200' },
            { label: 'Support Desk', path: '/transactions/support-desk', icon: '🎧', bg: 'bg-rose-100', border: 'border-rose-200' },
            { label: 'Webmail', path: '/transactions/webmail', icon: '✉️', bg: 'bg-sky-100', border: 'border-sky-200' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`${item.bg} rounded-xl border-2 ${item.border} p-3 text-center group transition-all duration-200 hover:-translate-y-1`}
              style={{
                boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
              }}
            >
              <span className="text-xl block mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Student Portal & Resources */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users size={18} className="text-primary" /> Student Portal & Resources
          </h3>
          <button onClick={() => navigate('/student-portal')} className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'Academic Calendar', desc: 'Semester dates & holidays', path: '/student-portal/academic-calendar', bg: 'bg-blue-100', border: 'border-blue-200', color: 'text-blue-700', icon: Calendar },
            { label: 'Exam Schedule', desc: 'Midterms, finals & retakes', path: '/student-portal/exam-schedule', bg: 'bg-red-100', border: 'border-red-200', color: 'text-red-700', icon: FileText },
            { label: 'Grading System', desc: 'GPA calculation & policies', path: '/student-portal/grading-system', bg: 'bg-purple-100', border: 'border-purple-200', color: 'text-purple-700', icon: Award },
            { label: 'Student Handbook', desc: 'Complete student guide', path: '/student-portal/student-handbook', bg: 'bg-teal-100', border: 'border-teal-200', color: 'text-teal-700', icon: BookOpen },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`${item.bg} rounded-xl border-2 ${item.border} p-4 text-left group transition-all duration-200 hover:-translate-y-1`}
              style={{
                boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
              }}
            >
              <div className={`w-7 h-7 rounded-md bg-white/70 flex items-center justify-center ${item.color} mb-2`}>
                <item.icon size={14} />
              </div>
              <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Alumni & Support */}
      <section className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/alumni')}
          className="bg-amber-50 rounded-lg border border-amber-100 p-5 text-left card-3d group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-md bg-white/70 flex items-center justify-center text-amber-600">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Alumni Network</h4>
              <p className="text-xs text-muted-foreground">Connect with 18,000+ graduates worldwide</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our alumni community spans across 50+ countries, working at leading organisations in technology, healthcare, business, and more. Access mentorship, networking events, and career opportunities.
          </p>
        </button>
        <button
          onClick={() => navigate('/support')}
          className="bg-sky-50 rounded-lg border border-sky-100 p-5 text-left card-3d group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-md bg-white/70 flex items-center justify-center text-sky-600">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Support & Contact</h4>
              <p className="text-xs text-muted-foreground">Get help from our dedicated support team</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Whether you need academic guidance, technical help, or general enquiries — our support team is available via phone, email, and live chat to assist you every step of the way.
          </p>
        </button>
      </section>
    </div>
  );
};

export default HomeOverviewSections;
