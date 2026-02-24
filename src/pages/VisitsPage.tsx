import { useRef } from 'react';
import VisitsSection from '@/components/admissions/VisitsSection';
import SectionSearch from '@/components/shared/SectionSearch';

const VisitsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search visits, tours…" />
      <VisitsSection />
    </div>
  );
};

export default VisitsPage;
