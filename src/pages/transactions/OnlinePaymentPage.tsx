import { useRef } from 'react';
import { CreditCard, Shield, Clock, CheckCircle, AlertCircle, Banknote, Globe, Smartphone } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const paymentMethods = [
  { name: 'Debit / Credit Card', desc: 'Visa, Mastercard, American Express accepted. Processed securely via our PCI-DSS compliant gateway.', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Bank Transfer (BACS)', desc: 'Transfer directly to the OSCT bank account. Allow 2–3 working days for processing.', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'International Wire', desc: 'For overseas students. SWIFT/IBAN details provided upon fee assessment.', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Mobile Payment', desc: 'Apple Pay and Google Pay supported for quick contactless transactions.', icon: Smartphone, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const feeCategories = [
  { category: 'Tuition Fees', desc: 'Full-time and part-time programme tuition' },
  { category: 'Hostel / Accommodation', desc: 'On-campus residence fees' },
  { category: 'Examination Fees', desc: 'Retake, supplementary, and external exam fees' },
  { category: 'Library Fines', desc: 'Overdue book charges and lost item fees' },
  { category: 'Graduation Fees', desc: 'Ceremony attendance and certificate processing' },
  { category: 'Miscellaneous', desc: 'Lab fees, sports facilities, parking permits' },
];

const OnlinePaymentPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><CreditCard size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Online Payment</h1>
              <p className="text-emerald-100 mt-1">Tuition Fees, Hostel Dues & Financial Transactions</p>
            </div>
          </div>
          <p className="text-emerald-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Make secure payments for tuition, accommodation, and other institutional charges. All transactions are encrypted and PCI-DSS Level 1 compliant.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search payment options…" />

        <div data-searchable className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
          <Shield size={22} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">Secure Payment Gateway</h3>
            <p className="text-muted-foreground text-xs mt-1">All payments are processed through a 256-bit SSL encrypted gateway. Your financial data is never stored on our servers. Regulated by the UK Financial Conduct Authority.</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Accepted Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((m) => (
              <div key={m.name} data-searchable className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${m.bg} rounded-lg ${m.color} group-hover:scale-105 transition-transform`}><m.icon size={20} /></div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{m.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Categories */}
        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">What You Can Pay For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {feeCategories.map((f) => (
              <div key={f.category} data-searchable className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-bold text-foreground">{f.category}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Steps */}
        <div data-searchable>
          <h2 className="text-lg font-bold text-foreground mb-4">How to Make a Payment</h2>
          <div className="space-y-2">
            {[
              'Log in to the Student Portal with your OSCT credentials.',
              'Navigate to "Finance" → "Make a Payment".',
              'Select the fee category and enter the amount.',
              'Choose your preferred payment method.',
              'Complete the transaction and save your receipt.',
            ].map((step, i) => (
              <div key={i} data-searchable className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                <p className="text-xs text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm">Payment Enquiries</h3>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">For payment issues or refund requests, contact the Finance Office: <strong>support@oxfordskillscenter.co.uk</strong> or call <strong>+44 7782 274482</strong>. Office hours: Monday–Friday, 09:00–17:00 GMT.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePaymentPage;
