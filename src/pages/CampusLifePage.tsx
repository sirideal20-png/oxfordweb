import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, CheckCircle, Heart, Utensils, Bed, Gamepad2, Map,
  PlayCircle, Shield,
  Calendar, ArrowRight, Briefcase
} from 'lucide-react';
import CalendarSyncModal from '@/components/campus/CalendarSyncModal';
import { dayInLifeData } from '@/data/constants';
import ImageSlider from '@/components/shared/ImageSlider';
import { useOxfordTimeIndex, useOxfordClock } from '@/hooks/useOxfordTime';
import { useRecCenterStatus } from '@/hooks/useRecCenterStatus';
import SectionSearch from '@/components/shared/SectionSearch';

const campusGalleryImages = [
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-9.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-8.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-10.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-11.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-12.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-15.jpeg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-14.jpeg',
  
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-17-scaled.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-18-scaled.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-1.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-2.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-3.jpeg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-4.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-5.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-6.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-7.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-19.jpg',
  'https://oxfordskillscenter.co.uk/wp-content/uploads/2026/02/oxford-skills-center-21.jpg',
];

const ActivityIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
);

const CampusLifePage = () => {
  const navigate = useNavigate();
  const oxfordIndex = useOxfordTimeIndex();
  const oxfordClock = useOxfordClock();
  const recStatus = useRecCenterStatus();
  const [activeTime, setActiveTime] = useState<number | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Use manual selection if user clicked, otherwise follow UK time
  const currentIndex = activeTime !== null ? activeTime : oxfordIndex;
  const activeDay = dayInLifeData[currentIndex];

  return (
    <div ref={searchContainerRef} className="space-y-20 animate-fadeIn pb-24 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search campus facilities, events…" />

      {/* Day in the Life Hero */}
      <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-900 mx-4 md:mx-0">
        <div className="grid lg:grid-cols-12 min-h-[600px]">
          {/* Controls Side */}
          <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col relative bg-slate-950">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-transparent to-transparent" />
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">Daily Rhythm</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">A Day at Oxford</h1>
              <p className="text-slate-400 text-xs leading-relaxed font-light">Experience the pulse of our campus. The timeline syncs to current Oxford, UK time.</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono text-lg text-emerald-400 font-bold tracking-tight">{oxfordClock}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Oxford, UK</span>
                {activeTime === null && (
                  <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" /> Live
                  </span>
                )}
                {activeTime !== null && (
                  <button
                    onClick={() => setActiveTime(null)}
                    className="ml-auto text-[9px] bg-white/10 text-slate-300 hover:text-white px-2 py-0.5 rounded-full border border-white/10 transition-colors"
                  >
                    ↻ Sync to Live
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4 relative pl-4">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-800" />
              {dayInLifeData.map((item, idx) => (
                <div key={idx} className="relative z-10 group">
                  <button onClick={() => setActiveTime(idx)} className={`relative w-full text-left pl-8 py-2 transition-all duration-500 ${currentIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                    <div className={`absolute left-0 top-[18px] -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 z-20 ${currentIndex === idx ? 'bg-emerald-500 border-emerald-500 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-950 border-slate-700 group-hover:border-slate-500'}`} />
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-baseline gap-3">
                        <span className={`font-mono text-xs font-medium tracking-tight ${currentIndex === idx ? 'text-emerald-400' : 'text-slate-500'}`}>{item.time}</span>
                        <span className="h-px w-3 bg-slate-800" />
                        <span className="text-[9px] font-bold tracking-[0.15em] text-slate-500 uppercase group-hover:text-slate-300 transition-colors">{item.label}</span>
                      </div>
                      <span className={`text-sm font-semibold tracking-wide transition-all duration-300 transform ${currentIndex === idx ? 'text-white translate-x-1' : 'text-slate-400'}`}>{item.title}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:col-span-8 relative overflow-hidden bg-slate-900 group">
            <div className="absolute inset-0 z-0">
              <img key={currentIndex} src={activeDay.img} className="w-full h-full object-cover transition-all duration-1000 animate-fadeIn opacity-60 mix-blend-overlay scale-105 group-hover:scale-100" alt={activeDay.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            </div>
            <div className="absolute top-8 right-12 text-right z-10 pointer-events-none">
              <h2 className="text-[140px] font-bold text-white/5 font-mono leading-none tracking-tighter select-none">{activeDay.time}</h2>
            </div>
            <div className="absolute bottom-12 left-12 z-20 max-w-sm">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl animate-slideUp">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/20"><Clock size={16} /></div>
                    <div>
                      <span className="text-white font-bold text-sm tracking-wide block">{activeDay.title}</span>
                      <span className="text-emerald-400/80 text-[10px] font-mono uppercase tracking-wider">{activeDay.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-light">{activeDay.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Essentials Bento Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><Map className="text-primary" /> Campus Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Row 1 */}
          <div data-searchable className="md:col-span-2 bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-primary/40 transition-all group">
            <div className="flex justify-between items-start">
              <div><h3 className="font-bold text-foreground text-base flex items-center gap-2"><Utensils size={18} className="text-orange-500" /> Smart Dining</h3><p className="text-xs text-muted-foreground mt-1">Live menus & nutritional tracking.</p></div>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> OPEN</span>
            </div>
            <div className="mt-3 flex gap-2">{['Vegan Options', 'Halal', 'Gluten-Free'].map(tag => (<span key={tag} className="text-[10px] bg-muted px-2 py-1 rounded border border-border">{tag}</span>))}</div>
          </div>
          <div data-searchable className="md:col-span-1 md:row-span-2 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="p-2.5 bg-blue-500/20 w-fit rounded-xl mb-3"><Bed size={20} className="text-blue-400" /></div>
              <h3 className="font-bold text-white text-base mb-1">Modern Living</h3>
              <p className="text-xs text-slate-400 mb-3">Comfortable hostels with high-speed WiFi and laundry.</p>
              <div className="mt-auto">
                <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400" className="w-full h-24 object-cover rounded-lg mb-2 opacity-80 group-hover:opacity-100 transition-opacity" alt="Room" />
                <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="block w-full py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors text-center">View 360° Tour</a>
              </div>
            </div>
          </div>
          <div data-searchable className="md:col-span-1 md:row-span-2 bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col">
            <div className="p-2.5 bg-white w-fit rounded-xl mb-3 shadow-sm"><Heart size={20} className="text-emerald-600" /></div>
            <h3 className="font-bold text-foreground text-base mb-1">Wellness Center</h3>
            <p className="text-xs text-muted-foreground mb-4">Mental health support, counseling, and yoga sessions.</p>
            <ul className="space-y-2 mt-auto">
              <li className="flex items-center gap-2 text-xs font-medium text-foreground"><CheckCircle size={12} className="text-primary" /> 24/7 Helpline</li>
              <li className="flex items-center gap-2 text-xs font-medium text-foreground"><CheckCircle size={12} className="text-primary" /> On-campus Clinic</li>
              <li className="flex items-center gap-2 text-xs font-medium text-foreground"><CheckCircle size={12} className="text-primary" /> Meditation Pods</li>
            </ul>
            <button className="mt-4 w-full py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg transition-colors">Book Appointment</button>
          </div>
          {/* Row 2 */}
          <div data-searchable className="md:col-span-2 bg-card p-5 rounded-2xl border border-border shadow-sm hover:border-purple-400 transition-all flex items-center justify-between">
            <div><h3 className="font-bold text-foreground text-base flex items-center gap-2"><Gamepad2 size={18} className="text-purple-500" /> Student Life</h3><p className="text-xs text-muted-foreground mt-1">50+ Clubs including Robotics, Debate, and Esports.</p></div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (<div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-bold text-muted-foreground">{i}</div>))}
              <div className="w-8 h-8 rounded-full bg-foreground border-2 border-card flex items-center justify-center text-[10px] font-bold text-card">+40</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Gallery */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <PlayCircle className="text-primary" /> Campus Gallery
        </h2>
        <ImageSlider images={campusGalleryImages} />
      </div>

      {/* Campus Media */}
      <div className="bg-muted rounded-3xl p-8 border border-border">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Campus Media</h2>
          <p className="text-sm text-muted-foreground mt-1">Watch student stories and campus highlights.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Freshers Week 2025 Highlights", duration: "3:45", views: "12K", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" },
            { title: "Day in the Life: Engineering", duration: "8:12", views: "8.5K", thumb: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" },
            { title: "Campus Tour 2026", duration: "5:30", views: "45K", thumb: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
          ].map((vid, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md bg-black">
              <img src={vid.thumb} alt={vid.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50 group-hover:scale-110 transition-transform"><PlayCircle size={24} fill="currentColor" /></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="text-white font-bold text-sm line-clamp-1">{vid.title}</h4>
                <div className="flex gap-3 text-[10px] text-slate-300 mt-1"><span>{vid.duration}</span><span>•</span><span>{vid.views} views</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Ecosystem */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 block">Support Ecosystem</span>
            <h2 className="text-3xl font-bold text-white mb-4">Your Well-being Matters</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">We acknowledge that mental and physical health is a priority. Access 24/7 support systems designed for the modern student experience.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-4 py-2 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2"><Heart size={14} /> Mental Health Chat</button>
              <button className="px-4 py-2 text-xs font-semibold rounded-md bg-white text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-2"><Shield size={14} /> Safety & Blue Light Map</button>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><ActivityIcon size={20} /></div>
              <div>
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  Live Rec Center Status
                  {recStatus.isActive && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
                </h4>
                <p className="text-slate-400 text-[10px]">
                  {recStatus.isActive ? `Live · Updated at ${recStatus.lastUpdated}` : `Closed · Low activity`}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Main Gym Floor</span>
                  <span className="font-mono">{recStatus.gymCapacity}% Capacity</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${recStatus.gymCapacity}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Swimming Pool</span>
                  <span className="font-mono">{recStatus.poolCapacity}% Capacity</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${recStatus.poolCapacity}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <h3 className="font-bold text-foreground text-xl mb-4 flex items-center gap-2"><Map size={20} className="text-blue-500" /> Interactive Campus Map</h3>
          <p className="text-muted-foreground text-sm mb-6">Find quiet study spots, accessible entrances, and the best coffee routes.</p>
          <div className="flex flex-wrap gap-2 mb-6">{['Quiet Zones', 'Coffee', 'Parking', 'Events'].map(tag => (<span key={tag} className="text-[10px] bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-muted/80">{tag}</span>))}</div>
          <div className="flex flex-col gap-2">
            <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2"><Map size={14} /> Open Campus Map</a>
            <CalendarSyncModal />
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 shadow-sm text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Briefcase size={20} className="text-indigo-400" /> Career & Future</h3>
            <p className="text-indigo-200 text-sm mb-6">"Campus Life" is part of your career journey. Join our startup incubator or become a Student Ambassador.</p>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10 mb-4">
              <p className="text-xs italic text-slate-300">"The Debate Club taught me more about negotiation than any textbook."</p>
              <p className="text-[10px] font-bold text-white mt-2">- Sarah J., Alumni '24 (Now at Google)</p>
            </div>
            <button onClick={() => navigate('/alumni')} className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1">Explore Alumni Network <ArrowRight size={12} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusLifePage;
