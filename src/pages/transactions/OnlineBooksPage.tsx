import { useRef } from 'react';
import { BookOpen, Download, Search, Star, Monitor, Smartphone, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const categories = [
  { name: 'Engineering & Technology', count: 8500, color: 'bg-blue-500' },
  { name: 'Computing & AI', count: 6200, color: 'bg-purple-500' },
  { name: 'Health Sciences', count: 5800, color: 'bg-rose-500' },
  { name: 'Business & Management', count: 7100, color: 'bg-amber-500' },
  { name: 'Law & Policy', count: 3200, color: 'bg-slate-500' },
  { name: 'Agriculture & Environment', count: 2900, color: 'bg-green-500' },
  { name: 'Arts & Design', count: 4100, color: 'bg-pink-500' },
  { name: 'Languages & Literature', count: 3800, color: 'bg-orange-500' },
];

const features = [
  { title: 'Offline Reading', desc: 'Download eBooks for offline access on up to 3 devices simultaneously.', icon: Download },
  { title: 'Smart Search', desc: 'Full-text search across all eBooks with highlighted results and bookmarks.', icon: Search },
  { title: 'Desktop Reader', desc: 'Read on your laptop or desktop with our web-based reader. No software needed.', icon: Monitor },
  { title: 'Mobile App', desc: 'Read on the go with the OSCT Library app for iOS and Android.', icon: Smartphone },
];

const OnlineBooksPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><BookOpen size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Online Books</h1>
              <p className="text-teal-100 mt-1">Course eBooks & Digital Textbooks</p>
            </div>
          </div>
          <p className="text-teal-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Access your course textbooks and recommended reading digitally. Over 40,000 eBooks available across all programmes offered at OSCT.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search books and subjects…" />

        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Browse by Subject</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((c) => (
              <div key={c.name} data-searchable className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${c.color} shrink-0`} />
                  <div>
                    <h3 className="font-bold text-foreground text-xs group-hover:text-primary transition-colors">{c.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{c.count.toLocaleString()} titles</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 dark:bg-teal-950/50 rounded-lg text-teal-600 group-hover:scale-105 transition-transform"><f.icon size={20} /></div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{f.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">eBook access is tied to your active enrolment. Some publisher restrictions may limit concurrent users. If a title is unavailable, join the waitlist and you'll be notified when a licence becomes free.</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineBooksPage;
