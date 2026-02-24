import { useState, useMemo } from 'react';
import { useOxfordClock } from '@/hooks/useOxfordTime';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Calculator, Clock, GraduationCap, BadgePercent, Home,
  ChevronRight, AlertTriangle, Minus, Plus, FileText, Percent,
  Sparkles, Shield, Wallet, CreditCard
} from 'lucide-react';

/* ─── Data ─── */
const TUITION: Record<string, { label: string; amount: number; unit: string }> = {
  bachelors:   { label: "Bachelor's Degree",     amount: 14000, unit: '/year' },
  masters:     { label: "Master's Degree",       amount: 9000,  unit: '/year' },
  phd:         { label: "Ph.D Programme",        amount: 8000,  unit: '/year' },
  diploma:     { label: "Diploma Programme",     amount: 6000,  unit: 'total' },
  certificate: { label: "Certificate Programme", amount: 6000,  unit: 'total' },
  training:    { label: "Short-Term Training",   amount: 1700,  unit: 'total' },
};

const SCHOLARSHIPS: Record<string, { label: string; group: string }> = {
  none:           { label: 'No Scholarship', group: '' },
  chevening:      { label: 'Chevening Scholarship', group: 'Premier Global' },
  commonwealth:   { label: 'Commonwealth Scholarship', group: 'Premier Global' },
  great:          { label: 'GREAT Scholarship', group: 'Premier Global' },
  marshall:       { label: 'Marshall Scholarship', group: 'Premier Global' },
  clarendon:      { label: 'Clarendon Fund (Oxford)', group: 'University Awards' },
  rhodes:         { label: 'Rhodes Scholarship', group: 'University Awards' },
  global_futures: { label: 'Global Futures Scholarship', group: 'University Awards' },
  think_big:      { label: 'Think Big Scholarship', group: 'University Awards' },
  epd:            { label: 'Early Payment Discount (EPD)', group: 'Financial Concessions' },
  early_deposit:  { label: 'Early Deposit Award', group: 'Financial Concessions' },
  full_fee:       { label: 'Full-Fee Payment Discount', group: 'Financial Concessions' },
  sibling_family: { label: 'Sibling/Family Discount', group: 'Loyalty & Professional' },
  alumni_loyalty: { label: 'Alumni Loyalty Fee Waiver', group: 'Loyalty & Professional' },
  partner_school: { label: 'Partner School Discount', group: 'Loyalty & Professional' },
  ma_education:   { label: 'MA Education Grant (Teachers)', group: 'Loyalty & Professional' },
  law_sqe:        { label: 'Justice & Law / SQE Award', group: 'Talent & Inclusion' },
  hornby_trust:   { label: 'A.S. Hornby Trust', group: 'Talent & Inclusion' },
  sanctuary:      { label: 'Sanctuary Scholarship (Refugees)', group: 'Talent & Inclusion' },
  snowdon:        { label: 'Snowdon Trust Grant (Disabilities)', group: 'Talent & Inclusion' },
  athlete_arts:   { label: 'Elite Athlete / Sports & Music Award', group: 'Talent & Inclusion' },
  merit:          { label: 'Merit Scholarship (GPA 3.8+)', group: 'University Awards' },
};

const ACCOMMODATION: Record<string, { label: string; rate: number }> = {
  none:     { label: 'No Accommodation', rate: 0 },
  standard: { label: 'Standard Residence', rate: 600 },
  premium:  { label: 'Premium Residence', rate: 900 },
};

const IHS_RATE = 776;

/* ─── Component ─── */
const FeeCalculatorSection = () => {
  const ukTime = useOxfordClock();

  const [program, setProgram] = useState('bachelors');
  const [earlyPayment, setEarlyPayment] = useState(false);
  const [siblingDiscount, setSiblingDiscount] = useState(false);
  const [professionalGrant, setProfessionalGrant] = useState(false);
  const [initialDeposit, setInitialDeposit] = useState([1000]);
  const [scholarship, setScholarship] = useState('none');
  const [scholarshipPercent, setScholarshipPercent] = useState('');
  const [accommodation, setAccommodation] = useState('none');
  const [months, setMonths] = useState([6]);
  const [showResult, setShowResult] = useState(false);

  const breakdown = useMemo(() => {
    const baseTuition = TUITION[program]?.amount ?? 0;
    const earlyDeduction = earlyPayment ? 1000 : 0;
    const siblingDeduction = siblingDiscount ? Math.round(baseTuition * 0.15) : 0;
    const profDeduction = professionalGrant ? 3000 : 0;
    const pct = Math.min(100, Math.max(0, parseFloat(scholarshipPercent) || 0));
    const scholarshipDeduction = scholarship !== 'none' ? Math.round(baseTuition * (pct / 100)) : 0;
    const totalDeductions = earlyDeduction + siblingDeduction + profDeduction + scholarshipDeduction;
    const netTuition = Math.max(0, baseTuition - totalDeductions);
    const deposit = initialDeposit[0];
    const ihs = IHS_RATE;
    const depositIncludesIhs = ihs;
    const accRate = ACCOMMODATION[accommodation]?.rate ?? 0;
    const accTotal = accRate * months[0];
    const grandTotal = netTuition + accTotal;

    return {
      baseTuition, earlyDeduction, siblingDeduction, profDeduction,
      scholarshipDeduction, scholarshipPct: pct, totalDeductions,
      netTuition, deposit, depositIncludesIhs,
      accRate, accMonths: months[0], accTotal, grandTotal,
    };
  }, [program, earlyPayment, siblingDiscount, professionalGrant, scholarship, scholarshipPercent, accommodation, months, initialDeposit]);

  const fmt = (n: number) => `£${n.toLocaleString('en-GB')}`;

  const scholarshipGroups = Object.entries(SCHOLARSHIPS).reduce<Record<string, { key: string; label: string }[]>>((acc, [key, val]) => {
    if (key === 'none') return acc;
    if (!acc[val.group]) acc[val.group] = [];
    acc[val.group].push({ key, label: val.label });
    return acc;
  }, {});

  return (
    <div className="animate-fadeIn pb-12 font-sans">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        {/* Layered gradient background — dark tech */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(225_60%_40%/0.4)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(250_50%_25%/0.3)_0%,_transparent_60%)]" />

        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/[0.04] blur-2xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/[0.02] blur-xl" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-indigo-400/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-indigo-200 font-medium border border-indigo-400/20">
                <Sparkles className="w-3 h-3 text-indigo-300" />
                2026/27 Academic Year
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Fee Calculator
              </h1>
              <p className="text-slate-300/70 max-w-lg text-sm sm:text-base leading-relaxed">
                Plan your investment with our interactive estimator. Configure your programme, scholarships, and accommodation to get an instant personalised breakdown.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>OSCT Verified</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Real-Time Estimates</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-sm shrink-0 shadow-lg">
              <Clock className="w-4 h-4 text-indigo-300" />
              <span className="font-mono font-bold text-white">{ukTime}</span>
              <span className="text-slate-400 text-xs">Oxford, UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CALCULATOR GRID ═══ */}
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">

        {/* ─── LEFT: INPUTS ─── */}
        <div className="lg:col-span-3 space-y-5">

          {/* Step 1: Programme */}
          <StepCard step={1} icon={GraduationCap} title="Select Your Programme" accent="from-indigo-500/10 to-indigo-500/5">
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger className="w-full h-12 text-sm border-border/60 bg-background hover:border-primary/40 transition-colors">
                <SelectValue placeholder="Choose programme" />
              </SelectTrigger>
              <SelectContent position="item-aligned" className="max-w-[calc(100vw-2rem)]">
                {Object.entries(TUITION).map(([key, val]) => (
                  <SelectItem key={key} value={key}>
                    <span className="block truncate">
                      {val.label} — {fmt(val.amount)} {val.unit}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quick fee preview */}
            <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
              <Wallet className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-xs text-muted-foreground">Base tuition for <strong className="text-foreground">{TUITION[program]?.label}</strong>:</span>
              <span className="ml-auto text-sm font-bold text-indigo-600">{fmt(TUITION[program]?.amount ?? 0)}</span>
            </div>
          </StepCard>

          {/* Step 2: Financial Support */}
          <StepCard step={2} icon={BadgePercent} title="Financial Support & Discounts" accent="from-violet-500/10 to-violet-500/5">
            <div className="space-y-2.5">
              <DiscountCheckbox
                id="early"
                checked={earlyPayment}
                onChange={setEarlyPayment}
                title="Early Full Payment Discount"
                desc="Save £1,000 when paying your full fee upfront"
                badge="-£1,000"
              />
              <DiscountCheckbox
                id="sibling"
                checked={siblingDiscount}
                onChange={setSiblingDiscount}
                title="Sibling / Family Discount"
                desc="15% off tuition if a sibling is a current student or alumnus"
                badge="-15%"
              />
              <DiscountCheckbox
                id="professional"
                checked={professionalGrant}
                onChange={setProfessionalGrant}
                title="Professional Development Grant"
                desc="For qualified Teachers & Lawyers"
                badge="-£3,000"
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block text-foreground">Scholarship Programme</Label>
                <Select value={scholarship} onValueChange={(v) => { setScholarship(v); if (v === 'none') setScholarshipPercent(''); }}>
                  <SelectTrigger className="w-full h-11 border-border/60 bg-background hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select scholarship" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-60 max-w-[calc(100vw-2rem)]" sideOffset={4}>
                    <SelectItem value="none">No Scholarship</SelectItem>
                    {Object.entries(scholarshipGroups).map(([group, items]) => (
                      <div key={group}>
                        <div className="px-3 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/50 sticky top-0">
                          {group}
                        </div>
                        {items.map((item) => (
                          <SelectItem key={item.key} value={item.key}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {scholarship !== 'none' && (
                <div className="animate-fadeIn p-4 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                    <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center">
                      <Percent className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                    Scholarship Percentage
                  </Label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Enter the exact percentage awarded as stated in your Conditional Offer Letter.
                  </p>
                  <div className="flex items-center gap-2 max-w-xs">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="e.g. 50"
                      value={scholarshipPercent}
                      onChange={(e) => setScholarshipPercent(e.target.value)}
                      className="font-mono h-10 border-border/60"
                    />
                    <span className="text-sm font-bold text-muted-foreground">%</span>
                  </div>
                  {scholarshipPercent && parseFloat(scholarshipPercent) > 0 && (
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      Deduction: -{fmt(Math.round((TUITION[program]?.amount ?? 0) * (Math.min(100, parseFloat(scholarshipPercent)) / 100)))} off tuition
                    </div>
                  )}
                </div>
              )}
            </div>
          </StepCard>

          {/* Step 3: Accommodation & Deposit */}
          <StepCard step={3} icon={Home} title="Living, Accommodation & Deposit" accent="from-cyan-500/10 to-cyan-500/5">
            <div>
              <Label className="text-sm font-medium mb-2 block text-foreground">Accommodation Type</Label>
              <Select value={accommodation} onValueChange={setAccommodation}>
                <SelectTrigger className="w-full h-11 border-border/60 bg-background hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent position="item-aligned" className="max-w-[calc(100vw-2rem)]">
                  {Object.entries(ACCOMMODATION).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.label}{val.rate > 0 ? ` (${fmt(val.rate)}/month)` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {accommodation !== 'none' && (
              <div className="animate-fadeIn space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-foreground">Duration</Label>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-500/10 rounded-md px-2.5 py-0.5">
                    {months[0]} {months[0] === 1 ? 'month' : 'months'}
                  </span>
                </div>
                <Slider value={months} onValueChange={setMonths} min={1} max={12} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 month</span>
                  <span>12 months</span>
                </div>
              </div>
            )}

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2 text-foreground">
                  <CreditCard className="w-4 h-4 text-indigo-500" />
                  Initial Deposit
                </Label>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-500/10 rounded-md px-2.5 py-0.5">
                  {fmt(initialDeposit[0])}
                </span>
              </div>
              <Slider value={initialDeposit} onValueChange={setInitialDeposit} min={1000} max={3000} step={100} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>£1,000</span>
                <span>£3,000</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-2.5 border border-border/40">
                <strong>Note:</strong> Seat-confirmation deposit payable upon acceptance. Includes the Immigration Health Surcharge (IHS).
              </p>
            </div>
          </StepCard>

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full h-14 text-base font-bold gap-2.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
            onClick={() => setShowResult(true)}
          >
            <Calculator className="w-5 h-5" />
            Calculate My Fees
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* ─── RIGHT: RESULT ─── */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6 space-y-5">

            {/* Breakdown Card */}
            <div className={`rounded-2xl border transition-all duration-500 overflow-hidden ${showResult ? 'border-indigo-500/30 shadow-xl shadow-indigo-500/10' : 'border-border/60'}`}>
              {/* Card header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Fee Breakdown</h3>
                    <p className="text-xs text-slate-400">Your personalised estimate</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {!showResult ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-2xl bg-muted/80 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                      Configure your options and click <strong className="text-foreground">"Calculate My Fees"</strong>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Tuition */}
                    <BreakdownSection title="Tuition">
                      <Row label={TUITION[program]?.label ?? 'Programme'} value={fmt(breakdown.baseTuition)} />
                    </BreakdownSection>

                    {/* Deductions */}
                    {breakdown.totalDeductions > 0 && (
                      <BreakdownSection title="Deductions" icon={<Minus className="w-3 h-3" />}>
                        {breakdown.earlyDeduction > 0 && (
                          <Row label="Early Payment" value={`-${fmt(breakdown.earlyDeduction)}`} deduction />
                        )}
                        {breakdown.siblingDeduction > 0 && (
                          <Row label="Sibling/Family (15%)" value={`-${fmt(breakdown.siblingDeduction)}`} deduction />
                        )}
                        {breakdown.profDeduction > 0 && (
                          <Row label="Professional Grant" value={`-${fmt(breakdown.profDeduction)}`} deduction />
                        )}
                        {breakdown.scholarshipDeduction > 0 && (
                          <Row label={`${SCHOLARSHIPS[scholarship]?.label} (${breakdown.scholarshipPct}%)`} value={`-${fmt(breakdown.scholarshipDeduction)}`} deduction />
                        )}
                        <Separator className="my-1.5" />
                        <Row label="Net Tuition" value={fmt(breakdown.netTuition)} bold />
                      </BreakdownSection>
                    )}

                    {/* Additional Costs */}
                    {breakdown.accTotal > 0 && (
                      <BreakdownSection title="Additional Costs" icon={<Plus className="w-3 h-3" />}>
                        <Row
                          label={`${ACCOMMODATION[accommodation]?.label} (${breakdown.accMonths}mo)`}
                          value={fmt(breakdown.accTotal)}
                        />
                      </BreakdownSection>
                    )}

                    {/* Deposit */}
                    <div className="rounded-xl bg-muted/50 border border-border/40 p-4 space-y-2">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-3 h-3" /> Initial Deposit
                      </h4>
                      <Row label="Deposit Amount" value={fmt(breakdown.deposit)} bold />
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3 text-indigo-400" />
                        Includes IHS: {fmt(breakdown.depositIncludesIhs)}
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-500/15 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">Estimated Total</span>
                        <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">{fmt(breakdown.grandTotal)}</span>
                      </div>
                      <Separator className="border-indigo-500/10" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Less: Initial Deposit</span>
                        <span className="font-mono font-semibold text-foreground">-{fmt(breakdown.deposit)}</span>
                      </div>
                      <div className="flex items-center justify-between bg-indigo-500/5 rounded-lg px-3 py-2">
                        <span className="text-sm font-bold text-foreground">Balance Remaining</span>
                        <span className="text-lg font-extrabold text-indigo-600">{fmt(Math.max(0, breakdown.grandTotal - breakdown.deposit))}</span>
                      </div>
                      {breakdown.totalDeductions > 0 && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          You save {fmt(breakdown.totalDeductions)} with your selected discounts!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-3 p-4 rounded-xl bg-amber-50/80 border border-amber-200/60">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> This calculator provides an estimated figure for planning purposes only. Final fees will be confirmed in your Conditional Offer Letter. All figures are subject to the{' '}
                <a href="/admissions/refund-policy" className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors">
                  OSCT Refund Policy
                </a>{' '}
                (60% administrative retention in case of visa refusal).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Sub-components ─── */

const StepCard = ({ step, icon: Icon, title, accent, children }: {
  step: number; icon: React.ElementType; title: string; accent: string; children: React.ReactNode;
}) => (
  <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <div className={`bg-gradient-to-r ${accent} px-5 py-3.5 border-b border-border/30`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-sm">
          {step}
        </div>
        <Icon className="w-4 h-4 text-indigo-500" />
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
    </div>
    <CardContent className="p-5">
      {children}
    </CardContent>
  </Card>
);

const DiscountCheckbox = ({ id, checked, onChange, title, desc, badge }: {
  id: string; checked: boolean; onChange: (v: boolean) => void;
  title: string; desc: string; badge: string;
}) => (
  <label
    htmlFor={id}
    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
      checked
        ? 'border-indigo-500/30 bg-indigo-500/5 shadow-sm'
        : 'border-border/40 hover:bg-muted/30 hover:border-border/60'
    }`}
  >
    <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(!!v)} className="mt-0.5" />
    <div className="flex-1 min-w-0">
      <span className="text-sm font-semibold text-foreground block">{title}</span>
      <span className="text-xs text-muted-foreground mt-0.5 block leading-relaxed">{desc}</span>
    </div>
    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 rounded-md px-2 py-1 shrink-0">{badge}</span>
  </label>
);

const BreakdownSection = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
      {icon} {title}
    </h4>
    {children}
  </div>
);

const Row = ({ label, value, deduction, bold }: { label: string; value: string; deduction?: boolean; bold?: boolean }) => (
  <div className={`flex items-center justify-between text-sm py-0.5 ${bold ? 'font-semibold text-foreground' : ''}`}>
    <span className={deduction ? 'text-indigo-600' : 'text-muted-foreground'}>{label}</span>
    <span className={`font-mono ${deduction ? 'text-indigo-600' : bold ? 'text-foreground' : 'text-foreground/80'} ${bold ? 'font-bold' : 'font-medium'}`}>
      {value}
    </span>
  </div>
);

export default FeeCalculatorSection;
