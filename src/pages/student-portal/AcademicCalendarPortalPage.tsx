import { useRef } from 'react';
import { Calendar, Clock, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionSearch from '@/components/shared/SectionSearch';

const semesterDates = [
  { semester: 'Spring Semester', start: '12 January 2026', end: '19 June 2026', weeks: '22 Teaching Weeks' },
  { semester: 'Summer Session', start: '6 July 2026', end: '28 August 2026', weeks: '8 Weeks (Bootcamps & Certs)' },
  { semester: 'Fall Semester', start: '14 September 2026', end: '18 December 2026', weeks: '14 Teaching Weeks' },
];

const keyDates = [
  { event: 'Application Deadline', date: '30 Mar 2026', type: 'Administrative' },
  { event: 'Spring Mid-Term Exams', date: '13–17 Apr 2026', type: 'Examination' },
  { event: 'Spring Final Exams', date: '15–19 Jun 2026', type: 'Examination' },
  { event: 'Summer Bootcamp Starts', date: '6 Jul 2026', type: 'Academic' },
  { event: 'Freshers\' / Orientation Week', date: '7–11 Sep 2026', type: 'Orientation' },
  { event: 'Fall Semester Classes Begin', date: '14 Sep 2026', type: 'Academic' },
  { event: 'Fall Mid-Term Exams', date: '26–30 Oct 2026', type: 'Examination' },
  { event: 'Fall Final Exams', date: '14–18 Dec 2026', type: 'Examination' },
];

const AcademicCalendarPortalPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Calendar size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Academic Calendar</h1>
              <p className="text-blue-100 mt-1">Semester Dates, Key Events & Deadlines</p>
            </div>
          </div>
          <p className="text-blue-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Plan your academic year with the official OSCT calendar. View semester dates, examination periods, holidays, and important institutional deadlines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search calendar events…" />

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Semester Structure 2026</h2>
          <div className="space-y-3">
            {semesterDates.map((s) => (
              <div key={s.semester} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-2">
                <div>
                  <h3 className="font-bold text-foreground text-sm">{s.semester}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">{s.start} — {s.end}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{s.weeks}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Key Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyDates.map((d) => (
              <div key={d.event} data-searchable className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground text-sm">{d.event}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{d.type}</span>
                </div>
                <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1"><Clock size={10} /> {d.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Full Interactive Calendar</h2>
            <button
              onClick={() => navigate('/admissions/academic-calendar')}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View Full Calendar <ExternalLink size={12} />
            </button>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            For the complete interactive calendar with filtering by event type, month navigation, and calendar sync options, visit the full Academic Calendar page in the Admissions section.
          </p>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Calendar dates are subject to change. Always check the official calendar for the most up-to-date information. Subscribe to calendar updates via the full Academic Calendar page to receive automatic notifications.</p>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendarPortalPage;
