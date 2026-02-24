import { useRef } from 'react';
import { Headphones, MessageCircle, Phone, Mail, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const channels = [
  { title: 'Live Chat', desc: 'Instant support via web chat during business hours. Average response: 2 minutes.', icon: MessageCircle, color: 'text-rose-600', bg: 'bg-rose-50', availability: 'Mon–Fri 08:00–20:00' },
  { title: 'Email Support', desc: 'Send detailed enquiries to our support team. Responses within 24 hours.', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50', availability: '24/7 (response Mon–Fri)' },
  { title: 'Phone Support', desc: 'Speak directly with a support agent for urgent technical issues.', icon: Phone, color: 'text-emerald-600', bg: 'bg-emerald-50', availability: 'Mon–Fri 09:00–17:00' },
  { title: 'Self-Service Portal', desc: 'Browse FAQs, knowledge base articles, and troubleshooting guides.', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', availability: 'Available 24/7' },
];

const commonIssues = [
  'Password reset and account recovery',
  'Wi-Fi connectivity on campus',
  'LMS access and submission issues',
  'Email configuration on mobile devices',
  'Printer setup and driver installation',
  'VPN access for off-campus resources',
  'Software licence activation',
  'Student ID card issues',
];

const SupportDeskPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Headphones size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">IT Support Desk</h1>
              <p className="text-rose-100 mt-1">Technical & Administrative Support</p>
            </div>
          </div>
          <p className="text-rose-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Need help? Our dedicated support team is here to assist with IT issues, account queries, and administrative requests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search support topics…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {channels.map((c) => (
            <div key={c.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`p-2 ${c.bg} rounded-lg ${c.color} group-hover:scale-105 transition-transform shrink-0`}><c.icon size={20} /></div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-primary"><Clock size={10} /> {c.availability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Common Issues We Resolve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {commonIssues.map((issue) => (
              <div key={issue} data-searchable className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg text-xs text-foreground">
                <CheckCircle size={12} className="text-emerald-500 shrink-0" /> {issue}
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">Emergency IT Contact</h3>
            <p className="text-muted-foreground text-xs mt-1">For critical system outages outside business hours, contact the emergency IT line: <strong>+44 7782 274482 ext. 999</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDeskPage;
