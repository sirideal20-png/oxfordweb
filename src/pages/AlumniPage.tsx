import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, GraduationCap, Briefcase, Monitor, Coffee,
  ChevronRight, ArrowRight, Handshake, Gift
} from 'lucide-react';
import { alumniSpotlights } from '@/data/constants';
import SectionSearch from '@/components/shared/SectionSearch';

const AlumniPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  return (
    <div ref={searchContainerRef} className="space-y-16 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search alumni, events…" />

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-900 py-24 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-6 backdrop-blur-md shadow-lg">
            <GraduationCap size={14} /> Global Community
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Welcome Home, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Alumni</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mx-auto max-w-xl">
            Connect, mentor, and grow with over 50,000 graduates making an impact across the globe.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="flex-1 max-w-[200px] px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2"><Users size={14} /> Join the Community</button>
            <button className="flex-1 max-w-[200px] px-4 py-2 text-xs font-semibold rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">Update Profile</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8 md:divide-x divide-border gap-4 md:gap-0">
          <div className="text-center px-4 py-2 md:py-0 border-b md:border-b-0 border-border last:border-b-0"><div className="text-3xl font-bold text-foreground mb-1">50k+</div><div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Alumni</div></div>
          <div className="text-center px-4 py-2 md:py-0 border-b md:border-b-0 border-border last:border-b-0"><div className="text-3xl font-bold text-foreground mb-1">120+</div><div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Countries</div></div>
          <div className="text-center px-4 py-2 md:py-0"><div className="text-3xl font-bold text-foreground mb-1">85%</div><div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">In Leadership Roles</div></div>
        </div>
      </div>

      {/* Spotlights */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div><h2 className="text-2xl font-bold text-foreground">Alumni Spotlight</h2><p className="text-sm text-muted-foreground mt-1">Celebrating the achievements of our graduates.</p></div>
          <button className="text-xs text-primary font-bold hover:text-primary/80 flex items-center gap-1">View All Stories <ArrowRight size={14} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {alumniSpotlights.map((alum, i) => (
            <div key={i} data-searchable className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <img src={alum.img} alt={alum.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">{alum.name}</h4>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">{alum.year}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic mb-4">"{alum.quote}"</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wide border-t border-border pt-4">
                <Briefcase size={12} /> {alum.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Networking Hub */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Handshake size={100} className="text-white" /></div>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4"><Handshake size={20} /></div>
              <h3 className="text-xl font-bold text-white mb-2">Mentorship Programme</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm">Connect with experienced alumni for career guidance.</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-all">Find a Mentor</button>
                <button className="px-4 py-2 text-xs font-semibold rounded-md bg-white text-slate-900 hover:bg-gray-100 transition-all font-bold">Become a Mentor</button>
              </div>
            </div>
          </div>
          <div className="bg-emerald-900 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Gift size={100} className="text-white" /></div>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4"><Gift size={20} /></div>
              <h3 className="text-xl font-bold text-white mb-2">Giving Back</h3>
              <p className="text-emerald-100/70 text-sm mb-6 max-w-sm">Support the next generation of students through scholarships and grants.</p>
              <button className="px-4 py-2 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-white transition-all">Make a Donation</button>
            </div>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-foreground">Upcoming Reunions & Events</h2>
          <button onClick={() => navigate('/admissions/academic-calendar')} className="text-xs text-primary font-bold hover:text-primary/80 flex items-center gap-1">View Academic Calendar <ArrowRight size={14} /></button>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Class of 2015 Reunion", date: "15", month: "MAR", type: "Reunion", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
            { title: "Global Tech Summit", date: "22", month: "APR", type: "Webinar", icon: Monitor, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Networking Mixer", date: "10", month: "MAY", type: "Networking", icon: Coffee, color: "text-orange-600", bg: "bg-orange-50" },
            { title: "Career Fair 2026", date: "18", month: "JUN", type: "Career", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((ev, i) => (
            <div key={i} data-searchable onClick={() => navigate('/admissions/academic-calendar')} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-muted border border-border rounded-lg px-3 py-2 text-center min-w-[3.5rem]">
                    <span className="block text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">{ev.month}</span>
                    <span className="block text-xl font-bold text-foreground leading-none mt-0.5">{ev.date}</span>
                  </div>
                  <div className={`p-2 rounded-full ${ev.bg} ${ev.color}`}><ev.icon size={18} /></div>
                </div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest mb-2 ${ev.color}`}>{ev.type}</span>
                <h4 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">{ev.title}</h4>
              </div>
              <div className="px-5 py-3 border-t border-border/50 bg-muted/30 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary uppercase tracking-wide">Register</span>
                <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
