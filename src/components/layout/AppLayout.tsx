import { useState, useMemo, useRef, useEffect, useTransition, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Phone, Mail, LogIn, LogOut, Menu, ChevronRight, Search, Bell, X, ChevronDown,
  Settings, ArrowRight, Download, Instagram, Facebook, Twitter, Youtube,
  Linkedin, MessageCircle, Send, MapPin, Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import NewsTicker from '@/components/shared/NewsTicker';
import ScrollableSubMenu from '@/components/layout/ScrollableSubMenu';
import ApplicationModal from '@/components/shared/ApplicationModal';
import AuthGateModal from '@/components/shared/AuthGateModal';
import BackToProgramBanner from '@/components/shared/BackToProgramBanner';
import MobileBreadcrumb from '@/components/layout/MobileBreadcrumb';
import { useBreadcrumbHistory } from '@/hooks/useBreadcrumbHistory';
import {
  navItems, resourceItems, programMenuItems, searchCategories,
  courses, bachelorProgramsData, masterProgramsData, phdProgramsData,
  diplomaProgramsData, certificateProgramsData, trainingProgramsData, processedShortCourses
} from '@/data/constants';
import { bachelorProgramDetails } from '@/data/programDetails';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { user, isAdmin, profile, signOut } = useAuth();

  const getProfilePicUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(url);
    return data?.publicUrl || null;
  };

  const profilePicUrl = getProfilePicUrl(profile?.profile_picture_url);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [authRedirectPath, setAuthRedirectPath] = useState<string | undefined>(undefined);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => {
      const isCurrentlyOpen = prev[name];
      // Close all other menus, toggle the clicked one
      return { [name]: !isCurrentlyOpen };
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Programmes');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  // Fetch announcements when dropdown opens
  useEffect(() => {
    if (!notifOpen) return;
    setNotifLoading(true);
    supabase
      .from('announcements')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setNotifications(data || []);
        setNotifLoading(false);
      });
  }, [notifOpen]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { history: breadcrumbHistory, canGoBack, canGoForward, forwardEntry, goBack, goForward, currentPage } = useBreadcrumbHistory();

  const protectedPrefixes = ['/student-portal', '/transactions', '/dashboard', '/admin'];

  const handleNavigation = (path: string) => {
    // Check if path is protected and user is not logged in
    const [basePath, hash] = path.split('#');
    const isProtected = protectedPrefixes.some(p => basePath === p || basePath.startsWith(p + '/'));
    if (isProtected && !user) {
      setAuthRedirectPath(basePath + (hash ? `#${hash}` : ''));
      setAuthGateOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }
    navigate(basePath + (hash ? `#${hash}` : ''));
    handleSearchChange('');
    setSearchCategory('All Programmes');
    setIsMobileMenuOpen(false);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [location.pathname]);

  // Listen for global 'open-application-modal' event so any Apply button can trigger it
  useEffect(() => {
    const handler = () => setIsModalOpen(true);
    window.addEventListener('open-application-modal', handler);
    return () => window.removeEventListener('open-application-modal', handler);
  }, []);

  // Debounce search query with transition for smooth typing
  const [, startTransition] = useTransition();
  
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    startTransition(() => {
      setDebouncedQuery(value);
    });
  }, []);

  // Search logic
  const allSearchableData = useMemo(() => {
    const data: { title: string; code: string; programType: string; category?: string; searchId: string }[] = [];
    courses.forEach(c => data.push({ title: c.title, code: c.code, programType: 'Featured', category: c.category, searchId: `feat-${c.id}` }));
    const processDegreeData = (source: Record<string, { code: string; title: string }[]>, type: string) => {
      Object.entries(source).forEach(([cat, list]) => {
        list.forEach(item => data.push({ ...item, programType: type, category: cat, searchId: item.code }));
      });
    };
    processDegreeData(bachelorProgramsData, 'Bachelor');
    processDegreeData(masterProgramsData, 'Master');
    processDegreeData(phdProgramsData, 'Ph.D');
    processDegreeData(diplomaProgramsData, 'Diploma');
    processDegreeData(certificateProgramsData, 'Certificate');
    processDegreeData(trainingProgramsData, 'Training');
    processDegreeData(processedShortCourses, 'Short Course');
    return data;
  }, []);

  const programTypeRouteMap: Record<string, string> = {
    'Bachelor': '/programs/bachelor-degree',
    'Master': '/programs/master-degree',
    'Ph.D': '/programs/ph.d-degree',
    'Diploma': '/programs/diploma-programs',
    'Certificate': '/programs/certificates',
    'Training': '/programs/trainings',
    'Short Course': '/programs/short-courses',
    'Featured': '/programs/bachelor-degree',
  };

  // Build a code-to-slug lookup from bachelor detail data
  const codeToSlugMap = useMemo(() => {
    const map: Record<string, string> = {};
    bachelorProgramDetails.forEach(p => { map[p.code] = p.slug; });
    return map;
  }, []);

  const generateSlugForType = useCallback((title: string, programType: string): string => {
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
  }, []);

  const getProgramPath = useCallback((item: { title: string; programType: string; code: string }) => {
    const base = programTypeRouteMap[item.programType] || '/programs/bachelor-degree';
    // For bachelor programs, try the detail data slug first
    if (item.programType === 'Bachelor' || item.programType === 'Featured') {
      const slug = codeToSlugMap[item.code];
      if (slug) return `${base}/${slug}`;
    }
    // For all other program types, generate slug from title
    if (['Master', 'Ph.D', 'Diploma', 'Certificate', 'Training'].includes(item.programType)) {
      const slug = generateSlugForType(item.title, item.programType);
      if (slug) return `${base}/${slug}`;
    }
    return base;
  }, [codeToSlugMap, generateSlugForType]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    let data = allSearchableData;
    if (searchCategory !== 'All Programmes') {
      const typeMap: Record<string, string[]> = {
        "Degree Programmes": ['Bachelor', 'Master', 'Ph.D'],
        "Diploma Programmes": ['Diploma'],
        "Short Courses": ['Short Course'],
        "Certificates": ['Certificate'],
        "Trainings": ['Training'],
      };
      const allowedTypes = typeMap[searchCategory];
      if (allowedTypes) data = data.filter(item => allowedTypes.includes(item.programType));
    }
    const lower = debouncedQuery.toLowerCase();
    return data.filter(item => item.title.toLowerCase().includes(lower) || item.code.toLowerCase().includes(lower));
  }, [debouncedQuery, searchCategory, allSearchableData]);

  const currentPageName = currentPage?.label || 'Overview';

  // Sidebar scroll indicator
  const navRef = useRef<HTMLElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const check = () => {
      const hasMore = el.scrollHeight - el.scrollTop - el.clientHeight > 8;
      setShowScrollHint(hasMore);
    };
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [openMenus, isDegreeOpen]);

  return (
    <div className="h-screen bg-muted font-sans text-muted-foreground flex flex-col md:flex-row relative overflow-hidden">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        onTouchEnd={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}
      />

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl md:shadow-none will-change-transform`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border flex items-center justify-between gap-3">
            <button onClick={() => handleNavigation('/')} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <img src="https://oxfordskillscenter.co.uk/wp-content/uploads/2025/12/Logo-Oxford-Skills-Center.png" alt="Oxford Skills Center" className="h-10 w-auto bg-white rounded-md p-1 object-contain" />
              <div className="text-left">
                <h1 className="text-sidebar-accent-foreground font-bold text-sm leading-none">Oxford Skills Center</h1>
                <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 mt-1">of Technology LTD</p>
              </div>
            </button>
            <button className="md:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground p-1 -mr-1 touch-manipulation" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Nav */}
          <div className="flex-1 relative overflow-hidden">
            <nav ref={navRef} className="h-full px-3 py-3 space-y-0.5 overflow-y-auto no-scrollbar">
            <div className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">Main Menu</div>
            {navItems.map((item) => {
              const hasSubItems = !!item.subItems;
              const hasSubMenu = !!(item as any).subMenu;
              const isExpandable = hasSubItems || hasSubMenu;
              const isOpen = openMenus[item.name] || false;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

              return (
                <div key={item.name}>
                  <div className={`w-full flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive && !hasSubItems ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center gap-3 min-w-0 text-left truncate"
                      style={{ flex: isExpandable ? '1 1 0' : '1 1 auto', marginRight: isExpandable ? '0' : undefined }}
                    >
                      <item.icon size={16} className="shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                    {isExpandable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          toggleMenu(item.name);
                        }}
                        className="shrink-0 ml-1 p-2.5 -mr-2 rounded hover:bg-sidebar-accent/60 transition-colors touch-manipulation relative z-10"
                        aria-label={`Toggle ${item.name} submenu`}
                      >
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Programs sub-items (special structure with degree nesting) */}
                  {hasSubItems && isOpen && (
                    <div className="pl-10 space-y-1 mt-1 mb-2 animate-slideDown">
                      {(item.subItems as readonly (string | { title: string; children: string[] })[]).map((sub) => {
                        if (typeof sub === 'string') {
                          const subPath = `/programs/${sub.toLowerCase().replace(/\s+/g, '-')}`;
                          return (
                            <button
                              key={String(sub)}
                              onClick={() => handleNavigation(subPath)}
                              className={`block w-full text-left py-1.5 text-[10px] transition-colors ${location.pathname === subPath ? 'text-sidebar-primary' : 'text-sidebar-foreground/60 hover:text-sidebar-accent-foreground'}`}
                            >
                              {sub}
                            </button>
                          );
                        } else {
                          return (
                            <div key={sub.title}>
                              <button onClick={() => setIsDegreeOpen(!isDegreeOpen)} className="flex items-center justify-between w-full text-left py-1.5 text-[10px] text-sidebar-foreground/80 hover:text-sidebar-accent-foreground transition-colors">
                                {sub.title}
                                <ChevronDown size={12} className={`transition-transform duration-200 ${isDegreeOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isDegreeOpen && (
                                <div className="pl-3 border-l border-sidebar-border ml-1 mt-1 space-y-1">
                                  {sub.children.map(child => {
                                    const childPath = `/programs/${child.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                      <button
                                        key={child}
                                        onClick={() => handleNavigation(childPath)}
                                        className={`block w-full text-left py-1 text-[10px] transition-colors ${location.pathname === childPath ? 'text-sidebar-primary' : 'text-sidebar-foreground/40 hover:text-sidebar-accent-foreground'}`}
                                      >
                                        {child}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}

                  {/* Generic sub-menu (Admissions, Schools, Transactions) */}
                  {hasSubMenu && isOpen && (
                    <ScrollableSubMenu>
                      {((item as any).subMenu as { label: string; id: string; icon: any; path?: string }[]).map((sub) => {
                        const subPath = sub.path || `${item.path}#${sub.id}`;
                        const isSubActive = sub.path
                          ? location.pathname === sub.path
                          : location.pathname === item.path && location.hash === `#${sub.id}`;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleNavigation(subPath)}
                            className={`flex items-center gap-2 w-full text-left py-1.5 px-2 text-[10px] rounded transition-colors ${isSubActive ? 'text-sidebar-primary font-semibold bg-sidebar-accent/40' : 'text-sidebar-foreground/60 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'}`}
                          >
                            <sub.icon size={12} className="shrink-0 opacity-60" />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </ScrollableSubMenu>
                  )}
                </div>
              );
            })}

            <div className="px-3 mt-4 mb-1 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">Resources</div>
            {resourceItems.map((item) => {
              const hasResSubMenu = !!(item as any).subMenu;
              const isResOpen = openMenus[item.name] || false;
              const isResActive = location.pathname === item.path;

              return (
                <div key={item.name}>
                  <div className={`w-full flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isResActive && !hasResSubMenu ? 'bg-primary text-primary-foreground' : isResActive && hasResSubMenu ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center gap-3 min-w-0 text-left truncate"
                      style={{ flex: hasResSubMenu ? '1 1 0' : '1 1 auto' }}
                    >
                      <item.icon size={16} className="shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                    {hasResSubMenu && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          toggleMenu(item.name);
                        }}
                        className="shrink-0 ml-1 p-2.5 -mr-2 rounded hover:bg-sidebar-accent/60 transition-colors touch-manipulation relative z-10"
                        aria-label={`Toggle ${item.name} submenu`}
                      >
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isResOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasResSubMenu && isResOpen && (
                    <ScrollableSubMenu>
                    {((item as any).subMenu as { label: string; id: string; icon: any; path?: string }[]).map((sub) => {
                        const subPath = sub.path || `${item.path}#${sub.id}`;
                        const isSubActive = sub.path
                          ? location.pathname === sub.path
                          : location.pathname === item.path && location.hash === `#${sub.id}`;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleNavigation(subPath)}
                            className={`flex items-center gap-2 w-full text-left py-1.5 px-2 text-[10px] rounded transition-colors ${isSubActive ? 'text-sidebar-primary font-semibold bg-sidebar-accent/40' : 'text-sidebar-foreground/60 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'}`}
                          >
                            <sub.icon size={12} className="shrink-0 opacity-60" />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </ScrollableSubMenu>
                  )}
                </div>
              );
            })}
            </nav>

            {/* Scroll indicator */}
            {showScrollHint && (
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <div className="h-12 bg-gradient-to-t from-sidebar to-transparent" />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-auto">
                  <button
                    onClick={() => navRef.current?.scrollBy({ top: 100, behavior: 'smooth' })}
                    className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sidebar-foreground/60 hover:text-sidebar-accent-foreground transition-colors animate-bounce"
                  >
                    <ChevronDown size={12} /> More
                  </button>
                </div>
              </div>
            )}
          </div>


          <div className="p-3 border-t border-sidebar-border shrink-0">
            <div className="md:hidden mb-3 space-y-2 pb-3 border-b border-sidebar-border">
              <p className="flex items-center gap-3 text-xs text-sidebar-foreground/60"><Phone size={14} className="text-sidebar-primary" /> +44 7782 274482</p>
              <p className="flex items-center gap-3 text-xs text-sidebar-foreground/60"><Mail size={14} className="text-sidebar-primary" /> support@oxfordskillscenter.co.uk</p>
            </div>
            <div className="bg-sidebar-accent rounded-lg p-3 mb-3">
              <h4 className="text-sidebar-accent-foreground text-xs font-bold mb-1">Apply for 2026</h4>
              <p className="text-[10px] text-sidebar-foreground/60 mb-2">Registration closes in 15 days.</p>
              <button onClick={() => setIsModalOpen(true)} className="w-full px-3 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Start Application
              </button>
            </div>
            <div className="flex items-center gap-2.5 px-1">
              <div className="shrink-0">
                {user && profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-bold text-sidebar-accent-foreground shadow-sm">
                    {user ? (profile?.first_name?.[0]?.toUpperCase() || 'S') : 'G'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-sidebar-accent-foreground truncate">
                  {user ? `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Student' : 'Guest User'}
                </p>
                <p className="text-[10px] text-sidebar-foreground/50 truncate">
                  {user ? (isAdmin ? 'Administrator' : 'Student') : 'Not logged in'}
                </p>
              </div>
              {user ? (
                <div className="flex gap-1 shrink-0">
                  {isAdmin && (
                    <button onClick={() => handleNavigation('/admin')} className="text-sidebar-foreground hover:text-amber-400 cursor-pointer p-1 touch-manipulation" title="Admin Panel">
                      <Shield size={14} />
                    </button>
                  )}
                  <button onClick={() => { signOut(); handleNavigation('/'); }} className="text-sidebar-foreground hover:text-sidebar-accent-foreground cursor-pointer p-1 touch-manipulation" title="Sign Out">
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button onClick={() => handleNavigation('/auth')} className="text-sidebar-foreground hover:text-sidebar-accent-foreground cursor-pointer p-1 touch-manipulation" title="Sign In">
                  <LogIn size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <div className="hidden md:flex bg-sidebar border-b border-sidebar-border h-8 px-6 items-center justify-between text-[10px] font-medium text-sidebar-foreground shrink-0">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-sidebar-primary transition-colors cursor-pointer"><Phone size={12} className="text-sidebar-primary" /> +44 7782 274482</span>
            <span className="flex items-center gap-1.5 hover:text-sidebar-primary transition-colors cursor-pointer"><Mail size={12} className="text-sidebar-primary" /> support@oxfordskillscenter.co.uk</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button onClick={() => handleNavigation('/admin')} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                    <Shield size={12} className="text-amber-400" /><span>Admin</span>
                  </button>
                )}
                <button onClick={() => handleNavigation('/dashboard')} className="flex items-center gap-1.5 hover:text-sidebar-accent-foreground transition-colors">
                  <LogIn size={12} className="text-sidebar-primary" /><span>My Portal</span>
                </button>
                <button onClick={() => { signOut(); handleNavigation('/'); }} className="flex items-center gap-1.5 hover:text-sidebar-accent-foreground transition-colors">
                  <LogOut size={12} className="text-sidebar-primary" /><span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={() => handleNavigation('/auth')} className="flex items-center gap-1.5 hover:text-sidebar-accent-foreground transition-colors">
                <LogIn size={12} className="text-sidebar-primary" /><span>Student Login</span>
              </button>
            )}
          </div>
        </div>

        <NewsTicker />

        {/* Breadcrumb (mobile + desktop) */}
        <MobileBreadcrumb history={breadcrumbHistory} canGoBack={canGoBack} canGoForward={canGoForward} forwardEntry={forwardEntry} goBack={goBack} goForward={goForward} />

        {/* Header */}
        <header className="bg-card border-b border-border shrink-0">
          <div className="h-[4.5rem] sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 relative">
            {/* Left: menu + page name */}
            <div className="flex items-center gap-2 min-w-0 md:flex-1">
              <button className="md:hidden p-2 -ml-1 text-foreground hover:bg-muted rounded-md shrink-0 touch-manipulation active:scale-95 transition-transform" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={22} />
              </button>
              <span className="md:hidden text-sm font-semibold text-foreground truncate">{currentPageName}</span>
            </div>

            {/* Center: mobile logo – full on homepage, blurred on other pages */}
            <div className="md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <img
                src="https://oxfordskillscenter.co.uk/wp-content/uploads/2025/12/Logo-Oxford-Skills-Center.png"
                alt="Oxford Skills Center Logo"
                className={`h-16 w-auto object-contain ${location.pathname === '/' ? '' : 'opacity-20 blur-[1px]'}`}
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop search */}
              <div className="hidden sm:flex items-center bg-muted border border-border rounded-full px-1 py-0.5 focus-within:ring-2 focus-within:ring-ring transition-all">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-transparent text-[10px] font-semibold text-foreground border-none outline-none py-1 pl-3 pr-1 cursor-pointer hover:text-foreground rounded-l-full focus:ring-0"
                >
                  {searchCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className="w-px h-3 bg-border mx-2" />
                <Search size={14} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-48 pl-2 text-foreground placeholder:text-muted-foreground focus:ring-0"
                />
                {searchQuery && (
                  <button onClick={() => handleSearchChange('')} className="px-2 text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(prev => !prev)}
                  className="relative p-1.5 sm:p-2 text-muted-foreground hover:text-foreground shrink-0"
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-destructive rounded-full border border-card" />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                      <h3 className="text-sm font-bold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifLoading ? (
                        <div className="p-6 text-center text-xs text-muted-foreground">Loading…</div>
                      ) : notifications.length === 0 ? (
                        <div className="p-6 text-center">
                          <Bell size={24} className="mx-auto text-muted-foreground/40 mb-2" />
                          <p className="text-xs text-muted-foreground">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="px-4 py-3 border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-default">
                            <p className="text-sm font-semibold text-foreground line-clamp-1">{n.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.content}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">
                              {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {user ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="flex items-center gap-1.5 shrink-0"
                    title={`${profile?.first_name || 'Student'} ${profile?.last_name || ''}`.trim()}
                  >
                    {profilePicUrl ? (
                      <img
                        src={profilePicUrl}
                        alt="Profile"
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-primary/20 hover:border-primary transition-colors shadow-sm"
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] sm:text-sm font-bold hover:bg-primary/80 transition-colors shadow-sm">
                        {profile?.first_name?.[0]?.toUpperCase() || 'S'}
                      </div>
                    )}
                    <span className="hidden sm:block text-xs font-semibold text-foreground max-w-[100px] truncate">
                      {profile?.first_name || 'Student'}
                    </span>
                  </button>
                  <button
                    onClick={() => { signOut(); handleNavigation('/'); }}
                    className="p-1 sm:p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    title="Sign Out"
                  >
                    <LogOut size={14} className="sm:hidden" />
                    <LogOut size={16} className="hidden sm:block" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation('/auth')}
                  className="p-1.5 sm:p-2 text-muted-foreground hover:text-primary transition-colors shrink-0"
                  title="Sign In"
                >
                  <LogIn size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="sm:hidden px-3 pb-2.5">
            <div className="flex items-center bg-muted border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring transition-all">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="bg-transparent text-[10px] font-semibold text-foreground border-none outline-none py-2 pl-2.5 pr-0 cursor-pointer focus:ring-0 shrink-0 max-w-[110px]"
              >
                {searchCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className="w-px h-4 bg-border mx-1.5 shrink-0" />
              <Search size={13} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-xs flex-1 min-w-0 pl-1.5 py-2 text-foreground placeholder:text-muted-foreground focus:ring-0"
              />
              {searchQuery && (
                <button onClick={() => handleSearchChange('')} className="px-2 text-muted-foreground hover:text-foreground shrink-0">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-muted p-3 sm:p-4 md:p-8 relative" ref={scrollContainerRef}>
          <BackToProgramBanner />
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8">
            {debouncedQuery && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Search Results for "{debouncedQuery}"</h2>
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
            <div className={debouncedQuery ? 'hidden' : ''}>
              {children}
            </div>
            <footer className="border-t border-border pt-3 pb-2 mt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full text-[10px] text-muted-foreground">
                <p className="shrink-0">© 2026 Oxford Skills Center of Technology LTD.</p>
                <div className="flex items-center gap-1.5 justify-center">
                  <a href="https://www.instagram.com/oxfordskillscenteroftechnology" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-pink-600 hover:bg-pink-100 hover:scale-110 transition-all" aria-label="Instagram"><Instagram size={13} /></a>
                  <a href="https://www.facebook.com/oxfordskillscenteroftechnologyltd" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all" aria-label="Facebook"><Facebook size={13} /></a>
                  <a href="https://x.com/oxford_skills" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-sky-500 hover:bg-sky-100 hover:scale-110 transition-all" aria-label="Twitter"><Twitter size={13} /></a>
                  <a href="https://linkedin.com/company/oxford-skills-center-of-technology-ltd" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-blue-700 hover:bg-blue-100 hover:scale-110 transition-all" aria-label="LinkedIn"><Linkedin size={13} /></a>
                  <a href="#" className="p-1.5 rounded-full bg-muted text-green-500 hover:bg-green-100 hover:scale-110 transition-all" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a href="#" className="p-1.5 rounded-full bg-muted text-foreground hover:bg-muted/80 hover:scale-110 transition-all" aria-label="TikTok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" /></svg>
                  </a>
                  <a href="#" className="p-1.5 rounded-full bg-muted text-red-600 hover:bg-red-100 hover:scale-110 transition-all" aria-label="YouTube"><Youtube size={13} /></a>
                  <a href="https://t.me/oxfordskillscenteroftechnology" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-sky-400 hover:bg-sky-100 hover:scale-110 transition-all" aria-label="Telegram"><Send size={13} /></a>
                  <a href="https://maps.app.goo.gl/Bc2yPeAD3R4Km5mK7" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-muted text-emerald-600 hover:bg-emerald-100 hover:scale-110 transition-all" aria-label="Location"><MapPin size={13} /></a>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a href="#" className="hover:text-foreground">Privacy</a>
                  <a href="#" className="hover:text-foreground">Terms</a>
                  <a href="#" className="hover:text-foreground">Sitemap</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AuthGateModal open={authGateOpen} onOpenChange={setAuthGateOpen} redirectPath={authRedirectPath} />
    </div>
  );
};

export default AppLayout;
