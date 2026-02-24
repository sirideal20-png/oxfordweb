import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollableSubMenuProps {
  children: React.ReactNode;
}

const ScrollableSubMenu = ({ children }: ScrollableSubMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setHasMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check immediately, after animation, and on next frames
    check();
    const raf = requestAnimationFrame(check);
    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 400);

    el.addEventListener('scroll', check);

    const ro = new ResizeObserver(check);
    ro.observe(el);

    // Watch for child content changes
    const mo = new MutationObserver(check);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      el.removeEventListener('scroll', check);
      ro.disconnect();
      mo.disconnect();
    };
  }, [children, check]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="pl-7 space-y-0.5 mt-1 mb-2 animate-slideDown max-h-48 overflow-y-auto no-scrollbar"
      >
        {children}
        {/* Sticky indicator inside scrollable area for reliable mobile support */}
        {hasMore && (
          <div className="sticky bottom-0 left-0 right-0 pointer-events-none z-10">
            <div className="h-8 bg-gradient-to-t from-sidebar to-transparent" />
            <div className="flex justify-center -mt-3">
              <div className="flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wider text-sidebar-foreground/50 animate-bounce">
                <ChevronDown size={10} />
                <span>more</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollableSubMenu;
