import { useRef } from 'react';
import { FileText, Download, Clock, CheckCircle, CreditCard, AlertCircle, Shield } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const documents = [
  { name: 'Official Transcript', time: '5–7 working days', fee: '£25', desc: 'Certified academic record with institutional stamp and seal.' },
  { name: 'Degree Certificate', time: '10–15 working days', fee: '£50', desc: 'Replacement or additional copy of your degree parchment.' },
  { name: 'Enrolment Letter', time: '2–3 working days', fee: 'Free', desc: 'Confirmation of current student status for visas, banks, or employers.' },
  { name: 'Module Completion Letter', time: '3–5 working days', fee: '£10', desc: 'Proof of individual module completion for transfer credits.' },
  { name: 'Character Reference', time: '5–7 working days', fee: '£15', desc: 'Official character reference letter from the institution.' },
  { name: 'Graduation Confirmation', time: '2–3 working days', fee: 'Free', desc: 'Letter confirming graduation date and degree classification.' },
];

const DocumentAppPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><FileText size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Document Application</h1>
              <p className="text-slate-200 mt-1">Transcripts, Certificates & Official Letters</p>
            </div>
          </div>
          <p className="text-slate-200 max-w-2xl mt-4 text-sm leading-relaxed">
            Request official academic documents, transcripts, and certificates. All documents are verified and carry the OSCT institutional seal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search documents…" />

        <div className="space-y-3">
          {documents.map((d) => (
            <div key={d.name} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{d.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{d.desc}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={10} /> {d.time}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-foreground"><CreditCard size={10} /> {d.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">How to Apply</h2>
          <div className="space-y-2 text-xs">
            {[
              'Log in to the Student Portal and navigate to "Documents" section.',
              'Select the document type and provide required details.',
              'Pay the applicable fee online (if any).',
              'Track your request status via the portal dashboard.',
              'Collect from the Registry Office or receive by post (UK: free, International: £8).',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                <p className="text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
          <Shield size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">All documents are verified using OSCT's Digital Verification System. Employers and institutions can verify document authenticity at <strong>verify.oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentAppPage;
