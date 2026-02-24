import { useRef } from 'react';
import FeeCalculatorSection from '@/components/admissions/FeeCalculatorSection';
import SectionSearch from '@/components/shared/SectionSearch';

const FeeCalculatorPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search fees, scholarships…" />
      <FeeCalculatorSection />
    </div>
  );
};

export default FeeCalculatorPage;
