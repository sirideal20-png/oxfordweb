import { useRef } from 'react';
import { BookOpen, Search, Clock, Calendar, MapPin, Wifi, Coffee, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const services = [
  { title: 'Catalogue Search', desc: 'Search over 250,000 titles across physical and digital collections.', icon: Search },
  { title: 'Book Reservations', desc: 'Reserve titles online and collect from the self-service desk.', icon: Calendar },
  { title: 'Inter-Library Loans', desc: 'Request materials from partner libraries across the UK.', icon: BookOpen },
  { title: 'Study Room Booking', desc: 'Book individual or group study rooms up to 2 weeks in advance.', icon: MapPin },
];

const stats = [
  { label: 'Physical Books', value: '180,000+' },
  { label: 'e-Journals', value: '45,000+' },
  { label: 'Study Seats', value: '850' },
  { label: 'Group Rooms', value: '24' },
];

const LibraryPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><BookOpen size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Library Services</h1>
              <p className="text-indigo-100 mt-1">Catalogue Search, Reservations & Study Spaces</p>
            </div>
          </div>
          <p className="text-indigo-100 max-w-2xl mt-4 text-sm leading-relaxed">
            The OSCT Central Library serves as the academic heart of campus, providing access to world-class resources, quiet study spaces, and collaborative environments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search library services…" />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} data-searchable className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-600 group-hover:scale-105 transition-transform"><s.icon size={20} /></div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Opening Hours */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Clock size={18} className="text-primary" /> Opening Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-bold text-foreground">Term Time</p>
              <p className="text-muted-foreground mt-1">Mon–Fri: 07:00–23:00</p>
              <p className="text-muted-foreground">Sat–Sun: 09:00–21:00</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-bold text-foreground">Vacation</p>
              <p className="text-muted-foreground mt-1">Mon–Fri: 09:00–17:00</p>
              <p className="text-muted-foreground">Sat–Sun: Closed</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-bold text-foreground">24/7 Zone</p>
              <p className="text-muted-foreground mt-1">Ground floor study area</p>
              <p className="text-muted-foreground">Card access required</p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Free Wi-Fi', icon: Wifi },
              { label: 'Café', icon: Coffee },
              { label: 'Printing', icon: BookOpen },
              { label: 'Accessibility', icon: MapPin },
            ].map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs text-foreground">
                <f.icon size={12} className="text-primary" /> {f.label}
              </span>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Location: Central Campus, Building C. Contact: <strong><p className="text-muted-foreground text-xs leading-relaxed">Location: Central Campus, Building C. Contact: <strong>support@oxfordskillscenter.co.uk</strong> | <strong>+44 7782 274482 ext. 201</strong></p></strong> | <strong>+44 7782 274482 ext. 201</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
