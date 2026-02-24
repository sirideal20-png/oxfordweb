import { useRef } from 'react';
import { Printer, MapPin, CreditCard, Monitor, Smartphone, Info, AlertCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const printerLocations = [
  { location: 'Central Library — Ground Floor', printers: 8, type: 'B&W + Colour', hours: '07:00–23:00' },
  { location: 'Engineering Building — Room E102', printers: 4, type: 'B&W + Large Format', hours: '08:00–20:00' },
  { location: 'Student Hub — Level 1', printers: 6, type: 'B&W + Colour', hours: '24/7 (card access)' },
  { location: 'Business School — Room B204', printers: 3, type: 'B&W + Colour', hours: '08:00–18:00' },
  { location: 'Health Sciences — Lab Corridor', printers: 2, type: 'B&W only', hours: '08:00–17:00' },
];

const pricing = [
  { type: 'A4 Black & White', price: '£0.05' },
  { type: 'A4 Colour', price: '£0.15' },
  { type: 'A3 Black & White', price: '£0.10' },
  { type: 'A3 Colour', price: '£0.30' },
  { type: 'Large Format (A1/A0)', price: '£2.00–£5.00' },
];

const StudentPrinterPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Printer size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Student Printing</h1>
              <p className="text-gray-200 mt-1">Remote Printing, Top-Up & Printer Locations</p>
            </div>
          </div>
          <p className="text-gray-200 max-w-2xl mt-4 text-sm leading-relaxed">
            Print documents remotely from your laptop or phone. Collect your prints from any campus printer using your student ID card.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search printing info…" />

        {/* How It Works */}
        <div data-searchable>
          <h2 className="text-xl font-bold text-foreground mb-4">How Remote Printing Works</h2>
          <div className="space-y-2">
            {[
              'Upload your document via the web portal or email it to support@oxfordskillscenter.co.uk.',
              'Select print options: colour, paper size, number of copies, and duplex.',
              'Go to any campus printer and tap your student ID card.',
              'Your documents will print immediately. Uncollected prints are deleted after 24 hours.',
            ].map((s, i) => (
              <div key={i} data-searchable className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg text-xs">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                <p className="text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><CreditCard size={18} className="text-primary" /> Printing Costs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pricing.map((p) => (
              <div key={p.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-xs">
                <span className="text-foreground">{p.type}</span>
                <span className="font-bold text-primary">{p.price}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">Each student receives a £5 free print credit at the start of each semester. Top up online via the Student Portal.</p>
        </div>

        {/* Locations */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><MapPin size={18} className="text-primary" /> Printer Locations</h2>
          <div className="space-y-2">
            {printerLocations.map((l) => (
              <div key={l.location} data-searchable className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/50 rounded-lg text-xs gap-2">
                <div>
                  <p className="font-bold text-foreground">{l.location}</p>
                  <p className="text-muted-foreground">{l.type} • {l.hours}</p>
                </div>
                <span className="text-[10px] font-semibold text-primary">{l.printers} printers</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">For printer jams, toner issues, or driver installation help, contact the IT Support Desk. The mobile printing app is available for <strong>iOS</strong> and <strong>Android</strong> — search "OSCT Print" in your app store.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPrinterPage;
