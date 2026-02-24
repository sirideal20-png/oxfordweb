import { useRef } from 'react';
import VisaApplicationsSection from '@/components/admissions/VisaApplicationsSection';
import SectionSearch from '@/components/shared/SectionSearch';

const VisaApplicationsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search visa info…" />
      <VisaApplicationsSection />
    </div>
  );
};

export default VisaApplicationsPage;
