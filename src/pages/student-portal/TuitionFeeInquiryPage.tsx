import { useRef } from 'react';
import { CreditCard, PoundSterling, FileText, Calendar, CheckCircle, AlertCircle, Info, TrendingDown } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const feeCategories = [
  { programme: 'Undergraduate (Home)', annual: '£9,250', perCredit: '£77.08', status: 'Standard' },
  { programme: 'Undergraduate (International)', annual: '£18,500', perCredit: '£154.17', status: 'Standard' },
  { programme: 'Postgraduate Taught (Home)', annual: '£11,800', perCredit: '£98.33', status: 'Standard' },
  { programme: 'Postgraduate Taught (International)', annual: '£22,400', perCredit: '£186.67', status: 'Standard' },
  { programme: 'Doctoral Research (Home)', annual: '£4,786', perCredit: 'N/A', status: 'Standard' },
  { programme: 'Doctoral Research (International)', annual: '£19,200', perCredit: 'N/A', status: 'Standard' },
];

const paymentMethods = [
  { method: 'Online Payment Portal', desc: 'Pay securely using debit/credit card or bank transfer via the OSCT payment gateway.', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
  { method: 'Direct Debit', desc: 'Set up automatic monthly payments. Complete the DD mandate form at the Finance Office.', icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { method: 'Student Loans Company', desc: 'UK home students can apply for tuition fee loans through Student Finance England/Wales/Scotland.', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  { method: 'Sponsor/Employer Payment', desc: 'Submit an official sponsorship letter. Invoice will be sent directly to your sponsor.', icon: PoundSterling, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const deadlines = [
  { term: 'Autumn Semester', deadline: '15 September 2025', amount: '50% of annual fee' },
  { term: 'Spring Semester', deadline: '15 January 2026', amount: '50% of annual fee' },
  { term: 'Late Payment Surcharge', deadline: '30 days after deadline', amount: '£150 admin fee' },
  { term: 'Instalment Plan Application', deadline: '1 September 2025', amount: 'Monthly from Oct–Jun' },
];

const TuitionFeeInquiryPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><CreditCard size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Tuition Fee Inquiry</h1>
              <p className="text-emerald-100 mt-1">Balance, Payment History & Fee Schedules</p>
            </div>
          </div>
          <p className="text-emerald-100 max-w-2xl mt-4 text-sm leading-relaxed">
            View your current fee balance, track payment history, explore payment options, and understand the tuition fee structure for all programme levels.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search fee information…" />

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Tuition Fee Schedule 2025–26</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Programme Level</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Annual Fee</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Per Credit</th>
                </tr>
              </thead>
              <tbody>
                {feeCategories.map((f) => (
                  <tr key={f.programme} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">{f.programme}</td>
                    <td className="py-2.5 px-3 text-primary font-bold">{f.annual}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{f.perCredit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((m) => (
              <div key={m.method} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${m.bg} rounded-lg ${m.color} group-hover:scale-105 transition-transform shrink-0`}><m.icon size={20} /></div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{m.method}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Payment Deadlines</h2>
          <div className="space-y-2">
            {deadlines.map((d) => (
              <div key={d.term} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                <div>
                  <p className="font-bold text-foreground text-xs">{d.term}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{d.amount}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{d.deadline}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Outstanding fees may result in a hold on your account, preventing registration, transcript requests, and graduation. Contact the Finance Office at <strong>support@oxfordskillscenter.co.uk</strong> or call <strong>+44 7782 274482</strong> to discuss payment arrangements.</p>
        </div>
      </div>
    </div>
  );
};

export default TuitionFeeInquiryPage;
