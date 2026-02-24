import { useState, useEffect } from 'react';
import {
  CreditCard, AlertTriangle, Shield, FileText, ChevronRight,
  ExternalLink, Clock, Info, Scale
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

const refundExceptions = [
  { title: 'Visa Refusal', desc: 'If your UK Student Visa application is rejected by the Home Office (unless the refusal is due to fraudulent documents or a breach of immigration rules).' },
  { title: 'Course Cancellation', desc: 'In the rare event that the institute cancels the scheduled course.' },
];

const refundProcedure = [
  { step: 1, title: 'Evidence Required', desc: 'Submit the official Refusal Letter (GV30) from the Home Office to the International Office within 7 days of the decision.' },
  { step: 2, title: 'Administrative Fee', desc: 'If approved, the institute retains a 60% administrative fee from the initial deposit.' },
  { step: 3, title: 'Processing Time', desc: 'The remaining 40% will be refunded to the original bank account within six months of approval.' },
];

const RefundPolicySection = () => {
  const oxfordTime = useOxfordClock();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
            alt="Finance"
          />
        </div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/30 w-fit">
              <Scale size={12} />
              Financial Policy
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-white/5 rounded-full px-3 py-1.5 border border-white/10 w-fit">
              <Clock size={10} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">UK Live:</span>
              <span className="font-mono">{oxfordTime}</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
            OSCT Tuition Fee <br />
            <span className="text-amber-400">Refund Policy</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            The deposit paid to secure your admission at the Oxford Skills Center of Technology is generally non-refundable, as it covers the administrative costs of processing your application and issuing a CAS.
          </p>
        </div>
      </div>

      {/* Policy Overview */}
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/5 to-transparent p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Policy Overview</h2>
              <p className="text-xs text-muted-foreground">Understanding the OSCT deposit and refund terms</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3">
            <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
              The tuition fee deposit is <strong>generally non-refundable</strong>. It covers application processing, document verification, and CAS issuance costs.
            </p>
          </div>
          <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-3">
            <Info size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
              This policy applies to all international students who have been issued a Conditional or Unconditional Offer by the Oxford Skills Center of Technology LTD.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Policy Exceptions */}
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Policy Exceptions</h2>
              <p className="text-xs text-muted-foreground">Circumstances where a refund may be considered</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A refund may only be considered under the following specific circumstances:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {refundExceptions.map((ex, i) => (
              <div key={i} className="flex items-start gap-3 bg-muted/30 border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <ChevronRight size={14} className="text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-foreground mb-0.5">{ex.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{ex.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refund Procedure */}
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Refund Procedure</h2>
              <p className="text-xs text-muted-foreground">Step-by-step process for requesting a refund</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="space-y-3">
            {refundProcedure.map((step) => (
              <div key={step.step} className="flex items-start gap-3 bg-muted/30 rounded-lg p-4 border border-border">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {step.step}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-foreground mb-0.5">{step.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
        <AlertTriangle size={16} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xs font-bold text-red-700 dark:text-red-300 mb-1">Important Notice</h3>
          <p className="text-[11px] text-red-700 dark:text-red-300 leading-relaxed">
            Refunds will <strong>not</strong> be granted if a student arrives in the UK but fails to enroll, or if a student withdraws their application after the CAS has been used.
          </p>
        </div>
      </div>

      {/* Contact */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">
            For any queries regarding the Refund Policy, please contact:{' '}
            <a
              href="mailto:support@oxfordskillscenter.co.uk"
              className="text-primary hover:underline font-semibold inline-flex items-center gap-1 break-all"
            >
              support@oxfordskillscenter.co.uk
              <ExternalLink size={9} className="shrink-0" />
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundPolicySection;
