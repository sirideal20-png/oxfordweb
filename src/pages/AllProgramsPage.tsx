import { useRef, useState, useMemo, useCallback, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, Scroll, FileText, Wrench, ChevronRight, Search, X } from 'lucide-react';
import {
  bachelorProgramsData, masterProgramsData, phdProgramsData,
  diplomaProgramsData, processedShortCourses, certificateProgramsData, trainingProgramsData
} from '@/data/constants';
import { bachelorProgramDetails } from '@/data/programDetails';

const sections = [
  {
    id: 'degree-programs',
    title: 'Degree Programmes',
    icon: GraduationCap,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    children: [
      { label: 'Bachelor Degree', path: '/programs/bachelor-degree', data: bachelorProgramsData, icon: GraduationCap },
      { label: 'Master Degree', path: '/programs/master-degree', data: masterProgramsData, icon: Award },
      { label: 'Ph.D Degree', path: '/programs/ph.d-degree', data: phdProgramsData, icon: BookOpen },
    ],
  },
  {
    id: 'diploma-programs',
    title: 'Diploma Programmes',
    icon: Scroll,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    path: '/programs/diploma-programs',
    data: diplomaProgramsData,
  },
  {
    id: 'short-courses',
    title: 'Short Courses',
    icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    path: '/programs/short-courses',
    data: processedShortCourses,
  },
  {
    id: 'certificates',
    title: 'Certificate Programmes',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    path: '/programs/certificates',
    data: certificateProgramsData,
  },
  {
    id: 'trainings',
    title: 'Training Programmes',
    icon: Award,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    path: '/programs/trainings',
    data: trainingProgramsData,
  },
];

const countPrograms = (data: Record<string, { code: string; title: string }[]>) =>
  Object.values(data).reduce((sum, arr) => sum + arr.length, 0);

// Slug generators matching each detail page
const generateSlugForType = (title: string, programType: string): string => {
  const prefixMap: Record<string, RegExp> = {
    'Bachelor': /^BS\(Hons\) in /,
    'Master': /^MS in /,
    'Ph.D': /^Ph\.D in /,
    'Diploma': /^Diploma in /,
    'Certificate': /^Certificate in /,
    'Training': /^Training in /,
  };
  const prefix = prefixMap[programType];
  const stripped = prefix ? title.replace(prefix, '') : title;
  return stripped.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const programTypeRouteMap: Record<string, string> = {
  'Bachelor': '/programs/bachelor-degree',
  'Master': '/programs/master-degree',
  'Ph.D': '/programs/ph.d-degree',
  'Diploma': '/programs/diploma-programs',
  'Certificate': '/programs/certificates',
  'Training': '/programs/trainings',
  'Short Course': '/programs/short-courses',
};

interface SearchableItem {
  searchId: string;
  title: string;
  code: string;
  programType: string;
  category: string;
}

const AllProgramsPage = () => {
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [, startTransition] = useTransition();

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    startTransition(() => setDebouncedQuery(value));
  }, []);

  // Build searchable data
  const allSearchableData = useMemo(() => {
    const data: SearchableItem[] = [];
    const processData = (source: Record<string, { code: string; title: string }[]>, programType: string) => {
      Object.entries(source).forEach(([category, programs]) => {
        programs.forEach(p => {
          data.push({ searchId: `${programType}-${p.code}`, title: p.title, code: p.code, programType, category });
        });
      });
    };
    processData(bachelorProgramsData, 'Bachelor');
    processData(masterProgramsData, 'Master');
    processData(phdProgramsData, 'Ph.D');
    processData(diplomaProgramsData, 'Diploma');
    processData(certificateProgramsData, 'Certificate');
    processData(trainingProgramsData, 'Training');
    processData(processedShortCourses, 'Short Course');
    return data;
  }, []);

  // Code-to-slug map for bachelor
  const codeToSlugMap = useMemo(() => {
    const map: Record<string, string> = {};
    bachelorProgramDetails.forEach(p => { map[p.code] = p.slug; });
    return map;
  }, []);

  const getProgramPath = useCallback((item: SearchableItem) => {
    const base = programTypeRouteMap[item.programType] || '/programs/bachelor-degree';
    if (item.programType === 'Bachelor') {
      const slug = codeToSlugMap[item.code];
      if (slug) return `${base}/${slug}`;
    }
    if (['Master', 'Ph.D', 'Diploma', 'Certificate', 'Training'].includes(item.programType)) {
      const slug = generateSlugForType(item.title, item.programType);
      if (slug) return `${base}/${slug}`;
    }
    return base;
  }, [codeToSlugMap]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const lower = debouncedQuery.toLowerCase();
    return allSearchableData.filter(item =>
      item.title.toLowerCase().includes(lower) || item.code.toLowerCase().includes(lower)
    );
  }, [debouncedQuery, allSearchableData]);

  const handleNavigation = useCallback((path: string) => {
    handleSearchChange('');
    navigate(path);
  }, [navigate, handleSearchChange]);

  const isSearching = !!debouncedQuery;

  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Programmes</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore our comprehensive range of accredited academic programmes.
          </p>
        </div>
        <div className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
          {sections.reduce((total, sec) => {
            if (sec.children) {
              return total + sec.children.reduce((ct, ch) => ct + countPrograms(ch.data), 0);
            }
            return total + countPrograms(sec.data!);
          }, 0)}{' '}
          Total Programmes
        </div>
      </div>

      {/* Search bar */}
      <div className="relative flex items-center gap-3 w-full sm:max-w-md">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search programmes…"
            className="w-full h-9 pl-9 pr-16 text-xs rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {searchQuery && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                {searchResults.length} found
              </span>
              <button onClick={() => handleSearchChange('')} className="p-0.5 hover:bg-muted rounded transition-colors" title="Clear">
                <X size={12} className="text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Results for "{debouncedQuery}"</h3>
            <span className="text-xs text-muted-foreground font-medium">{searchResults.length} found</span>
          </div>
          {searchResults.length > 0 ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm divide-y divide-border/50">
              {searchResults.map((item) => (
                <div key={item.searchId} className="px-4 sm:px-6 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                      item.programType === 'Bachelor' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      item.programType === 'Master' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      item.programType === 'Ph.D' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      item.programType === 'Diploma' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      item.programType === 'Certificate' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      item.programType === 'Training' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {item.programType}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.code} {item.category ? `• ${item.category}` : ''}</p>
                    </div>
                  </div>
                  <button onClick={() => handleNavigation(getProgramPath(item))} className="h-6 text-[10px] text-primary hover:text-primary/80 hover:bg-primary/5 font-semibold rounded px-2 shrink-0">View</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Search size={32} className="mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-muted-foreground text-sm">No programmes found matching your criteria.</p>
              <button onClick={() => handleSearchChange('')} className="text-primary text-xs font-bold mt-2 hover:underline">Clear Search</button>
            </div>
          )}
        </div>
      )}

      {/* Sections (hidden when searching) */}
      <div className={`grid gap-6 ${isSearching ? 'hidden' : ''}`}>
        {sections.map((section) => {
          const SectionIcon = section.icon;
          const isParent = !!section.children;

          if (isParent) {
            const totalChildren = section.children!.reduce((ct, ch) => ct + countPrograms(ch.data), 0);
            return (
              <div key={section.id} className={`bg-card rounded-lg border ${section.borderColor} overflow-hidden shadow-sm`}>
                <div className={`${section.bg} px-5 py-4 border-b ${section.borderColor} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${section.bg} border ${section.borderColor} flex items-center justify-center`}>
                      <SectionIcon size={18} className={section.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{section.title}</h3>
                      <p className="text-[10px] text-muted-foreground">{totalChildren} programmes across {section.children!.length} levels</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-border/50">
                  {section.children!.map((child) => {
                    const ChildIcon = child.icon;
                    const count = countPrograms(child.data);
                    const samplePrograms = Object.values(child.data).flat().slice(0, 3);
                    return (
                      <button
                        key={child.path}
                        onClick={() => navigate(child.path)}
                        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <ChildIcon size={16} className={`${section.color} shrink-0 opacity-70`} />
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-foreground block">{child.label}</span>
                            <span className="text-[10px] text-muted-foreground block truncate mt-0.5">
                              {samplePrograms.map(p => p.title).join(' • ')}
                              {count > 3 && ` • +${count - 3} more`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{count}</span>
                          <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          const count = countPrograms(section.data!);
          const samplePrograms = Object.values(section.data!).flat().slice(0, 3);
          return (
            <button
              key={section.id}
              onClick={() => navigate(section.path!)}
              className={`w-full bg-card rounded-lg border ${section.borderColor} overflow-hidden shadow-sm hover:shadow-md transition-all group text-left`}
            >
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-lg ${section.bg} border ${section.borderColor} flex items-center justify-center shrink-0`}>
                    <SectionIcon size={18} className={section.color} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-foreground block">{section.title}</span>
                    <span className="text-[10px] text-muted-foreground block truncate mt-0.5">
                      {samplePrograms.map(p => p.title).join(' • ')}
                      {count > 3 && ` • +${count - 3} more`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{count} programmes</span>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AllProgramsPage;
