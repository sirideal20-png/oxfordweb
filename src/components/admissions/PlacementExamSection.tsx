import { Award, Mic, PenTool, Headphones, BookOpen, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const modules = [
  { name: 'Speaking', icon: Mic, desc: 'Evaluates verbal communication and fluency.', marks: 100 },
  { name: 'Writing', icon: PenTool, desc: 'Assesses grammatical accuracy and structural coherence.', marks: 100 },
  { name: 'Listening', icon: Headphones, desc: 'Tests comprehension of spoken academic English.', marks: 100 },
  { name: 'Reading', icon: BookOpen, desc: 'Measures analytical and interpretive reading skills.', marks: 100 },
];

const PlacementExamSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
          <Award size={24} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            English Language Proficiency Assessment (ELPA)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Internal placement exam required for all incoming students
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-muted/50 border border-border rounded-xl p-5">
        <p className="text-sm text-foreground leading-relaxed">
          To ensure all students are prepared for the rigors of a UK-standard education, the{' '}
          <span className="font-semibold text-primary">Oxford Skills Center of Technology</span>{' '}
          requires the completion of an internal proficiency exam. This assessment evaluates your
          functional capabilities in four core linguistic areas.
        </p>
      </div>

      {/* Exam Structure */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full" />
          Exam Structure
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          The examination is divided into four equally weighted modules, each carrying a maximum of <span className="font-bold text-foreground">100 marks</span>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
           {modules.map((mod) => (
            <div
              key={mod.name}
              data-searchable
              className="group bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <mod.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-foreground">{mod.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {mod.marks} marks
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Passing Criteria */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full" />
          Passing Criteria &amp; Logic
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          To successfully pass the assessment and proceed with full academic enrollment, candidates must meet both the individual and aggregate score benchmarks:
        </p>

        <div className="space-y-3">
          {/* Rule 1 */}
          <div data-searchable className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600 mt-0.5">
              <CheckCircle size={16} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-0.5">
                Minimum Sectional Requirement
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A student must score a minimum of{' '}
                <span className="font-bold text-foreground">30 marks</span> in each of the four sections.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div data-searchable className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600 mt-0.5">
              <CheckCircle size={16} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-0.5">
                Total Aggregate Requirement
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A minimum collective score of{' '}
                <span className="font-bold text-foreground">120 marks</span> (out of 400) is required to pass.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div data-searchable className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
              Note on Academic Progression
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed">
              Failure to meet the minimum score of <span className="font-bold">30</span> in any single
              section — regardless of the total aggregate — will result in a mandatory referral to a{' '}
              <span className="font-bold">Foundation English Module</span>. This module must be
              completed successfully before the student can begin their primary degree or diploma program.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div data-searchable className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="bg-muted/50 px-5 py-3 border-b border-border flex items-center gap-2">
          <Info size={14} className="text-primary" />
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Quick Summary</h4>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Modules</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">400</div>
              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Total Marks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">120</div>
              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Pass Aggregate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">30</div>
              <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Min. Per Section</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementExamSection;
