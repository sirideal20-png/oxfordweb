import { Calendar } from 'lucide-react';

const DatesTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
          <Calendar size={24} />
        </div>
        <h3 className="text-xl font-bold text-foreground">Key Dates & Deadlines</h3>
      </div>
      <div className="relative border-l-2 border-border ml-3 space-y-8 py-2">
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-card shadow-sm" />
          <span className="text-xs font-bold text-primary uppercase tracking-wide">Ongoing</span>
          <h4 className="text-base font-bold text-foreground">Applications Open</h4>
          <p className="text-sm text-muted-foreground">Online portal is open for September 2026 intake.</p>
        </div>
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-muted-foreground/30 rounded-full border-4 border-card" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Mar 30, 2026</span>
          <h4 className="text-base font-bold text-foreground">Application Deadline</h4>
          <p className="text-sm text-muted-foreground">All applications must be submitted by this date.</p>
        </div>
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-muted-foreground/30 rounded-full border-4 border-card" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Sep 07, 2026</span>
          <h4 className="text-base font-bold text-foreground">Orientation Week</h4>
          <p className="text-sm text-muted-foreground">Welcome week and registration for all new students.</p>
        </div>
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-muted-foreground/30 rounded-full border-4 border-card" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Sep 14, 2026</span>
          <h4 className="text-base font-bold text-foreground">Classes Begin</h4>
          <p className="text-sm text-muted-foreground">Fall Semester commences for all programmes.</p>
        </div>
      </div>
    </div>
  );
};

export default DatesTab;
