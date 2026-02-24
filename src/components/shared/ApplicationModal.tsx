import { X } from 'lucide-react';
import { courses } from '@/data/constants';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ isOpen, onClose }: ApplicationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-slideUp">
        <div className="bg-muted px-6 py-4 border-b border-border flex justify-between items-center">
          <div>
            <h3 className="font-bold text-foreground text-sm">Quick Application</h3>
            <p className="text-[10px] text-muted-foreground">Fall 2026 Intake</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Full Name</label>
              <input className="w-full border border-border rounded-md p-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-background" type="text" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Email Address</label>
              <input className="w-full border border-border rounded-md p-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-background" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Select Programme</label>
              <select className="w-full border border-border rounded-md p-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-background">
                {courses.map(c => <option key={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div className="pt-2">
              <button
                type="button"
                className="w-full px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                onClick={(e) => { e.preventDefault(); alert("Application Received"); onClose(); }}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
