import { useState } from 'react';
import { ChevronDown, Clock, GraduationCap, PoundSterling, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { bachelorProgramDetails } from '@/data/programDetails';

interface Program {
  code: string;
  title: string;
  duration?: string;
}

interface CategorySectionProps {
  category: string;
  programs: Program[];
  startCount: number;
  onApply: () => void;
  showMeta?: boolean;
  programType?: 'bachelor' | 'master' | 'phd' | 'diploma' | 'certificate' | 'training';
}

const generateSlug = (title: string) =>
  title.replace(/^(BS\(Hons\) in |MS in |Ph\.D in |Diploma in |Certificate in |Training in )/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const CategorySection = ({ category, programs, startCount, onApply, showMeta = false, programType = 'bachelor' }: CategorySectionProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const initialLimit = 10;
  const visiblePrograms = expanded ? programs : programs.slice(0, initialLimit);
  const hasMore = programs.length > initialLimit;

  const getMeta = (code: string, title: string) => {
    if ((programType === 'diploma' || programType === 'certificate' || programType === 'training') && showMeta) {
      const prog = programs.find(p => p.code === code);
      const dur = prog?.duration || (programType === 'certificate' ? '6 Months' : programType === 'training' ? '4 Weeks' : '6 Months');
      const label = programType === 'certificate' ? 'Certificate' : programType === 'training' ? 'Training' : 'Diploma';
      const fee = programType === 'training' ? '£1,700 (Total)' : '£6,000 (Total)';
      return { duration: dur, level: label, annualFees: fee, school: category, slug: generateSlug(title) };
    }
    if (programType === 'phd' && showMeta) {
      return { duration: '3–4 Years', level: 'Postgraduate Research', annualFees: '£8,000', school: category, slug: generateSlug(title) };
    }
    if (programType === 'master' && showMeta) {
      return { duration: '2 Years', level: 'Postgraduate', annualFees: '£9,000', school: category, slug: generateSlug(title) };
    }
    const found = bachelorProgramDetails.find(p => p.code === code);
    if (found) return found;
    if (showMeta) return { duration: '4 Years', level: 'Undergraduate', annualFees: '£14,000', school: category, slug: generateSlug(title) };
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm transition-all duration-300">
      <div
        className="bg-muted px-6 py-4 border-b border-border flex justify-between items-center cursor-pointer hover:bg-muted/80"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wide flex items-center gap-2">
          {category}
          {hasMore && !expanded && (
            <span className="text-[10px] normal-case font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              +{programs.length - initialLimit} more
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">{programs.length} courses</span>
          <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div className="divide-y divide-border/50">
        {visiblePrograms.map((program, idx) => {
          const number = startCount + idx + 1;
          const meta = showMeta ? getMeta(program.code, program.title) : null;

          return (
            <div key={program.code} className="px-4 sm:px-6 py-4 hover:bg-muted/50 transition-colors group">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-[10px] font-bold shadow-sm mt-0.5">
                  {number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shrink-0 self-start">
                      {program.code}
                    </span>
                    <span className="text-xs font-medium text-foreground">{program.title}</span>
                  </div>
                  {meta && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock size={12} className="text-primary/70" /> {meta.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <GraduationCap size={12} className="text-primary/70" /> {meta.level}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <PoundSterling size={12} className="text-primary/70" /> {meta.annualFees}{programType !== 'diploma' && programType !== 'certificate' && programType !== 'training' ? '/year' : ''}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Building2 size={12} className="text-primary/70" /> {meta.school}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); meta.slug ? navigate(`/programs/${programType === 'certificate' ? 'certificates' : programType === 'diploma' ? 'diploma-programs' : programType === 'phd' ? 'ph.d-degree' : programType === 'master' ? 'master-degree' : programType === 'training' ? 'trainings' : 'bachelor-degree'}/${meta.slug}`) : onApply(); }}
                        className="hidden sm:inline-flex items-center justify-center ml-auto h-7 px-4 text-[11px] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Apply →
                      </button>
                    </div>
                  )}
                  {meta && (
                    <button
                      onClick={(e) => { e.stopPropagation(); meta.slug ? navigate(`/programs/${programType === 'certificate' ? 'certificates' : programType === 'diploma' ? 'diploma-programs' : programType === 'phd' ? 'ph.d-degree' : programType === 'master' ? 'master-degree' : programType === 'training' ? 'trainings' : 'bachelor-degree'}/${meta.slug}`) : onApply(); }}
                      className="sm:hidden mt-3 h-7 px-4 text-[11px] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full"
                    >
                      Apply →
                    </button>
                  )}
                  {!meta && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onApply(); }}
                      className="mt-2 opacity-0 group-hover:opacity-100 h-6 px-2 text-[10px] transition-opacity text-muted-foreground hover:text-foreground hover:bg-muted rounded"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {hasMore && !expanded && (
        <div
          onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
          className="px-6 py-3 text-center text-xs font-bold text-primary cursor-pointer hover:bg-muted/50 border-t border-border/50 transition-colors"
        >
          View All {programs.length} Programmes
        </div>
      )}
    </div>
  );
};

export default CategorySection;
