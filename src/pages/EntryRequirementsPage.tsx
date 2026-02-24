import { useRef } from 'react';
import EntryRequirementsTab from '@/components/admissions/EntryRequirementsTab';
import SectionSearch from '@/components/shared/SectionSearch';

const EntryRequirementsPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="animate-fadeIn pb-12 font-sans space-y-6">
      <SectionSearch containerRef={searchContainerRef} placeholder="Search entry requirements…" />
      <EntryRequirementsTab />
    </div>
  );
};

export default EntryRequirementsPage;
