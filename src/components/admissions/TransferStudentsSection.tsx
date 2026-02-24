import { ArrowLeftRight, FileText, GraduationCap, AlertTriangle, CheckCircle, Clock, Shield, Globe, Users, ArrowRight } from 'lucide-react';
import { useOxfordClock } from '@/hooks/useOxfordTime';
import { Card, CardContent } from '@/components/ui/card';

const TransferStudentsSection = () => {
  const ukTime = useOxfordClock();

  return (
    <div className="space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Student Mobility"
          />
        </div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
              <ArrowLeftRight size={12} />
              Student Mobility
            </div>
            <div className="text-[10px] text-slate-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/10">
              Oxford, UK — {ukTime}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
            Student Mobility &<br />
            <span className="text-emerald-400">Transfer Policy</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            This policy outlines the regulations and procedures for students moving between institutions. We facilitate academic mobility while ensuring full compliance with the UK's Credit Accumulation and Transfer Scheme (CATS) and UKVI Student Visa regulations.
          </p>
        </div>
      </div>

      {/* Section 1: Incoming Transfers */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-600">
            <Users size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Section 1: Incoming Transfers</h2>
            <p className="text-xs text-muted-foreground">Joining OSCT from another institution</p>
          </div>
        </div>

        <Card className="border-emerald-200/50 bg-emerald-50/30">
          <CardContent className="p-4 md:p-5">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We welcome students from recognized global institutions who wish to complete their education with us.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: GraduationCap,
                  title: 'Recognition of Prior Learning (RPL)',
                  desc: 'OSCT evaluates previous academic credits to grant exemptions. If you have completed a year of study (Level 4) at another institution, you may be eligible for Advanced Standing entry into Year 2 (Level 5).',
                  color: 'text-emerald-600 bg-emerald-100',
                },
                {
                  icon: FileText,
                  title: 'Documentation Requirement',
                  desc: 'Applicants must submit official Academic Transcripts and Module Specifications (Syllabus) from their previous institution for credit mapping.',
                  color: 'text-blue-600 bg-blue-100',
                },
                {
                  icon: CheckCircle,
                  title: 'Credit Limits',
                  desc: 'To maintain the integrity of our awards, transfer students must complete a minimum of 50% of their total degree credits at OSCT to graduate with our qualification.',
                  color: 'text-amber-600 bg-amber-100',
                },
                {
                  icon: Globe,
                  title: 'UKVI Compliance',
                  desc: 'International students cannot "transfer" an existing visa. Upon acceptance, OSCT will issue a new CAS, and the student must apply for a new UK Student Visa before commencement.',
                  color: 'text-purple-600 bg-purple-100',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg border border-border p-4 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${item.color}`}>
                      <item.icon size={14} />
                    </div>
                    <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 2: Outgoing Transfers */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-600">
            <ArrowRight size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Section 2: Outgoing Transfers</h2>
            <p className="text-xs text-muted-foreground">Leaving OSCT for another institution</p>
          </div>
        </div>

        <Card className="border-blue-200/50 bg-blue-50/30">
          <CardContent className="p-4 md:p-5">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We support the continued growth of our students, even if their journey leads them to another institution.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: FileText,
                  title: 'Academic Records',
                  desc: 'Upon request, OSCT will issue an Official Interim Transcript and a Letter of Good Standing detailing all credits (CATS points) earned during your enrollment.',
                  step: '01',
                },
                {
                  icon: GraduationCap,
                  title: 'Module Descriptions',
                  desc: 'We provide detailed syllabi to your new institution to assist them in mapping your credits for exemptions.',
                  step: '02',
                },
                {
                  icon: Clock,
                  title: 'Withdrawal Procedure',
                  desc: 'Students must submit a Formal Withdrawal Form at least 30 days before the end of the current academic term.',
                  step: '03',
                },
                {
                  icon: Shield,
                  title: 'Financial Clearance',
                  desc: 'All outstanding tuition fees and administrative charges must be cleared before academic records or transfer letters are released.',
                  step: '04',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-lg border border-border p-4 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                    {item.step}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <item.icon size={13} className="text-blue-600 shrink-0" />
                      <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Legal Notice */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 rounded-lg text-red-600">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground">Section 3: Important Legal Notice</h2>
            <p className="text-xs text-muted-foreground">For international students on a UK Student Visa</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-5 space-y-4">
          <p className="text-sm text-red-800/80 leading-relaxed font-medium">
            Student mobility for those on a UK Student Visa is a regulated legal process.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-white rounded-lg border border-red-200/60 p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-red-100 text-red-600">
                  <Shield size={14} />
                </div>
                <h4 className="text-xs font-bold text-red-900">Sponsorship Withdrawal</h4>
              </div>
              <p className="text-[11px] text-red-800/70 leading-relaxed">
                If a student leaves OSCT, we are legally mandated to report the Withdrawal of Sponsorship to the UK Home Office.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-red-200/60 p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-red-100 text-red-600">
                  <Clock size={14} />
                </div>
                <h4 className="text-xs font-bold text-red-900">Visa Curtailment</h4>
              </div>
              <p className="text-[11px] text-red-800/70 leading-relaxed">
                Once reported, the Home Office typically curtails (shortens) the existing visa to 60 days. Students must ensure their new institution issues a CAS and they file a new visa application within this window to remain in the UK legally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-slate-900 rounded-xl p-5 text-white">
        <h4 className="font-bold text-sm mb-2">Need Transfer Guidance?</h4>
        <p className="text-xs text-slate-400 mb-3">Our admissions team can help you with credit mapping and transfer procedures.</p>
        <div className="flex flex-col sm:flex-row gap-3 text-xs">
          <a href="mailto:admissions@oxfordskillscenter.co.uk" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 px-4 rounded transition-colors">
            Contact Admissions
          </a>
          <a href="mailto:international@oxfordskillscenter.co.uk" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded border border-white/20 transition-colors">
            International Office
          </a>
        </div>
      </div>
    </div>
  );
};

export default TransferStudentsSection;
