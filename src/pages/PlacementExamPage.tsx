import { useRef } from 'react';
import PlacementExamSection from '@/components/admissions/PlacementExamSection';
import SectionSearch from '@/components/shared/SectionSearch';

const PlacementExamPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search exam info…" />
      <PlacementExamSection />
    </div>
  );
};

export default PlacementExamPage;
