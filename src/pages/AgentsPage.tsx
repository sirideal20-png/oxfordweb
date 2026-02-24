import { useRef } from 'react';
import AgentsSection from '@/components/admissions/AgentsSection';
import SectionSearch from '@/components/shared/SectionSearch';

const AgentsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search agent info…" />
      <AgentsSection />
    </div>
  );
};

export default AgentsPage;
