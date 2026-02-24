import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useBreadcrumbHistory } from '@/hooks/useBreadcrumbHistory';

interface LocationState {
  fromProgram?: {
    path: string;
    title: string;
  };
}

const BackToProgramBanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const { history, canGoBack } = useBreadcrumbHistory();

  // Priority 1: specific "back to program" state
  if (state?.fromProgram) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => navigate(state.fromProgram!.path)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 animate-fade-in hover:scale-105 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <GraduationCap size={14} />
          <span className="max-w-[180px] truncate">Back to {state.fromProgram.title}</span>
        </button>
      </div>
    );
  }

  // Priority 2: generic "back to previous" on any sub-page
  if (canGoBack && location.pathname !== '/') {
    const parentEntry = history[history.length - 2];
    if (!parentEntry) return null;

    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => navigate(parentEntry.path)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 animate-fade-in hover:scale-105 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-[180px] truncate">Back to {parentEntry.label}</span>
        </button>
      </div>
    );
  }

  return null;
};

export default BackToProgramBanner;
