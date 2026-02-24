import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SectionSearchProps {
  containerRef: React.RefObject<HTMLElement>;
  placeholder?: string;
}

const SectionSearch = ({ containerRef, placeholder = 'Search this section…' }: SectionSearchProps) => {
  const [query, setQuery] = useState('');
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const clearHighlights = useCallback((root: HTMLElement) => {
    const marks = root.querySelectorAll('mark[data-search-highlight]');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
        parent.normalize();
      }
    });
  }, []);

  const highlightText = useCallback((el: HTMLElement, term: string) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

    textNodes.forEach((node) => {
      const idx = node.textContent?.toLowerCase().indexOf(term) ?? -1;
      if (idx === -1 || !node.textContent) return;
      const before = node.textContent.slice(0, idx);
      const match = node.textContent.slice(idx, idx + term.length);
      const after = node.textContent.slice(idx + term.length);
      const frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      const mark = document.createElement('mark');
      mark.setAttribute('data-search-highlight', 'true');
      mark.className = 'bg-yellow-300/70 dark:bg-yellow-500/40 text-foreground rounded-sm px-0.5';
      mark.textContent = match;
      frag.appendChild(mark);
      if (after) frag.appendChild(document.createTextNode(after));
      node.parentNode?.replaceChild(frag, node);
    });
  }, []);

  const filterItems = useCallback((searchText: string) => {
    if (!containerRef.current) return;

    // Always clear previous highlights first
    clearHighlights(containerRef.current);

    const items = containerRef.current.querySelectorAll('[data-searchable]');
    if (items.length === 0) return;

    const trimmed = searchText.trim().toLowerCase();

    if (!trimmed) {
      items.forEach((item) => {
        (item as HTMLElement).style.display = '';
      });
      const groups = containerRef.current.querySelectorAll('[data-search-group]');
      groups.forEach((group) => {
        (group as HTMLElement).style.display = '';
      });
      const noResults = containerRef.current.querySelector('[data-no-results]');
      if (noResults) noResults.remove();
      setMatchCount(null);
      return;
    }

    let visible = 0;

    items.forEach((item) => {
      const text = (item as HTMLElement).textContent?.toLowerCase() || '';
      const matches = text.includes(trimmed);
      (item as HTMLElement).style.display = matches ? '' : 'none';
      if (matches) {
        visible++;
        highlightText(item as HTMLElement, trimmed);
      }
    });

    const groups = containerRef.current.querySelectorAll('[data-search-group]');
    groups.forEach((group) => {
      const children = group.querySelectorAll('[data-searchable]');
      const anyVisible = Array.from(children).some(
        (child) => (child as HTMLElement).style.display !== 'none'
      );
      (group as HTMLElement).style.display = anyVisible ? '' : 'none';
    });

    let noResults = containerRef.current.querySelector('[data-no-results]');
    if (visible === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.setAttribute('data-no-results', 'true');
        noResults.className = 'text-center py-12 text-muted-foreground text-sm';
        const msgP = document.createElement('p');
        msgP.className = 'font-medium';
        msgP.textContent = `No results found for "${trimmed}"`;
        noResults.appendChild(msgP);
        const hintP = document.createElement('p');
        hintP.className = 'text-xs mt-1';
        hintP.textContent = 'Try a different search term.';
        noResults.appendChild(hintP);
        containerRef.current.appendChild(noResults);
      }
    } else if (noResults) {
      noResults.remove();
    }

    setMatchCount(visible);
  }, [containerRef, clearHighlights, highlightText]);

  useEffect(() => {
    const timeout = setTimeout(() => filterItems(query), 150);
    return () => clearTimeout(timeout);
  }, [query, filterItems]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!containerRef.current) return;
      clearHighlights(containerRef.current);
      const items = containerRef.current.querySelectorAll('[data-searchable]');
      items.forEach((item) => {
        (item as HTMLElement).style.display = '';
      });
      const groups = containerRef.current.querySelectorAll('[data-search-group]');
      groups.forEach((group) => {
        (group as HTMLElement).style.display = '';
      });
      const noResults = containerRef.current.querySelector('[data-no-results]');
      if (noResults) noResults.remove();
    };
  }, [containerRef, clearHighlights]);

  const handleClear = () => {
    setQuery('');
    filterItems('');
  };

  return (
    <div data-section-search className="relative flex items-center gap-3 w-full sm:max-w-md">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9 pl-9 pr-16 text-xs rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
        />
        {query && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {matchCount !== null && (
              <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
                {matchCount} found
              </span>
            )}
            <button onClick={handleClear} className="p-0.5 hover:bg-muted rounded transition-colors" title="Clear">
              <X size={12} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSearch;
