import { useRef } from 'react';
import { BarChart, Award, TrendingUp, Calculator, Info, BookOpen } from 'lucide-react';
import SectionSearch from '@/components/shared/SectionSearch';

const gradingScale = [
  { grade: 'A+', range: '90–100%', gpa: '4.00', cls: 'First Class Honours', descriptor: 'Outstanding achievement demonstrating exceptional mastery' },
  { grade: 'A', range: '80–89%', gpa: '3.70', cls: 'First Class Honours', descriptor: 'Excellent work showing thorough understanding and originality' },
  { grade: 'B+', range: '70–79%', gpa: '3.30', cls: 'Upper Second (2:1)', descriptor: 'Very good work with strong analytical skills' },
  { grade: 'B', range: '60–69%', gpa: '3.00', cls: 'Lower Second (2:2)', descriptor: 'Good work demonstrating solid understanding' },
  { grade: 'C+', range: '50–59%', gpa: '2.30', cls: 'Third Class', descriptor: 'Satisfactory work meeting basic requirements' },
  { grade: 'C', range: '40–49%', gpa: '2.00', cls: 'Pass', descriptor: 'Adequate work meeting minimum threshold' },
  { grade: 'D', range: '30–39%', gpa: '1.00', cls: 'Compensatable Fail', descriptor: 'Below standard; may be compensated by strong performance elsewhere' },
  { grade: 'F', range: '0–29%', gpa: '0.00', cls: 'Fail', descriptor: 'Unsatisfactory; module must be retaken' },
];

const gpaExplanation = [
  { label: 'Semester GPA', formula: 'Σ(Grade Points × Credits) ÷ Total Credits Attempted', desc: 'Calculated at the end of each semester based on modules taken in that term.' },
  { label: 'Cumulative GPA (CGPA)', formula: 'Σ(All Grade Points × Credits) ÷ All Credits Attempted', desc: 'Running average across all semesters. This appears on your transcript.' },
  { label: 'Weighted Average', formula: 'Year 2 (40%) + Year 3 (60%)', desc: 'For degree classification, Year 1 is formative. Final-year modules carry greater weight.' },
];

const honours = [
  { classification: 'First Class Honours (1st)', cgpa: '3.50 – 4.00', percentage: '70%+' },
  { classification: 'Upper Second Class (2:1)', cgpa: '3.00 – 3.49', percentage: '60–69%' },
  { classification: 'Lower Second Class (2:2)', cgpa: '2.50 – 2.99', percentage: '50–59%' },
  { classification: 'Third Class (3rd)', cgpa: '2.00 – 2.49', percentage: '40–49%' },
  { classification: 'Ordinary Degree (Pass)', cgpa: '1.50 – 1.99', percentage: '35–39%' },
];

const GradingSystemPage = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={searchContainerRef} className="space-y-8 animate-fadeIn pb-12 font-sans min-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 py-12 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><BarChart size={28} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Grading System</h1>
              <p className="text-indigo-100 mt-1">GPA Calculation, Grade Scale & Degree Classification</p>
            </div>
          </div>
          <p className="text-indigo-100 max-w-2xl mt-4 text-sm leading-relaxed">
            Understand how your academic performance is assessed, how GPA is calculated, and what determines your final degree classification at Oxford Skills Center.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionSearch containerRef={searchContainerRef} placeholder="Search grading information…" />

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">OSCT Grade Scale</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Grade</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Range</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">GPA</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold hidden sm:table-cell">Classification</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold hidden lg:table-cell">Descriptor</th>
                </tr>
              </thead>
              <tbody>
                {gradingScale.map((g) => (
                  <tr key={g.grade} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-bold text-foreground">{g.grade}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{g.range}</td>
                    <td className="py-2.5 px-3 text-primary font-bold">{g.gpa}</td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{g.cls}</td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden lg:table-cell">{g.descriptor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">GPA Calculation</h2>
          <div className="space-y-3">
            {gpaExplanation.map((g) => (
              <div key={g.label} data-searchable className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-bold text-foreground text-sm">{g.label}</h3>
                <p className="text-primary text-xs font-mono mt-2 bg-primary/5 p-2 rounded">{g.formula}</p>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-searchable className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Degree Classification Thresholds</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Classification</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">CGPA Range</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-semibold">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {honours.map((h) => (
                  <tr key={h.classification} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">{h.classification}</td>
                    <td className="py-2.5 px-3 text-primary font-bold">{h.cgpa}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{h.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div data-searchable className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">Grade appeals must be submitted within 10 working days of publication through the Academic Registry. Only procedural irregularities or evidenced extenuating circumstances are grounds for appeal. Contact <strong>support@oxfordskillscenter.co.uk</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default GradingSystemPage;
