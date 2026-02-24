import { useState, useEffect } from 'react';
import {
  Globe, FileText, CheckCircle2,
  Mail, Clock, Shield, Landmark, Plane, BookOpen,
  Info
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const useOxfordClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleString('en-GB', { timeZone: 'Europe/London', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const requiredDocs = [
  { icon: FileText, title: 'Valid Passport', desc: 'Must have at least one blank page for the visa sticker (vignette).' },
  { icon: BookOpen, title: 'CAS Number', desc: 'Issued by OSCT once the deposit is paid.' },
  { icon: Landmark, title: 'Financial Evidence', desc: 'Original bank statements showing remaining tuition fees plus living costs (approx. £1,023–£1,334/month) held for at least 28 consecutive days.' },
  { icon: FileText, title: 'Academic Credentials', desc: 'Original certificates and transcripts listed on your CAS statement.' },
  { icon: Shield, title: 'TB Test Certificate', desc: 'Required for residents of specific countries (including Pakistan).' },
  { icon: Globe, title: 'English Proficiency', desc: 'Proof of English level (IELTS for UKVI or internal ELPA results if noted on your CAS).' },
];

const VisaApplicationsSection = () => {
  const oxfordTime = useOxfordClock();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="UK Skyline"
          />
        </div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/30 w-fit">
              <Globe size={12} />
              UK Immigration Guidance
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-white/5 rounded-full px-3 py-1.5 border border-white/10 w-fit">
              <Clock size={10} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">UK Live:</span>
              <span className="font-mono">{oxfordTime}</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
            UK Student Visa <br />
            <span className="text-blue-400">Applications</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            According to the United Kingdom's Immigration Rules and Home Office regulations,
            most international students applying to study at the Oxford Skills Center of Technology LTD
            will require a Student Visa to enter and remain in the UK.
          </p>
        </div>
      </div>

      {/* CAS & Visa Process */}
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Plane size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">The CAS & Visa Process</h2>
              <p className="text-xs text-muted-foreground">Steps to obtain your Confirmation of Acceptance for Studies</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Before you can apply for your visa, you must obtain a <strong className="text-foreground">Confirmation of Acceptance for Studies (CAS)</strong>.
            To receive your CAS, you are required to pay the initial tuition fee deposit as specified in your Conditional Offer Letter.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Landmark size={14} className="text-primary shrink-0" />
                <h3 className="text-xs font-bold text-foreground">Bank Transfer Requirements</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When making your payment, you must include your <strong className="text-foreground">Full Name</strong> and <strong className="text-foreground">Passport Number</strong> as the payment reference.
              </p>
            </div>
            <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <h3 className="text-xs font-bold text-foreground">Payment Confirmation</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Email a copy of your bank receipt to{' '}
                <a href="mailto:international@oxfordskillscenter.co.uk" className="text-primary hover:underline font-semibold break-all">
                  international@oxfordskillscenter.co.uk
                </a>.
                Upon verification, we'll issue your Unconditional Letter followed by your CAS Statement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-3">
            <Info size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
              Your CAS contains the unique reference number needed for your visa application. Keep it safe and do not share it publicly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Required Documents</h2>
              <p className="text-xs text-muted-foreground">Documents needed when applying at a UK Visa Application Centre</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            When applying at a UK Visa Application Centre (<strong className="text-foreground">VFS Global</strong> or <strong className="text-foreground">TLScontact</strong>) in your home country, you must typically provide:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {requiredDocs.map((doc, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-muted/30 border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
              >
                <div className="p-1.5 bg-primary/10 rounded-md text-primary shrink-0 mt-0.5">
                  <doc.icon size={14} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-foreground mb-0.5">{doc.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisaApplicationsSection;
