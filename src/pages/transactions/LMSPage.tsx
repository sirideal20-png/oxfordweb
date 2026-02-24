import { useRef } from 'react';
import { Monitor, BookOpen, Video, MessageCircle, FileText, Clock, Upload, Users, CheckCircle } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const features = [
  { title: 'Course Materials', desc: 'Access lecture slides, handouts, reading lists, and supplementary resources for all enrolled modules.', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
  { title: 'Video Lectures', desc: 'Watch recorded lectures, tutorials, and guest speaker sessions on-demand.', icon: Video, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'Discussion Forums', desc: 'Engage with classmates and lecturers in module-specific discussion boards.', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Assignment Submission', desc: 'Submit coursework, essays, and projects with Turnitin plagiarism checking integration.', icon: Upload, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Online Quizzes', desc: 'Take timed assessments, practice tests, and formative quizzes set by your lecturers.', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Group Workspaces', desc: 'Collaborate on group projects with shared documents, wikis, and peer review tools.', icon: Users, color: 'text-pink-600', bg: 'bg-pink-50' },
];

const LMSPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Monitor size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Learning Management System</h1>
              <p className="text-orange-100 mt-1">Your Digital Classroom at OSCT</p>
            </div>
          </div>
          <p className="text-orange-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Access course materials, submit assignments, participate in discussions, and track your academic progress — all from one unified platform.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search LMS features…" />

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

        {/* System Requirements */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">System Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Browser', value: 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+' },
              { label: 'Internet', value: 'Minimum 5 Mbps for video streaming' },
              { label: 'Mobile', value: 'iOS 14+ / Android 10+ (LMS Mobile App available)' },
              { label: 'Plugins', value: 'No additional plugins required; HTML5 compatible' },
            ].map((r) => (
              <div key={r.label} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-foreground">{r.label}</p>
                <p className="text-muted-foreground mt-0.5">{r.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Clock size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">LMS Support</h3>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">For technical issues with the LMS, contact IT Support at <strong>support@oxfordskillscenter.co.uk</strong>. Live chat available Mon–Fri 08:00–20:00 GMT.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSPage;
