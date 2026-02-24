import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentPortalSections, studentPortalSubItems } from '@/data/constants';
import SectionSearch from '@/components/shared/SectionSearch';

const StudentPortalPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-card border-b border-border py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Student <span className="text-primary">Portal</span></h1>
          <p className="text-muted-foreground max-w-2xl">Your central hub for academic resources, regulations, and schedules.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search resources…" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {studentPortalSections.map((item, idx) => {
            const subItem = studentPortalSubItems[idx];
            return (
              <div
                key={idx}
                data-searchable
                onClick={() => subItem?.path && navigate(subItem.path)}
                className={`group ${item.bg} p-5 rounded-xl border-2 ${item.color.replace('text-', 'border-').replace('600', '200').replace('700', '200')} transition-all duration-200 cursor-pointer flex items-start gap-4 hover:-translate-y-1`}
                style={{
                  boxShadow: 'inset 0 -8px 12px -4px rgba(0,0,0,0.12), inset 0 4px 8px 0 rgba(255,255,255,0.7), inset 4px 0 6px -2px rgba(255,255,255,0.3), inset -4px 0 6px -2px rgba(0,0,0,0.05), 0 6px 12px -3px rgba(0,0,0,0.12), 0 3px 6px -2px rgba(0,0,0,0.06)',
                }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-white/70 ${item.color} group-hover:scale-105 transition-transform`}><item.icon size={24} /></div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentPortalPage;
