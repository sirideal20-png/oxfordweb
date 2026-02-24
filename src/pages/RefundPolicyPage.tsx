import { useRef } from 'react';
import RefundPolicySection from '@/components/admissions/RefundPolicySection';
import SectionSearch from '@/components/shared/SectionSearch';

const RefundPolicyPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search refund policy…" />
      <RefundPolicySection />
    </div>
  );
};

export default RefundPolicyPage;
