import { useRef } from 'react';
import { Palette, Music, Camera, Dumbbell, ChefHat, Gamepad2, Clock, Users, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const hobbyCourses = [
  { title: 'Photography & Videography', desc: 'Master DSLR photography, editing with Lightroom, and short film production.', icon: Camera, color: 'text-pink-600', bg: 'bg-pink-50', duration: '8 weeks', spots: 20 },
  { title: 'Digital Art & Illustration', desc: 'Learn digital drawing, character design, and illustration with Procreate & Photoshop.', icon: Palette, color: 'text-purple-600', bg: 'bg-purple-50', duration: '10 weeks', spots: 15 },
  { title: 'Music Production', desc: 'Create beats, mix tracks, and produce music using Logic Pro and Ableton.', icon: Music, color: 'text-blue-600', bg: 'bg-blue-50', duration: '12 weeks', spots: 12 },
  { title: 'Fitness & Wellness', desc: 'Group fitness classes including yoga, HIIT, boxing, and swimming.', icon: Dumbbell, color: 'text-emerald-600', bg: 'bg-emerald-50', duration: 'Ongoing', spots: 30 },
  { title: 'Culinary Arts', desc: 'Cooking workshops featuring British, Mediterranean, and Asian cuisines.', icon: ChefHat, color: 'text-amber-600', bg: 'bg-amber-50', duration: '6 weeks', spots: 16 },
  { title: 'Gaming & Esports', desc: 'Competitive gaming, tournament organisation, and streaming setup.', icon: Gamepad2, color: 'text-red-600', bg: 'bg-red-50', duration: '8 weeks', spots: 24 },
];

const HobbyCoursesPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Palette size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Hobby Courses</h1>
              <p className="text-pink-100 mt-1">Extra-Curricular Activities & Creative Workshops</p>
            </div>
          </div>
          <p className="text-pink-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Explore your passions beyond the classroom. Register for hobby courses, creative workshops, and recreational activities — all free for enrolled OSCT students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search hobby courses…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hobbyCourses.map((c) => (
            <div key={c.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center ${c.color} mb-3 group-hover:scale-105 transition-transform`}>
                <c.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{c.desc}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={10} /> {c.duration}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Users size={10} /> {c.spots} spots</span>
              </div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">How to Register</h2>
          <div className="space-y-2 text-xs">
            {[
              'Browse available hobby courses above and choose your preferred activity.',
              'Log in to the Student Portal → "Extra-Curricular" → "Hobby Courses".',
              'Select your preferred time slot and confirm your registration.',
              'Attend the first session — materials and equipment provided by OSCT.',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                <p className="text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Hobby courses are free for all enrolled students. Priority is given on a first-come, first-served basis. Registration opens at the start of each semester. Contact <strong>support@oxfordskillscenter.co.uk</strong> for enquiries.</p>
        </div>
      </div>
    </div>
  );
};

export default HobbyCoursesPage;
