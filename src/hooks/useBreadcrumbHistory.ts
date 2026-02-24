import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navItems, resourceItems, admissionSubItems, schoolSubItems, transactionSubItems, studentPortalSubItems } from '@/data/constants';

export interface BreadcrumbEntry {
  path: string;
  label: string;
}

const allMenuItems = [...navItems, ...resourceItems];

const subMenuMap: Record<string, { label: string; id: string }[]> = {
  '/admissions': admissionSubItems,
  '/schools': schoolSubItems,
  '/transactions': transactionSubItems,
  '/student-portal': studentPortalSubItems,
};

const subRouteLabels: Record<string, { parent: string; label: string }> = {};

Object.entries(subMenuMap).forEach(([parentPath, items]) => {
  items.forEach((item: any) => {
    if (item.path) {
      const parentItem = allMenuItems.find(i => i.path === parentPath);
      subRouteLabels[item.path] = {
        parent: parentItem?.name || 'Page',
        label: item.label,
      };
    }
  });
});

const staticLabels: Record<string, string> = {
  '/dashboard': 'Student Dashboard',
  '/admin': 'Admin Dashboard',
  '/auth': 'Sign In',
};

function getPageLabel(path: string): string {
  if (path === '/') return 'Home';
  if (staticLabels[path]) return staticLabels[path];
  const found = allMenuItems.find(i => i.path === path);
  if (found) return found.name;
  if (path.startsWith('/programs/')) {
    const type = path.replace('/programs/', '').replace(/-/g, ' ');
    return type.replace(/\b\w/g, l => l.toUpperCase());
  }
  // Admin sub-routes like /admin/view-student/:id
  if (path.startsWith('/admin/view-student/')) return 'View Student';
  const subRoute = subRouteLabels[path];
  if (subRoute) return subRoute.label;
  return 'Page';
}

const degreeTypes = ['bachelor-degree', 'master-degree', 'ph.d-degree'];

function getProgramParentLabel(slug: string): string | null {
  if (degreeTypes.includes(slug)) return 'Degree Programmes';
  return null;
}

function getSubMenuLabel(parentPath: string, hash: string): string | null {
  const subItems = subMenuMap[parentPath];
  if (!subItems || !hash) return null;
  const id = hash.replace('#', '');
  const found = subItems.find(item => item.id === id);
  return found ? found.label : null;
}

function buildTrail(pathname: string, hash: string, state?: any): BreadcrumbEntry[] {
  const trail: BreadcrumbEntry[] = [{ path: '/', label: 'Home' }];
  if (pathname === '/') return trail;

  // Program detail pages: /programs/bachelor-degree/slug or /programs/master-degree/slug
  const programDetailMatch = pathname.match(/^\/programs\/(bachelor-degree|master-degree|ph\.d-degree|diploma-programs|diploma-programmes|certificates|trainings)\/(.+)$/);
  if (programDetailMatch) {
    trail.push({ path: '/programs', label: 'All Programmes' });
    const degreeType = programDetailMatch[1];
    const degreeLabel = degreeType === 'ph.d-degree' ? 'Ph.D Degree' : degreeType === 'master-degree' ? 'Master Degree' : (degreeType === 'diploma-programs' || degreeType === 'diploma-programmes') ? 'Diploma Programmes' : degreeType === 'certificates' ? 'Certificates' : degreeType === 'trainings' ? 'Trainings' : 'Bachelor Degree';
    trail.push({ path: `/programs/${degreeType}`, label: degreeLabel });
    const slug = programDetailMatch[2].replace(/-/g, ' ');
    const label = slug.replace(/\b\w/g, l => l.toUpperCase());
    trail.push({ path: pathname, label });
    return trail;
  }

  if (pathname.startsWith('/programs/')) {
    trail.push({ path: '/programs', label: 'All Programmes' });
    const slug = pathname.replace('/programs/', '');
    const degreeParent = getProgramParentLabel(slug);
    if (degreeParent) {
      trail.push({ path: '/programs', label: degreeParent });
    }
    trail.push({ path: pathname, label: getPageLabel(pathname) });
    return trail;
  }

  // School pages: if came from a program detail page, include the full trail
  if (pathname.startsWith('/schools/') && pathname !== '/schools' && state?.fromProgram) {
    const from = state.fromProgram;
    // Determine if it's master or bachelor from the path
    const isMaster = from.path.includes('/master-degree/');
    const isPhd = from.path.includes('/ph.d-degree/');
    const isDiploma = from.path.includes('/diploma-programs/') || from.path.includes('/diploma-programmes/');
    const isCert = from.path.includes('/certificates/');
    const isTrn = from.path.includes('/trainings/');
    const degreeType = isPhd ? 'ph.d-degree' : isMaster ? 'master-degree' : isDiploma ? 'diploma-programmes' : isCert ? 'certificates' : isTrn ? 'trainings' : 'bachelor-degree';
    const degreeLabel = isPhd ? 'Ph.D Degree' : isMaster ? 'Master Degree' : isDiploma ? 'Diploma Programmes' : isCert ? 'Certificates' : isTrn ? 'Trainings' : 'Bachelor Degree';
    trail.push({ path: `/programs/${degreeType}`, label: degreeLabel });
    trail.push({ path: from.path, label: from.title });
    // Get school name
    const schoolSlug = pathname.replace('/schools/', '');
    const schoolLabel = getPageLabel(pathname);
    trail.push({ path: pathname, label: schoolLabel });
    return trail;
  }

  // Admin sub-routes: /admin/view-student/:userId
  if (pathname.startsWith('/admin/view-student/')) {
    trail.push({ path: '/admin', label: 'Admin Dashboard' });
    trail.push({ path: pathname, label: 'View Student' });
    return trail;
  }

  // Dashboard and admin root — just show Home > Label
  if (pathname === '/dashboard' || pathname === '/admin') {
    trail.push({ path: pathname, label: getPageLabel(pathname) });
    return trail;
  }

  const subRoute = subRouteLabels[pathname];
  if (subRoute) {
    const parentPath = Object.keys(subMenuMap).find(p => pathname.startsWith(p));
    if (parentPath) {
      trail.push({ path: parentPath, label: subRoute.parent });
    }
  }

  trail.push({ path: pathname, label: getPageLabel(pathname) });

  if (hash) {
    const subLabel = getSubMenuLabel(pathname, hash);
    if (subLabel) {
      trail.push({ path: pathname + hash, label: subLabel });
    }
  }

  return trail;
}

export function useBreadcrumbHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useState<BreadcrumbEntry[]>([]);
  const [forwardStack, setForwardStack] = useState<BreadcrumbEntry[]>([]);
  const prevKey = useRef<string | null>(null);
  const navSource = useRef<'user' | 'back' | 'forward'>('user');

  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    const fullPath = currentPath + currentHash;

    if (prevKey.current === fullPath) {
      navSource.current = 'user';
      return;
    }
    prevKey.current = fullPath;

    const trail = buildTrail(currentPath, currentHash, location.state);
    setHistory(trail);

    // Only clear forward stack on normal user navigation
    if (navSource.current === 'user') {
      setForwardStack([]);
    }

    navSource.current = 'user';
  }, [location.pathname, location.hash]);

  const canGoBack = history.length > 1;
  const currentPage = history.length > 0 ? history[history.length - 1] : null;
  const canGoForward = forwardStack.length > 0;
  const forwardEntry = canGoForward ? forwardStack[forwardStack.length - 1] : null;

  const goBack = useCallback(() => {
    if (history.length <= 1) return;
    const current = history[history.length - 1];
    const parent = history[history.length - 2];

    navSource.current = 'back';
    setForwardStack(prev => [...prev, current]);
    navigate(parent.path);
  }, [history, navigate]);

  const goForward = useCallback(() => {
    if (forwardStack.length === 0) return;
    const target = forwardStack[forwardStack.length - 1];

    navSource.current = 'forward';
    setForwardStack(prev => prev.slice(0, -1));
    navigate(target.path);
  }, [forwardStack, navigate]);

  return { history, currentPage, canGoBack, canGoForward, forwardEntry, goBack, goForward };
}
