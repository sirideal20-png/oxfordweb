import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Monitor, Sprout } from 'lucide-react';
import { schoolsData } from '@/data/constants';
import SectionSearch from '@/components/shared/SectionSearch';

const SchoolsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-16 animate-fadeIn pb-12 font-sans">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search schools, programmes…" />

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-16 md:py-20 px-6 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 backdrop-blur-md shadow-lg"><Sparkles size={12} /> Academic Excellence</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">Schools of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Innovation</span></h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mx-auto max-w-lg">Discover our diverse faculties where expert faculty and state-of-the-art facilities converge to shape the leaders of tomorrow.</p>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {schoolsData.map((school, idx) => (
            <Link key={idx} to={`/schools/${school.id}`} data-searchable className="group relative bg-card p-5 rounded-2xl border border-border shadow-xl hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-border to-card group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500" />
              <div className="flex justify-between items-start mb-3">
                <div className={`w-11 h-11 ${school.bg} ${school.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}><school.icon size={20} /></div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-primary"><ArrowRight size={14} /></div>
                </div>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5 leading-tight group-hover:text-primary transition-colors">{school.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-1">{school.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">{school.tags.map(tag => (<span key={tag} className="text-[11px] font-semibold px-2 py-1 bg-muted text-muted-foreground rounded-md border border-border group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">{tag}</span>))}</div>
              <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{school.stats}</span>
                <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">VIEW</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Research & Innovation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800/50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] -ml-40 -mb-40" />
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-indigo-400 font-bold tracking-[0.15em] uppercase text-[10px] mb-3 block flex items-center justify-center gap-2"><Sparkles size={12} /> Breaking Boundaries</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Research & Centers of Excellence</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">Beyond the classroom, we are pushing the boundaries of knowledge.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Monitor size={120} className="text-indigo-400" /></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-5 border border-indigo-500/20"><Monitor size={20} /></div>
                  <h3 className="text-xl font-bold text-white mb-2">AI & Robotics Lab</h3>
                  <p className="text-slate-400 text-xs mb-6 leading-relaxed max-w-sm">Pioneering research in neural networks, autonomous systems, and ethical AI.</p>
                  <div className="flex flex-wrap gap-2 mb-6">{['Machine Learning', 'Computer Vision', 'NLP'].map(tag => (<span key={tag} className="text-[10px] font-medium bg-indigo-900/30 text-indigo-200 px-2 py-1 rounded border border-indigo-500/10">{tag}</span>))}</div>
                  <button className="text-indigo-300 hover:text-white text-xs font-bold flex items-center transition-colors">Explore Research <ArrowRight size={14} className="ml-1" /></button>
                </div>
              </div>
              <div className="group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Sprout size={120} className="text-emerald-400" /></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-5 border border-emerald-500/20"><Sprout size={20} /></div>
                  <h3 className="text-xl font-bold text-white mb-2">Sustainable Futures</h3>
                  <p className="text-slate-400 text-xs mb-6 leading-relaxed max-w-sm">Developing green technologies and agricultural solutions for a climate-resilient planet.</p>
                  <div className="flex flex-wrap gap-2 mb-6">{['Renewable Energy', 'Agri-Tech', 'Climate Data'].map(tag => (<span key={tag} className="text-[10px] font-medium bg-emerald-900/30 text-emerald-200 px-2 py-1 rounded border border-emerald-500/10">{tag}</span>))}</div>
                  <button className="text-emerald-300 hover:text-white text-xs font-bold flex items-center transition-colors">Explore Research <ArrowRight size={14} className="ml-1" /></button>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5">
              {[{ val: "$50M+", label: "Research Grants", color: "text-indigo-400" }, { val: "120+", label: "Published Papers", color: "text-emerald-400" }, { val: "15", label: "Patents Filed", color: "text-blue-400" }, { val: "500+", label: "Student Researchers", color: "text-purple-400" }].map((stat, i) => (
                <div key={i} className="text-center bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.val}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage;
