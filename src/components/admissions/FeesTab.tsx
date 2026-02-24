import {
  DollarSign, Award, Shield, Star, BookOpen, Percent, Heart
} from 'lucide-react';

const feeData = [
  { programme: "Bachelor's Degree", duration: '4 Years', fee: '£14,000 / year' },
  { programme: "Master's Degree", duration: '2 Years', fee: '£9,000 / year' },
  { programme: 'Ph.D', duration: 'Full-Time: 3–4 Years | Part-Time: 6–7 Years', fee: '£8,000 / year' },
  { programme: 'Diploma', duration: '6–12 Months', fee: '£6,000 / total' },
  { programme: 'Certificate', duration: '3–6 Months', fee: '£6,000 / total' },
  { programme: 'Training', duration: '2–4 Weeks', fee: '£1,700 / total' },
];

const mobileFeeData = [
  { programme: "Bachelor's Degree", duration: '4 Years', fee: '£14,000 / year' },
  { programme: "Master's Degree", duration: '2 Years', fee: '£9,000 / year' },
  { programme: 'Ph.D', duration: 'Full-Time: 3–4 Yrs | Part-Time: 6–7 Yrs', fee: '£8,000 / year' },
  { programme: 'Diploma', duration: '6–12 Months', fee: '£6,000 / total' },
  { programme: 'Certificate', duration: '3–6 Months', fee: '£6,000 / total' },
  { programme: 'Training', duration: '2–4 Weeks', fee: '£1,700 / total' },
];

const scholarshipSections = [
  {
    number: 1,
    icon: Star,
    iconColor: 'text-amber-500',
    title: 'Premier Government & Global Scholarships',
    subtitle: 'These "Gold Standard" awards are fully funded and intended for students demonstrating high leadership potential or research impact.',
    borderColor: 'border-primary/30',
    items: [
      { name: 'Chevening Scholarships', detail: "Covers 100% of tuition, living stipends (~£1,300/month), airfare, and visa fees for one-year Master's degrees." },
      { name: 'Commonwealth Scholarships', detail: 'Includes Shared Scholarships and Split-site PhDs. Provides full funding for students whose work contributes to national development.' },
      { name: 'GREAT Scholarships', detail: "A partnership offering a minimum of £10,000 towards tuition for one-year Master's degrees in specific subjects." },
      { name: 'Marshall Scholarships', detail: 'Highly prestigious; primarily for high-achieving students to pursue postgraduate study at any UK institution.' },
    ],
  },
  {
    number: 2,
    icon: BookOpen,
    iconColor: 'text-blue-500',
    title: 'University-Specific & Endowment Awards',
    subtitle: 'Funding provided directly from university funds to attract top-tier academic talent.',
    borderColor: 'border-blue-400/30',
    items: [
      { name: 'Clarendon Fund (Oxford)', detail: 'Covers full tuition and living expenses for graduate scholars at the University of Oxford.' },
      { name: 'Rhodes Scholarship', detail: 'One of the oldest global awards, covering full costs for postgraduate study at Oxford based on character and leadership.' },
      { name: 'Global Futures Scholarship', detail: "High-value awards (up to £30,000) for undergraduate and Master's students at selected research institutions." },
      { name: 'Think Big Scholarships', detail: 'Ranging from £6,500 to £26,000, applicable as a tuition fee reduction.' },
    ],
  },
  {
    number: 3,
    icon: Percent,
    iconColor: 'text-emerald-500',
    title: 'Financial Concessions & Incentives',
    subtitle: 'Direct price-drop incentives based on payment behavior and enrollment timing.',
    borderColor: 'border-emerald-400/30',
    items: [
      { name: 'Early Payment Discount (EPD)', detail: 'A reduction of £1,000 to £2,000 for students who settle their full annual tuition fee by the specified deadline (usually August).' },
      { name: 'Early Deposit Award', detail: 'A discount (e.g., £500) for paying the seat-confirmation deposit shortly after receiving an admission offer.' },
      { name: 'Full-Fee Payment Discount', detail: 'A standard 3% to 5% reduction for paying the entire course fee upfront in a single installment.' },
    ],
  },
  {
    number: 4,
    icon: Heart,
    iconColor: 'text-rose-500',
    title: 'Loyalty, Family & Professional Discounts',
    subtitle: "Support categorized by the student's relationship to the institution or their current professional status.",
    borderColor: 'border-rose-400/30',
    items: [
      { name: 'Sibling/Family Discount', detail: 'A 10% to 20% reduction for students who have a family member currently enrolled or who has previously graduated.' },
      { name: 'Alumni Loyalty Fee Waiver', detail: "A 15% to 20% discount for students progressing from a Bachelor's to a Master's at the same university." },
      { name: 'Partner School Discounts', detail: 'A 10%–15% fee reduction for students applying from recognized partner institutes or affiliated centers.' },
      { name: 'Master of Education (MA Education) Grants', detail: 'A professional development discount (typically £3,000–£5,000) for active teachers.' },
    ],
  },
  {
    number: 5,
    icon: Award,
    iconColor: 'text-purple-500',
    title: 'Specialized, Talent & Inclusion Grants',
    subtitle: 'Support for specific professional tracks, personal circumstances, or exceptional talents.',
    borderColor: 'border-purple-400/30',
    items: [
      { name: 'Justice & Law Scholarships / SQE & Bar Excellence Awards', detail: 'Funding ranging from £1,000 to full-fee waivers for legal professionals and future lawyers.' },
      { name: 'A.S. Hornby Trust', detail: "Specifically for English Language Teachers to pursue advanced Master's training." },
      { name: 'Sanctuary Scholarships', detail: 'Full tuition waivers and support for students with refugee or asylum seeker status.' },
      { name: 'Snowdon Trust Grants', detail: 'Funding to assist students with physical disabilities in covering additional study costs.' },
      { name: 'Elite Athlete/Sports & Music Awards', detail: 'Awards ranging from £1,000 to £6,000 for students representing the university in national competitions or arts.' },
    ],
  },
];

const FeesTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
          <DollarSign size={24} />
        </div>
        <h3 className="text-xl font-bold text-foreground">Fee Structure (2026/27)</h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-hidden border border-border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-3">Programme Level</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Tuition Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {feeData.map((row, i) => (
              <tr key={i}>
                <td className="px-6 py-3 font-medium text-foreground">{row.programme}</td>
                <td className="px-6 py-3 text-muted-foreground">{row.duration}</td>
                <td className="px-6 py-3 text-primary font-bold">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {mobileFeeData.map((row, i) => (
          <div key={i} className="bg-muted/50 rounded-lg border border-border p-4 space-y-2">
            <h4 className="text-sm font-bold text-foreground">{row.programme}</h4>
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase font-bold text-muted-foreground">
                Duration:
                {row.duration.includes('|') ? (
                  <div className="mt-1 space-y-0.5">
                    {row.duration.split(' | ').map((part, j) => (
                      <span key={j} className="block font-medium bg-muted px-1.5 py-0.5 rounded text-foreground text-[10px]">{part}</span>
                    ))}
                  </div>
                ) : (
                  <span className="ml-1 font-medium bg-muted px-1.5 py-0.5 rounded text-foreground">{row.duration}</span>
                )}
              </div>
              <span className="text-sm font-bold text-primary">{row.fee}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex gap-3 items-start">
        <Award className="text-amber-600 shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-foreground text-sm">Merit Scholarships Available</h4>
          <p className="text-xs text-muted-foreground mt-1">Up to 50% tuition waiver for students with outstanding academic records (GPA 3.8+). Apply during your admission process.</p>
        </div>
      </div>

      {/* International Scholarship & Financial Support Policy */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><Shield size={24} /></div>
          <div>
            <h3 className="text-xl font-bold text-foreground">International Scholarship & Financial Support Policy</h3>
            <p className="text-xs text-muted-foreground">Oxford Skills Center of Technology — 2026 Academic Cycle</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This document serves as the formal institutional framework for identifying and verifying financial support opportunities for students pursuing higher education in the United Kingdom for the 2026 academic cycle.
        </p>

        {scholarshipSections.map((section) => (
          <div key={section.number} className="bg-muted rounded-lg border border-border p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">{section.number}</span>
              <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                <section.icon size={16} className={section.iconColor} /> {section.title}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground italic pl-9">{section.subtitle}</p>
            <div className="space-y-3 pl-9">
              {section.items.map((item, i) => (
                <div key={i} className={`border-l-2 ${section.borderColor} pl-3`}>
                  <h5 className="text-sm font-semibold text-foreground">{item.name}</h5>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium text-foreground">General Clause:</span> {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Policy Verification Requirement */}
        <div className="bg-slate-900 rounded-lg p-5 text-white flex gap-3 items-start">
          <Shield className="text-emerald-400 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-sm mb-1">Policy Verification Requirement</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              To apply for any named award or concession, students must submit a formal request through the Oxford Skills Center of Technology admissions portal accompanied by the required academic and professional evidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesTab;
