import { useRef } from 'react';
import { Database, BarChart, FileText, Award, TrendingUp, CheckCircle, Users, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const features = [
  { title: 'Grade Reports', desc: 'View your semester-by-semester grades, GPA calculations, and class rankings.', icon: BarChart, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Attendance Records', desc: 'Track your module attendance percentage and view flagged absences.', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Transcript Requests', desc: 'Request official and unofficial transcripts for employment or further education.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Programme Outcomes', desc: 'Monitor your progress against programme learning outcomes (PLOs).', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  { title: 'Honours & Awards', desc: 'View academic distinctions, Dean\'s List nominations, and merit awards.', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Peer Assessment', desc: 'Submit and view group project peer evaluations for collaborative modules.', icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const OBSPortalPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Database size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">OBS Portal</h1>
              <p className="text-purple-100 mt-1">Outcome Based System & Academic Results</p>
            </div>
          </div>
          <p className="text-purple-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Access your academic performance data, track learning outcomes, and manage your results through the Outcome Based System portal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search OBS features…" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center ${f.color} mb-3 group-hover:scale-105 transition-transform`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Grading Scale */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">OSCT Grading Scale</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Grade</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Percentage</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">GPA Points</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Classification</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: 'A+', pct: '90–100%', gpa: '4.0', cls: 'First Class Honours' },
                  { grade: 'A', pct: '80–89%', gpa: '3.7', cls: 'First Class Honours' },
                  { grade: 'B+', pct: '70–79%', gpa: '3.3', cls: 'Upper Second (2:1)' },
                  { grade: 'B', pct: '60–69%', gpa: '3.0', cls: 'Lower Second (2:2)' },
                  { grade: 'C+', pct: '50–59%', gpa: '2.3', cls: 'Third Class' },
                  { grade: 'C', pct: '40–49%', gpa: '2.0', cls: 'Pass' },
                  { grade: 'F', pct: 'Below 40%', gpa: '0.0', cls: 'Fail' },
                ].map((r) => (
                  <tr key={r.grade} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-3 font-bold text-foreground">{r.grade}</td>
                    <td className="py-2 px-3 text-muted-foreground">{r.pct}</td>
                    <td className="py-2 px-3 text-muted-foreground">{r.gpa}</td>
                    <td className="py-2 px-3 text-muted-foreground">{r.cls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Results are typically published within 15 working days of the examination period. For grade appeals, submit a formal request through the Academic Registry within 10 working days of publication.</p>
        </div>
      </div>
    </div>
  );
};

export default OBSPortalPage;
