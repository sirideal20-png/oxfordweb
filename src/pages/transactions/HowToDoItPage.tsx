import { useRef } from 'react';
import { HelpCircle, BookOpen, Video, FileText, Search, Monitor, CreditCard, UserPlus, Mail, Printer, Cloud, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const guides = [
  { title: 'How to Register for Modules', desc: 'Step-by-step guide to online course registration and module selection.', icon: UserPlus, category: 'Registration' },
  { title: 'How to Pay Tuition Fees', desc: 'Complete payment guide including card, bank transfer, and instalment options.', icon: CreditCard, category: 'Finance' },
  { title: 'How to Access the LMS', desc: 'Login instructions, troubleshooting, and mobile app setup for the learning platform.', icon: Monitor, category: 'Academic' },
  { title: 'How to Configure Email', desc: 'Set up your OSCT email on mobile, desktop, and third-party email clients.', icon: Mail, category: 'IT' },
  { title: 'How to Use Cloud Storage', desc: 'Upload, share, and manage your files in the OSCT Cloud system.', icon: Cloud, category: 'IT' },
  { title: 'How to Print on Campus', desc: 'Setup remote printing, top up your print balance, and locate printers.', icon: Printer, category: 'IT' },
  { title: 'How to Request Transcripts', desc: 'Apply for official and unofficial transcripts through the Document App.', icon: FileText, category: 'Documents' },
  { title: 'How to Apply for Accommodation', desc: 'Guide to booking on-campus housing, room selection, and lease agreements.', icon: BookOpen, category: 'Housing' },
  { title: 'How to Connect to Campus Wi-Fi', desc: 'Connect your devices to eduroam and the OSCT Guest network.', icon: Search, category: 'IT' },
  { title: 'How to Submit Assignments', desc: 'Upload coursework via the LMS with Turnitin plagiarism checking.', icon: Monitor, category: 'Academic' },
];

const HowToDoItPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><HelpCircle size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">How to Do It?</h1>
              <p className="text-yellow-100 mt-1">Guides, Tutorials & Step-by-Step Instructions</p>
            </div>
          </div>
          <p className="text-yellow-100 max-w-2xl mt-4 text-sm leading-relaxed">
            New to OSCT? Find easy-to-follow guides for everything from registration and payment to using campus IT services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search guides and tutorials…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((g) => (
            <div key={g.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded-lg text-amber-600 group-hover:scale-105 transition-transform shrink-0"><g.icon size={20} /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{g.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{g.desc}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-muted/50 rounded text-[10px] text-muted-foreground">{g.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Video size={18} className="text-primary" /> Video Tutorials</h2>
          <p className="text-muted-foreground text-xs leading-relaxed">Video walkthroughs are available for most guides. Look for the <strong>▶ Watch Video</strong> button within each guide. All tutorials are captioned and available in English.</p>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Can't find what you're looking for? Contact the IT Support Desk at <strong>support@oxfordskillscenter.co.uk</strong> or use the live chat feature during business hours.</p>
        </div>
      </div>
    </div>
  );
};

export default HowToDoItPage;
