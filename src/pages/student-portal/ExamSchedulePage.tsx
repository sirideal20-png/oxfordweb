import { useRef } from 'react';
import { Clock, Calendar, AlertCircle, BookOpen, FileText, CheckCircle, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const examPeriods = [
  { period: 'Autumn Midterms', dates: '28 Oct – 8 Nov 2025', type: 'Midterm', status: 'Upcoming' },
  { period: 'Autumn Finals', dates: '16 – 27 Dec 2025', type: 'Final', status: 'Upcoming' },
  { period: 'Spring Midterms', dates: '10 – 21 Mar 2026', type: 'Midterm', status: 'Scheduled' },
  { period: 'Spring Finals', dates: '25 May – 6 Jun 2026', type: 'Final', status: 'Scheduled' },
  { period: 'Summer Resits', dates: '14 – 25 Jul 2026', type: 'Resit', status: 'Scheduled' },
];

const examRules = [
  'Arrive at least 15 minutes before the scheduled start time.',
  'Present your valid OSCT Student ID card at the entrance.',
  'Only approved calculators (Casio fx-991EX) are permitted where applicable.',
  'Mobile phones must be switched off and placed in the designated area.',
  'No candidate may leave the hall during the first 30 minutes or last 15 minutes.',
  'Water in a clear, unlabelled bottle is the only permitted refreshment.',
  'Any form of academic dishonesty will result in immediate disqualification.',
  'Special accommodations must be arranged with the Disability Support Office 14 days prior.',
];

const venues = [
  { name: 'Great Hall', capacity: '500 seats', location: 'Main Campus, Block A', types: 'Finals, Large cohorts' },
  { name: 'Examination Centre', capacity: '200 seats', location: 'Academic Block B, Floor 2', types: 'Midterms, Written exams' },
  { name: 'Computer Lab Suite', capacity: '120 stations', location: 'IT Building, Floor 1', types: 'Online exams, Practicals' },
  { name: 'Tutorial Rooms', capacity: '30 seats each', location: 'Various buildings', types: 'Viva voce, Presentations' },
];

const ExamSchedulePage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Clock size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Exam Schedule</h1>
              <p className="text-red-100 mt-1">Midterms, Finals & Resit Examinations</p>
            </div>
          </div>
          <p className="text-red-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Stay informed about all examination periods, venues, and regulations. Plan your revision effectively with our comprehensive exam timetable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search exam information…" />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Examination Periods 2025–26</h2>
          <div className="space-y-3">
            {examPeriods.map((e) => (
              <div key={e.period} data-searchable className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${e.type === 'Final' ? 'bg-red-50 text-red-600' : e.type === 'Midterm' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{e.period}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{e.dates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${e.type === 'Final' ? 'bg-red-100 text-red-700' : e.type === 'Midterm' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{e.type}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${e.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Examination Venues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {venues.map((v) => (
              <div key={v.name} className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground text-sm">{v.name}</h3>
                <p className="text-muted-foreground text-xs mt-1">{v.location}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="text-primary font-semibold">{v.capacity}</span>
                  <span className="text-muted-foreground">• {v.types}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Examination Regulations</h2>
          <div className="space-y-2">
            {examRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">Exam Clashes & Deferrals</h3>
            <p className="text-muted-foreground text-xs mt-1">If you have two exams scheduled at the same time, notify the Examinations Office at <strong>support@oxfordskillscenter.co.uk</strong> at least 21 days before the exam period. Medical deferrals require a certified doctor's note submitted within 5 working days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedulePage;
