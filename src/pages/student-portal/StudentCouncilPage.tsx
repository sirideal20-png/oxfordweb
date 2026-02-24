import { useRef } from 'react';
import { Users, Vote, Megaphone, Calendar, Award, Heart, MessageCircle, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const councilRoles = [
  { title: 'President', name: 'Amina Al-Rashid', desc: 'Represents the student body to the Board of Governors and leads all council initiatives.', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Vice President', name: 'James Fletcher', desc: 'Supports the President and oversees internal council operations and committee coordination.', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Academic Affairs Officer', name: 'Priya Sharma', desc: 'Advocates for academic policy improvements, module feedback, and assessment fairness.', icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Welfare Officer', name: 'David Okonkwo', desc: 'Champions student wellbeing, mental health initiatives, and inclusion programmes.', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: 'Events Coordinator', name: 'Sophie Chen', desc: 'Organises social events, cultural celebrations, and community engagement activities.', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Communications Officer', name: 'Liam Murphy', desc: 'Manages social media, newsletter, and all council-to-student communications.', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const achievements = [
  'Extended library opening hours to 24/7 during exam periods',
  'Secured £50,000 for new student mental health services',
  'Launched the peer tutoring programme serving 400+ students',
  'Introduced free sanitary products across all campus facilities',
  'Negotiated 15% student discount with 30+ local businesses',
  'Established the annual Cultural Diversity Week celebration',
];

const electionTimeline = [
  { phase: 'Nominations Open', date: '1 March 2026', desc: 'Submit your candidacy with a manifesto and 20 supporting signatures.' },
  { phase: 'Campaign Week', date: '15–21 March 2026', desc: 'Candidates present manifestos, host Q&A sessions, and campaign across campus.' },
  { phase: 'Voting Period', date: '22–24 March 2026', desc: 'All enrolled students vote online via the secure election portal.' },
  { phase: 'Results Announcement', date: '26 March 2026', desc: 'Results declared at the Student Union and published online.' },
];

const StudentCouncilPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Users size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Student Council</h1>
              <p className="text-pink-100 mt-1">Your Voice, Your Representatives, Your Impact</p>
            </div>
          </div>
          <p className="text-pink-100 max-w-2xl mt-4 text-sm leading-relaxed">
            The OSCT Student Council is your elected body of student representatives who advocate for your interests, organise events, and work with university leadership to improve student life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search council info…" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Council Members', value: '12' },
            { label: 'Committees', value: '6' },
            { label: 'Students Represented', value: '5,200+' },
            { label: 'Annual Budget', value: '£85,000' },
          ].map((s) => (
            <div key={s.label} data-searchable className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Council Members 2025–26</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {councilRoles.map((r) => (
              <div key={r.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className={`w-10 h-10 ${r.bg} rounded-lg flex items-center justify-center ${r.color} mb-3 group-hover:scale-105 transition-transform`}>
                  <r.icon size={20} />
                </div>
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wide">{r.title}</p>
                <h3 className="font-bold text-foreground text-sm mt-1">{r.name}</h3>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Key Achievements 2024–25</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {achievements.map((a) => (
              <div key={a} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <Award size={12} className="text-amber-500 shrink-0 mt-0.5" /> {a}
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Election Timeline 2026</h2>
          <div className="space-y-3">
            {electionTimeline.map((t, i) => (
              <div key={t.phase} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{t.phase}</h3>
                  <p className="text-primary text-[10px] font-semibold mt-0.5">{t.date}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Want to get involved? Attend open council meetings every second Wednesday at 17:00 in the Student Union Hall. Submit agenda items or feedback to <strong><p className="text-muted-foreground text-xs leading-relaxed">Want to get involved? Attend open council meetings every second Wednesday at 17:00 in the Student Union Hall. Submit agenda items or feedback to <strong>support@oxfordskillscenter.co.uk</strong>.</p></strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCouncilPage;
