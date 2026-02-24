import { ChevronRight, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbEntry } from '@/hooks/useBreadcrumbHistory';

interface MobileBreadcrumbProps {
  history: BreadcrumbEntry[];
  canGoBack: boolean;
  canGoForward: boolean;
  forwardEntry: BreadcrumbEntry | null;
  goBack: () => void;
  goForward: () => void;
}

const MobileBreadcrumb = ({ history, canGoBack, canGoForward, forwardEntry, goBack, goForward }: MobileBreadcrumbProps) => {
  const navigate = useNavigate();

  if (history.length === 0) return null;

  const visibleHistory = history.length > 3
    ? [history[0], { path: '', label: '...' }, ...history.slice(-2)]
    : history;

  return (
    <div className="flex items-center gap-1.5 px-4 py-2 bg-card border-b border-border overflow-x-auto shrink-0 min-h-[36px]">
      {/* Back button */}
      {canGoBack && (
        <button
          onClick={goBack}
          className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Go back"
          title="Back"
        >
          <ArrowLeft size={16} />
        </button>
      )}

      {/* Forward button */}
      {canGoForward && forwardEntry && (
        <button
          onClick={goForward}
          className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={`Go forward to ${forwardEntry.label}`}
          title={forwardEntry.label}
        >
          <ArrowRight size={16} />
        </button>
      )}

      {/* Breadcrumb trail */}
      <div className="flex items-center gap-1 text-[11px] min-w-0 flex-1 overflow-x-auto no-scrollbar">
        {visibleHistory.map((entry, index) => {
          const isLast = index === visibleHistory.length - 1;
          const isEllipsis = entry.path === '' && entry.label === '...';

          return (
            <div key={`${entry.path}-${index}`} className="flex items-center gap-1 shrink-0">
              {index > 0 && (
                <ChevronRight size={10} className="text-muted-foreground/50 shrink-0" />
              )}
              {isEllipsis ? (
                <span className="text-muted-foreground/50">…</span>
              ) : isLast ? (
                <span className="font-semibold text-foreground truncate max-w-[120px]">
                  {entry.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(entry.path)}
                  className="text-muted-foreground hover:text-primary transition-colors truncate max-w-[80px] flex items-center gap-0.5"
                >
                  {entry.path === '/' && <Home size={10} className="shrink-0" />}
                  <span className="truncate">{entry.path === '/' ? '' : entry.label}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBreadcrumb;
