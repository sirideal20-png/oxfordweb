import { useRef } from 'react';
import { Cloud, HardDrive, Shield, Share2, Upload, FolderOpen, Info, AlertCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const features = [
  { title: '50 GB Storage', desc: 'Every student receives 50 GB of secure cloud storage for academic files, projects, and personal documents.', icon: HardDrive, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'File Sharing', desc: 'Share files and folders with classmates and lecturers using secure shareable links.', icon: Share2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Auto-Backup', desc: 'Automatic backup of your LMS submissions, assignments, and project files.', icon: Upload, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Version History', desc: 'Access previous versions of your files for up to 90 days after modification.', icon: FolderOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
  { title: 'Encryption', desc: 'All files are encrypted at rest (AES-256) and in transit (TLS 1.3).', icon: Shield, color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: 'Cross-Platform', desc: 'Access your files from Windows, macOS, iOS, Android, and Linux.', icon: Cloud, color: 'text-sky-600', bg: 'bg-sky-50' },
];

const CloudSystemPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-blue-400 to-sky-500 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Cloud size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">OSCT Cloud</h1>
              <p className="text-blue-100 mt-1">Student File Storage & Collaboration</p>
            </div>
          </div>
          <p className="text-blue-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Your personal cloud workspace for storing, sharing, and collaborating on academic files securely.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search cloud features…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center ${f.color} mb-3 group-hover:scale-105 transition-transform`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Supported File Types</h2>
          <div className="flex flex-wrap gap-2">
            {['PDF', 'DOCX', 'XLSX', 'PPTX', 'JPG', 'PNG', 'MP4', 'ZIP', 'PSD', 'AI', 'DWG', 'PY', 'JAVA', 'CPP', 'HTML'].map((t) => (
              <span key={t} className="px-2.5 py-1 bg-muted/50 rounded-full text-[10px] font-bold text-foreground">{t}</span>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Cloud storage is available for the duration of your enrolment plus 3 months after graduation. Download all important files before your account expires. Maximum single file size: 2 GB.</p>
        </div>
      </div>
    </div>
  );
};

export default CloudSystemPage;
