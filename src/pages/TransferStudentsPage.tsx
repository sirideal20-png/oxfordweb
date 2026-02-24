import { useRef } from 'react';
import TransferStudentsSection from '@/components/admissions/TransferStudentsSection';
import SectionSearch from '@/components/shared/SectionSearch';

const TransferStudentsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search transfer policy…" />
      <TransferStudentsSection />
    </div>
  );
};

export default TransferStudentsPage;
