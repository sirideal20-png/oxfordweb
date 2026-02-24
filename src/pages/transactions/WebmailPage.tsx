import { useRef } from 'react';
import { Mail, Shield, Smartphone, HardDrive, Settings, Info, AlertCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const features = [
  { title: 'Secure Email', desc: 'Enterprise-grade email with end-to-end encryption and spam filtering.', icon: Shield, color: 'text-sky-600', bg: 'bg-sky-50' },
  { title: 'Mobile Access', desc: 'Configure your OSCT email on iOS and Android devices using IMAP/SMTP.', icon: Smartphone, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: '15 GB Storage', desc: 'Generous mailbox quota with archiving support for older messages.', icon: HardDrive, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Calendar & Contacts', desc: 'Integrated calendar for scheduling and shared contact directories.', icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const WebmailPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-sky-500 to-cyan-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Mail size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">OSCT Webmail</h1>
              <p className="text-sky-100 mt-1">Student & Faculty Email Service</p>
            </div>
          </div>
          <p className="text-sky-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Your official OSCT email address (<strong>name@student.oxfordskillscenter.co.uk</strong>) is your primary channel for institutional communications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search webmail help…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`p-2 ${f.bg} rounded-lg ${f.color} group-hover:scale-105 transition-transform`}><f.icon size={20} /></div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email Settings */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Mail Client Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Incoming Server (IMAP)', value: 'imap.oxfordskillscenter.co.uk:993 (SSL)' },
              { label: 'Outgoing Server (SMTP)', value: 'smtp.oxfordskillscenter.co.uk:587 (TLS)' },
              { label: 'Username', value: 'Your full OSCT email address' },
              { label: 'Authentication', value: 'Password / OAuth 2.0' },
            ].map((r) => (
              <div key={r.label} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-foreground">{r.label}</p>
                <p className="text-muted-foreground mt-0.5 break-all">{r.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Your OSCT email remains active for 6 months after graduation. Download important emails and contacts before expiry. For password resets, visit the IT Self-Service portal or contact <strong>support@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default WebmailPage;
