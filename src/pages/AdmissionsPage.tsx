import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search, FileCheck,
  Calendar, Phone, Mail, List, Loader,
  CreditCard
} from 'lucide-react';
import ApplicationProcedures from '@/components/admissions/ApplicationProcedures';
import HowToApplyTab from '@/components/admissions/HowToApplyTab';
import EntryRequirementsTab from '@/components/admissions/EntryRequirementsTab';
import FeesTab from '@/components/admissions/FeesTab';
import DatesTab from '@/components/admissions/DatesTab';
import SectionSearch from '@/components/shared/SectionSearch';

const sections = [
  { id: 'how-to-apply', label: 'How to Apply', icon: List },
  { id: 'entry-requirements', label: 'Entry Requirements', icon: FileCheck },
  { id: 'fees-scholarships', label: 'Fees & Scholarships', icon: CreditCard },
  { id: 'key-dates', label: 'Key Dates', icon: Calendar },
];

const AdmissionsPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('how-to-apply');
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<{ id: string; status: string; step: number; message: string; lastUpdate: string } | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Hash-based scroll navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  // Intersection observer to highlight active nav button on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = sections.map(s => s.id);

    ids.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId) return;
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setTrackResult({
        id: trackId,
        status: 'Under Review',
        step: 2,
        message: 'Your documents are currently being verified by the admissions committee.',
        lastUpdate: '2 days ago',
      });
    }, 1500);
  };

  const setSectionRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" alt="Campus Life" />
        </div>
        <div className="relative z-10 p-6 md:p-8 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />Admissions Open 2026
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              Begin Your Journey <br/> <span className="text-emerald-400">At Oxford Skills Center</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">We are looking for ambitious students ready to shape the future. Track your application status or start a new one today.</p>
            <div className="flex gap-3">
              <button onClick={() => window.dispatchEvent(new Event('open-application-modal'))} className="px-6 py-2 text-xs font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-400 transition-all">Apply Now</button>
              <button className="px-5 py-2 text-xs font-semibold rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all">Download Prospectus</button>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-5 shadow-xl border border-slate-700/50">
            <h3 className="text-slate-900 font-bold text-sm mb-2 flex items-center gap-2"><Search size={16} className="text-emerald-600" /> Track Application</h3>
            <p className="text-slate-500 text-[10px] mb-3">Enter your Reference ID (e.g., APP-2026-X89)</p>
            <form onSubmit={handleTrack} className="space-y-2">
              <input type="text" value={trackId} onChange={(e) => setTrackId(e.target.value)} placeholder="Application ID" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
              <button type="submit" className="w-full px-4 py-2 text-xs font-semibold rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-all">
                {isTracking ? <Loader size={14} className="animate-spin mx-auto" /> : 'Check Status'}
              </button>
            </form>
            {trackResult && (
              <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200 animate-slideDown">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-slate-500">ID: {trackResult.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">{trackResult.status}</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full mb-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '50%' }} />
                </div>
                <p className="text-[10px] text-slate-600 leading-snug">{trackResult.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <SectionSearch containerRef={searchContainerRef} placeholder="Search admissions info…" />

      {/* ═══ MERGED: Application Procedures + Admission Requirements ═══ */}
      <div id="application-procedures" className="scroll-mt-6">
        <ApplicationProcedures />
      </div>

      {/* Admission Requirements flows directly from Application Procedures */}
      <div id="admission-requirements" className="scroll-mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><FileCheck size={24} /></div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Admission Requirements</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Everything you need to know — from application steps to key deadlines.</p>
          </div>
        </div>
      </div>

      {/* Sticky Section Navigation (part of merged section) */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-8 md:px-8 py-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted border border-border'
              }`}
            >
              <section.icon size={13} className="shrink-0" />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Continuous Content Sections (part of merged section) */}
      <div className="space-y-12">
        <div data-searchable ref={setSectionRef('how-to-apply')} id="how-to-apply" className="scroll-mt-20">
          <HowToApplyTab />
        </div>
        <div className="border-t border-border" />
        <div data-searchable ref={setSectionRef('entry-requirements')} id="entry-requirements" className="scroll-mt-20">
          <EntryRequirementsTab />
        </div>
        <div className="border-t border-border" />
        <div data-searchable ref={setSectionRef('fees-scholarships')} id="fees-scholarships" className="scroll-mt-20">
          <FeesTab />
        </div>
        <div className="border-t border-border" />
        <div data-searchable ref={setSectionRef('key-dates')} id="key-dates" className="scroll-mt-20">
          <DatesTab />
        </div>
      </div>


      {/* Need Help */}
      <div className="bg-slate-900 rounded-xl p-5 text-white">
        <h4 className="font-bold text-sm mb-2">Need Help?</h4>
        <p className="text-xs text-slate-400 mb-4">Our admission officers are available Mon-Fri, 9am-5pm.</p>
        <div className="flex items-center gap-2 text-xs mb-2"><Phone size={12} className="text-emerald-400" /> +44 7782 274482</div>
        <div className="flex items-center gap-2 text-xs"><Mail size={12} className="text-emerald-400" /> admissions@oxfordskills.uk</div>
        <button className="mt-4 w-full sm:w-auto bg-white text-slate-900 text-xs font-bold py-2 px-6 rounded hover:bg-slate-200 transition-colors">Contact Us</button>
      </div>
    </div>
  );
};

export default AdmissionsPage;
