import { useRef } from 'react';
import { Compass, Calendar, Users, MapPin, BookOpen, CheckCircle, Star, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const orientationSchedule = [
  { day: 'Day 1 — Welcome', date: 'Mon 7 Sep 2026', events: ['Vice-Chancellor\'s Welcome Address', 'Student ID Collection', 'Campus Walking Tour', 'IT Account Activation Workshop'] },
  { day: 'Day 2 — Academic', date: 'Tue 8 Sep 2026', events: ['Faculty Meet & Greet', 'Programme Briefing & Module Selection', 'Library Induction & Database Training', 'Study Skills Workshop'] },
  { day: 'Day 3 — Social', date: 'Wed 9 Sep 2026', events: ['Freshers\' Fair & Societies Sign-up', 'Sports Trials & Rec Centre Tour', 'International Students Mixer', 'Mentorship Programme Introduction'] },
  { day: 'Day 4 — Wellbeing', date: 'Thu 10 Sep 2026', events: ['Student Support Services Overview', 'Mental Health & Counselling Awareness', 'Financial Guidance Session', 'Accommodation & Living in Oxford Guide'] },
  { day: 'Day 5 — Launch', date: 'Fri 11 Sep 2026', events: ['Academic Integrity Workshop', 'LMS & OBS Portal Training', 'Peer Mentor Group Assignments', 'Welcome Social & Live Music Evening'] },
];

const essentialChecklist = [
  'Collect your OSCT Student ID card from Registry',
  'Activate your OSCT email and IT account',
  'Complete online health registration form',
  'Submit proof of vaccination records',
  'Register with a local GP (international students)',
  'Set up your LMS account and join module groups',
  'Attend mandatory fire safety briefing',
  'Download the OSCT Student App',
  'Open a UK bank account (international students)',
  'Explore campus dining options and meal plans',
];

const OrientationPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Compass size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">New Student Orientation</h1>
              <p className="text-amber-100 mt-1">Welcome Week Programme & Essential Guide</p>
            </div>
          </div>
          <p className="text-amber-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Welcome to Oxford Skills Center! Your orientation week is designed to help you settle in, meet your peers, and get everything set up for a successful academic journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search orientation info…" />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Welcome Week Schedule</h2>
          <div className="space-y-4">
            {orientationSchedule.map((day) => (
              <div key={day.day} data-searchable className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{day.day}</h3>
                    <p className="text-muted-foreground text-xs">{day.date}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-13">
                  {day.events.map((event) => (
                    <div key={event} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg text-xs text-foreground">
                      <Star size={10} className="text-amber-500 shrink-0" /> {event}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Freshers' Essential Checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {essentialChecklist.map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <CheckCircle size={12} className="text-emerald-500 shrink-0 mt-0.5" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Orientation Attendance', value: 'Mandatory', icon: Users },
            { label: 'Student Mentor Ratio', value: '1:8', icon: Users },
            { label: 'Welcome Week Activities', value: '40+', icon: Star },
          ].map((s) => (
            <div key={s.label} data-searchable className="bg-card border border-border rounded-xl p-4 text-center">
              <s.icon size={20} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Attendance at orientation is mandatory for all new students. If you are unable to attend any session, notify the Student Affairs Office at <strong>support@oxfordskillscenter.co.uk</strong> in advance to arrange an alternative.</p>
        </div>
      </div>
    </div>
  );
};

export default OrientationPage;
