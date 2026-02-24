import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const CalendarSyncModal = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admissions/academic-calendar')}
      className="w-full px-4 py-2 text-xs font-semibold rounded-md bg-card text-foreground border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
    >
      <Calendar size={14} /> Sync Events to Calendar
    </button>
  );
};

export default CalendarSyncModal;
