import { useRef } from 'react';
import { Globe, BookOpen, Search, Database, FileText, Download, ExternalLink, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const databases = [
  { name: 'JSTOR', desc: 'Academic journals, books, and primary sources across disciplines.', subjects: 'All' },
  { name: 'IEEE Xplore', desc: 'Engineering, computer science, and technology publications.', subjects: 'Engineering, Computing' },
  { name: 'PubMed', desc: 'Biomedical and life sciences research literature.', subjects: 'Health Sciences' },
  { name: 'Scopus', desc: 'Abstract and citation database of peer-reviewed literature.', subjects: 'All' },
  { name: 'ProQuest', desc: 'Dissertations, theses, and scholarly publications.', subjects: 'All' },
  { name: 'Emerald Insight', desc: 'Management, business, and economics research.', subjects: 'Business, Law' },
  { name: 'LexisNexis', desc: 'Legal research, news, and business information.', subjects: 'Law' },
  { name: 'SpringerLink', desc: 'Scientific, technical, and medical publications.', subjects: 'Science, Health' },
];

const OnlineLibraryPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Globe size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Online Library</h1>
              <p className="text-cyan-100 mt-1">Digital Journals, e-Resources & Research Databases</p>
            </div>
          </div>
          <p className="text-cyan-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Access thousands of peer-reviewed journals, academic databases, and digital resources from anywhere using your OSCT credentials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search databases and resources…" />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Academic Databases', value: '50+' },
            { label: 'e-Journals', value: '45,000+' },
            { label: 'e-Books', value: '120,000+' },
            { label: 'Research Papers', value: '2M+' },
          ].map((s) => (
            <div key={s.label} data-searchable className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Databases */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Featured Databases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {databases.map((db) => (
              <div key={db.name} data-searchable className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{db.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{db.desc}</p>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 bg-muted/50 rounded text-[10px] text-muted-foreground">{db.subjects}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Off-campus access requires VPN connection or EZproxy authentication. Download the OSCT VPN client from the IT Self-Service portal. Contact <strong><p className="text-muted-foreground text-xs leading-relaxed">Off-campus access requires VPN connection or EZproxy authentication. Download the OSCT VPN client from the IT Self-Service portal. Contact <strong>support@oxfordskillscenter.co.uk</strong> for access issues.</p></strong> for access issues.</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineLibraryPage;
