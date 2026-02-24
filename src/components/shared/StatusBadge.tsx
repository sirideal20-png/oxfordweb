interface StatusBadgeProps {
  status: 'Open' | 'Closing Soon' | 'Waitlist' | 'Coming Soon' | 'Most Preferred';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<string, string> = {
    'Open': "bg-emerald-100 text-emerald-700 border-emerald-200",
    'Closing Soon': "bg-amber-100 text-amber-700 border-amber-200",
    'Waitlist': "bg-slate-100 text-slate-600 border-slate-200",
    'Coming Soon': "bg-blue-100 text-blue-700 border-blue-200",
    'Most Preferred': "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-full ${styles[status] || styles['Open']}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
