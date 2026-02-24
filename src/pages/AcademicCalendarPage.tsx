import { useRef } from 'react';
import { Calendar, BookOpen, Trophy, Globe, GraduationCap, PartyPopper, FlaskConical, Plane, Flag, Star, Clock, Sun, Snowflake, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionSearch from '@/components/shared/SectionSearch';

type CalendarEvent = {
  date: string;
  title: string;
  description: string;
  type: 'holiday' | 'academic' | 'exam' | 'event' | 'break';
};

type MonthData = {
  month: string;
  events: CalendarEvent[];
};

type SemesterData = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  months: MonthData[];
};

const semesters: SemesterData[] = [
  {
    title: 'SPRING SEMESTER 2026',
    subtitle: 'Term 1 — Foundation & Core Skills',
    icon: Leaf,
    color: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50',
    months: [
      {
        month: 'January 2026',
        events: [
          { date: 'Jan 1 (Thu)', title: "New Year's Day", description: 'Public Holiday.', type: 'holiday' },
          { date: 'Jan 12 (Mon)', title: 'Spring Semester Orientation Day', description: 'Welcome speech, course registration.', type: 'academic' },
          { date: 'Jan 13 (Tue)', title: 'Classes Begin', description: 'Spring Semester commences.', type: 'academic' },
          { date: 'Jan 14 (Wed)', title: 'Study Tour', description: 'British Museum, London — world history & culture.', type: 'event' },
          { date: 'Jan 16 (Fri)', title: 'Welcome Party 2026', description: "Grand Fresher's Reception — cultural performances & networking.", type: 'event' },
          { date: 'Jan 22 (Thu)', title: 'Inter-College Debate Competition', description: 'Topic: "AI Ethics in Education" — preliminary rounds & finals.', type: 'event' },
          { date: 'Jan 24 (Sat)', title: 'International Day of Education', description: 'UN observance — celebrating education for all.', type: 'event' },
          { date: 'Jan 27 (Tue)', title: 'Study Tour & Holocaust Memorial Day', description: 'Oxford University & Bodleian Library tour. Holocaust Memorial Day observance.', type: 'event' },
        ],
      },
      {
        month: 'February 2026',
        events: [
          { date: 'Feb 4 (Wed)', title: 'World Cancer Day', description: 'Awareness campaign & health seminar.', type: 'event' },
          { date: 'Feb 10 (Tue)', title: 'Book Fair', description: 'Spring Book Fair — academic publishers, tech books & student discounts.', type: 'event' },
          { date: 'Feb 14 (Sat)', title: 'Study Tour & Tech Seminar', description: 'Science Museum, London — "Future of Web Development with AI".', type: 'event' },
          { date: 'Feb 18 (Wed)', title: 'MoU Signing Ceremony', description: 'Partnership agreement with UK tech industry partners.', type: 'event' },
          { date: 'Feb 20 (Fri)', title: 'World Day of Social Justice', description: 'UN observance — panel discussion.', type: 'event' },
          { date: 'Feb 23 (Mon)', title: 'Speech Competition', description: 'Annual Public Speaking Championship — impromptu & prepared categories.', type: 'event' },
          { date: 'Feb 25 (Wed)', title: 'Study Tour & Sports Day', description: 'Stonehenge, Wiltshire — followed by Sports Tournament.', type: 'event' },
        ],
      },
      {
        month: 'March 2026',
        events: [
          { date: 'Mar 5 (Thu)', title: 'Cultural Exchange Day', description: 'International food, music & traditions showcase by students.', type: 'event' },
          { date: 'Mar 8 (Sun)', title: "International Women's Day", description: 'Webinar: Women in Tech.', type: 'event' },
          { date: 'Mar 12 (Thu)', title: 'Internship & Careers Seminar', description: 'Industry panels, CV workshops & placement opportunities.', type: 'event' },
          { date: 'Mar 14 (Sat)', title: 'Study Tour', description: 'Tower of London — British royal history & Crown Jewels.', type: 'event' },
          { date: 'Mar 19 (Thu)', title: 'Essay Writing Competition', description: 'Theme: "Technology & Sustainable Development" — cash prizes & certificates.', type: 'event' },
          { date: 'Mar 21 (Sat)', title: 'World Poetry Day', description: 'Creative writing workshop & open mic.', type: 'event' },
          { date: 'Mar 22 (Sun)', title: 'World Water Day', description: 'Sustainability awareness seminar.', type: 'event' },
          { date: 'Mar 27 (Fri)', title: 'Study Tour', description: 'Cambridge University & King\'s College Chapel.', type: 'event' },
          { date: 'Mar 30 (Mon)', title: 'Application Deadline — September 2026 Intake', description: 'Last date to submit applications for the September 2026 intake.', type: 'academic' },
        ],
      },
      {
        month: 'April 2026',
        events: [
          { date: 'Apr 3–6 (Fri-Mon)', title: 'Easter Weekend', description: 'UK Public Holiday.', type: 'holiday' },
          { date: 'Apr 7 (Tue)', title: 'World Health Day', description: 'Health & wellbeing awareness activities.', type: 'event' },
          { date: 'Apr 9 (Thu)', title: 'Student Innovation Exhibition', description: 'Showcase of student projects, prototypes & research posters.', type: 'event' },
          { date: 'Apr 13–17 (Mon-Fri)', title: 'SPRING MID-TERM EXAMS', description: 'Mid-semester examinations.', type: 'exam' },
          { date: 'Apr 14 (Tue)', title: 'Study Tour', description: 'Natural History Museum, London — science & nature.', type: 'event' },
          { date: 'Apr 21 (Tue)', title: 'Career Appointment Day', description: 'One-on-one career counselling sessions with industry mentors.', type: 'event' },
          { date: 'Apr 22 (Wed)', title: 'Earth Day', description: 'Environmental sustainability workshop.', type: 'event' },
          { date: 'Apr 24 (Fri)', title: 'Result Announcement', description: 'Parent-Teacher Meeting.', type: 'academic' },
          { date: 'Apr 27 (Mon)', title: 'Study Tour', description: 'Windsor Castle — royal residence & St George\'s Chapel.', type: 'event' },
        ],
      },
      {
        month: 'May 2026',
        events: [
          { date: 'May 4 (Mon)', title: 'Early May Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
          { date: 'May 8 (Fri)', title: 'Colour Day 🎨', description: 'Campus-wide colour festival — music, dance & team games.', type: 'event' },
          { date: 'May 14 (Thu)', title: 'Study Tour', description: 'Blenheim Palace, Woodstock — UNESCO World Heritage Site.', type: 'event' },
          { date: 'May 15 (Fri)', title: 'Parliamentary-Style Debate', description: 'Inter-department debate tournament — "Digital Privacy vs National Security".', type: 'event' },
          { date: 'May 17 (Sun)', title: 'World Telecommunication Day', description: 'Tech innovation seminar.', type: 'event' },
          { date: 'May 19 (Tue)', title: 'Internship Appointment Day', description: 'Summer internship matching — employer interviews & offer letters.', type: 'event' },
          { date: 'May 21 (Thu)', title: 'EdTech Conference', description: 'Conference on technology in education — guest speakers & panels.', type: 'event' },
          { date: 'May 25 (Mon)', title: 'Spring Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
          { date: 'May 27 (Wed)', title: 'Study Tour', description: 'Bath — Roman Baths & Georgian architecture.', type: 'event' },
        ],
      },
      {
        month: 'June 2026',
        events: [
          { date: 'Jun 3 (Wed)', title: 'MoU Signing Ceremony', description: 'Academic partnership with European university consortium.', type: 'event' },
          { date: 'Jun 5 (Fri)', title: 'World Environment Day', description: 'Green campus initiative & tree planting.', type: 'event' },
          { date: 'Jun 8 (Mon)', title: 'Essay & Speech Finals', description: 'Spring semester grand finals — essay writing & oratory awards ceremony.', type: 'event' },
          { date: 'Jun 10 (Wed)', title: 'Spring Farewell Party', description: 'Farewell celebration for graduating Spring batch.', type: 'event' },
          { date: 'Jun 14 (Sun)', title: 'Study Tour', description: 'Greenwich — Royal Observatory & Prime Meridian.', type: 'event' },
          { date: 'Jun 15–19 (Mon-Fri)', title: 'SPRING FINAL EXAMS', description: 'End-of-semester examinations.', type: 'exam' },
          { date: 'Jun 20 (Sat)', title: 'World Refugee Day', description: 'Awareness seminar & solidarity event.', type: 'event' },
          { date: 'Jun 23 (Tue)', title: 'Internship Placement Seminar', description: 'Summer internship briefing — employer meet & greet.', type: 'event' },
          { date: 'Jun 27 (Sat)', title: 'Study Tour', description: 'Stratford-upon-Avon — Shakespeare\'s birthplace.', type: 'event' },
          { date: 'Jun 29 (Mon)', title: 'Semester Break Begins', description: 'Faculty Administrative Week.', type: 'break' },
        ],
      },
    ],
  },
  {
    title: 'SUMMER SESSION 2026',
    subtitle: 'Bootcamps & Certifications',
    icon: Sun,
    color: 'text-amber-600',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50',
    months: [
      {
        month: 'July 2026',
        events: [
          { date: 'Jul 6 (Mon)', title: 'Summer Bootcamp Orientation', description: 'Short courses begin.', type: 'academic' },
          { date: 'Jul 10 (Fri)', title: 'Summer Book Fair', description: 'Tech publications, coding books & open-source resources.', type: 'event' },
          { date: 'Jul 14 (Tue)', title: 'Study Tour', description: 'Kew Gardens, London — botanical science & sustainability.', type: 'event' },
          { date: 'Jul 18 (Sat)', title: 'Nelson Mandela International Day', description: 'Community service & leadership seminar.', type: 'event' },
          { date: 'Jul 16 (Thu)', title: 'Summer Debate Series', description: 'Open debate: "Remote Work — Future of Employment?" — all students welcome.', type: 'event' },
          { date: 'Jul 20 (Mon)', title: 'Workshop', description: '"Freelancing & E-Commerce Globally".', type: 'event' },
          { date: 'Jul 23 (Thu)', title: 'Cybersecurity Conference', description: 'Industry experts on digital security trends & best practices.', type: 'event' },
          { date: 'Jul 25 (Sat)', title: 'Career Appointment Day', description: 'Summer career guidance — CV reviews, LinkedIn workshops & mock interviews.', type: 'event' },
          { date: 'Jul 27 (Mon)', title: 'Study Tour', description: 'Edinburgh Castle & Royal Mile, Scotland.', type: 'event' },
        ],
      },
      {
        month: 'August 2026',
        events: [
          { date: 'Aug 7 (Fri)', title: 'Student Art & Design Exhibition', description: 'Creative works showcase — paintings, digital art & photography.', type: 'event' },
          { date: 'Aug 12 (Wed)', title: 'International Youth Day', description: 'Youth leadership & innovation workshop.', type: 'event' },
          { date: 'Aug 14 (Fri)', title: 'Study Tour', description: 'Lake District National Park — nature & poetry trail.', type: 'event' },
          { date: 'Aug 17 (Mon)', title: 'Speech & Essay Competition', description: 'Summer edition — "Global Challenges & Youth Solutions" — open to all.', type: 'event' },
          { date: 'Aug 19 (Wed)', title: 'World Humanitarian Day', description: 'Charity drive & awareness event.', type: 'event' },
          { date: 'Aug 20 (Thu)', title: 'Blockchain & FinTech Conference', description: 'Industry leaders on cryptocurrency, DeFi & digital banking.', type: 'event' },
          { date: 'Aug 22 (Sat)', title: 'Colour Day 🎨', description: 'Summer edition — outdoor colour run & campus festival.', type: 'event' },
          { date: 'Aug 27 (Thu)', title: 'Study Tour', description: 'Canterbury Cathedral — UNESCO heritage & medieval history.', type: 'event' },
          { date: 'Aug 28 (Fri)', title: 'Summer Farewell & Certificate Distribution', description: 'Bootcamp farewell celebration & certificates awarded.', type: 'academic' },
          { date: 'Aug 31 (Mon)', title: 'Summer Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
        ],
      },
    ],
  },
  {
    title: 'FALL SEMESTER 2026',
    subtitle: 'Term 2 — Advanced Projects & Thesis',
    icon: Snowflake,
    color: 'text-sky-600',
    borderColor: 'border-sky-500',
    bgColor: 'bg-sky-50',
    months: [
      {
        month: 'September 2026',
        events: [
          { date: 'Sep 7 (Mon)', title: 'Fall Semester Orientation', description: 'Welcome and registration.', type: 'academic' },
          { date: 'Sep 11 (Fri)', title: 'Fall Welcome Party', description: 'Grand welcome reception — live music & cultural performances.', type: 'event' },
          { date: 'Sep 14 (Mon)', title: 'Classes Begin', description: 'Fall Semester commences.', type: 'academic' },
          { date: 'Sep 18 (Fri)', title: 'Study Tour', description: 'Warner Bros. Studio Tour (Harry Potter).', type: 'event' },
          { date: 'Sep 16 (Wed)', title: 'Fall Debate Championship Launch', description: 'Opening rounds — "Should AI Replace Teachers?" — team registrations open.', type: 'event' },
          { date: 'Sep 21 (Mon)', title: 'International Day of Peace', description: 'UN observance — peace & solidarity activities.', type: 'event' },
          { date: 'Sep 23 (Wed)', title: 'Career & Internship Appointment Day', description: 'Fall placement drive — scheduled employer meetings & offer sessions.', type: 'event' },
          { date: 'Sep 24 (Thu)', title: 'MoU Signing Ceremony', description: 'Partnership with international healthcare training institute.', type: 'event' },
          { date: 'Sep 27 (Sat)', title: 'Study Tour', description: 'Hampton Court Palace — Tudor history & gardens.', type: 'event' },
        ],
      },
      {
        month: 'October 2026',
        events: [
          { date: 'Oct 2 (Fri)', title: 'Autumn Book Fair', description: 'Academic publishers, research journals & career guides.', type: 'event' },
          { date: 'Oct 5 (Mon)', title: 'World Teachers\' Day', description: 'Appreciation event for faculty & staff.', type: 'event' },
          { date: 'Oct 7 (Wed)', title: 'Essay Writing Competition', description: 'Fall edition — "Leadership in the Digital Age" — individual entries.', type: 'event' },
          { date: 'Oct 9 (Fri)', title: 'Cultural Exchange Festival', description: 'International students showcase traditions, cuisine & performances.', type: 'event' },
          { date: 'Oct 12 (Mon)', title: 'Cloud Computing Conference', description: 'AWS, Azure & GCP experts — hands-on workshops & career pathways.', type: 'event' },
          { date: 'Oct 14 (Wed)', title: 'Study Tour', description: 'Bletchley Park — WWII codebreaking & computing history.', type: 'event' },
          { date: 'Oct 19 (Mon)', title: 'Internship & Careers Seminar', description: 'Fall placement drive — mock interviews & employer networking.', type: 'event' },
          { date: 'Oct 24 (Sat)', title: 'United Nations Day', description: 'Global citizenship seminar & cultural fair.', type: 'event' },
          { date: 'Oct 26–30 (Mon-Fri)', title: 'FALL MID-TERM EXAMS', description: 'Mid-semester examinations.', type: 'exam' },
          { date: 'Oct 27 (Tue)', title: 'Study Tour', description: 'Cotswolds — quintessential English countryside villages.', type: 'event' },
        ],
      },
      {
        month: 'November 2026',
        events: [
          { date: 'Nov 6 (Fri)', title: 'AI & Data Science Conference', description: 'Keynote speakers on machine learning, automation & industry trends.', type: 'event' },
          { date: 'Nov 11 (Wed)', title: 'Remembrance Day', description: 'Two-minute silence & wreath-laying observance.', type: 'holiday' },
          { date: 'Nov 14 (Sat)', title: 'Study Tour', description: 'York Minster & The Shambles — medieval architecture.', type: 'event' },
          { date: 'Nov 13 (Fri)', title: 'Fall Debate Finals', description: 'Grand finale — top teams compete for the Chancellor\'s Debate Trophy.', type: 'event' },
          { date: 'Nov 16 (Mon)', title: 'International Day for Tolerance', description: 'Diversity & inclusion seminar.', type: 'event' },
          { date: 'Nov 18 (Wed)', title: 'Student Science Exhibition', description: 'Research posters, lab demos & innovation awards.', type: 'event' },
          { date: 'Nov 23 (Mon)', title: 'Speech Competition Finals', description: 'Annual Grand Oratory Championship — judges panel & awards.', type: 'event' },
          { date: 'Nov 25 (Wed)', title: 'Career Appointment Day', description: 'Final round employer interviews & graduate scheme offers.', type: 'event' },
          { date: 'Nov 20 (Fri)', title: 'Annual Study Tour', description: 'Industrial Visit (Tech Parks).', type: 'event' },
          { date: 'Nov 27 (Fri)', title: 'Study Tour', description: 'Birmingham — Cadbury World & Jewellery Quarter.', type: 'event' },
        ],
      },
      {
        month: 'December 2026',
        events: [
          { date: 'Dec 1 (Tue)', title: 'World AIDS Day', description: 'Health awareness & solidarity event.', type: 'event' },
          { date: 'Dec 3 (Thu)', title: 'Essay & Debate Awards Ceremony', description: 'Annual literary & oratory awards — certificates, trophies & scholarships.', type: 'event' },
          { date: 'Dec 4 (Fri)', title: 'MoU Signing Ceremony', description: 'Collaboration agreement with global STEM research network.', type: 'event' },
          { date: 'Dec 7 (Mon)', title: 'Green Technology Conference', description: 'Sustainable tech innovations — renewable energy, smart cities & green computing.', type: 'event' },
          { date: 'Dec 8 (Tue)', title: 'Fall Farewell Party', description: 'Grand farewell for graduating Fall batch — awards & celebration.', type: 'event' },
          { date: 'Dec 10 (Thu)', title: 'Human Rights Day', description: 'UN observance — rights & freedoms seminar.', type: 'event' },
          { date: 'Dec 14–18 (Mon-Fri)', title: 'FALL FINAL EXAMS', description: 'End-of-semester examinations.', type: 'exam' },
          { date: 'Dec 21 (Mon)', title: 'Winter Break Begins', description: 'Campus closed for holidays.', type: 'break' },
          { date: 'Dec 25 (Fri)', title: 'Christmas Day', description: 'UK Public Holiday.', type: 'holiday' },
          { date: 'Dec 27 (Sat)', title: 'Study Tour', description: 'Brighton Pier & Royal Pavilion — seaside heritage.', type: 'event' },
          { date: "Dec 31 (Thu)", title: "New Year's Eve Celebration", description: 'End of year festivities.', type: 'event' },
        ],
      },
    ],
  },
];

const typeConfig: Record<string, { label: string; className: string }> = {
  holiday: { label: 'Holiday', className: 'bg-red-100 text-red-700 border-red-200' },
  academic: { label: 'Academic', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  exam: { label: 'Exam', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  event: { label: 'Event', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  break: { label: 'Break', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

const AcademicCalendarPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Calendar"
          />
        </div>
        <div className="relative z-10 p-6 md:p-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <Calendar size={12} />
            Advance Academic Calendar
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Annual Plan & Schedule <br />
            <span className="text-emerald-400">Year 2026</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            A comprehensive proposed schedule designed for an international technology institute (UK-registered) with accommodations for major UK and international holidays.
          </p>
        </div>
      </div>

      {/* Search */}
      <SectionSearch containerRef={searchContainerRef} placeholder="Search events, dates, holidays…" />

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(typeConfig).map(([key, config]) => (
          <Badge key={key} variant="outline" className={`${config.className} text-[10px] font-semibold`}>
            {config.label}
          </Badge>
        ))}
      </div>

      {/* Semesters */}
      {semesters.map((semester) => (
        <div key={semester.title} data-search-group className="space-y-5">
          {/* Semester Header */}
          <div className={`flex items-center gap-3 p-4 rounded-xl ${semester.bgColor} border ${semester.borderColor}/30`}>
            <div className={`p-2.5 rounded-lg bg-white/80 shadow-sm ${semester.color}`}>
              <semester.icon size={22} />
            </div>
            <div>
              <h2 className={`text-lg md:text-xl font-bold ${semester.color}`}>{semester.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{semester.subtitle}</p>
            </div>
          </div>

          {/* Months */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {semester.months.map((monthData) => (
              <Card key={monthData.month} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`px-4 py-2.5 ${semester.bgColor} border-b ${semester.borderColor}/20`}>
                  <h3 className="text-sm font-bold text-foreground">{monthData.month}</h3>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {monthData.events.map((event, idx) => {
                      const config = typeConfig[event.type];
                      return (
                        <div key={idx} data-searchable className="px-4 py-3 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{event.date}</span>
                            <Badge variant="outline" className={`${config.className} text-[9px] px-1.5 py-0 shrink-0`}>
                              {config.label}
                            </Badge>
                          </div>
                          <h4 className="text-xs font-bold text-foreground leading-snug">{event.title}</h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{event.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Note */}
      <div className="bg-muted/50 rounded-xl p-5 border border-border text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          This calendar is <span className="font-bold text-foreground">subject to change</span>.
        </p>
        <p className="text-[10px] text-muted-foreground">
          For the latest updates, contact the Admissions Office at <span className="font-semibold text-primary">admissions@oxfordskills.uk</span>
        </p>
      </div>
    </div>
  );
};

export default AcademicCalendarPage;
