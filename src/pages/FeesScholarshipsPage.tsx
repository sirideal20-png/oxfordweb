import { useRef } from 'react';
import FeesTab from '@/components/admissions/FeesTab';
import SectionSearch from '@/components/shared/SectionSearch';

const FeesScholarshipsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search fees, scholarships…" />
      <FeesTab />
    </div>
  );
};

export default FeesScholarshipsPage;
