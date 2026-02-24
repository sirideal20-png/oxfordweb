import { useRef } from 'react';
import { BookOpen, FileText, Users, Shield, Heart, GraduationCap, Globe, MapPin, CheckCircle, Info, Download } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const chapters = [
  { title: 'Welcome & Introduction', desc: 'Overview of OSCT\'s mission, values, history, and campus facilities. A guide to navigating your first weeks.', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50', pages: '1–18' },
  { title: 'Academic Policies', desc: 'Module registration, credit requirements, assessment rules, grading criteria, and academic integrity standards.', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', pages: '19–42' },
  { title: 'Student Support Services', desc: 'Counselling, disability support, financial aid office, careers service, and chaplaincy contacts.', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', pages: '43–58' },
  { title: 'Rights & Responsibilities', desc: 'Student charter, code of conduct, complaints procedure, disciplinary framework, and appeals process.', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50', pages: '59–76' },
  { title: 'Campus Life & Facilities', desc: 'Library, sports centre, dining, accommodation, societies, and transport information.', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50', pages: '77–94' },
  { title: 'International Students', desc: 'Visa compliance, English language support, cultural adjustment, UK banking, NHS registration, and travel guidance.', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50', pages: '95–112' },
  { title: 'Health, Safety & Wellbeing', desc: 'Emergency procedures, mental health resources, substance abuse policy, and personal safety advice.', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50', pages: '113–126' },
  { title: 'Graduation & Beyond', desc: 'Degree classification, graduation ceremony, alumni network, career transition support, and transcript requests.', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', pages: '127–140' },
];

const quickFacts = [
  { label: 'Handbook Edition', value: '2025–26' },
  { label: 'Total Pages', value: '140' },
  { label: 'Last Updated', value: 'Aug 2025' },
  { label: 'Available In', value: '3 Languages' },
];

const importantContacts = [
  { dept: 'Student Affairs', email: 'support@oxfordskillscenter.co.uk', phone: 'Ext. 101' },
  { dept: 'Academic Registry', email: 'support@oxfordskillscenter.co.uk', phone: 'Ext. 102' },
  { dept: 'Counselling Service', email: 'support@oxfordskillscenter.co.uk', phone: 'Ext. 201' },
  { dept: 'International Office', email: 'International@oxfordskillscenter.co.uk', phone: 'Ext. 301' },
  { dept: 'IT Support', email: 'support@oxfordskillscenter.co.uk', phone: 'Ext. 400' },
  { dept: 'Finance Office', email: 'support@oxfordskillscenter.co.uk', phone: 'Ext. 150' },
];

const StudentHandbookPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><BookOpen size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Student Handbook</h1>
              <p className="text-teal-100 mt-1">Your Comprehensive Guide to Life at OSCT</p>
            </div>
          </div>
          <p className="text-teal-100 max-w-2xl mt-4 text-sm leading-relaxed">
            The Student Handbook is your essential reference for everything you need to know about academic policies, campus services, your rights, and how to make the most of your time at Oxford Skills Center.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search handbook topics…" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickFacts.map((f) => (
            <div key={f.label} data-searchable className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{f.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Handbook Chapters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chapters.map((ch) => (
              <div key={ch.title} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${ch.bg} rounded-lg ${ch.color} group-hover:scale-105 transition-transform shrink-0`}><ch.icon size={20} /></div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{ch.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{ch.desc}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-muted/50 rounded text-[10px] text-muted-foreground">Pages {ch.pages}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Important Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {importantContacts.map((c) => (
              <div key={c.dept} className="p-3 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground text-xs">{c.dept}</h3>
                <p className="text-primary text-[10px] mt-1">{c.email}</p>
                <p className="text-muted-foreground text-[10px]">{c.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">The handbook is updated annually. Printed copies are available from Student Affairs (Room G12, Main Admin Building). Digital versions in English, Arabic, and Mandarin can be downloaded from the Student Portal. Suggestions for the next edition? Email <strong>support@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentHandbookPage;
