import { useParams } from 'react-router-dom';
import DegreeProgramList from '@/components/shared/DegreeProgramList';
import {
  bachelorProgramsData, masterProgramsData, phdProgramsData,
  diplomaProgramsData, certificateProgramsData, trainingProgramsData, processedShortCourses
} from '@/data/constants';

interface ProgramsPageProps {
  onApply: () => void;
}

const programMap: Record<string, { data: Record<string, { code: string; title: string }[]>; title: string }> = {
  'bachelor-degree': { data: bachelorProgramsData, title: 'Bachelor Degree Programmes' },
  'master-degree': { data: masterProgramsData, title: 'Master Degree Programmes' },
  'ph.d-degree': { data: phdProgramsData, title: 'Ph.D Degree Programmes' },
  'diploma-programs': { data: diplomaProgramsData, title: 'Diploma Programmes' },
  'diploma-programmes': { data: diplomaProgramsData, title: 'Diploma Programmes' },
  'short-courses': { data: processedShortCourses, title: 'Short Courses' },
  'certificates': { data: certificateProgramsData, title: 'Certificate Programmes' },
  'trainings': { data: trainingProgramsData, title: 'Training Programmes' },
};

const isCertificate = (type: string | undefined) => type === 'certificates';

const ProgramsPage = () => {
  const { type } = useParams<{ type: string }>();
  const program = programMap[type || 'bachelor-degree'];
  const isBachelor = type === 'bachelor-degree';
  const isMaster = type === 'master-degree';
  const isPhd = type === 'ph.d-degree';
  const isDiploma = type === 'diploma-programs' || type === 'diploma-programmes';
  const isTraining = type === 'trainings';

  if (!program) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">Programme Not Found</h2>
        <p className="text-muted-foreground">Please select a programme from the sidebar.</p>
      </div>
    );
  }

  return (
    <DegreeProgramList
      data={program.data}
      title={program.title}
      onApply={() => window.dispatchEvent(new Event('open-application-modal'))}
      showMeta={isBachelor || isMaster || isPhd || isDiploma || isCertificate(type) || isTraining}
      programType={isDiploma ? 'diploma' : isCertificate(type) ? 'certificate' : isPhd ? 'phd' : isMaster ? 'master' : isTraining ? 'training' : 'bachelor'}
    />
  );
};

export default ProgramsPage;
