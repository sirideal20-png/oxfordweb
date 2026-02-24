import { useRef } from 'react';
import { Home, Bed, Wifi, Shield, MapPin, CreditCard, Clock, Users, Info, AlertCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const residences = [
  { name: 'Thames Hall', type: 'Standard En-suite', price: '£145/week', capacity: 280, distance: '2 min walk', features: ['En-suite bathroom', 'Study desk', 'Wi-Fi included'] },
  { name: 'Bodleian House', type: 'Premium Studio', price: '£195/week', capacity: 120, distance: '5 min walk', features: ['Kitchenette', 'Double bed', 'Smart TV'] },
  { name: 'Radcliffe Court', type: 'Shared Flat (4-bed)', price: '£110/week', capacity: 340, distance: '3 min walk', features: ['Shared kitchen', 'Common lounge', 'Laundry room'] },
  { name: 'Ashmolean Lodge', type: 'Postgraduate Suite', price: '£175/week', capacity: 80, distance: '7 min walk', features: ['Private kitchen', 'Living area', 'Quiet zone'] },
];

const AccommodationPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Home size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Accommodation</h1>
              <p className="text-indigo-100 mt-1">On-Campus Housing & Hostel Allotment Portal</p>
            </div>
          </div>
          <p className="text-indigo-100 max-w-2xl mt-4 text-sm leading-relaxed">
            OSCT offers a range of on-campus accommodation options in the heart of Oxford. All residences are within walking distance of the main campus.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search accommodation options…" />

        {/* All Inclusive Banner */}
        <div data-searchable className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex items-start gap-4">
          <Shield size={22} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">All-Inclusive Living</h3>
            <p className="text-muted-foreground text-xs mt-1">All residences include utilities (electricity, water, heating), Wi-Fi, contents insurance, and 24/7 security. No hidden charges.</p>
          </div>
        </div>

        {/* Residences */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Our Residences</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {residences.map((r) => (
              <div key={r.name} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{r.name}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{r.type}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{r.price}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Users size={10} /> {r.capacity} rooms</span>
                  <span className="flex items-center gap-1"><MapPin size={10} /> {r.distance}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 bg-muted/50 rounded-full text-[10px] text-foreground">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Timeline */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Clock size={18} className="text-primary" /> Application Timeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              { date: '1 Mar 2026', event: 'Applications open' },
              { date: '30 Apr 2026', event: 'Priority deadline (offer holders)' },
              { date: '15 Jun 2026', event: 'Room allocation released' },
              { date: '1 Sep 2026', event: 'Move-in day' },
            ].map((d) => (
              <div key={d.event} className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="font-bold text-primary">{d.date}</p>
                <p className="text-muted-foreground mt-0.5">{d.event}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Accommodation is guaranteed for all first-year international students who apply by the priority deadline. Contact the Accommodation Office: <strong>support@oxfordskillscenter.co.uk</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;
