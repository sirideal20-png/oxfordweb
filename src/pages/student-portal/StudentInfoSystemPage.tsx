import { useRef } from 'react';
import { Database, User, BarChart, FileText, Bell, Shield, Settings, Info } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const features = [
  { title: 'Personal Profile', desc: 'View and update your personal details, contact information, emergency contacts, and passport photo.', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Academic Records', desc: 'Access your complete academic history including grades, GPA, credits earned, and programme progression.', icon: BarChart, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Attendance Tracker', desc: 'Monitor your module attendance rates. Falling below 80% triggers an automatic advisory notification.', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Notifications Centre', desc: 'Receive important alerts about registration deadlines, grade publications, and institutional announcements.', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Privacy & Security', desc: 'Manage two-factor authentication, login history, active sessions, and data sharing preferences.', icon: Shield, color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: 'Account Settings', desc: 'Change your password, update email preferences, and manage linked accounts and devices.', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50' },
];

const quickActions = [
  'Download unofficial transcript',
  'Update contact details',
  'View class timetable',
  'Check module registration status',
  'Request enrolment verification letter',
  'View financial holds',
];

const StudentInfoSystemPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Database size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Student Info System</h1>
              <p className="text-purple-100 mt-1">Your Complete Academic & Personal Profile</p>
            </div>
          </div>
          <p className="text-purple-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Access and manage your academic records, personal information, attendance data, and account settings all in one centralised portal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search student info…" />

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

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <div key={action} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-xs text-foreground hover:bg-primary/5 cursor-pointer transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {action}
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Your student information is protected under the UK Data Protection Act 2018 and GDPR. Only authorised staff can access your records. For data access requests, contact <strong>support@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoSystemPage;
